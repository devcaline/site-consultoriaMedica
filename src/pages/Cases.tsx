import { useState, useEffect } from 'react';
import { Award, Users, Target, TrendingUp, Heart, Star, ArrowRight, CheckCircle, Globe, Zap, DollarSign, BarChart3, Clock, FileText, MessageSquare, Calendar, MapPin, Instagram, Wifi, Shield } from 'lucide-react';
import { fetchPageACFBySlug } from '@/services/cmsService';
import { mapCasesPage } from '@/services/casesMapper';
import { renderMediaOrText } from '@/lib/renderCms';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactFormAdvanced from '@/components/ContactFormAdvanced';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ConnectionStatus from '@/components/ConnectionStatus';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import { useAnalytics } from '@/hooks/useAnalytics';
import { copy } from '@/content/copy';
import { useSwipeNavigation } from '@/hooks/useTouchGestures';
import { useSEO } from '@/hooks/useSEO';
import Footer from '@/components/Footer';

import { CASES_SLUG } from '@/config/cmsSlugs';

const Cases = () => {
  const { trackButtonClick, trackScroll } = useAnalytics();
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    async function loadCms() {
      const acf = await fetchPageACFBySlug(CASES_SLUG);
      const mapped = mapCasesPage(acf);
      if (mapped) {
        setCmsData(mapped);
      }
    }
    loadCms();
  }, []);
  const swipeHandlers = useSwipeNavigation();

  useSEO({
    title: "Cases de sucesso",
    description: "Conheça os resultados reais de clínicas que transformamos. Cases de sucesso em medicina, fisioterapia, estética e mais. Veja depoimentos e resultados.",
    keywords: "cases storm business, resultados consultoria clínicas, depoimentos clínicas, sucesso consultoria médica",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/cases`
  });

  const successCases = cmsData?.casesEmDestaque?.cards?.length ? cmsData.casesEmDestaque.cards.map((c: any, i: number) => ({
    id: i + 1,
    clinic: c.cabecalho.nome,
    specialty: c.cabecalho.especialidade,
    location: c.cabecalho.localizacao,
    doctor: c.cabecalho.nome, // Falta campo específico de doutor no mapper, usando nome da clínica como fallback
    duration: c.cabecalho.tempoDeProjeto,
    instagram: c.cabecalho.instagram,
    challenge: c.conteudo.desafio,
    solution: c.conteudo.solucoes,
    indicators: {
      tipoAtendimento: c.indicadores.tipoDeAtendimento,
      canais: c.indicadores.canaisPrincipais,
      foco: c.indicadores.focoDoProjeto,
      proximosPassos: c.indicadores.proximosPassos
    }
  })) : [
    {
      id: 1,
      clinic: "Dr. Ton Jefferson",
      specialty: "Medicina Esportiva e Emagrecimento",
      location: "São Paulo, SP e Salvador, BA",
      doctor: "Dr. Ton Jefferson",
      duration: "6 meses",
      instagram: "@tonjeferson",
      challenge: "O Dr. Ton chegou à Storm com um grande potencial de atração de pacientes e alto faturamento, mas ainda buscava estruturar melhor seus processos internos. Como muitos profissionais de excelência, dedicava a maior parte do tempo ao atendimento clínico, o que naturalmente deixava menos espaço para a organização de rotinas comerciais e estratégias de retenção. A captação de pacientes acontecia principalmente por indicações, e as tentativas anteriores com tráfego pago ainda não haviam alcançado os resultados esperados.",
      solution: "Implementamos um modelo comercial completo com foco em reestruturação do fluxo de atendimento e padronização de rotinas comerciais, treinamento de equipe para pós-venda e recepção, criação de scripts de abordagem e confirmação de consultas, implementação de plano de fidelização e recorrência de pacientes, definição de metas de faturamento, atendimento e precificação, além da estruturação do financeiro e passos para abertura da nova clínica.",
      indicators: {
        tipoAtendimento: "Consultas e protocolos - Medicina Esportiva e Emagrecimento",
        canais: "Instagram e Indicação",
        foco: "Estruturação comercial e Gestão financeira",
        proximosPassos: "Abertura da sua nova unidade"
      }
    },
    {
      id: 2,
      clinic: "Harmo Vittae",
      specialty: "Medicina Regenerativa, Estética e Performance",
      location: "Salvador, BA",
      doctor: "Dr. Thiago Barros e Dra. Jamile",
      duration: "6 meses",
      instagram: "@harmo.vittae",
      challenge: "A Harmo Vittae nasceu com alto potencial de posicionamento no mercado de medicina regenerativa e estética. Como uma clínica em fase de consolidação, ainda estava construindo seus processos e fluxos estruturados. Havia a oportunidade de desenvolver protocolos de atendimento com uma abordagem mais comercial, capacitar a equipe de recepção para melhorar a conversão e acompanhamento dos pacientes, além de fortalecer a presença digital para complementar as indicações que já recebiam.",
      solution: "O projeto Storm iniciou com foco na estruturação comercial e experiência do paciente, envolvendo mapeamento completo de fluxos e padronização dos processos operacionais, criação de protocolos comerciais e scripts de atendimento com implantação de estrutura comercial, treinamento da equipe de recepção, pós-consulta e atendimento, implementação de pré-consulta para otimização do atendimento com o médico, e estratégia de planos de acompanhamento e assinatura anual.",
      indicators: {
        tipoAtendimento: "Medicina Regenerativa, Estética e Performance",
        canais: "Indicação e Instagram",
        foco: "Estruturação comercial, fidelização e criação de planos de assinatura",
        proximosPassos: "Estabilização da nova unidade de atendimento médico"
      }
    },
    {
      id: 3,
      clinic: "Átila Cosenza",
      specialty: "Fisioterapia Ortopédica, Esportiva e Gestão do Movimento",
      location: "Salvador, BA",
      doctor: "Átila Cosenza",
      duration: "6 meses",
      instagram: "@atilacosenza",
      challenge: "Átila já possuía uma agenda bastante preenchida, reflexo da qualidade do seu trabalho e da confiança que seus pacientes depositavam nele. Naturalmente, por conduzir todo o atendimento, follow-up, marcação e acompanhamento de forma pessoal, havia espaço para estruturar processos de precificação, triagem e pós-consulta. A agenda cheia com pacientes de pacote também limitava a entrada de novos pacientes. Átila também valorizava muito sua autenticidade e queria garantir que qualquer comunicação comercial mantivesse sua identidade profissional.",
      solution: "Montamos uma estratégia comercial completa focada em estruturar precificação, criar protocolos de atendimento, marcação e pós-consulta, padronizar scripts e melhorar resposta no WhatsApp, implantação de comercial com pessoa responsável, organizar a escala com novos fisioterapeutas parceiros, implementar produtos novos (avaliações temáticas, dinamômetro etc.) e introduzir processos comerciais sem perder a identidade do profissional.",
      indicators: {
        tipoAtendimento: "Fisioterapia ortopédica (Ortopedia, esporte, dor crônica, performance, terapia manual)",
        canais: "Indicação e parcerias",
        foco: "Precificação, fluxos comerciais, expansão para equipe própria",
        proximosPassos: "Implementar novos produtos + escalar atendimentos"
      }
    },
    {
      id: 4,
      clinic: "Bupaloo",
      specialty: "Fisioterapia Infantil",
      location: "Salvador, BA",
      doctor: "Raysa Araújo",
      duration: "6 meses",
      instagram: "@bupaloo",
      challenge: "A Bupaloo cresceu rapidamente graças à qualidade do atendimento e dedicação da Raysa. Esse crescimento acelerado trouxe a necessidade natural de desenvolver uma estrutura comercial para acompanhar a demanda. Como fundadora, Raysa estava envolvida em todas as frentes do negócio, e havia a oportunidade de implementar ferramentas como CRM, automações e indicadores para apoiar a operação. A equipe estava em desenvolvimento comercial, e existia espaço para criar ações de prospecção que complementassem as indicações.",
      solution: "A Storm iniciou um projeto completo de estruturação comercial, com padronização de scripts e fluxos de atendimento, treinamento da equipe (fisioterapeutas e recepção), criação da estrutura comercial com processos definidos, e implementação de CRM e automações para suportar o crescimento.",
      indicators: {
        tipoAtendimento: "Fisioterapia motora, respiratória e assimetrias infantil",
        canais: "Indicação e Instagram",
        foco: "Estruturação comercial, CRM e automações",
        proximosPassos: "Escalar atendimentos e reduzir sazonalidade"
      }
    },
    {
      id: 5,
      clinic: "Clínica Pensamente",
      specialty: "Saúde Mental — Psiquiatria, Psicoterapia, Psicopedagogia",
      location: "São Paulo, SP",
      doctor: "Dra. Camila Azeredo",
      duration: "5 meses",
      instagram: "@pensamentepsicologia",
      challenge: "A clínica enfrentava uma combinação de desafios estruturais e comerciais em sua jornada de crescimento. Havia um alto volume de leads, mas a taxa de conversão ainda podia ser melhorada. O público atendido, majoritariamente classe média, apresentava limitações de investimento que dificultavam atingir metas maiores. A clínica possuía 7 salas com potencial de melhor aproveitamento, especialmente no período da manhã. Existia também a oportunidade de implementar processos de fidelização e recaptura de pacientes, além de definir um posicionamento mais claro para atrair um público que valorizasse ainda mais os serviços oferecidos.",
      solution: "A Storm iniciou um projeto de estruturação completa do setor comercial e da operação, com criação de um fluxo organizado de atendimento, follow-up e fidelização, padronização dos processos internos (scripts, checklists, abordagem inicial e pós-consulta), planejamento para reposicionamento da marca e atração de um público que valorize mais os serviços, organização do financeiro e definição de rotinas administrativas, e apoio estratégico para liderança.",
      indicators: {
        tipoAtendimento: "Psiquiatria, psicologia, psicopedagogia, neuropsicologia",
        canais: "Indicações e Doctorália",
        foco: "Conversão, posicionamento, estrutura comercial",
        proximosPassos: "Consolidar novo posicionamento e aumentar faturamento"
      }
    },
    {
      id: 6,
      clinic: "Vie Santé",
      specialty: "Pilates, Funcional e Fisioterapia",
      location: "Salvador, BA",
      doctor: "Amanda e Guilherme",
      duration: "8 meses",
      instagram: "@viesantefisioterapia",
      challenge: "A Vie Santé estava em um momento de crescimento e expansão. Como muitas clínicas em desenvolvimento, havia a oportunidade de estruturar melhor os processos comerciais e alinhar a equipe em torno de uma cultura unificada. A comunicação via WhatsApp e o follow-up com pacientes podiam ser aprimorados, assim como a comunicação interna com os professores. Os sócios Amanda e Guilherme estavam dedicando muito tempo às rotinas administrativas, e havia também a necessidade de estruturar a nova frente de Funcional que estava sendo implementada.",
      solution: "Reestruturamos o processo comercial, definimos padrão de atendimento, organizamos o fluxo de WhatsApp, criamos rotina de follow-up e treinamentos, reposicionamos funções da equipe, estruturamos o Funcional, organizamos processos administrativos, implementamos rotina e definimos precificação e metas de faturamento mensal.",
      indicators: {
        tipoAtendimento: "Fisioterapia, Pilates, Funcional",
        canais: "Instagram, Google, plano de saúde e indicação",
        foco: "Estruturação comercial, organização interna, expansão do Funcional",
        proximosPassos: "Treinamentos contínuos, rotina de reuniões, aumento do número de alunos"
      }
    },
    {
      id: 7,
      clinic: "Instituto Holiz",
      specialty: "Fisioterapia, Quiropraxia e Osteopatia",
      location: "Salvador, BA",
      doctor: "Diego Matos",
      duration: "6 meses",
      instagram: "@institutoholiz",
      challenge: "O Instituto Holiz buscava dar um próximo passo em sua evolução organizacional. A clínica tinha o objetivo de estruturar seus processos internos, organizar os diferentes setores, implementar rotinas mais claras e criar uma identidade organizacional ainda mais sólida. Era um momento de transição natural de um modelo mais informal para uma operação mais profissionalizada, com padronização de rotinas e processos bem definidos por setor.",
      solution: "Demos clareza financeira com fixação de meta de faturamento e atendimento, além de definir a precificação. Implementamos rotinas com periodicidades claras, organizamos fluxos, definimos responsabilidades e criamos clareza operacional para atuação integrada entre todos os setores.",
      indicators: {
        tipoAtendimento: "Fisioterapia ortopédica e Osteopatia",
        canais: "Indicação e Doctorália",
        foco: "Estruturação organizacional completa e integração entre setores",
        proximosPassos: "Treinamento contínuo, fortalecer marketing, consolidar metas e indicadores"
      }
    },
    {
      id: 8,
      clinic: "Aila Mendes",
      specialty: "Fonoaudiologia — Voz e Comunicação",
      location: "São Paulo, SP e Brasil",
      doctor: "Aila Mendes",
      duration: "8 meses",
      instagram: "@ailajpimenta",
      challenge: "Aila é uma profissional com metas ambiciosas de faturamento e grande potencial de crescimento. Como muitos especialistas dedicados, seu tempo era limitado pela alta demanda de atendimentos. Havia a oportunidade de ir além da venda de consultas isoladas e definir um diferencial competitivo mais claro. O consultório estava em fase de estruturação de processos e rotinas comerciais, com espaço para desenvolver uma proposta de valor mais estratégica e criar uma esteira completa de serviços. O atendimento era de alta qualidade, e o próximo passo era criar sistemas que permitissem escalar sem depender exclusivamente dela.",
      solution: "Estruturamos toda a marca pessoal da Aila com foco em construção de esteira de serviço, precificação, jornada do paciente e reforço de inserção de posicionamento e produto digital para gerar escala.",
      indicators: {
        tipoAtendimento: "Fonoaudiologia com foco em voz, comunicação profissional",
        canais: "Instagram, WhatsApp, atendimento presencial e online",
        foco: "Processo comercial, comunicação, jornada do paciente, produtos escaláveis",
        proximosPassos: "Montar time comercial e aumentar faturamento"
      }
    }
  ];


  // Fallback case categories
  const fallbackCaseCategories = [
    {
      category: "Medicina",
      cases: 45,
      avgIncrease: "Estruturação completa",
      icon: Heart
    },
    {
      category: "Fisioterapia",
      cases: 68,
      avgIncrease: "Expansão de equipe",
      icon: Target
    },
    {
      category: "Estética",
      cases: 42,
      avgIncrease: "Precificação inteligente",
      icon: Award
    },
    {
      category: "Saúde Mental",
      cases: 35,
      avgIncrease: "Posicionamento premium",
      icon: Users
    },
    {
      category: "Pilates/Funcional",
      cases: 28,
      avgIncrease: "Organização interna",
      icon: Zap
    },
    {
      category: "Outras Especialidades",
      cases: 82,
      avgIncrease: "Processos comerciais",
      icon: Globe
    }
  ];

  // 🎯 HÍBRIDO: usa cards do CMS e completa com fallback até 6 categorias
  const cmsCaseCategories = cmsData?.resultados?.cards?.map((c: any) => ({
    category: c.titulo,
    cases: c.caseNumero,
    avgIncrease: c.focoTexto,
    icon: c.icone ? () => renderMediaOrText(c.icone, c.titulo, "w-6 h-6 sm:w-8 sm:h-8", "w-6 h-6 sm:w-8 sm:h-8 object-contain") : Target
  })) || [];

  const caseCategories = [
    ...cmsCaseCategories,
    // Preenche as categorias restantes com fallback
    ...fallbackCaseCategories.slice(cmsCaseCategories.length)
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E0F10]" {...(swipeHandlers as any)}>
      <Header />
      <WhatsAppButton />
      <ConnectionStatus />
      <PWAInstallPrompt />

      {/* Hero Section */}
      <section className="pt-48 sm:pt-60 pb-8 sm:pb-12 lg:pb-16 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 mt-8 lg:mt-12 font-poppins">
              {cmsData?.hero?.titulo || "Cases de sucesso"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.hero?.subtitulo || copy.cases.heroSubtitle}
            </p>
          </div>

        </div>
      </section>

      {/* Cases por Especialidade */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-36 px-4 bg-gray-50 dark:bg-[#15171A] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.resultados?.titulo || "Resultados por especialidade"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.resultados?.subtitulo || "Nossa metodologia funciona em todas as especialidades médicas."}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10">
            {/* Mobile: Horizontal Carousel */}
            <div className="sm:hidden overflow-visible">
              <HorizontalCarousel
                showDots={true}
                showArrows={true}
                snapScroll={true}
                autoPlay={false}
                itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                gap={16}
              >
                {(caseCategories || []).map((category, index) => (
                  <div key={index} className="group relative bg-white dark:bg-[#15171A] dark:hover:bg-[#1A1C1F] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] dark:hover:border-[#2A2D32] hover:shadow-2xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[220px] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500"></div>
                    <div className="relative z-10 px-12 sm:px-14 flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-[#1A1C1F] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                        <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black dark:text-[#E7E7E7] mb-3 sm:mb-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                        {category.category}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6]">Cases:</span>
                          <span className="text-sm sm:text-base font-semibold text-black dark:text-[#E7E7E7]">{category.cases}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6] flex-shrink-0">Foco:</span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-[#E7E7E7] text-right">{category.avgIncrease}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </HorizontalCarousel>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:contents">
              {(caseCategories || []).map((category, index) => (
                <div key={index} className="group relative bg-white dark:bg-[#15171A] dark:hover:bg-[#1A1C1F] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] dark:hover:border-[#2A2D32] hover:shadow-2xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-[#1A1C1F] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                      <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-[#E7E7E7] mb-3 sm:mb-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                      {category.category}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6]">Cases:</span>
                        <span className="text-sm sm:text-base font-semibold text-black dark:text-[#E7E7E7]">{category.cases}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6] flex-shrink-0">Foco:</span>
                        <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-[#E7E7E7] text-right">{category.avgIncrease}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases Detalhados */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.casesEmDestaque?.titulo || "Cases em destaque"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.casesEmDestaque?.subtitulo || "Conheça histórias detalhadas de transformação e os resultados alcançados."}
            </p>
          </div>

          {/* Cases Grid */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {(successCases || []).map((caseItem, index) => (
              <div key={caseItem.id} className="bg-white dark:bg-[#15171A] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B]">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left - Title & Indicators */}
                  <div className="space-y-6 sm:space-y-8">
                    {/* Title Section */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-[#B6B6B6]" />
                        <span className="text-sm text-gray-500 dark:text-[#B6B6B6]">{caseItem.location}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-[#E7E7E7] mb-2">{caseItem.clinic}</h3>
                      <p className="text-lg sm:text-xl text-gray-600 dark:text-[#B6B6B6] mb-4">{caseItem.specialty}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500 dark:text-[#B6B6B6]" />
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500 dark:text-[#B6B6B6]" />
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Instagram className="w-4 h-4 text-gray-500 dark:text-[#B6B6B6]" />
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.instagram}</span>
                        </div>
                      </div>
                    </div>

                    {/* Indicators Section */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4">Indicadores do projeto:</h4>
                      <div className="space-y-4">
                        <div className="flex flex-col py-3 border-b border-gray-200 dark:border-[#24272B]">
                          <span className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Tipo de atendimento</span>
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.indicators.tipoAtendimento}</span>
                        </div>
                        <div className="flex flex-col py-3 border-b border-gray-200 dark:border-[#24272B]">
                          <span className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Canais principais</span>
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.indicators.canais}</span>
                        </div>
                        <div className="flex flex-col py-3 border-b border-gray-200 dark:border-[#24272B]">
                          <span className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Foco do projeto</span>
                          <span className="text-sm text-gray-600 dark:text-white">{caseItem.indicators.foco}</span>
                        </div>
                        <div className="flex flex-col py-3">
                          <span className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Próximos passos</span>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">{caseItem.indicators.proximosPassos}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right - Challenge & Solution */}
                  <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3">Desafio:</h4>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-white leading-relaxed">{caseItem.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3">Solução:</h4>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-white leading-relaxed">{caseItem.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20 sm:py-28 lg:py-36 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.formulario?.titulo || "Vamos traçar o plano de crescimento da sua clínica?"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-3xl mx-auto leading-relaxed px-4 font-poppins font-light">
              {cmsData?.formulario?.subtitulo || "Preencha o formulário e aguarde nosso contato."}
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <ContactFormAdvanced />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cases;
