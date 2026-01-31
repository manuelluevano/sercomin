"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import Button from "../components/ui/Button";
import SectionHeader from "../components/ui/SectionHeader";

import vulcanizadoCaliente1 from "./Vulcannizado/Vulcanizado en caliente/WhatsApp Image 2026-01-30 at 11.04.00.jpeg";
import vulcanizadoCaliente2 from "./Vulcannizado/Vulcanizado en caliente/WhatsApp Image 2026-01-30 at 11.04.34.jpeg";
import vulcanizadoFrio1 from "./Vulcannizado/Vulcanizado en frio/vulcanizado-en-frio-1.jpg";
import vulcanizadoFrio2 from "./Vulcannizado/Vulcanizado en frio/vulcanizado_en_frio.jpg";
import filtracionPoster from "./sistema_filtracion_limpieza_hidraulica/cq5dam.web.1280.1280.jpeg";
import filtracionThumb from "./sistema_filtracion_limpieza_hidraulica/thumbnail_3s.png";
import paileria1 from "./fabricacion_paileria/WhatsApp Image 2026-01-30 at 12.40.36.jpeg";
import paileria2 from "./fabricacion_paileria/WhatsApp Image 2026-01-30 at 12.40.36 (1).jpeg";
import paileria3 from "./fabricacion_paileria/WhatsApp Image 2026-01-30 at 12.40.36 (2).jpeg";
import paileria4 from "./fabricacion_paileria/WhatsApp Image 2026-01-30 at 12.40.36 (3).jpeg";

type MediaItem =
  | {
      type: "image";
      src: StaticImageData;
      alt?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: StaticImageData;
      alt?: string;
    };

type Service = {
  title: string;
  summary: string;
  media: MediaItem[];
  tag?: string;
  whatsappText: string;
};

const services: Service[] = [
  {
    title: "Vulcanizado en caliente",
    summary:
      "Reparacion y empalme de bandas transportadoras con proceso en caliente para lograr union resistente, alineada y de larga duracion.",
    media: [
      { type: "image", src: vulcanizadoCaliente1 },
      { type: "image", src: vulcanizadoCaliente2 },
    ],
    tag: "Bandas transportadoras",
    whatsappText: "Hola, quiero informacion sobre el servicio de vulcanizado en caliente.",
  },
  {
    title: "Vulcanizado en frio",
    summary:
      "Empalmes y reparaciones con sistema de vulcanizado en frio, ideal para intervenciones rapidas y seguras en sitio.",
    media: [
      { type: "image", src: vulcanizadoFrio1 },
      { type: "image", src: vulcanizadoFrio2 },
    ],
    tag: "Bandas transportadoras",
    whatsappText: "Hola, quiero informacion sobre el servicio de vulcanizado en frio.",
  },
  {
    title: "Sistema de filtracion y limpieza hidraulica",
    summary:
      "Servicio de filtracion y limpieza hidraulica para mantener circuitos libres de contaminantes, optimizar el rendimiento y prolongar la vida util del sistema.",
    media: [
      {
        type: "video",
        src: "/servicios/limpieza_hidraulica.mp4",
        poster: filtracionThumb,
        alt: "Video de limpieza hidraulica",
      },
      { type: "image", src: filtracionPoster },
    ],
    tag: "Sistemas hidraulicos",
    whatsappText:
      "Hola, quiero informacion sobre el servicio de sistema de filtracion y limpieza hidraulica.",
  },
  {
    title: "Fabricacion de paileria",
    summary:
      "Fabricacion de estructuras, tolvas y componentes metalicos a la medida, con soldadura y acabado para entornos industriales.",
    media: [
      { type: "image", src: paileria1 },
      { type: "image", src: paileria2 },
      { type: "image", src: paileria3 },
      { type: "image", src: paileria4 },
    ],
    tag: "Fabricacion metalica",
    whatsappText:
      "Hola, quiero informacion sobre el servicio de fabricacion de paileria.",
  },
];

export default function Servicios() {
  const [lightbox, setLightbox] = useState<{
    serviceIndex: number;
    mediaIndex: number;
  } | null>(null);
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero informacion sobre servicios de Sercomin.",
  )}`;

  const activeService = lightbox ? services[lightbox.serviceIndex] : null;
  const activeMedia =
    activeService && lightbox ? activeService.media[lightbox.mediaIndex] : null;

  return (
    <section className={styles.page}>
      <SectionHeader
        kicker="Servicios Sercomin"
        title="Soluciones tecnicas para la industria"
        subtitle="Servicios especializados para mantener bandas, equipos y componentes en operacion. Cada proyecto se adapta a las condiciones del sitio y al ritmo de produccion."
        actions={
          <Button href={whatsappLink} external variant="whatsapp">
            Contactar por WhatsApp
          </Button>
        }
      />

      <div className={styles.grid}>
        {services.map((service, serviceIndex) => (
          <article
            className={styles.card}
            key={service.title}
            style={{ ["--delay" as const]: `${serviceIndex * 0.08}s` }}
          >
            <div className={styles.cardHeader}>
              {service.tag ? (
                <span className={styles.tag}>{service.tag}</span>
              ) : null}
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardSummary}>{service.summary}</p>
            </div>

            <div className={styles.gallery}>
              {service.media.map((item, index) => {
                if (item.type === "video") {
                  return (
                    <button
                      className={styles.imageWrap}
                      type="button"
                      key={index}
                      onClick={() => setLightbox({ serviceIndex, mediaIndex: index })}
                    >
                      <div className={styles.videoThumb}>
                        <span className={styles.videoPlayIcon} aria-hidden="true" />
                        {item.poster ? (
                          <Image
                            src={item.poster}
                            alt={item.alt ?? `${service.title} video`}
                            className={styles.image}
                            sizes="(max-width: 900px) 100vw, 480px"
                            priority={index === 0}
                          />
                        ) : (
                          <div className={styles.videoPlaceholder}>
                            <span className={styles.videoPlay}>Play</span>
                          </div>
                        )}
                        <span className={styles.videoBadge}>Video</span>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    className={styles.imageWrap}
                    type="button"
                    key={index}
                    onClick={() => setLightbox({ serviceIndex, mediaIndex: index })}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt ?? `${service.title} ${index + 1}`}
                      className={styles.image}
                      sizes="(max-width: 900px) 100vw, 480px"
                      priority={index === 0}
                    />
                  </button>
                );
              })}
            </div>
            <Button
              className={styles.cardCta}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                service.whatsappText,
              )}`}
              external
              variant="whatsapp"
              size="sm"
            >
              Cotizar por WhatsApp
            </Button>
          </article>
        ))}
      </div>

      {lightbox && activeMedia ? (
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
            {activeMedia.type === "image" ? (
              <Image
                src={activeMedia.src}
                alt="Vista ampliada"
                className={styles.lightboxImage}
                sizes="(max-width: 900px) 92vw, 1100px"
                priority
              />
            ) : (
              <video
                className={styles.lightboxVideo}
                controls
                poster={activeMedia.poster?.src}
              >
                <source src={activeMedia.src} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
