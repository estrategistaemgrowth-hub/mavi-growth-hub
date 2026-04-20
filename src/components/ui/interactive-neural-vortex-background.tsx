import { useEffect, useRef } from "react";

interface NeuralVortexProps {
  className?: string;
  /** Cor principal RGB normalizada (0-1). Padrão: magenta MAVI */
  colorA?: [number, number, number];
  /** Cor secundária RGB normalizada (0-1). Padrão: roxo */
  colorB?: [number, number, number];
  /** Cor de acento RGB normalizada (0-1). Padrão: magenta brilhante */
  colorC?: [number, number, number];
}

/**
 * Vórtice neural interativo em WebGL — fragment shader com noise rotacional
 * que reage ao mouse e ao scroll. Cores MAVI por padrão.
 */
const InteractiveNeuralVortex = ({
  className = "",
  colorA = [0.92, 0.0, 0.4],
  colorB = [0.45, 0.05, 0.55],
  colorC = [1.0, 0.2, 0.55],
}: NeuralVortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    tX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    tY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const rafRef = useRef<number>(0);
  // Mantém cores em ref pra não recriar o canvas WebGL a cada render do pai
  const colorsRef = useRef({ a: colorA, b: colorB, c: colorC });
  colorsRef.current = { a: colorA, b: colorB, c: colorC };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn("WebGL não suportado");
      return;
    }

    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      uniform vec3 u_color_a;
      uniform vec3 u_color_b;
      uniform vec3 u_color_c;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = 2.0 * pow(1. - p, 2.);
        float t = .001 * u_time;
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));

        vec3 color = u_color_a;
        color = mix(color, u_color_b, 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
        color += u_color_c * 0.25 * sin(2.0 * u_scroll_progress + 1.5);
        color = color * noise;
        gl_FragColor = vec4(color, noise);
      }
    `;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(vsSource, gl.VERTEX_SHADER);
    const fs = compile(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointer = gl.getUniformLocation(program, "u_pointer_position");
    const uScroll = gl.getUniformLocation(program, "u_scroll_progress");
    const uColorA = gl.getUniformLocation(program, "u_color_a");
    const uColorB = gl.getUniformLocation(program, "u_color_b");
    const uColorC = gl.getUniformLocation(program, "u_color_c");

    const applyColors = () => {
      gl.uniform3f(uColorA, colorsRef.current.a[0], colorsRef.current.a[1], colorsRef.current.a[2]);
      gl.uniform3f(uColorB, colorsRef.current.b[0], colorsRef.current.b[1], colorsRef.current.b[2]);
      gl.uniform3f(uColorC, colorsRef.current.c[0], colorsRef.current.c[1], colorsRef.current.c[2]);
    };
    applyColors();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const render = () => {
      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.2;
      applyColors();
      gl.uniform1f(uTime, performance.now());
      // Coordenadas relativas ao canvas (não à viewport) — o canvas pode estar
      // posicionado dentro de um hero menor que window.innerHeight
      const rect = canvas.getBoundingClientRect();
      const px = (pointer.current.x - rect.left) / rect.width;
      const py = 1 - (pointer.current.y - rect.top) / rect.height;
      gl.uniform2f(uPointer, px, py);
      gl.uniform1f(uScroll, window.pageYOffset / (2 * window.innerHeight));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) rafRef.current = requestAnimationFrame(render);
    };
    render();

    const onMove = (e: PointerEvent | MouseEvent) => {
      pointer.current.tX = e.clientX;
      pointer.current.tY = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        pointer.current.tX = e.touches[0].clientX;
        pointer.current.tY = e.touches[0].clientY;
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default InteractiveNeuralVortex;
