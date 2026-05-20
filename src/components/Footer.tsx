import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Heart } from 'lucide-react';
import { copy } from '@/content/copy';
import { assetUrl } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-[#0E0F10] text-white relative overflow-hidden">
      {/* Abstract Gray Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gray-600 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-500 rounded-full opacity-25 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-700 rounded-full opacity-30 blur-lg"></div>

      <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <img
                src={assetUrl('img/Logo-Storm-Footer-V2.png')}
                alt="Storm Business"
                className="h-20 sm:h-24 w-auto invert"
              />
            </div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 max-w-md font-poppins font-light">
              Transformamos clínicas em negócios de alta performance através de estratégias comerciais inteligentes e metodologia comprovada.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href={import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/seu-perfil/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || "5571999999999"}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE || "Olá! Vi o site e gostaria de obter mais informações.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 font-poppins">{copy.footer.servicesTitle}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors cursor-pointer font-poppins font-light">Consultoria Estratégica</li>
              <li className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors cursor-pointer font-poppins font-light">Gestão de Equipe</li>
              <li className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors cursor-pointer font-poppins font-light">Precificação Inteligente</li>
              <li className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors cursor-pointer font-poppins font-light">Processos Comerciais</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 font-poppins">Contato</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1 font-poppins font-light">{copy.footer.labels.email}</p>
                <p className="text-sm sm:text-base text-gray-300 font-poppins font-light">{import.meta.env.VITE_EMAIL_CONTACT || "contato@sua-aceleradora.com.br"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1 font-poppins font-light">{copy.footer.labels.whatsapp}</p>
                <p className="text-sm sm:text-base text-gray-300 font-poppins font-light">{import.meta.env.VITE_CONTACT_PHONE_LABEL || "(71) 99999-9999"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1 font-poppins font-light">{copy.footer.labels.hours}</p>
                <p className="text-sm sm:text-base text-gray-300 font-poppins font-light">{copy.footer.labels.hoursValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Masterclass Section */}
        <div className="bg-gray-900 dark:bg-[#15171A] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 dark:border dark:border-[#1F2124]">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 font-poppins">{copy.footer.newsletterTitle}</h3>
              <p className="text-sm sm:text-base text-gray-300 font-poppins font-light">{copy.footer.newsletterDesc}</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a
                href={import.meta.env.VITE_WHATSAPP_GROUP || "https://chat.whatsapp.com/exemplo-grupo"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base font-poppins"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {copy.footer.actions.joinWhatsApp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left font-poppins font-light">{copy.footer.bottom.copyright}</p>
              <div className="flex space-x-4 sm:space-x-6">
                <Link to="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-poppins font-light">{copy.footer.actions.privacy}</Link>
                <Link to="/termos-uso" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-poppins font-light">{copy.footer.actions.terms}</Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-xs sm:text-sm font-poppins font-light">{copy.footer.bottom.madeWith}</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              <span className="text-gray-400 text-xs sm:text-sm font-poppins font-light">pela </span>
              <a
                href="https://devcraft.dev.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-poppins font-light"
              >
                Devcraft
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

