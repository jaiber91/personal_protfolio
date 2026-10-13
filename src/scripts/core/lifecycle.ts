// Coordina el orden de la experiencia: loader -> intro -> página interactiva.
// Usar promesas (y no solo eventos) evita condiciones de carrera si un
// componente se suscribe después de que la fase ya terminó.

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => (resolve = res));
  return { promise, resolve };
}

const loaderDone = deferred();
const introDone = deferred();

export const lifecycle = {
  /** El contador llegó a 100 y el overlay empieza a salir. */
  loaderDone: loaderDone.promise,
  /** Las partículas terminaron de formar el hero: la página ya es interactiva. */
  introDone: introDone.promise,
  completeLoader: loaderDone.resolve,
  completeIntro: introDone.resolve,
};
