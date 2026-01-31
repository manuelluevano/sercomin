import Button from "../components/ui/Button";

export default function SobreNosotros() {
  return (
    <section className="about-section">
      <div className="wrap about-inner">
        <p className="home-kicker">Sobre nosotros</p>
        <h1 className="home-title">Experiencia industrial</h1>
        <p className="home-subtitle">
          Fabricamos y suministramos componentes para transporte de materiales
          con enfoque en seguridad, durabilidad y tiempos de entrega confiables.
        </p>
        <div className="home-actions">
          <Button href="/productos/" variant="primary">
            Ver catalogo
          </Button>
          <Button href="/contacto/" variant="outline">
            Contacto
          </Button>
        </div>
      </div>
    </section>
  );
}
