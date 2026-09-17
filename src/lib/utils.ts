import { clsx, type ClassValue } from "clsx";

export function cn(...entradas: ClassValue[]) {
  return clsx(entradas);
}
