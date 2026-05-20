import { useState, useEffect } from 'react';
import { Calendar, Users, Target, TrendingUp, Award, Heart, Star, ArrowRight, CheckCircle, Globe, Shield, Zap, Clock, BarChart3, FileText, MessageSquare, Instagram, Wifi } from 'lucide-react';
import { fetchPageACFBySlug } from '@/services/cmsService';
import { mapMetodologiaPage } from '@/services/metodologiaMapper';
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

import { METODOLOGIA_SLUG } from '@/config/cmsSlugs';

const Metodologia = () => {
  const { trackButtonClick, trackScroll } = useAnalytics();
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    async function loadCms() {
      const acf = await fetchPageACFBySlug(METODOLOGIA_SLUG);
      const mapped = mapMetodologiaPage(acf);
      if (mapped) {
        setCmsData(mapped);
      }
    }
    loadCms();
  }, []);
  const swipeHandlers = useSwipeNavigation();

  useSEO({
    title: "Nossa metodologia",
    description: "Conheça nossa metodologia em 4 etapas: diagnóstico, estratégia, implementação e acompanhamento. Processo comprovado para transformar sua clínica.",
    keywords: "metodologia storm business, processo consultoria clínicas, diagnóstico clínicas, estratégia médica",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/metodologia`
  });

  const methodologySteps = cmsData?.metodologia?.cards?.length ? cmsData.metodologia.cards.map((c: any, i: number) => ({
    step: (i + 1).toString(),
    title: c.titulo,
    subtitle: c.subtitulo,
    description: c.descricao,
    duration: "Variável", // Não está no mapper, fallback
    deliverables: c.conteudoEntregaveis ? c.conteudoEntregaveis.split(/[\r\n]+/).filter((line: string) => line.trim().length > 0) : [],
    tools: c.conteudoFerramentas ? c.conteudoFerramentas.split(/[\r\n]+/).filter((line: string) => line.trim().length > 0) : [],
    icon: [FileText, Target, Zap, BarChart3][i % 4] // Cycle icons
  })) : [
    {
      step: "1",
      title: "Diagnóstico completo",
      subtitle: "Análise profunda da operação",
      description: "Realizamos uma análise completa da sua clínica, identificando pontos fortes, gargalos e oportunidades de melhoria.",
      duration: "7-14 dias",
      deliverables: [
        "Relatório de diagnóstico completo",
        "Análise de processos atuais",
        "Identificação de gargalos",
        "Mapeamento de oportunidades",
        "Benchmarking com mercado"
      ],
      tools: [
        "Entrevistas com equipe",
        "Análise de dados operacionais",
        "Avaliação de processos",
        "Pesquisa de satisfação",
        "Análise financeira"
      ],
      icon: FileText
    },
    {
      step: "2",
      title: "Estratégia personalizada",
      subtitle: "Plano de ação específico",
      description: "Desenvolvemos um plano de ação personalizado baseado no diagnóstico, com metas claras e prazos definidos.",
      duration: "45-60 dias",
      deliverables: [
        "Plano estratégico personalizado",
        "Cronograma de implementação",
        "Definição de metas e KPIs",
        "Estratégias de marketing",
        "Plano de precificação"
      ],
      tools: [
        "Workshops estratégicos",
        "Definição de personas",
        "Criação de jornada do cliente",
        "Desenvolvimento de processos",
        "Planejamento financeiro"
      ],
      icon: Target
    },
    {
      step: "3",
      title: "Implementação",
      subtitle: "Execução com acompanhamento",
      description: "Colocamos tudo em prática com treinamento da equipe, implementação de processos e ajustes necessários.",
      duration: "30-60 dias",
      deliverables: [
        "Treinamento completo da equipe",
        "Implementação de processos",
        "Configuração de sistemas",
        "Lançamento de campanhas",
        "Ajustes e otimizações"
      ],
      tools: [
        "Treinamentos presenciais e online",
        "Mentoria da equipe",
        "Suporte técnico",
        "Acompanhamento diário",
        "Relatórios de progresso"
      ],
      icon: Zap
    },
    {
      step: "4",
      title: "Acompanhamento",
      subtitle: "Monitoramento contínuo",
      description: "Monitoramos resultados, otimizamos processos e garantimos que sua clínica continue evoluindo.",
      duration: "Contínuo",
      deliverables: [
        "Relatórios mensais de performance",
        "Análise de resultados",
        "Otimizações contínuas",
        "Suporte estratégico",
        "Planejamento de expansão"
      ],
      tools: [
        "Dashboard de indicadores",
        "Reuniões de acompanhamento",
        "Análise de dados",
        "Suporte consultivo",
        "Planejamento estratégico"
      ],
      icon: BarChart3
    }
  ];

  const methodologyPrinciples = cmsData?.principaisMetodologias?.cards?.length ? cmsData.principaisMetodologias.cards.map((c: any) => ({
    icon: c.icone ? () => renderMediaOrText(c.icone, c.titulo, "w-6 h-6 sm:w-8 sm:h-8", "w-6 h-6 sm:w-8 sm:h-8 object-contain") : Target,
    title: c.titulo,
    description: c.descricao
  })) : [
    {
      icon: Target,
      title: "Foco em resultados",
      description: "Todas as nossas ações são direcionadas para gerar resultados mensuráveis e impactantes para sua clínica."
    },
    {
      icon: Users,
      title: "Parceria verdadeira",
      description: "Trabalhamos como verdadeiros parceiros, investindo tempo e energia no sucesso da sua clínica."
    },
    {
      icon: Shield,
      title: "Metodologia comprovada",
      description: "Nossa metodologia é baseada em anos de experiência e centenas de casos de sucesso comprovados."
    },
    {
      icon: TrendingUp,
      title: "Melhoria contínua",
      description: "Sempre buscamos otimizar e melhorar os processos para garantir resultados cada vez melhores."
    }
  ];

  const successMetrics = [
    {
      metric: "280+",
      label: "Clínicas Transformadas",
      description: "Mais de 280 clínicas já passaram por nossa metodologia"
    },
    {
      metric: "3x",
      label: "Aumento Médio de Faturamento",
      description: "Nossos clientes aumentam o faturamento em média 3 vezes"
    },
    {
      metric: "98%",
      label: "Taxa de Satisfação",
      description: "98% dos nossos clientes recomendam nossos serviços"
    },
    {
      metric: "90",
      label: "Dias para Primeiros Resultados",
      description: "Primeiros resultados visíveis em até 90 dias"
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
              {cmsData?.hero?.titulo || "Nossa metodologia"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.hero?.descricao || copy.metodologia.heroSubtitle}
            </p>
          </div>

        </div>
      </section>

      {/* Metodologia Detalhada */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-36 px-4 bg-gray-50 dark:bg-[#15171A] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.metodologia?.titulo || "Metodologia em 4 etapas"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.metodologia?.descricao || copy.metodologia.etapasSubtitle}
            </p>
          </div>

          {/* Methodology Steps - Mobile/Tablet: layout em blocos verticais */}
          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 lg:hidden">
            {(methodologySteps || []).map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#15171A] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] my-5"
              >
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 dark:bg-white dark:text-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white dark:text-black font-bold text-lg sm:text-xl">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{step.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white">{step.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-700 dark:text-white leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-3">Entregáveis:</h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-gray-600 dark:text-white flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600 dark:text-white">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-3">Ferramentas:</h4>
                      <ul className="space-y-2">
                        {step.tools.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-gray-600 dark:text-white flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600 dark:text-white">{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodology Steps - Desktop: layout inspirado na imagem (2 colunas alternadas) */}
          <div className="hidden lg:block">
            <div className="space-y-24">
              {(methodologySteps || []).map((step, index) => (
                <div
                  key={index}
                  className="relative pb-10 border-b border-gray-200 dark:border-[#24272B] last:border-b-0 last:pb-0 my-5"
                >
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* Left - Conteúdo textual */}
                    <div
                      className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''
                        }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gray-600 dark:bg-white dark:text-black rounded-full flex items-center justify-center">
                          <span className="text-white dark:text-black font-bold text-xl">{step.step}</span>
                        </div>
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-bold text-black dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-white">{step.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-lg text-gray-700 dark:text-white leading-relaxed">
                        {step.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-black dark:text-white mb-3">
                            Entregáveis:
                          </h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, deliverableIndex) => (
                              <li
                                key={deliverableIndex}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-gray-600 dark:text-white flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-white">
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-black dark:text-white mb-3">
                            Ferramentas:
                          </h4>
                          <ul className="space-y-2">
                            {step.tools.map((tool, toolIndex) => (
                              <li key={toolIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-gray-600 dark:text-white flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-white">{tool}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right - Bloco visual da etapa */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="bg-white dark:bg-[#15171A] rounded-2xl p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B]">
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 bg-gray-100 dark:bg-[#1A1C1F] rounded-full flex items-center justify-center mx-auto">
                            <step.icon className="w-10 h-10 text-black dark:text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-black dark:text-white">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-white">
                            Etapa {step.step} da metodologia Storm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Princípios da Metodologia */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-white relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-black leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.principaisMetodologias?.titulo || "Princípios da nossa metodologia"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.principaisMetodologias?.subtitulo || "Os valores fundamentais que guiam nossa abordagem e garantem o sucesso da transformação."}
            </p>
          </div>

          {/* Principles Grid */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 lg:gap-10">
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
                {methodologyPrinciples.map((principle, index) => (
                  <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[260px] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 px-12 sm:px-14 flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                        <principle.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {principle.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </HorizontalCarousel>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:contents">
              {methodologyPrinciples.map((principle, index) => (
                <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                      <principle.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
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

export default Metodologia;
