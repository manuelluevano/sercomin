import Link from "next/link";

export default function Home() {
  return (
    <section className="home-hero">
      <div className="wrap home-hero-inner">
        <p className="home-kicker">Maquinaria industrial</p>
        <h1 className="home-title">Sercomin</h1>
        <p className="home-subtitle">
          Soluciones industriales en bandas, rodilleria y poleas para mantener tu
          operacion en movimiento.
        </p>
        <div className="home-actions">
          <Link className="home-cta" href="/productos/">
            Ver productos
          </Link>
          <Link className="home-ghost" href="/contacto/">
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
