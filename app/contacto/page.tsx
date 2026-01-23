import styles from "./page.module.css";

export default function Contacto() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Contacto</p>
        <h1 className={styles.title}>Nuestra ubicacion</h1>
        <p className={styles.subtitle}>
          Encuentranos en Google Maps para coordinar una visita.
        </p>
      </header>
      <div className={styles.mapCard}>
        <div className={styles.mapFrame}>
          <iframe
            title="Ubicacion del taller Sercomin"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.623147089018!2d-103.27041482361022!3d20.603441980941607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b305ec8bccb7%3A0x11d8004039c6fea8!2sSERCOMIN!5e0!3m2!1ses-419!2smx!4v1769187326925!5m2!1ses-419!2smx"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a
          className={styles.mapLink}
          href="https://maps.app.goo.gl/NYiwc8ha7i7aMJfc8"
          target="_blank"
          rel="noreferrer"
        >
          Ver en Google Maps
        </a>
      </div>
      <div className={styles.contactCard}>
        <h2 className={styles.sectionTitle}>Datos de contacto</h2>
        <div className={styles.contactGrid}>
          <div>
            <p className={styles.label}>Correo</p>
            <p className={styles.value}>contacto@sercomin.mx</p>
          </div>
          <div>
            <p className={styles.label}>Telefono oficina</p>
            <p className={styles.value}>+52 33 2211 3344</p>
          </div>
        </div>
      </div>
    </section>
  );
}
