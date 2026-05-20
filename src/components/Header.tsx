import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Award, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { assetUrl } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    if (location.pathname === '/') {
      // Se estiver na página inicial, faz scroll para a seção
      const element = document.getElementById(path.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra página, navega para a inicial com scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(path.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handlePageNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Credibilidade e Contato */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black dark:bg-[#0E0F10] text-white py-1 sm:py-2">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-0.5 sm:space-y-0">
            {/* Credibilidade - Mobile otimizado */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                <span className="text-gray-300">300+ Clínicas</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                <span className="text-gray-300">2x Aumento</span>
              </div>
            </div>

            {/* Contato Rápido - Mobile otimizado */}
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <a href={`tel:+${import.meta.env.VITE_WHATSAPP_PHONE || '5571999999999'}`} className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="hidden sm:inline text-white">{import.meta.env.VITE_CONTACT_PHONE_LABEL || '(71) 99999-9999'}</span>
                <span className="sm:hidden text-white">Ligar</span>
              </a>
              <a href={`mailto:${import.meta.env.VITE_EMAIL_CONTACT || 'contato@sua-aceleradora.com.br'}`} className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="hidden sm:inline text-white">{import.meta.env.VITE_EMAIL_CONTACT || 'contato@sua-aceleradora.com.br'}</span>
                <span className="sm:hidden text-white">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed top-8 sm:top-10 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 dark:bg-[#0E0F10]/95 backdrop-blur-md shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)]'
        : 'bg-white/90 dark:bg-[#0E0F10]/90 backdrop-blur-sm'
        }`}>
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo com Tagline - Mobile otimizado */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
              <div className="flex items-center">
                <img
                  src={assetUrl('img/Logo-Storm-Navbar.png')}
                  alt="Storm Business"
                  className="h-8 sm:h-10 lg:h-12 w-auto dark:hidden invert"
                />
                <img
                  src={assetUrl('img/Logo-Storm-Navbar.png')}
                  alt="Storm Business"
                  className="h-8 sm:h-10 lg:h-12 w-auto hidden dark:block"
                />
              </div>
            </div>

            {/* Desktop Navigation - Centralizado */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6">
              <button
                onClick={() => handlePageNavigation('/')}
                className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
              >
                Início
              </button>
              <button
                onClick={() => handlePageNavigation('/sobre-nos')}
                className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => handlePageNavigation('/nossas-solucoes')}
                className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
              >
                Nossas Soluções
              </button>
              <button
                onClick={() => handlePageNavigation('/metodologia')}
                className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
              >
                Metodologia
              </button>
              <button
                onClick={() => handlePageNavigation('/cases')}
                className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
              >
                Cases
              </button>
            </nav>

            {/* Botões à direita - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <ThemeToggle />
              <button
                onClick={() => handleNavigation('#contato')}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                Diagnóstico Gratuito
              </button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="p-1.5 -mr-1 text-gray-700 dark:text-[#E7E7E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Otimizada */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-2 pb-2 border-t border-gray-200 dark:border-[#24272B] bg-white/95 dark:bg-[#0E0F10]/95 backdrop-blur-md shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] -mx-2 sm:-mx-4 px-2 sm:px-4">
              <div className="flex flex-col space-y-1 pt-2">
                <button
                  onClick={() => handlePageNavigation('/')}
                  className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Início
                </button>
                <button
                  onClick={() => handlePageNavigation('/sobre-nos')}
                  className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Sobre Nós
                </button>
                <button
                  onClick={() => handlePageNavigation('/nossas-solucoes')}
                  className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Nossas Soluções
                </button>
                <button
                  onClick={() => handlePageNavigation('/metodologia')}
                  className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Metodologia
                </button>
                <button
                  onClick={() => handlePageNavigation('/cases')}
                  className="text-gray-700 dark:text-[#E7E7E7] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Cases
                </button>
                <div className="border-t border-gray-200 dark:border-[#24272B] my-2"></div>
                <button
                  onClick={() => handlePageNavigation('/politica-privacidade')}
                  className="text-gray-500 dark:text-[#B6B6B6] hover:text-gray-700 dark:hover:text-[#E7E7E7] hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-xs rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Política de Privacidade
                </button>
                <button
                  onClick={() => handlePageNavigation('/termos-uso')}
                  className="text-gray-500 dark:text-[#B6B6B6] hover:text-gray-700 dark:hover:text-[#E7E7E7] hover:bg-gray-50 dark:hover:bg-[#15171A] transition-colors text-left py-2 px-1 font-medium text-xs rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
                >
                  Termos de Uso
                </button>
                <button
                  onClick={() => handleNavigation('#contato')}
                  className="bg-black dark:bg-white text-white dark:text-black px-3 py-2.5 rounded-lg w-full mt-2 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                >
                  Diagnóstico Gratuito
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;