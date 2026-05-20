import React from 'react';
import { ArrowLeft, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentVersion, getVersionHistory } from '@/utils/legalVersions';
import { assetUrl } from '@/lib/utils';
import { copy } from '@/content/copy';
import { useSEO } from '@/hooks/useSEO';

const TermosUso = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Termos de uso",
    description: "Termos de uso da Storm Business. Condições e regras para utilização dos nossos serviços e website.",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/termos-uso`
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
            Termos de Uso
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-600 font-poppins font-light">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 font-poppins font-light">
              <History className="w-4 h-4" />
              <span>Versão {getCurrentVersion('terms')}</span>
            </div>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed font-poppins font-light">
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">1. Aceitação dos Termos</h2>
              <p>
                Bem-vindo à Storm Consultoria. Estes Termos de Uso ("Termos") regem o uso de nosso site 
                e serviços. Ao acessar ou usar nossos serviços, você concorda em cumprir e estar vinculado 
                a estes Termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">2. Descrição dos Serviços</h2>
              <p className="mb-4">
                A Storm Consultoria oferece serviços de consultoria e mentoria para profissionais da saúde, 
                incluindo mas não limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consultoria estratégica para clínicas médicas</li>
                <li>Mentoria em gestão e processos comerciais</li>
                <li>Treinamento de equipes</li>
                <li>Desenvolvimento de estratégias de precificação</li>
                <li>Suporte na implementação de melhorias operacionais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">3. Elegibilidade</h2>
              <p>
                Nossos serviços são destinados exclusivamente a profissionais da saúde, incluindo médicos, 
                dentistas, psicólogos, fisioterapeutas, nutricionistas e outros profissionais licenciados 
                na área da saúde. Você declara e garante que possui as qualificações necessárias para 
                utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">4. Uso Aceitável</h2>
              <p className="mb-4">Ao usar nossos serviços, você concorda em:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                <li>Usar os serviços apenas para fins legais e éticos</li>
                <li>Respeitar a confidencialidade de informações compartilhadas</li>
                <li>Não reproduzir, distribuir ou modificar nosso conteúdo sem autorização</li>
                <li>Não interferir no funcionamento de nossos serviços</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo disponibilizado através de nossos serviços, incluindo textos, gráficos, 
                logotipos, imagens, software e outros materiais, é propriedade da Storm Consultoria ou 
                de seus licenciadores e está protegido por leis de direitos autorais e outras leis de 
                propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">6. Confidencialidade</h2>
              <p>
                Reconhecemos que informações confidenciais podem ser compartilhadas durante nossos serviços. 
                Comprometemo-nos a manter a confidencialidade de todas as informações fornecidas por você, 
                exceto quando exigido por lei ou com seu consentimento expresso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">7. Limitação de Responsabilidade</h2>
              <p>
                Nossos serviços são fornecidos "como estão" e "conforme disponível". Não garantimos que 
                nossos serviços atenderão às suas necessidades específicas ou que produzirão resultados 
                particulares. Nossa responsabilidade é limitada ao valor pago pelos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">8. Pagamentos e Reembolsos</h2>
              <p className="mb-4">
                Os pagamentos pelos nossos serviços devem ser feitos conforme acordado no contrato de 
                prestação de serviços. Políticas de reembolso são aplicadas conforme especificado em 
                cada contrato individual.
              </p>
              <p>
                Reservamo-nos o direito de suspender ou encerrar serviços em caso de inadimplência.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">9. Rescisão</h2>
              <p>
                Qualquer uma das partes pode rescindir os serviços mediante aviso prévio conforme 
                especificado no contrato de prestação de serviços. A rescisão não afeta direitos e 
                obrigações que tenham surgido antes da data de rescisão.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">10. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. As modificações 
                entrarão em vigor imediatamente após a publicação no site. O uso continuado de nossos 
                serviços após as modificações constitui aceitação dos novos Termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">11. Lei Aplicável</h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa 
                será resolvida nos tribunais competentes de Salvador/BA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 font-poppins">12. Contato</h2>
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
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

export default TermosUso;
