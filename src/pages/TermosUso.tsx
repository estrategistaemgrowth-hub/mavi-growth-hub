import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { Helmet } from "react-helmet-async";

export default function TermosUso() {
  return (
    <Layout>
      <Helmet>
        <title>Termos de Uso | MAVI Marketing Digital</title>
        <meta name="description" content="Termos de Uso da MAVI Marketing Digital. Conheça as condições para utilização de nossos serviços e plataformas." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6">
              Termos de <span className="text-primary">Uso</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed">
              Última atualização: Dezembro de 2024
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg animate-fade-in-up animation-delay-200">
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e utilizar o site da MAVI Marketing Digital (www.agenciamavi.com.br) e nossos 
                serviços, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte 
                destes termos, não deverá utilizar nosso site ou serviços. O uso continuado constitui 
                aceitação de quaisquer alterações posteriores a estes termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Descrição dos Serviços</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A MAVI Marketing Digital oferece serviços de:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Criação e gestão de lojas virtuais e e-commerce.</li>
                <li>Marketing de performance (Meta Ads, Google Ads).</li>
                <li>Gestão de redes sociais e produção de conteúdo.</li>
                <li>Gestão de marketplaces e integrações com ERP.</li>
                <li>Desenvolvimento de sites e landing pages.</li>
                <li>Automação de marketing e implementação de IA.</li>
                <li>CRM HUBRS para gestão de vendas e relacionamento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso do Site</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao utilizar nosso site, você concorda em:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fornecer informações verdadeiras, precisas e atualizadas.</li>
                <li>Não utilizar o site para fins ilegais ou não autorizados.</li>
                <li>Não tentar acessar áreas restritas do sistema.</li>
                <li>Não interferir no funcionamento do site ou servidores.</li>
                <li>Não reproduzir, duplicar ou copiar conteúdo sem autorização.</li>
                <li>Não transmitir vírus, malware ou códigos maliciosos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Propriedade Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo presente neste site, incluindo mas não limitado a textos, gráficos, 
                logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados 
                e software, é propriedade da MAVI Marketing Digital ou de seus fornecedores de conteúdo 
                e está protegido pelas leis brasileiras e tratados internacionais de direitos autorais. 
                A marca "MAVI", "HUBRS" e logos relacionados são marcas registradas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Contratação de Serviços</h2>
              <p className="text-muted-foreground leading-relaxed">
                A contratação de serviços está sujeita a proposta comercial específica e contrato próprio, 
                que prevalecerá sobre estes Termos de Uso no que for aplicável. Os valores, prazos e 
                condições de pagamento serão definidos em cada proposta ou contrato individual. 
                Reservamo-nos o direito de recusar ou cancelar serviços a nosso exclusivo critério.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Uso do CRM HUBRS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O acesso e uso do CRM HUBRS está sujeito às seguintes condições adicionais:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Cada conta é pessoal e intransferível.</li>
                <li>O cliente é responsável por manter suas credenciais seguras.</li>
                <li>É proibido compartilhar acesso com terceiros não autorizados.</li>
                <li>Os dados inseridos no sistema são de responsabilidade do cliente.</li>
                <li>O uso para fins ilegais resultará em cancelamento imediato.</li>
                <li>Backups são realizados periodicamente, mas o cliente é responsável por manter cópias de seus dados importantes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                A MAVI Marketing Digital não será responsável por danos indiretos, incidentais, especiais, 
                consequenciais ou punitivos, incluindo perda de lucros, dados, uso, fundo de comércio ou 
                outras perdas intangíveis, resultantes de: (i) seu acesso ou uso ou incapacidade de acessar 
                ou usar os serviços; (ii) qualquer conduta ou conteúdo de terceiros nos serviços; 
                (iii) qualquer conteúdo obtido dos serviços; e (iv) acesso não autorizado, uso ou alteração 
                de suas transmissões ou conteúdo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Resultados de Campanhas</h2>
              <p className="text-muted-foreground leading-relaxed">
                Os resultados de campanhas de marketing digital dependem de diversos fatores externos 
                que estão além do controle da MAVI, incluindo: qualidade do produto/serviço do cliente, 
                condições de mercado, sazonalidade, concorrência e políticas das plataformas de anúncios. 
                Não garantimos resultados específicos, mas nos comprometemos a aplicar as melhores práticas 
                e estratégias para maximizar o retorno sobre o investimento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Links para Terceiros</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nosso site pode conter links para sites de terceiros que não são operados por nós. 
                Não temos controle sobre e não assumimos responsabilidade pelo conteúdo, políticas de 
                privacidade ou práticas de sites de terceiros. Recomendamos que você leia os termos e 
                políticas de privacidade de cada site que visitar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Modificações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar ou substituir estes Termos de Uso a qualquer momento. 
                Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de 
                antecedência antes que quaisquer novos termos entrem em vigor. O que constitui uma mudança 
                material será determinado a nosso exclusivo critério.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Rescisão</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, 
                por qualquer motivo, incluindo, sem limitação, se você violar estes Termos de Uso. 
                Todas as disposições destes Termos que, por sua natureza, devam sobreviver à rescisão, 
                sobreviverão à rescisão.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Lei Aplicável e Foro</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, 
                sem consideração a conflitos de disposições legais. Qualquer disputa decorrente destes 
                termos será submetida ao foro da comarca de Jaraguá do Sul - SC, com exclusão de qualquer 
                outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="mt-4 p-4 bg-mavi-gray rounded-lg">
                <p className="text-foreground"><strong>MAVI Marketing Digital</strong></p>
                <p className="text-foreground"><strong>E-mail:</strong> agenciamavi@agenciamavi.com.br</p>
                <p className="text-foreground"><strong>Telefone:</strong> (47) 3307-2030</p>
                <p className="text-foreground"><strong>Endereço:</strong> Jaraguá do Sul - SC</p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
