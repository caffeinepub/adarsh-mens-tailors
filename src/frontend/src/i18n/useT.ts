import { useLanguage } from './LanguageProvider';

export function useT() {
  const { t, language } = useLanguage();
  return { t, language };
}
