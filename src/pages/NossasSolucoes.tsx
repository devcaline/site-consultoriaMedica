import { useState, useEffect } from 'react';
import { Calendar, Users, Target, TrendingUp, Award, Heart, Star, ArrowRight, CheckCircle, Zap, DollarSign, BarChart3, Clock, Phone, Instagram, Wifi, Shield } from 'lucide-react';
import { fetchPageACFBySlug } from '@/services/cmsService';
import { mapSolucoesPage } from '@/services/solucoesMapper';
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

import { SOLUCOES_SLUG } from '@/config/cmsSlugs';

const NossasSolucoes = () => {
  const { trackButtonClick, trackScroll } = useAnalytics();
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    async function loadCms() {
      const acf = await fetchPageACFBySlug(SOLUCOES_SLUG);
      const mapped = mapSolucoesPage(acf);
      if (mapped) {
        setCmsData(mapped);
      }
    }
    loadCms();
  }, []);
  const swipeHandlers = useSwipeNavigation();

  useSEO({
    title: "Nossas soluções",
    description: "Soluções completas para transformar sua clínica: agenda cheia, equipe que converte, gestão eficiente e precificação inteligente. Conheça nossos serviços.",
    keywords: "soluções para clínicas, consultoria vendas médicas, treinamento equipe clínica, precificação médica",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/nossas-solucoes`
  });

  const mainServices = cmsData?.principaisSolucoes?.cards?.length ? cmsData.principaisSolucoes.cards.map((c: any) => ({
    icon: c.icone ? () => renderMediaOrText(c.icone, c.titulo, "w-6 h-6 sm:w-8 sm:h-8", "w-6 h-6 sm:w-8 sm:h-8 object-contain") : Calendar,
    title: c.titulo,
    description: c.subtitulo,
    features: c.conteudo ? c.conteudo.split(/[\r\n]+/).filter((line: string) => line.trim().length > 0) : [],
    results: c.resultadosEsperados
  })) : [
    {
      icon: Calendar,
      title: "Mais demanda e agenda preenchida",
      description: "Criamos estratégias para atrair e encher sua agenda com os pacientes particulares que valorizam seu trabalho.",
      features: [
        "Estratégias de atração de pacientes",
        "Sistema de agendamento otimizado",
        "Campanhas de marketing direcionadas",
        "Gestão de relacionamento com pacientes"
      ],
      results: "Agenda 80% mais preenchida"
    },
    {
      icon: Users,
      title: "Equipe que converte",
      description: "Treinamos sua equipe de atendimento para transformar contatos em consultas e procedimentos com confiança.",
      features: [
        "Treinamento de vendas para equipe",
        "Scripts de atendimento personalizados",
        "Técnicas de conversão comprovadas",
        "Acompanhamento e coaching contínuo"
      ],
      results: "Aumento de 100% na taxa de conversão"
    },
    {
      icon: Target,
      title: "Menos caos, mais controle",
      description: "Padronizamos processos, planejamos o financeiro e criamos rotinas comerciais que simplesmente funcionam.",
      features: [
        "Mapeamento e otimização de processos",
        "Sistema de gestão financeira",
        "Rotinas comerciais automatizadas",
        "Controle de qualidade e indicadores"
      ],
      results: "Redução de 40% dedicado ao operacional"
    },
    {
      icon: TrendingUp,
      title: "Valorize sua expertise",
      description: "Desenvolvemos uma precificação técnica e inteligente para seus serviços, garantindo sua lucratividade.",
      features: [
        "Análise de precificação por especialidade",
        "Estratégias de valorização de serviços",
        "Pacotes e combos inteligentes",
        "Acompanhamento de rentabilidade"
      ],
      results: "Aumento médio de 20% no ticket médio"
    }
  ];

  const additionalServices = cmsData?.servicosEspecializados?.cards?.length ? cmsData.servicosEspecializados.cards.map((c: any) => ({
    icon: c.icone ? () => renderMediaOrText(c.icone, c.titulo, "w-6 h-6 sm:w-8 sm:h-8", "w-6 h-6 sm:w-8 sm:h-8 object-contain") : BarChart3,
    title: c.titulo,
    description: c.descricao,
    duration: "", // Não mapeado
    investment: "" // Não mapeado
  })) : [
    {
      icon: BarChart3,
      title: "Consultoria estratégica em vendas",
      description: "Estruturação comercial completa para sua operação.",
      duration: "90-180 dias",
      investment: "A partir de R$ 15.000"
    },
    {
      icon: Users,
      title: "Treinamento de equipe comercial",
      description: "Treinamento e desenvolvimento personalizado para sua equipe.",
      duration: "",
      investment: "A partir de R$ 9.000"
    },
    {
      icon: DollarSign,
      title: "Precificação inteligente",
      description: "Estratégias de precificação para maximizar sua lucratividade.",
      duration: "",
      investment: "A partir de R$ 14.000"
    }
  ];

  const processSteps = cmsData?.comoFunciona?.cards?.length ? cmsData.comoFunciona.cards.map((c: any, i: number) => ({
    step: (i + 1).toString(),
    title: c.titulo,
    description: c.descricao,
    duration: "Variável" // Não mapeado
  })) : [
    {
      step: "1",
      title: "Diagnóstico completo",
      description: "Analisamos sua operação atual, identificamos gargalos e oportunidades de melhoria.",
      duration: "7-14 dias"
    },
    {
      step: "2",
      title: "Estratégia personalizada",
      description: "Desenvolvemos um plano de ação específico para suas necessidades e objetivos.",
      duration: "45-60 dias"
    },
    {
      step: "3",
      title: "Implementação",
      description: "Colocamos tudo em prática com treinamento da equipe e ajustes necessários.",
      duration: "30-60 dias"
    },
    {
      step: "4",
      title: "Acompanhamento",
      description: "Monitoramos resultados e otimizamos continuamente para garantir o sucesso.",
      duration: "Contínuo"
    }
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
              {cmsData?.hero?.titulo || "Nossas soluções"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.hero?.subtitulo || copy.solucoes.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Principais Soluções */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-36 px-4 bg-gray-50 dark:bg-[#15171A] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.principaisSolucoes?.titulo || "Nossas principais soluções"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.principaisSolucoes?.subtitulo || copy.solucoes.pilaresSubtitle}
            </p>
          </div>

          {/* Services List - 2x2 Grid em desktop */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {(mainServices || []).map((service, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-[#15171A] dark:hover:bg-[#1A1C1F] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] dark:hover:border-[#2A2D32] hover:shadow-2xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-[#1A1C1F] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-[#1F2124] transition-colors duration-300 flex-shrink-0">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 sm:mb-6 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white">O que você recebe:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-gray-600 dark:text-white flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-600 dark:text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1C1F] rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base font-semibold text-black dark:text-white">
                      Resultado esperado: <span className="text-gray-600 dark:text-white">{service.results}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Adicionais */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.servicosEspecializados?.titulo || "Serviços especializados"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.servicosEspecializados?.subtitulo || "Soluções complementares para potencializar ainda mais os resultados da sua clínica."}
            </p>
          </div>

          {/* Additional Services Grid */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Mobile: Horizontal Carousel */}
            <div className="sm:hidden">
              <HorizontalCarousel
                showDots={true}
                showArrows={true}
                snapScroll={true}
                autoPlay={false}
                itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                gap={16}
              >
                {(additionalServices || []).map((service, index) => (
                  <div key={index} className="group relative bg-white dark:bg-[#15171A] dark:hover:bg-[#1A1C1F] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] dark:hover:border-[#2A2D32] hover:shadow-2xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[260px] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500"></div>
                    <div className="relative z-10 px-12 sm:px-14 flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-[#1A1C1F] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3 sm:mb-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </HorizontalCarousel>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:contents">
              {(additionalServices || []).map((service, index) => (
                <div key={index} className="group relative bg-white dark:bg-[#15171A] dark:hover:bg-[#1A1C1F] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] dark:hover:border-[#2A2D32] hover:shadow-2xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[240px] sm:min-h-[240px] flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-transparent dark:to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-[#1A1C1F] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3 sm:mb-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-white leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-gray-50 relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-black leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.comoFunciona?.titulo || "Como funciona"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.comoFunciona?.subtitulo || "Um processo estruturado e comprovado para transformar sua clínica em um negócio de alta performance."}
            </p>
          </div>

          {/* Process Timeline */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {/* Mobile: Horizontal Carousel */}
            <div className="sm:hidden">
              <HorizontalCarousel
                showDots={true}
                showArrows={true}
                snapScroll={true}
                autoPlay={false}
                itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                gap={16}
              >
                {processSteps.map((step, index) => (
                  <div key={index} className="relative flex flex-col">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col min-h-[260px]">
                      <div className="text-center px-12 sm:px-14">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">{step.step}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">{step.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </HorizontalCarousel>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:contents">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex flex-col">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
                    <div className="text-center flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">{step.step}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">{step.title}</h3>
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+1rem)] transform -translate-y-1/2 -translate-x-1/2 z-10">
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
              Vamos traçar o plano de crescimento da sua clínica?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-3xl mx-auto leading-relaxed px-4 font-poppins font-light">
              Preencha o formulário e aguarde nosso contato.
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

export default NossasSolucoes;
