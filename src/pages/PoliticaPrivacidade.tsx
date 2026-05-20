import React from 'react';
import { ArrowLeft, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentVersion, getVersionHistory } from '@/utils/legalVersions';
import { assetUrl } from '@/lib/utils';
import { copy } from '@/content/copy';
import { useSEO } from '@/hooks/useSEO';

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Política de privacidade",
    description: "Política de privacidade da Storm Business. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/politica-privacidade`
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-poppins">Voltar</span>
            </button>
            <div className="flex items-center space-x-3">
              <img 
                src={assetUrl('img/Logo Storm Business blue.png')} 
                alt="Storm Business" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 font-poppins">
            Política de Privacidade
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-600 font-poppins font-light">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 font-poppins font-light">
              <History className="w-4 h-4" />
              <span>Versão {getCurrentVersion('privacy')}</span>
            </div>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed font-poppins font-light">
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">1. Informações Gerais</h2>
              <p>
                A Storm Consultoria ("nós", "nosso" ou "empresa") está comprometida em proteger a privacidade 
                e os dados pessoais de nossos clientes e visitantes do site. Esta Política de Privacidade 
                descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">2. Informações que Coletamos</h2>
              <p className="mb-4">Coletamos as seguintes categorias de informações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Informações de Contato:</strong> Nome, e-mail, telefone e endereço</li>
                <li><strong>Informações Profissionais:</strong> Especialidade médica, nome da clínica, cargo</li>
                <li><strong>Informações de Navegação:</strong> Dados de uso do site, cookies e tecnologias similares</li>
                <li><strong>Informações de Comunicação:</strong> Conteúdo de mensagens e comunicações conosco</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">3. Como Usamos suas Informações</h2>
              <p className="mb-4">Utilizamos suas informações pessoais para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer nossos serviços de consultoria e mentoria</li>
                <li>Comunicar-nos com você sobre nossos serviços</li>
                <li>Melhorar nossos serviços e desenvolver novos produtos</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Proteger nossos direitos e prevenir fraudes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes circunstâncias:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com prestadores de serviços que nos auxiliam na operação do negócio</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas apropriadas 
                para proteger suas informações pessoais contra acesso não autorizado, alteração, 
                divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">6. Seus Direitos</h2>
              <p className="mb-4">Você tem os seguintes direitos em relação às suas informações pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acesso às suas informações pessoais</li>
                <li>Correção de informações incorretas ou incompletas</li>
                <li>Exclusão de suas informações pessoais</li>
                <li>Portabilidade dos dados</li>
                <li>Oposição ao processamento</li>
                <li>Retirada do consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">7. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
                analisar o uso do site e personalizar conteúdo. Você pode controlar o uso de cookies 
                através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">8. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os 
                propósitos descritos nesta política, a menos que um período de retenção mais longo 
                seja exigido ou permitido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                mudanças significativas através do nosso site ou por e-mail. Recomendamos que você 
                revise esta política regularmente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">10. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                suas informações pessoais, entre em contato conosco:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>E-mail:</strong> {import.meta.env.VITE_EMAIL_CONTACT || 'contato@sua-aceleradora.com.br'}</p>
                <p><strong>Telefone:</strong> {import.meta.env.VITE_CONTACT_PHONE_LABEL || '(71) 99999-9999'}</p>
                <p><strong>Endereço:</strong> Salvador/BA, Brasil</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
               <img 
                 src={assetUrl('img/Logo Storm Business white.png')} 
                 alt="Storm Business" 
                 className="h-12 w-auto"
               />
            </div>
            <p className="text-gray-400 text-sm font-poppins font-light">
              {copy.footer.bottom.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PoliticaPrivacidade;
