import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || '5571999999999';
    const rawMessage = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Olá! Vi o site e gostaria de saber como vocês podem me ajudar!';
    const message = encodeURIComponent(rawMessage);

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 dark:hover:bg-green-500 active:bg-green-700 dark:active:bg-green-600 rounded-full shadow-glow dark:shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E0F10]"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={24} className="text-white group-hover:animate-pulse" />
    </button>
  );
};

export default WhatsAppButton;