/* fetch preferred color system preference theme, set attribute on <html> element */
const storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.setAttribute('data-theme', storedTheme);
themeSelect = document.getElementById('theme-select')

function setTheme(theme) {
  if (theme === 'system') {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Optional: persist selection
  localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme') || 'system';
themeSelect.value = saved;
setTheme(saved);

themeSelect.addEventListener("change", (e) => {
  setTheme(e.target.value);
});

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x =>
    x.toString(16).padStart(2, "0")
  ).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  return `HSL ${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function updateColorInfo() {
  document.querySelectorAll('.colors-item').forEach(item => {
    const box = item.querySelector('.colors-box');
    const bgColor = getComputedStyle(box).backgroundColor;

    const match = bgColor.match(/rgba?\((\d+), (\d+), (\d+)/);
    if (!match) return;

    const [_, r, g, b] = match.map(Number);
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);

    const spans = item.querySelectorAll('.fs-400');
    spans[0].textContent = hex;
    spans[1].textContent = hsl;
  });
}

updateColorInfo();

// This watches for data-theme changes and reruns the function if so
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateColorInfo();
    }
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});
