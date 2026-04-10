/**
 * Scrolls smoothly to a section by its element ID.
 * Uses window.scrollTo with getBoundingClientRect for reliable cross-browser/device support.
 * Works on iOS Safari, Android Chrome, and all desktop browsers.
 */
export function scrollToSection(id: string, delay = 0) {
  const scroll = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };
  if (delay > 0) {
    setTimeout(scroll, delay);
  } else {
    scroll();
  }
}
