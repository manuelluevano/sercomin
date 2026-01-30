"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

import vulcanizadoCaliente1 from "./Vulcannizado/Vulcanizado en caliente/WhatsApp Image 2026-01-30 at 11.04.00.jpeg";
import vulcanizadoCaliente2 from "./Vulcannizado/Vulcanizado en caliente/WhatsApp Image 2026-01-30 at 11.04.34.jpeg";
import vulcanizadoFrio1 from "./Vulcannizado/Vulcanizado en frio/vulcanizado-en-frio-1.jpg";
import vulcanizadoFrio2 from "./Vulcannizado/Vulcanizado en frio/vulcanizado_en_frio.jpg";
import vulcanizadoFrio3 from "./Vulcannizado/Vulcanizado en frio/78e95de1-a6b7-40a1-a221-41759580cbc9.png";

type Service = {
  title: string;
  summary: string;
  images: StaticImageData[];
  tag?: string;
  whatsappText: string;
};

const services: Service[] = [
  {
    title: "Vulcanizado en caliente",
    summary:
      "Reparacion y empalme de bandas transportadoras con proceso en caliente para lograr union resistente, alineada y de larga duracion.",
    images: [vulcanizadoCaliente1, vulcanizadoCaliente2],
    tag: "Bandas transportadoras",
    whatsappText: "Hola, quiero informacion sobre el servicio de vulcanizado en caliente.",
  },
  {
    title: "Vulcanizado en frio",
    summary:
      "Empalmes y reparaciones con sistema de vulcanizado en frio, ideal para intervenciones rapidas y seguras en sitio.",
    images: [vulcanizadoFrio1, vulcanizadoFrio2, vulcanizadoFrio3],
    tag: "Bandas transportadoras",
    whatsappText: "Hola, quiero informacion sobre el servicio de vulcanizado en frio.",
  },
];

export default function Servicios() {
  const [lightbox, setLightbox] = useState<{
    serviceIndex: number;
    imageIndex: number;
  } | null>(null);
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero informacion sobre servicios de Sercomin.",
  )}`;

  const activeService = lightbox ? services[lightbox.serviceIndex] : null;
  const activeImage =
    activeService && lightbox ? activeService.images[lightbox.imageIndex] : null;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Servicios</p>
        <h1 className={styles.title}>Soluciones tecnicas para la industria</h1>
        <p className={styles.description}>
          Servicios especializados para mantener bandas, equipos y componentes en
          operacion. Cada proyecto se adapta a las condiciones del sitio y al
          ritmo de produccion.
        </p>
        
      </header>

      <div className={styles.grid}>
        {services.map((service, serviceIndex) => (
          <article className={styles.card} key={service.title}>
            <div className={styles.cardHeader}>
              {service.tag ? (
                <span className={styles.tag}>{service.tag}</span>
              ) : null}
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardSummary}>{service.summary}</p>
            </div>

            <div className={styles.gallery}>
              {service.images.map((image, index) => (
                <button
                  className={styles.imageWrap}
                  type="button"
                  key={index}
                  onClick={() => setLightbox({ serviceIndex, imageIndex: index })}
                >
                  <Image
                    src={image}
                    alt={`${service.title} ${index + 1}`}
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 480px"
                    priority={index === 0}
                  />
                </button>
              ))}
            </div>
            <a
              className={styles.cardCta}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                service.whatsappText,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </article>
        ))}
      </div>

      {lightbox && activeImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div
            className={styles.lightboxInner}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              type="button"
              aria-label="Cerrar"
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
            <Image
              src={activeImage}
              alt="Vista ampliada"
              className={styles.lightboxImage}
              sizes="(max-width: 900px) 92vw, 1100px"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
