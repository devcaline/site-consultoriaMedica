import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  return (
    <div 
      className="service-card fade-in-up opacity-0"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary rounded-b-2xl opacity-20"></div>
    </div>
  );
};

export default ServiceCard;