interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  index: number;
}

const TestimonialCard = ({ name, role, content, avatar, index }: TestimonialCardProps) => {
  return (
    <div 
      className="service-card fade-in-up opacity-0 text-center"
      style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-white font-semibold text-lg">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          )}
        </div>
        <h4 className="font-semibold text-foreground">{name}</h4>
        <p className="text-primary text-sm font-medium">{role}</p>
      </div>
      
      <blockquote className="text-muted-foreground italic leading-relaxed">
        "{content}"
      </blockquote>
      
      {/* Star rating */}
      <div className="flex justify-center mt-6 space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-primary text-lg">★</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;