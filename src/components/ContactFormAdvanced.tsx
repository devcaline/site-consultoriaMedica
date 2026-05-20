import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  clinica: string;
  desafio: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  whatsapp?: string;
  clinica?: string;
  desafio?: string;
}

const ContactFormAdvanced = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    clinica: '',
    desafio: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validação em tempo real
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'nome':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return undefined;
      
      case 'whatsapp':
        if (!value.trim()) return 'WhatsApp é obrigatório';
        // Aceita formatos: (11) 99999-9999 ou (11) 9999-9999 ou apenas números
        const phoneNumbers = value.replace(/\D/g, '');
        if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
          return 'Formato: (11) 99999-9999';
        }
        return undefined;
      
      case 'clinica':
        if (!value.trim()) return 'Nome da clínica é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return undefined;
      
      case 'desafio':
        if (!value.trim()) return 'Descreva seu principal desafio';
        if (value.trim().length < 10) return 'Descreva pelo menos 10 caracteres';
        return undefined;
      
      default:
        return undefined;
    }
  };

  // Máscara para telefone
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'whatsapp') {
      processedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Validação em tempo real - limpa erro se campo estiver válido
    const error = validateField(name, processedValue);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name as keyof FormErrors] = error;
      } else {
        // Remove o erro se o campo estiver válido
        delete newErrors[name as keyof FormErrors];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação completa
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Enviar dados para o PHP
      const response = await fetch('./enviar-formulario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          clinica: formData.clinica,
          desafio: formData.desafio
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erro ao enviar formulário');
      }
      
      // Track conversion event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1
        });
      }
      
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error);
      const errorMessage = error?.message || 'Erro ao enviar formulário. Por favor, tente novamente ou entre em contato pelo WhatsApp.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validação melhorada: verifica se todos os campos estão preenchidos E sem erros
  const isFormValid = () => {
    // Verifica se todos os campos estão preenchidos
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    
    if (!allFieldsFilled) return false;
    
    // Valida todos os campos novamente para garantir que não há erros
    const allFieldsValid = Object.keys(formData).every(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      return !error;
    });
    
    // Verifica se não há erros no estado
    const noErrors = Object.keys(errors).length === 0;
    
    return allFieldsFilled && allFieldsValid && noErrors;
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-[#15171A] rounded-2xl p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-[#24272B] text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-[#E7E7E7] mb-4">Formulário Enviado!</h3>
        <p className="text-gray-600 dark:text-[#B6B6B6] mb-6">
          Obrigado pelo seu interesse! Nossa equipe entrará em contato em até 24 horas.
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ nome: '', email: '', whatsapp: '', clinica: '', desafio: '' });
            setErrors({});
          }}
          className="bg-gray-600 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 active:bg-gray-800 dark:active:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2"
        >
          Enviar novo formulário
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#15171A] rounded-2xl p-8 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-[#1F2124]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome Completo */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-black dark:text-[#E7E7E7] mb-2">
            Nome Completo *
          </label>
          <div className="relative">
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Dr. João Silva"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-colors bg-gray-50 dark:bg-[#111214] dark:text-[#E7E7E7] dark:placeholder:text-[#B6B6B6] ${
                errors.nome ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-[#1A1C1F]'
              }`}
              required
            />
            {formData.nome && !errors.nome && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.nome && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.nome}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black dark:text-[#E7E7E7] mb-2">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="joao@clinica.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-colors bg-gray-50 dark:bg-[#111214] dark:text-[#E7E7E7] dark:placeholder:text-[#B6B6B6] ${
                errors.email ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-[#1A1C1F]'
              }`}
              required
            />
            {formData.email && !errors.email && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.email && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-black dark:text-[#E7E7E7] mb-2">
            WhatsApp *
          </label>
          <div className="relative">
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="(71) 99999-9999"
              maxLength={15}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-colors bg-gray-50 dark:bg-[#111214] dark:text-[#E7E7E7] dark:placeholder:text-[#B6B6B6] ${
                errors.whatsapp ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-[#1A1C1F]'
              }`}
              required
            />
            {formData.whatsapp && !errors.whatsapp && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.whatsapp && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Nome da Clínica */}
        <div>
          <label htmlFor="clinica" className="block text-sm font-medium text-black dark:text-[#E7E7E7] mb-2">
            Nome da Clínica *
          </label>
          <div className="relative">
            <input
              type="text"
              id="clinica"
              name="clinica"
              value={formData.clinica}
              onChange={handleInputChange}
              placeholder="Clínica São João"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-colors bg-gray-50 dark:bg-[#111214] dark:text-[#E7E7E7] dark:placeholder:text-[#B6B6B6] ${
                errors.clinica ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-[#1A1C1F]'
              }`}
              required
            />
            {formData.clinica && !errors.clinica && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.clinica && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.clinica && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.clinica}
            </p>
          )}
        </div>

        {/* Desafio Principal */}
        <div>
          <label htmlFor="desafio" className="block text-sm font-medium text-black dark:text-[#E7E7E7] mb-2">
            Qual seu principal desafio hoje? *
          </label>
          <div className="relative">
            <textarea
              id="desafio"
              name="desafio"
              value={formData.desafio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Descreva brevemente o principal desafio que sua clínica enfrenta hoje..."
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent resize-none transition-colors bg-gray-50 dark:bg-[#111214] dark:text-[#E7E7E7] dark:placeholder:text-[#B6B6B6] ${
                errors.desafio ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-[#1A1C1F]'
              }`}
              required
            />
            {formData.desafio && !errors.desafio && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
            )}
            {errors.desafio && (
              <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.desafio && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.desafio}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${
              isFormValid() && !isSubmitting
                ? 'bg-gray-600 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 active:bg-gray-800 dark:active:bg-gray-300 text-white hover:scale-105 shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-xl'
                : 'bg-gray-300 dark:bg-[#1A1C1F] text-gray-500 dark:text-[#B6B6B6] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                Receber meu diagnóstico
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactFormAdvanced;
