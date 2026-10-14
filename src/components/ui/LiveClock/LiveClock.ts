const TIME_ZONE = 'America/Bogota';

const format = new Intl.DateTimeFormat('es-CO', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Reloj con la hora de Jamundí (Colombia), actualizado cada segundo. */
class LiveClock extends HTMLElement {
  private timer?: number;

  connectedCallback(): void {
    const time = this.querySelector<HTMLTimeElement>('[data-clock-time]');
    if (!time) return;
    const render = () => {
      const now = new Date();
      time.textContent = format.format(now);
      time.dateTime = now.toISOString();
    };
    render();
    this.timer = window.setInterval(render, 1000);
  }

  disconnectedCallback(): void {
    window.clearInterval(this.timer);
  }
}

if (!customElements.get('live-clock')) customElements.define('live-clock', LiveClock);
