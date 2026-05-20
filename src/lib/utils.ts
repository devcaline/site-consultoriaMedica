import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sempre retorna caminho relativo para assets a partir do HTML atual (ex.: ./img/arquivo.jpg)
export function assetUrl(path: string): string {
  const cleanedPath = path.replace(/^\/+/, '');
  return `./${cleanedPath}`;
}