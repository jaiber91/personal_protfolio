/** Marca en el dock la sección visible y dibuja el progreso de lectura de la página. */
class SiteDock extends HTMLElement {
  private observer?: IntersectionObserver;
  private readonly abort = new AbortController();

  connectedCallback(): void {
    const links = [...this.querySelectorAll<HTMLAnchorElement>('[data-dock-link]')];
    const bar = this.querySelector<HTMLElement>('[data-dock-bar]');

    // Una sección está activa cuando cruza la línea media de la pantalla.
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = links.find((item) => item.dataset.dockLink === entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((item) => item.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'true');
          } else if (link.hasAttribute('aria-current')) {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    links.forEach((link) => {
      const section = document.getElementById(link.dataset.dockLink ?? '');
      if (section) this.observer?.observe(section);
    });

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    window.addEventListener('scroll', update, { passive: true, signal: this.abort.signal });
    update();
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.abort.abort();
  }
}

if (!customElements.get('site-dock')) customElements.define('site-dock', SiteDock);
