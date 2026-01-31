import Button from "./components/ui/Button";

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
          <Button href="/productos/" variant="primary">
            Ver productos
          </Button>
          <Button href="/contacto/" variant="outline">
            Contacto
          </Button>
        </div>
      </div>
    </section>
  );
}
