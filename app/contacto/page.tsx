import Image from "next/image";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import styles from "./page.module.css";
import heroHeader from "../assets/fabricacion/transportadores/header.png";

export default function Contacto() {
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero informacion sobre servicios y productos de Sercomin.",
  )}`;

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <Image
          src={heroHeader}
          alt="Sercomin contacto y atencion industrial"
          className={styles.heroImage}
          sizes="(max-width: 1100px) 100vw, 1100px"
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>Contacto Sercomin</p>
          <h1 className={styles.heroTitle}>Atencion tecnica y comercial</h1>
          <p className={styles.heroSubtitle}>
            Estamos listos para cotizar, resolver dudas y coordinar visita para tu
            operacion industrial.
          </p>
        </div>
      </div>
      <div className={styles.contentGrid}>
        <Card className={styles.contactCard} variant="elevated" padding="lg">
          <div className={styles.cardHeading}>
            <p className={styles.eyebrow}>Canales de contacto</p>
            <h2 className={styles.sectionTitle}>Hablemos de tu proyecto</h2>
            <p className={styles.sectionCopy}>
              Atendemos cotizaciones, soporte tecnico y seguimiento comercial para
              operacion industrial.
            </p>
          </div>

          <div className={styles.contactList}>
            <a href="mailto:contacto@sercomin.mx" className={styles.contactRow}>
              <span className={styles.label}>Correo</span>
              <span className={styles.value}>contacto@sercomin.mx</span>
            </a>
            <a href="tel:+523322113344" className={styles.contactRow}>
              <span className={styles.label}>Telefono oficina</span>
              <span className={styles.value}>+52 33 2211 3344</span>
            </a>
            <a href={whatsappLink} className={styles.contactRow} target="_blank" rel="noreferrer">
              <span className={styles.label}>WhatsApp</span>
              <span className={styles.value}>+52 33 1242 3096</span>
            </a>
          </div>

          <div className={styles.actions}>
            <Button href={whatsappLink} external variant="whatsapp" size="md" fullWidth>
              Escribir por WhatsApp
            </Button>
            <Button href="/productos/" variant="dark" size="md" fullWidth>
              Ver portafolio
            </Button>
          </div>

          <p className={styles.note}>
            Respuesta estimada en horario laboral: 15 a 45 minutos.
          </p>
        </Card>

        <Card className={styles.mapCard} variant="elevated" padding="sm">
          <div className={styles.cardHeading}>
            <p className={styles.eyebrow}>Ubicacion</p>
            <h2 className={styles.sectionTitle}>Visitanos en taller</h2>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              title="Ubicacion del taller Sercomin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.623147089018!2d-103.27041482361022!3d20.603441980941607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b305ec8bccb7%3A0x11d8004039c6fea8!2sSERCOMIN!5e0!3m2!1ses-419!2smx!4v1769187326925!5m2!1ses-419!2smx"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <Button
            href="https://maps.app.goo.gl/NYiwc8ha7i7aMJfc8"
            external
            variant="outline"
            size="sm"
          >
            Abrir en Google Maps
          </Button>
        </Card>
      </div>
      <div className={styles.bottomStrip}>
        <div className={styles.stripItem}>
          <p className={styles.stripLabel}>Cobertura</p>
          <p className={styles.stripValue}>Atencion local y en campo</p>
        </div>
        <div className={styles.stripItem}>
          <p className={styles.stripLabel}>Soporte</p>
          <p className={styles.stripValue}>Tecnico y comercial</p>
        </div>
        <div className={styles.stripItem}>
          <p className={styles.stripLabel}>Servicio</p>
          <p className={styles.stripValue}>Cotizacion y seguimiento</p>
        </div>
      </div>
    </section>
  );
}
