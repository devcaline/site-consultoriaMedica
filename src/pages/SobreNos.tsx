import { useState, useEffect } from 'react';
import { Award, Users, Target, TrendingUp, Heart, Star, ArrowRight, CheckCircle, Globe, Shield, Zap, Instagram, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { assetUrl } from '@/lib/utils';
import { fetchPageACFBySlug } from '@/services/cmsService';
import { mapSobrePage } from '@/services/sobreMapper';
import { renderMediaOrText } from '@/lib/renderCms';

import { SOBRE_SLUG } from '@/config/cmsSlugs';

const SobreNos = () => {
  const { trackButtonClick, trackScroll } = useAnalytics();
  const swipeHandlers = useSwipeNavigation();

  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    async function loadCms() {
      const acf = await fetchPageACFBySlug(SOBRE_SLUG);
      const mapped = mapSobrePage(acf);
      if (mapped) {
        setCmsData(mapped);
      }
    }
    loadCms();
  }, []);

  useSEO({
    title: "Sobre nós",
    description: "Conheça a Storm Business: consultoria especializada em transformar clínicas médicas em negócios de alta performance. Nossa história, valores e equipe.",
    keywords: "sobre storm business, consultoria clínicas, equipe storm, história storm business",
    canonicalUrl: `${import.meta.env.VITE_SITE_URL || 'https://seu-dominio-portfolio.com.br'}/sobre-nos`
  });

  const teamMembers = cmsData?.nossaEquipe?.membros?.length ? cmsData.nossaEquipe.membros.map((m: any) => ({
    name: m.nome,
    role: "", // Campo não disponível no mapper
    specialty: "", // Campo não disponível no mapper
    experience: "", // Campo não disponível no mapper
    description: m.descricao,
    photo: m.foto || assetUrl('placeholder.svg') // Usa foto do CMS ou placeholder
  })) : [
    {
      name: "Juliana",
      role: "Sócia • Gestão Financeira e Processos",
      specialty: "Gestão em Saúde e Vendas",
      experience: "MBA em Gestão e Vendas",
      description: "Advogada e gestora em saúde. Experiência com escritório próprio e clínica odontológica. Lidera a organização financeira e a padronização de processos."
    },
    {
      name: "Annabel",
      role: "Sócia • Comercial e Posicionamento",
      specialty: "Administração e Performance de Vendas",
      experience: "MBA em performance de times de vendas",
      description: "Experiência internacional em marketing e gestão. Responsável por prospecção, posicionamento estratégico e crescimento comercial."
    },
    {
      name: "Maria",
      role: "Consultora de Crescimento",
      specialty: "Estratégia e Execução",
      experience: "—",
      description: "Faz a ponte entre estratégia e execução, acompanhando a aplicação prática com os clientes."
    },
    {
      name: "Marcela",
      role: "Operações",
      specialty: "Processos Internos",
      experience: "—",
      description: "Organiza bastidores, processos internos e garante a entrega fluida e segura da experiência Storm."
    },
    {
      name: "Giovanna",
      role: "Vendas e Novos Negócios",
      specialty: "Prospecção",
      experience: "—",
      description: "Conecta a Storm a novas clínicas e inicia a jornada de aceleração."
    }
  ];

  const values = cmsData?.nossosValores?.cards?.length ? cmsData.nossosValores.cards.map((c: any) => ({
    icon: c.icone ? () => renderMediaOrText(c.icone, c.titulo, "w-6 h-6 sm:w-8 sm:h-8", "w-6 h-6 sm:w-8 sm:h-8 object-contain") : CheckCircle,
    title: c.titulo,
    description: c.descricao
  })) : [
    {
      icon: Heart,
      title: "Paixão pela saúde",
      description: "Acreditamos que todo profissional da saúde merece reconhecimento e sucesso financeiro."
    },
    {
      icon: Target,
      title: "Resultados comprovados",
      description: "Nossa metodologia é baseada em dados reais e resultados mensuráveis."
    },
    {
      icon: Users,
      title: "Sócios de aluguel",
      description: "Trabalhamos lado a lado com nossos clientes, como verdadeiros sócios na empreitada empresarial."
    },
    {
      icon: Shield,
      title: "Organização e clareza",
      description: "Mantemos os mais altos padrões de organização e estrutura em todas as nossas operações."
    }
  ];

  const milestones = cmsData?.nossaHistoria?.anos?.length ? cmsData.nossaHistoria.anos.map((a: any) => ({
    year: a.ano,
    title: a.titulo,
    description: a.descricao
  })) : [
    {
      year: "2022",
      title: "Fundação da Storm",
      description: "Nascemos da necessidade de profissionalizar o empreendedorismo, trazendo uma abordagem integrada de vendas, gestão e marketing."
    },
    {
      year: "2023",
      title: "Expansão nacional",
      description: "Expandimos nossos serviços para todo o território nacional."
    },
    {
      year: "2024",
      title: "Expansão internacional",
      description: "Clientes fora do país e uma das sócias morando em Madrid, Espanha."
    },
    {
      year: "2025",
      title: "300+ clientes",
      description: "Marca de 300 clientes atendidos e mais de R$ 1,5 milhões em faturamento."
    }
  ];

  const stats = cmsData?.hero?.destaques?.length ? cmsData.hero.destaques : [
    { valor: "300+", titulo: "Clínicas Transformadas" },
    { valor: "2x", titulo: "Aumento Médio de Faturamento" },
    { valor: "100%", titulo: "Aumento da Satisfação dos Pacientes" }
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
              {cmsData?.hero?.titulo || "Sobre a Storm"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B6B6B6] max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.hero?.subtitulo || copy.sobreNos.heroSubtitle}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {stats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-4xl font-bold text-black dark:text-white mb-1 sm:mb-2">
                  {stat.valor}
                </div>
                <div className="text-xs sm:text-base text-gray-600 dark:text-white">
                  {stat.titulo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-36 px-4 bg-gray-50 dark:bg-[#15171A] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-[#E7E7E7] leading-tight font-poppins">
                {cmsData?.nossaHistoria?.titulo || "Nossa história"}
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {cmsData?.nossaHistoria?.conteudo ? (
                  cmsData.nossaHistoria.conteudo.split(/[\r\n]+/).filter((line: string) => line.trim().length > 0).map((line: string, i: number) => (
                    <p key={i} className="text-base sm:text-lg text-gray-700 dark:text-white leading-relaxed font-inter font-light">
                      {line}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-white leading-relaxed font-inter font-light">
                      {copy.sobreNos.historia[0]}
                    </p>

                    <p className="text-base sm:text-lg text-gray-700 dark:text-white leading-relaxed font-inter font-light">
                      {copy.sobreNos.historia[1]}
                    </p>

                    <p className="text-base sm:text-lg text-gray-700 dark:text-white leading-relaxed font-inter font-light">
                      {copy.sobreNos.historia[2]}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Right - Timeline */}
            <div className="space-y-6">
              {(milestones || []).map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 dark:bg-white dark:text-black rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-black font-bold text-sm sm:text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">{milestone.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-white leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-white dark:bg-[#0E0F10] relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-500 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-400 rounded-full opacity-20 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-white leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.nossosValores?.titulo || "Nossos valores"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed px-4 font-poppins font-light">
              {cmsData?.nossosValores?.subtitulo || "Os princípios que guiam nossa atuação e definem nossa identidade como empresa."}
            </p>
          </div>

          {/* Values - Mobile/Tablet: Carrossel */}
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
                {(values || []).map((value, index) => (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-[#15171A] rounded-2xl pt-5 pb-3 px-5 sm:pt-6 sm:pb-4 sm:px-6 md:p-8 border border-gray-100 dark:border-[#24272B] hover:border-gray-200 dark:hover:border-[#2A2D32] hover:shadow-md dark:hover:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 min-h-[260px] flex flex-col"
                  >
                    <div className="relative z-10 flex-1 flex flex-col px-12 sm:px-14">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-50 dark:bg-[#1A1C1F] rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:bg-gray-100 dark:group-hover:bg-[#1F2124] transition-colors duration-300 flex-shrink-0">
                        <value.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black dark:text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 md:mb-4 font-poppins leading-tight">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white leading-relaxed font-poppins font-light flex-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </HorizontalCarousel>
            </div>
          </div>

          {/* Values - Desktop: Grid minimalista, cards lado a lado */}
          <div className="hidden lg:block">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 xl:gap-8">
              {(values || []).map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-[#15171A] rounded-xl p-6 border border-gray-100 dark:border-[#24272B] hover:border-gray-200 dark:hover:border-[#2A2D32] hover:shadow-lg dark:hover:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-[#1A1C1F] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 dark:group-hover:bg-[#1F2124] transition-colors duration-300">
                      <value.icon className="w-6 h-6 text-black dark:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black dark:text-white mb-2 font-poppins">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white leading-relaxed font-poppins font-light">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-gray-50 relative overflow-hidden">
        {/* Abstract Gray Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gray-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500 rounded-full opacity-15 blur-xl"></div>

        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-4 sm:mb-6 px-2 font-poppins">
              {cmsData?.nossaEquipe?.titulo || "Nossa equipe"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 font-inter font-light">
              {cmsData?.nossaEquipe?.subtitulo || "Profissionais experientes e apaixonados por transformar o setor da saúde."}
            </p>
          </div>

          {/* Team Dynamic Gallery */}
          {(() => {
            const photoByName: Record<string, string> = {
              'Juliana': assetUrl('img/Juliana Fundadora.jpg'),
              'Annabel': assetUrl('img/Annabel Fundadora.jpg'),
              'Maria': assetUrl('img/Maria Consultora.jpg'),
              'Marcela': assetUrl('img/Marcela Operacoes.jpg'),
              'Giovanna': assetUrl('img/Giovanna Executiva de vendas.jpg'),
            };

            const members = teamMembers.map((m: any, i: number) => ({
              ...m,
              id: `#${i + 1}`,
              photo: m.photo && m.photo !== 'placeholder.svg' ? m.photo : (photoByName[m.name] || assetUrl('placeholder.svg')),
            }));

            const [selectedIndex, setSelectedIndex] = useState<number>(0);

            const selected = members[selectedIndex];

            return (
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-[420px,1fr] gap-10 items-start">

                  {/* Col 1: big photo */}
                  <div className="justify-self-center lg:justify-self-start">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, scale: 0.985, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.985, y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="relative overflow-hidden rounded-lg bg-gray-100 w-full max-w-[360px] aspect-[3/4] sm:w-[400px] sm:h-[500px] sm:aspect-auto lg:w-[420px] lg:h-[520px] mx-auto"
                      >
                        <img
                          src={typeof selected.photo === 'string' ? selected.photo : (selected.photo?.url || "")}
                          alt={selected.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Col 2: id, name, description + thumbs */}
                  <div className="flex flex-col justify-between lg:h-[520px]">
                    <motion.div
                      key={`content-${selected.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                      className="space-y-3 lg:space-y-4"
                    >
                      <div className="text-gray-500 font-semibold text-lg">{selected.id}</div>
                      <h3 className="text-[28px] lg:text-[34px] font-extrabold text-black uppercase tracking-wider">{selected.name}</h3>
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed font-inter font-light max-w-[46ch]">
                        {selected.description}
                      </p>
                    </motion.div>

                    {/* Thumbnails row */}
                    <div className="mt-6 flex gap-3 sm:gap-5 flex-wrap justify-center lg:justify-start pb-4">
                      {members.map((m: any, i: number) => (
                        <button
                          key={m.name}
                          onClick={() => setSelectedIndex(i)}
                          className="relative overflow-hidden rounded-md focus:outline-none ring-offset-2 focus:ring-2 focus:ring-black"
                          aria-label={`Selecionar ${m.name}`}
                        >
                          <img
                            src={typeof m.photo === 'string' ? m.photo : (m.photo?.url || "")}
                            alt={m.name}
                            className={`h-[116px] w-24 object-cover rounded-md transition-opacity duration-200 ${i === selectedIndex ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
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

export default SobreNos;
