import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { Helmet } from "react-helmet-async";

export default function PoliticaPrivacidade() {
  return (
    <Layout>
      <Helmet>
        <title>Política de Privacidade | MAVI Marketing Digital</title>
        <meta name="description" content="Política de Privacidade da MAVI Marketing Digital. Saiba como coletamos, usamos e protegemos seus dados pessoais." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6">
              Política de <span className="text-primary">Privacidade</span>
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                A MAVI Marketing Digital ("MAVI", "nós", "nosso") está comprometida em proteger a privacidade 
                e os dados pessoais de nossos clientes, parceiros e visitantes do site. Esta Política de 
                Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais 
                em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Dados que Coletamos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos coletar os seguintes tipos de dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Dados de identificação:</strong> nome completo, CPF, CNPJ, e-mail, telefone e endereço.</li>
                <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e cookies.</li>
                <li><strong>Dados comerciais:</strong> informações sobre sua empresa, faturamento, serviços de interesse e histórico de comunicação.</li>
                <li><strong>Dados de comunicação:</strong> mensagens enviadas através de formulários, WhatsApp, e-mail ou outros canais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Como Utilizamos seus Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Responder a solicitações de contato e fornecer atendimento ao cliente.</li>
                <li>Enviar propostas comerciais, orçamentos e informações sobre nossos serviços.</li>
                <li>Executar e gerenciar contratos de prestação de serviços.</li>
                <li>Enviar comunicações de marketing (com seu consentimento prévio).</li>
                <li>Melhorar nossos serviços e a experiência do usuário em nosso site.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal para Tratamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas 
                na LGPD: (i) consentimento do titular; (ii) execução de contrato; (iii) cumprimento de 
                obrigação legal; (iv) legítimo interesse do controlador, desde que não prejudique direitos 
                e liberdades fundamentais do titular.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos compartilhar seus dados pessoais com:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Parceiros de tecnologia:</strong> plataformas de e-mail marketing, CRM, analytics e automação.</li>
                <li><strong>Plataformas de publicidade:</strong> Meta (Facebook/Instagram), Google Ads para execução de campanhas.</li>
                <li><strong>Prestadores de serviços:</strong> empresas contratadas para suporte em serviços específicos.</li>
                <li><strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, 
                analisar o tráfego do site e personalizar conteúdos. Você pode gerenciar suas preferências 
                de cookies através das configurações do seu navegador. Cookies essenciais são necessários 
                para o funcionamento básico do site e não podem ser desativados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Segurança dos Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados 
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui 
                criptografia de dados, controles de acesso, backups regulares e treinamento de equipe 
                sobre práticas de segurança da informação.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Retenção de Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas 
                nesta política, ou conforme exigido por lei. Após esse período, os dados serão eliminados 
                ou anonimizados de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Seus Direitos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De acordo com a LGPD, você possui os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Confirmar a existência de tratamento de dados.</li>
                <li>Acessar seus dados pessoais.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Solicitar a portabilidade dos dados.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
                <li>Obter informações sobre compartilhamento de dados.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contato do Encarregado (DPO)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato com nosso Encarregado de Proteção de Dados:
              </p>
              <div className="mt-4 p-4 bg-mavi-gray rounded-lg">
                <p className="text-foreground"><strong>E-mail:</strong> privacidade@agenciamavi.com.br</p>
                <p className="text-foreground"><strong>Telefone:</strong> (47) 3307-2030</p>
                <p className="text-foreground"><strong>Endereço:</strong> Jaraguá do Sul - SC</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você 
                a revise regularmente. Alterações significativas serão comunicadas através de nosso site 
                ou por e-mail, quando aplicável.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
