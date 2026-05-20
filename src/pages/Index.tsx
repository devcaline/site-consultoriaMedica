import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Calendar, Users, Target, TrendingUp, Award, Heart, Instagram, Star, Wifi, ThumbsUp, ArrowRight, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ContactFormAdvanced from '@/components/ContactFormAdvanced';
import ModernHeroSection from '@/components/ModernHeroSection';
import { copy } from '@/content/copy';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useSwipeNavigation } from '@/hooks/useTouchGestures';
import { useSEO } from '@/hooks/useSEO';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-image.jpg';
import { assetUrl } from '@/lib/utils';
import { renderMediaOrText } from '@/lib/renderCms';
import { fetchPageACFBySlug } from '@/services/cmsService';
import { mapInicio } from '@/services/inicioMapper';

import { HOME_SLUG } from '@/config/cmsSlugs';

const Index = () => {
  const { trackButtonClick, trackScroll } = useAnalytics();
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    async function loadCms() {
      const acf = await fetchPageACFBySlug(HOME_SLUG);
      const mapped = mapInicio(acf);
      if (mapped) {
        setCmsData(mapped);
      }
    }
    loadCms();
  }, []);

  useEffect(() => {
    const updateBackgroundPosition = () => {
      const width = window.innerWidth;
      if (width >= 640 && width < 1024) {
        // Cortar 30px a mais no topo e exibir 30px a mais embaixo - ajuste sutil
        setBackgroundPosition('center 8%');
      } else {
        setBackgroundPosition('center');
      }
    };

    updateBackgroundPosition();
    window.addEventListener('resize', updateBackgroundPosition);
    return () => window.removeEventListener('resize', updateBackgroundPosition);
  }, []);
  const swipeHandlers = useSwipeNavigation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useSEO({
    title: "Transforme sua clínica em negócio de alta performance",
    description: "Consultoria especializada para clínicas médicas. 300+ clínicas transformadas, 2x aumento médio de faturamento. Agende seu diagnóstico gratuito!",
    keywords: "consultoria para clínicas, marketing médico, gestão de clínicas, aumento de faturamento médico, transformação de consultórios",
    canonicalUrl: import.meta.env.VITE_SITE_URL || "https://seu-dominio-portfolio.com.br/"
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


  /* Cleaned up declarations */
  // Fallback hardcoded (será usado se CMS não retornar dados OU para preencher cards faltantes)
  const fallbackCards = [
    {
      icon: TrendingUp,
      title: "Mais demanda e agenda cheia",
      description: "Estratégias validadas para atrair pacientes particulares qualificados."
    },
    {
      icon: Users,
      title: "Equipe de alta performance",
      description: "Treinamento e processos para sua equipe converter mais agendamentos."
    },
    {
      icon: Target,
      title: "Gestão financeira clara",
      description: "Controle total dos seus números, precificação e margem de lucro."
    },
    {
      icon: Award,
      title: "Autoridade e posicionamento",
      description: "Construção de marca forte para ser referência na sua especialidade."
    }
  ];

  // 🎯 HÍBRIDO: usa cards do CMS e completa com fallback até 4 cards
  const cmsCards = cmsData?.beneficios?.cards || [];
  const services = [
    ...cmsCards.map((card, idx) => ({
      ...card,
      // Se o CMS não forneceu ícone (ou forneceu string vazia), usa o fallback correspondente
      icon: (card.icon && card.icon !== "") ? card.icon : (fallbackCards[idx]?.icon || TrendingUp)
    })),
    // Preenche os cards restantes com fallback
    ...fallbackCards.slice(cmsCards.length)
  ];



  // Fallback testimonials
  const fallbackTestimonials = [
    {
      initials: "SL",
      name: "Sergio Lopes",
      role: "Dentista",
      image: "placeholder",
      content: "Agradeço a vocês por todo o cuidado e pelos ensinamentos compartilhados. Sabem que foram uma parte muito importante na criação e no desenvolvimento da Vita Prime. Por onde eu passar, também indicarei o trabalho de vocês. Desejo todo sucesso a vocês e um muito obrigado!",
      stars: 5
    },
    {
      initials: "GR",
      name: "Giovanna Rocha",
      role: "Dentista",
      image: "placeholder",
      content: "Desde a abertura, tivemos uma evolução consistente no faturamento, alcançando nossos objetivos expressivos ao longo dos meses. Esse crescimento tem sido sustentado principalmente pelo atendimento clínico. Agradecemos muito a vocês, pois fazem parte direta de toda essa construção e desses resultados.",
      stars: 5
    },
    {
      initials: "IT",
      name: "Isabela Teixeira",
      role: "Psicóloga",
      image: "placeholder",
      content: "Quero parabenizar vocês pelo trabalho desenvolvido, pela evolução, construção e organização da empresa. Acompanhar esse crescimento de perto tem sido muito especial para mim. Obrigada por fazerem parte dessa jornada.",
      stars: 5
    }
  ];

  // 🎯 HÍBRIDO: usa depoimentos do CMS e completa com fallback até 3 depoimentos
  const cmsTestimonials = cmsData?.feedback?.depoimentos || [];
  const testimonials = [
    ...cmsTestimonials,
    // Preenche os depoimentos restantes com fallback
    ...fallbackTestimonials.slice(cmsTestimonials.length)
  ];

  const faqItems = cmsData?.faq?.perguntas || copy.faq.items;


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground font-inter selection:bg-[#C9C5B1] selection:text-black" >
        <Header />

        <ModernHeroSection title={cmsData?.hero?.titulo} subtitle={cmsData?.hero?.subtitulo} />

        <main className="relative z-10">

          {/* SUA CLÍNICA OPERANDO COM PRECISÃO Section */}
          <section className="py-8 sm:py-12 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
            {/* Abstract Gray Shapes */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>

            <div className="container mx-auto max-w-7xl">
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16 lg:mb-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight mb-4 sm:mb-6 px-2 font-poppins">
                  {cmsData?.beneficios?.titulo || copy.home.services.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-poppins font-light">
                  {cmsData?.beneficios?.subtitulo || copy.home.services.description}
                </p>
              </div>

              {/* Cards - Mobile/Tablet: Carrossel */}
              <div className="max-w-7xl mx-auto lg:hidden w-full">
                <div className="w-full relative">
                  <HorizontalCarousel
                    showDots={true}
                    showArrows={true}
                    snapScroll={true}
                    autoPlay={false}
                    itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                    gap={16}
                  >
                    {(services || []).map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <div key={index} className="group relative bg-white dark:bg-[#15171A] rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100 dark:border-[#24272B] hover:border-gray-200 dark:hover:border-[#2A2D32] hover:shadow-md dark:hover:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 min-h-[260px] flex flex-col">
                          <div className="relative z-10 flex-1 flex flex-col px-12 sm:px-14">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-50 dark:bg-[#1A1C1F] rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-gray-100 dark:group-hover:bg-[#1F2124] transition-colors duration-300 flex-shrink-0">
                              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black dark:text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-black dark:text-[#E7E7E7] mb-2 sm:mb-3 md:mb-4 font-poppins leading-tight">
                              {service.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6] leading-relaxed font-poppins font-light flex-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </HorizontalCarousel>
                </div>
              </div>

              {/* Cards - Desktop: Grid, cards lado a lado (estilo mais minimalista) */}
              <div className="hidden lg:block">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 xl:gap-8">
                  {(services || []).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="group relative bg-white dark:bg-[#15171A] rounded-xl p-6 border border-gray-100 dark:border-[#24272B] hover:border-gray-200 dark:hover:border-[#2A2D32] hover:shadow-lg dark:hover:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 h-full">
                        <div className="relative z-10 flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-50 dark:bg-[#1A1C1F] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                            <Icon className="w-6 h-6 text-black dark:text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-2 font-poppins">
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-[#B6B6B6] leading-relaxed font-poppins font-light">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 sm:mt-12 lg:mt-16 space-y-4">
                <div className="max-w-2xl mx-auto space-y-3">
                  <a
                    href="https://inlead.digital/quiz-diagnostico/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackButtonClick('transform_clinic', 'services_section');
                    }}
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 dark:hover:text-black active:bg-gray-900 dark:active:bg-gray-200 dark:active:text-black transition-all duration-300 hover:scale-105 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-xl dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] w-full sm:w-auto max-w-xs sm:max-w-none mx-auto font-poppins cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                  >
                    Responda nosso quiz
                  </a>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-[#B6B6B6] max-w-xl mx-auto leading-relaxed font-poppins font-light px-4">
                    Descubra o momento atual da sua clínica e receba insights personalizados sobre como podemos ajudar você a alcançar seus objetivos.
                  </p>
                </div>
              </div>
            </div >
          </section >

          {/* NASCEU DA SAÚDE, VIVE DE RESULTADOS Section */}
          < section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-white dark:bg-[#0E0F10] relative overflow-hidden" >
            {/* Abstract Gray Shapes */}
            < div className="absolute top-20 right-10 w-28 h-28 bg-gray-500 rounded-full opacity-20 blur-xl" ></div >
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-gray-400 rounded-full opacity-25 blur-lg"></div>

            <div className="container mx-auto max-w-7xl px-0 sm:px-4">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                {/* Left - Content */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 w-full overflow-hidden">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight font-poppins text-center md:text-center lg:text-left px-2 sm:px-0">
                    <span className="sm:hidden">Especialistas na<br />saúde, crescendo os seus resultados.</span>
                    <span className="hidden sm:block md:hidden">Especialistas na<br />saúde, crescendo<br />os seus resultados.</span>
                    <span className="hidden md:block lg:hidden">Especialistas na<br />saúde, crescendo os seus resultados.</span>
                    <span className="hidden lg:block">Especialistas na<br />saúde, crescendo<br />os seus resultados.</span>
                  </h2>

                  <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-white leading-relaxed font-poppins font-light break-words">
                      A Storm foi criada por profissionais que entenderam que o conhecimento clínico excepcional precisa ser combinado com estratégias comerciais inteligentes para gerar o impacto e o reconhecimento que você merece.
                    </p>

                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-white leading-relaxed font-poppins font-light break-words">
                      Nossa equipe multidisciplinar une expertise em gestão, marketing digital e vendas especificamente para o setor da saúde. Conhecemos suas dores porque já estivemos lá.
                    </p>
                  </div>
                </div>

                {/* Right - Card with Animation */}
                <div className="relative order-1 lg:order-2 w-full overflow-hidden">
                  {/* Animated Card */}
                  <div
                    className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 animate-float-slow bg-cover bg-no-repeat min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] aspect-square sm:aspect-auto w-full"
                    style={{
                      backgroundImage: `url(${assetUrl('img/Storm-280.jpeg')})`,
                      backgroundPosition: backgroundPosition
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
                <div className="text-center">
                  <div className="text-lg sm:text-4xl font-bold text-black dark:text-white mb-1 sm:mb-2">300+</div>
                  <div className="text-xs sm:text-base text-gray-600 dark:text-white">Clínicas Transformadas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-4xl font-bold text-black dark:text-white mb-1 sm:mb-2">2x</div>
                  <div className="text-xs sm:text-base text-gray-600 dark:text-white">Aumento Médio de Faturamento</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-4xl font-bold text-black dark:text-white mb-1 sm:mb-2">100%</div>
                  <div className="text-xs sm:text-base text-gray-600 dark:text-white">Aumento da Satisfação dos Pacientes</div>
                </div>
              </div>
            </div>
          </section >

          {/* DEPOIMENTOS Section */}
          < section className="py-20 sm:py-28 lg:py-36 px-4 bg-white relative overflow-hidden" >
            {/* Abstract Gray Shapes */}
            < div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl" ></div >
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

            <div className="container mx-auto max-w-7xl">
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16 lg:mb-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-4 sm:mb-6 px-2 font-poppins">
                  {copy.home.testimonials.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 font-poppins font-light">
                  {copy.home.testimonials.description}
                </p>
              </div>

              {/* Testimonials Grid */}
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 overflow-visible">
                {/* Mobile: Horizontal Carousel */}
                <div className="md:hidden overflow-visible">
                  <HorizontalCarousel
                    showDots={true}
                    showArrows={true}
                    snapScroll={true}
                    autoPlay={true}
                    autoPlayInterval={6000}
                    itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                    gap={16}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[260px] flex flex-col">
                        <div className="text-center mb-4 sm:mb-6 px-12 sm:px-14 flex-1 flex flex-col">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <span className="text-white font-bold text-sm sm:text-lg">{testimonial.initials}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-black mb-2 font-poppins">{testimonial.name}</h3>
                          <p className="text-sm sm:text-base text-gray-600 font-medium font-poppins">{testimonial.role}</p>
                        </div>

                        <blockquote className="text-sm sm:text-base text-gray-700 italic leading-relaxed mb-4 sm:mb-6 font-poppins font-light">
                          "{testimonial.content}"
                        </blockquote>

                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            {[...Array(testimonial.stars || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gray-600 text-gray-600" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </HorizontalCarousel>
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:contents">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                      <div className="text-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <span className="text-white font-bold text-sm sm:text-lg">{testimonial.initials}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-2 font-poppins">{testimonial.name}</h3>
                        <p className="text-sm sm:text-base text-gray-600 font-medium font-poppins">{testimonial.role}</p>
                      </div>

                      <blockquote className="text-sm sm:text-base text-gray-700 italic leading-relaxed mb-4 sm:mb-6 font-poppins font-light">
                        "{testimonial.content}"
                      </blockquote>

                      <div className="flex justify-center">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.stars || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gray-600 text-gray-600" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section >

          {/* CONTATO Section */}
          < section id="contato" className="py-20 sm:py-28 lg:py-36 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden" >
            {/* Abstract Gray Shapes */}
            < div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl" ></div >
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
          </section >

          {/* METODOLOGIA Section */}
          < section className="py-20 sm:py-28 lg:py-36 px-4 bg-gray-50 dark:bg-[#15171A] relative overflow-hidden" >
            {/* Abstract Gray Shapes */}
            < div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl" ></div >
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

            <div className="container mx-auto max-w-7xl">
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16 lg:mb-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6 px-2 font-poppins">
                  Nosso programa
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed px-4 font-poppins font-light">
                  Um processo estruturado e comprovado para transformar sua clínica em um negócio de alta performance.
                </p>
              </div>

              {/* Process Timeline */}
              <div className="sm:hidden overflow-visible">
                {/* Mobile: Horizontal Carousel */}
                <HorizontalCarousel
                  showDots={true}
                  showArrows={true}
                  snapScroll={true}
                  autoPlay={false}
                  itemWidthClass="w-[calc(100vw-110px)] sm:w-96"
                  gap={16}
                >
                  {/* Step 1 - Diagnóstico */}
                  <div className="relative flex flex-col">
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col min-h-[260px]">
                      <div className="text-center px-12 sm:px-14">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">1</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação da jornada do paciente</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                          Padronizamos todos os processos sensíveis ao paciente para garantir eficiência e qualidade da sua clínica.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 - Estratégia */}
                  <div className="relative flex flex-col">
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col min-h-[280px]">
                      <div className="text-center px-8 sm:px-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">2</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação comercial</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                          Criamos estratégias comerciais eficazes para atrair e converter mais pacientes particulares.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 - Implementação */}
                  <div className="relative flex flex-col">
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col min-h-[280px]">
                      <div className="text-center px-8 sm:px-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">3</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação financeira</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                          Organizamos o controle financeiro e criamos estratégias de precificação para maximizar a lucratividade.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 - Acompanhamento */}
                  <div className="flex flex-col">
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col min-h-[280px]">
                      <div className="text-center px-8 sm:px-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <span className="text-white font-bold text-lg sm:text-xl">4</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Treinamento de equipe</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                          Capacitamos sua equipe com técnicas de atendimento e vendas para converter mais pacientes.
                        </p>
                      </div>
                    </div>
                  </div>
                </HorizontalCarousel>
              </div>

              {/* Tablet: Grid 2x2 */}
              <div className="hidden sm:grid md:grid lg:hidden grid-cols-2 gap-6">
                {/* Step 1 - Diagnóstico */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">1</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação da jornada do paciente</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                      Padronizamos todos os processos sensíveis ao paciente para garantir eficiência e qualidade da sua clínica.
                    </p>
                  </div>
                </div>

                {/* Step 2 - Estratégia */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">2</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação comercial</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                      Criamos estratégias comerciais eficazes para atrair e converter mais pacientes particulares.
                    </p>
                  </div>
                </div>

                {/* Step 3 - Implementação */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">3</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação financeira</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                      Organizamos o controle financeiro e criamos estratégias de precificação para maximizar a lucratividade.
                    </p>
                  </div>
                </div>

                {/* Step 4 - Acompanhamento */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">4</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Treinamento de equipe</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                      Capacitamos sua equipe com técnicas de atendimento e vendas para converter mais pacientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop: Flex Layout with Arrows */}
              <div className="hidden lg:flex items-center justify-between w-full">
                {/* Step 1 - Diagnóstico */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <span className="text-white font-bold text-lg sm:text-xl">1</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação da jornada do paciente</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                        Padronizamos todos os processos sensíveis ao paciente para garantir eficiência e qualidade da sua clínica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="w-9 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>

                {/* Step 2 - Estratégia */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <span className="text-white font-bold text-lg sm:text-xl">2</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação comercial</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                        Criamos estratégias comerciais eficazes para atrair e converter mais pacientes particulares.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="w-9 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>

                {/* Step 3 - Implementação */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <span className="text-white font-bold text-lg sm:text-xl">3</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Estruturação financeira</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                        Organizamos o controle financeiro e criamos estratégias de precificação para maximizar a lucratividade.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow 3 */}
                <div className="w-9 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>

                {/* Step 4 - Acompanhamento */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <span className="text-white font-bold text-lg sm:text-xl">4</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 font-poppins">Treinamento de equipe</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins font-light">
                        Capacitamos sua equipe com técnicas de atendimento e vendas para converter mais pacientes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline for Mobile - Hidden */}
              <div className="hidden">
                <div className="flex justify-center">
                  <div className="flex flex-col space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <ChevronDown className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section >

          {/* FAQ Section */}
          < section className="py-20 sm:py-28 lg:py-36 px-4 bg-white relative overflow-hidden" >
            {/* Abstract Gray Shapes */}
            < div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl" ></div >
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

            <div className="container mx-auto max-w-4xl">
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16 lg:mb-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-4 sm:mb-6 px-2 font-poppins">
                  {copy.faq.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 font-poppins font-light">
                  {copy.faq.description}
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3 sm:space-y-4">
                {/* FAQ items via CMS or copy fallback */}
                {(cmsData?.faq?.perguntas?.length ? cmsData.faq.perguntas.map((p: any) => ({ q: p.pergunta, a: p.resposta })) : copy.faq.items).map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-black pr-4 font-poppins">{item.q}</h3>
                      <span className={`text-xl sm:text-2xl text-gray-600 flex-shrink-0 transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-poppins font-light">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">{copy.faq.cta.hint}</p>
                <button
                  onClick={() => {
                    trackButtonClick('contact_us', 'faq_section');
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {copy.faq.cta.button}
                </button>
              </div>
            </div>
          </section >

          {/* Footer */}
        </main>
        <Footer />
        <WhatsAppButton />
      </div >
    </ErrorBoundary>
  );
};

export default Index;