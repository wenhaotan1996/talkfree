export function generateTranslationURL(text: string, targetLanguage: string) {
  return `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_KEY}&q=${text}&target=${targetLanguage}`;
}
