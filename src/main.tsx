import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Garantir que o tema esteja aplicado (o script inline no HTML já aplicou, mas garantimos aqui também)
const ensureTheme = () => {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  
  // Se não houver preferência salva, usar modo escuro como padrão
  if (!stored) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else if (stored === 'light') {
    // Apenas aplicar light se explicitamente escolhido
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  } else {
    // Qualquer outro valor (incluindo 'dark') aplica modo escuro
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  }
};

// Garantir tema aplicado
ensureTheme();

createRoot(document.getElementById("root")!).render(<App />);
