import Button from "@/app/components/ui/Button";
import type { AboutViewModel } from "../controller/about.controller";
import styles from "../styles/AboutView.module.css";

type AboutViewProps = {
  viewModel: AboutViewModel;
};

export default function AboutView({ viewModel }: AboutViewProps) {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>{viewModel.badge}</p>
            <h1 className={styles.title}>{viewModel.title}</h1>
            <p className={styles.subtitle}>{viewModel.subtitle}</p>
            <div className={styles.actions}>
              <Button href="/contacto/" variant="primary" size="lg">
                Hablar con ingenieria
              </Button>
              <Button href="/servicios/" variant="outline" size="lg">
                Ver capacidades
              </Button>
            </div>
          </div>
          <aside className={styles.valuePanel}>
            <p className={styles.panelTitle}>Valores que guian nuestro trabajo</p>
            {/* Valores clave para reforzar posicionamiento institucional. */}
            <ul>
              {viewModel.primaryValues.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Identidad</p>
            <h2>Mision y vision industrial</h2>
          </header>
          <div className={styles.identityGrid}>
            <article className={styles.identityCard}>
              <h3>Mision</h3>
              <p>{viewModel.mission}</p>
            </article>
            <article className={styles.identityCard}>
              <h3>Vision</h3>
              <p>{viewModel.vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Fortalezas</p>
            <h2>Pilares de servicio</h2>
          </header>
          <div className={styles.pillarGrid}>
            {viewModel.pillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillarCard}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap">
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>Metodologia</p>
            <h2>Como ejecutamos cada proyecto</h2>
          </header>
          <ol className={styles.timeline}>
            {viewModel.timeline.map((item) => (
              <li key={item.phase} className={styles.timelineCard}>
                <h3>{item.phase}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <div>
            <p className={styles.kicker}>Contacto tecnico</p>
            <h2>{viewModel.ctaTitle}</h2>
            <p>{viewModel.ctaText}</p>
          </div>
          <div className={styles.ctaActions}>
            <Button href="/contacto/" variant="dark" size="lg">
              Solicitar propuesta
            </Button>
            <Button href="/productos/" variant="ghost" size="lg">
              Revisar productos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
