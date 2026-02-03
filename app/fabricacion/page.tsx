
"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button";
import SectionHeader from "../components/ui/SectionHeader";
import styles from "./page.module.css";

import transportador01 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 11.47.09.jpeg";
import transportador02 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 11.47.09 (1).jpeg";
import transportador03 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 11.47.09 (2).jpeg";
import transportador04 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 11.54.32.jpeg";
import transportador05 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.44.44.jpeg";
import transportador06 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.44.45.jpeg";
import transportador07 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.44.46.jpeg";
import transportador08 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.44.46 (1).jpeg";
import transportador09 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.44.46 (2).jpeg";
import transportador10 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.05.jpeg";
import transportador11 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.05 (1).jpeg";
import transportador12 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.05 (2).jpeg";
import transportador13 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.05 (3).jpeg";
import transportador14 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.06.jpeg";
import transportador15 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.06 (1).jpeg";
import transportador16 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.06 (2).jpeg";
import transportador17 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.06 (3).jpeg";
import transportador18 from "../assets/fabricacion/transportadores/WhatsApp Image 2026-01-31 at 12.45.06 (4).jpeg";

const transportadores: StaticImageData[] = [
  transportador01,
  transportador02,
  transportador03,
  transportador04,
  transportador05,
  transportador06,
  transportador07,
  transportador08,
  transportador09,
  transportador10,
  transportador11,
  transportador12,
  transportador13,
  transportador14,
  transportador15,
  transportador16,
  transportador17,
  transportador18,
];

export default function Fabricacion() {
  const slides = useMemo(() => transportadores, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const goLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((current) =>
      current === null ? 0 : (current + 1) % slides.length,
    );
  };

  const goLightboxPrevious = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((current) =>
      current === null ? 0 : (current - 1 + slides.length) % slides.length,
    );
  };

  return (
    <section className={styles.page}>
      <SectionHeader
        kicker="Fabricacion"
        title="Transportadores industriales a medida"
        subtitle="Galeria de transportadores fabricados por nuestro equipo. Diseñamos, manufacturamos y montamos soluciones completas para flujo continuo de materiales."
      />

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p className={styles.statValue}>+20 años</p>
          <p className={styles.statLabel}>Experiencia industrial</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>+500</p>
          <p className={styles.statLabel}>Proyectos entregados</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>24/7</p>
          <p className={styles.statLabel}>Operación continua</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>100%</p>
          <p className={styles.statLabel}>Fabricación a medida</p>
        </div>
      </div>

      <div
        className={styles.hero}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className={styles.heroMedia}>
          <div className={styles.carouselViewport} aria-live="polite">
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((image, index) => (
                <button
                  className={styles.slide}
                  type="button"
                  key={`transportador-${index}`}
                  onClick={() => openLightbox(index)}
                  aria-label={`Abrir imagen ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Transportador fabricado ${index + 1}`}
                    className={styles.slideImage}
                    sizes="100vw"
                    priority={index === 0}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className={`${styles.carouselControl} ${styles.prev}`}
          type="button"
          onClick={goToPrevious}
          aria-label="Imagen anterior"
        >
          ‹
        </button>
        <button
          className={`${styles.carouselControl} ${styles.next}`}
          type="button"
          onClick={goToNext}
          aria-label="Imagen siguiente"
        >
          ›
        </button>

        <div className={styles.carouselMeta}>
          <div className={styles.dots} role="tablist" aria-label="Galeria">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={
                  index === activeIndex ? styles.dotActive : styles.dot
                }
                type="button"
                aria-label={`Ir a imagen ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <div className={styles.counter}>
            {activeIndex + 1} / {slides.length}
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Capacidad de fabrica completa</h2>
          <p className={styles.infoCopy}>
            Fabricamos transportadores con estructura reforzada, bandas de alto
            rendimiento y componentes diseñados para operar 24/7 en ambientes
            industriales exigentes.
          </p>
        </div>
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Ingenieria y montaje</h2>
          <p className={styles.infoCopy}>
            Nuestro equipo valida medidas, materiales y configuraciones en sitio
            para entregar sistemas listos para producir desde el primer dia.
          </p>
        </div>
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Proyectos a la medida</h2>
          <p className={styles.infoCopy}>
            Cada transportador se adapta al flujo, altura y tonelaje requerido.
            Ajustamos inclinacion, ancho, rodilleria y sistema de traccion segun
            tu proceso.
          </p>
        </div>
      </div>

      <div className={styles.ctaCard}>
        <div>
          <h2 className={styles.ctaTitle}>¿Listo para cotizar tu transportador?</h2>
          <p className={styles.ctaCopy}>
            Comparte dimensiones, capacidad y condiciones de trabajo. Nuestro
            equipo te propone una solucion fabricada a la medida.
          </p>
        </div>
        <Button href="/contacto/" variant="whatsapp">
          Solicitar cotizacion
        </Button>
      </div>

      {lightboxIndex !== null ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button
            className={styles.lightboxClose}
            type="button"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            ×
          </button>
          <div className={styles.lightboxInner}>
            <Image
              src={slides[lightboxIndex]}
              alt={`Transportador fabricado ${lightboxIndex + 1}`}
              className={styles.lightboxImage}
              sizes="92vw"
              priority
            />
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              type="button"
              onClick={goLightboxPrevious}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              type="button"
              onClick={goLightboxNext}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
