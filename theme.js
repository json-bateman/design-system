/* fetch preferred color system preference theme, set attribute on <html> element */
const storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.setAttribute('data-theme', storedTheme);
