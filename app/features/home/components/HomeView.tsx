import Button from "@/app/components/ui/Button";
import type { HomeViewModel } from "../controller/home.controller";
import styles from "../styles/HomeView.module.css";

type HomeViewProps = {
  viewModel: HomeViewModel;
};

export default function HomeView({ viewModel }: HomeViewProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>{viewModel.badge}</p>
            <h1 className={styles.title}>{viewModel.title}</h1>
            <p className={styles.subtitle}>{viewModel.subtitle}</p>
            <div className={styles.actions}>
              <Button href="/productos/" variant="primary" size="lg">
                Ver catalogo
              </Button>
              <Button href="/contacto/" variant="outline" size="lg">
                Solicitar asesoria
              </Button>
            </div>
          </div>
          <aside className={styles.heroPanel} aria-label="Indicadores clave">
            {/* Panel de KPIs para reforzar confianza comercial desde el primer scroll. */}
            {viewModel.kpis.map((kpi) => (
              <article key={kpi.label} className={styles.kpiCard}>
                <p className={styles.kpiValue}>{kpi.value}</p>
                <p className={styles.kpiLabel}>{kpi.label}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Capacidades</p>
            <h2 className={styles.sectionTitle}>Servicios industriales integrales</h2>
          </header>
          <div className={styles.serviceGrid}>
            {/* Servicios principales ordenados por el controlador. */}
            {viewModel.highlightedServices.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Linea comercial</p>
            <h2 className={styles.sectionTitle}>Refacciones para equipos criticos</h2>
          </header>
          <div className={styles.categoryGrid}>
            {viewModel.categories.map((category) => (
              <article key={category.name} className={styles.categoryCard}>
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Metodo de trabajo</p>
            <h2 className={styles.sectionTitle}>Ejecucion con enfoque en continuidad operativa</h2>
          </header>
          <ol className={styles.processGrid}>
            {viewModel.process.map((step) => (
              <li key={step.title} className={styles.processCard}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`wrap ${styles.ctaInner}`}>
          <div>
            <p className={styles.kicker}>Proximo paso</p>
            <h2 className={styles.ctaTitle}>{viewModel.ctaTitle}</h2>
            <p className={styles.ctaText}>{viewModel.ctaText}</p>
          </div>
          <div className={styles.ctaActions}>
            <Button href="/contacto/" variant="dark" size="lg">
              Hablar con un asesor
            </Button>
            <Button href="/servicios/" variant="ghost" size="lg">
              Revisar servicios
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
