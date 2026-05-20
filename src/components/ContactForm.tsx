import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    clinic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Diagnóstico solicitado com sucesso!",
        description: "Entraremos em contato em até 24 horas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="service-card text-center max-w-md mx-auto">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-foreground mb-2">Obrigado!</h3>
        <p className="text-muted-foreground">
          Recebemos sua solicitação de diagnóstico. Nossa equipe entrará em contato em até 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="service-card max-w-2xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Dr. João Silva"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="joao@clinica.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
            WhatsApp *
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            required
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="(71) 99999-9999"
          />
        </div>
        
        <div>
          <label htmlFor="clinic" className="block text-sm font-medium text-foreground mb-2">
            Nome da Clínica *
          </label>
          <input
            type="text"
            id="clinic"
            name="clinic"
            required
            value={formData.clinic}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Clínica São João"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Qual seu principal desafio hoje? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          placeholder="Descreva brevemente o principal desafio que sua clínica enfrenta hoje..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Receber meu diagnóstico</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;