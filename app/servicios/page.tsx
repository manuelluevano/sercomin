"use client";

import type { CSSProperties } from "react";
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
import botoneraDanada from "../assets/SERVICIOS/reparacion botonera pantalla metso/botoneraDanada.jpeg";
import reparada from "../assets/SERVICIOS/reparacion botonera pantalla metso/reparada.jpg";
import metsoModulo1 from "../assets/SERVICIOS/reparacion modulo/1.jpeg";
import metsoModulo2 from "../assets/SERVICIOS/reparacion modulo/2.jpeg";
import metsoModulo3 from "../assets/SERVICIOS/reparacion modulo/3.jpeg";
import metsoModulo4 from "../assets/SERVICIOS/reparacion modulo/4.jpeg";
import metsoModulo5 from "../assets/SERVICIOS/reparacion modulo/5.png";

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
  category: "vulcanizado" | "fabricacion" | "reacondicionamiento" | "filtracion";
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
    category: "vulcanizado",
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
    category: "vulcanizado",
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
    category: "filtracion",
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
    category: "fabricacion",
  },
  {
    title: "Reacondicionamiento Teclado para Maquinas METSO",
    summary:
      "Sustitucion del teclado de un display de una trituradora Metso. Nuestro departamento tecnico especializado en trituracion puede sustituir teclados danados en todo tipo de pantallas y displays de trituradoras moviles Metso.",
    media: [
      { type: "image", src: botoneraDanada },
      { type: "image", src: reparada },
    ],
    tag: "Trituracion",
    whatsappText:
      "Hola, quiero informacion sobre el servicio de reacondicionamiento de teclado para maquinas Metso.",
    category: "reacondicionamiento",
  },
  {
    title: "Reparacion de display METSO",
    summary:
      "Reparacion de modulo de display Metso con sustitucion de teclado, pantalla y backlight para recuperar visibilidad y operacion confiable.",
    media: [
      { type: "image", src: metsoModulo1 },
      { type: "image", src: metsoModulo2 },
      { type: "image", src: metsoModulo3 },
      { type: "image", src: metsoModulo4 },
      { type: "image", src: metsoModulo5 },
    ],
    tag: "Trituracion",
    whatsappText:
      "Hola, quiero informacion sobre el servicio de reparacion de display Metso.",
    category: "reacondicionamiento",
  },
];

export default function Servicios() {
  const [lightbox, setLightbox] = useState<{
    serviceIndex: number;
    mediaIndex: number;
  } | null>(null);
  const [filter, setFilter] = useState<"todos" | Service["category"]>("todos");
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero informacion sobre servicios de Sercomin.",
  )}`;

  const visibleServices =
    filter === "todos"
      ? services
      : services.filter((service) => service.category === filter);
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

      <div className={styles.filters} role="tablist" aria-label="Filtros">
        <button
          className={filter === "todos" ? styles.filterActive : styles.filter}
          type="button"
          onClick={() => setFilter("todos")}
          aria-pressed={filter === "todos"}
        >
          Todos
        </button>
        <button
          className={
            filter === "vulcanizado" ? styles.filterActive : styles.filter
          }
          type="button"
          onClick={() => setFilter("vulcanizado")}
          aria-pressed={filter === "vulcanizado"}
        >
          Vulcanizado
        </button>
        <button
          className={
            filter === "fabricacion" ? styles.filterActive : styles.filter
          }
          type="button"
          onClick={() => setFilter("fabricacion")}
          aria-pressed={filter === "fabricacion"}
        >
          Fabricacion de paileria
        </button>
        <button
          className={
            filter === "reacondicionamiento"
              ? styles.filterActive
              : styles.filter
          }
          type="button"
          onClick={() => setFilter("reacondicionamiento")}
          aria-pressed={filter === "reacondicionamiento"}
        >
          Reacondicionamiento METSO
        </button>
        <button
          className={
            filter === "filtracion" ? styles.filterActive : styles.filter
          }
          type="button"
          onClick={() => setFilter("filtracion")}
          aria-pressed={filter === "filtracion"}
        >
          Filtracion hidraulica
        </button>
      </div>

      <div className={styles.grid}>
        {visibleServices.map((service, serviceIndex) => {
          const originalIndex = services.findIndex(
            (item) => item.title === service.title,
          );
          return (
            <article
              className={styles.card}
              key={service.title}
              style={{ "--delay": `${serviceIndex * 0.08}s` } as CSSProperties}
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
                      onClick={() =>
                        setLightbox({
                          serviceIndex: originalIndex,
                          mediaIndex: index,
                        })
                      }
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
                    onClick={() =>
                      setLightbox({
                        serviceIndex: originalIndex,
                        mediaIndex: index,
                      })
                    }
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
          );
        })}
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
