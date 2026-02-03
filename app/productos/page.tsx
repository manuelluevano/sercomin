"use client";

import Image, { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";

import banda1 from "../assets/PRODUCTOS/Banda Transportadora/banda.png";
import banda2 from "../assets/PRODUCTOS/Banda Transportadora/banda2.png";
import banda3 from "../assets/PRODUCTOS/Banda Transportadora/banda3.png";
import jaula1 from "../assets/PRODUCTOS/JaulaArdilla/JaulaArdilla.png";
import jaula2 from "../assets/PRODUCTOS/JaulaArdilla/JaulaArdilla1.png";
import jaula3 from "../assets/PRODUCTOS/JaulaArdilla/JaulaArdilla2.png";
import jaula4 from "../assets/PRODUCTOS/JaulaArdilla/JaulaArdilla3.png";
import rodillo1 from "../assets/PRODUCTOS/Rodillo triple Carga/rodilloTriple.png";
import rodillo2 from "../assets/PRODUCTOS/Rodillo triple Carga/rodilloTripleCarga.png";
import retorno1 from "../assets/PRODUCTOS/RodilloRetorno/RodilloRetorno.png";
import retorno2 from "../assets/PRODUCTOS/RodilloRetorno/RodilloRetorno2.png";
import polea1 from "../assets/PRODUCTOS/Polea Motriz/poleaMotriz.png";
import polea2 from "../assets/PRODUCTOS/Polea Motriz/poleaMotriz2.png";
import polea3 from "../assets/PRODUCTOS/Polea Motriz/poleaMotriz3.png";
import poleaEspecial1 from "../assets/PRODUCTOS/POLEA ESPECIAL/WhatsApp Image 2026-01-23 at 11.23.34.jpeg";
import poleaEspecial2 from "../assets/PRODUCTOS/POLEA ESPECIAL/WhatsApp Image 2026-01-23 at 11.24.03.jpeg";
import poleaEspecial3 from "../assets/PRODUCTOS/POLEA ESPECIAL/WhatsApp Image 2026-01-23 at 11.24.04.jpeg";
import reductor1 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.44.jpeg";
import reductor2 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.44 (1).jpeg";
import reductor3 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.44 (2).jpeg";
import reductor4 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.45.jpeg";
import reductor5 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.58.jpeg";
import reductor6 from "../assets/PRODUCTOS/reductores/WhatsApp Image 2026-01-31 at 12.45.58 (1).jpeg";

type Product = {
  name: string;
  description: string;
  images: StaticImageData[];
  category: "banda" | "rodilleria" | "poleas" | "reductores";
  links?: {
    label: string;
    href: string;
    variant?:
      | "primary"
      | "outline"
      | "ghost"
      | "dark"
      | "whatsapp"
      | "mercadolibre"
      | "facebook";
  }[];
};

const products: Product[] = [
  {
    name: "Banda transportadora industrial",
    description:
      "Solucion para traslado continuo de materiales pesados, con estructura reforzada para operaciones 24/7.",
    images: [banda1, banda2, banda3],
    category: "banda",
  },
  {
    name: "Polea Jaula ardilla",
    description:
      "Componentes de alto rendimiento para motores industriales, fabricados para reducir vibracion y desgaste.",
    images: [jaula1, jaula2, jaula3, jaula4],
    category: "poleas",
  },
  {
    name: "Rodillo triple de carga",
    description:
      "Diseño de soporte pesado para transporte de mineral y agregados, con alineacion precisa.",
    images: [rodillo1, rodillo2],
    category: "rodilleria",
  },
  {
    name: "Rodillo de retorno",
    description:
      "Rodillos de baja friccion que extienden la vida util de bandas y reducen mantenimiento.",
    images: [retorno1, retorno2],
    category: "rodilleria",
  },
  {
    name: "Polea motriz",
    description:
      "Poleas robustas para traccion constante, listas para integrarse en lineas de produccion.",
    images: [polea1, polea2, polea3],
    category: "poleas",
    links: [
      {
        label: "Comprar en Mercado Libre",
        href: "https://www.mercadolibre.com.mx/polea-motriz-30-in--banda-transportadora/up/MLMU481965457",
        variant: "mercadolibre",
      },
      {
        label: "Ver video en TikTok",
        href: "https://www.tiktok.com/@sercomin.mx/video/7393497420358880518?lang=en",
        variant: "dark",
      },
      {
        label: "Ver en Facebook Marketplace",
        href: "https://www.facebook.com/marketplace/item/1415865553243832",
        variant: "facebook",
      },
    ],
  },
  {
    name: "Polea especial",
    description: "Fabricacion de poleas especiales para requerimientos a medida.",
    images: [poleaEspecial1, poleaEspecial2, poleaEspecial3],
    category: "poleas",
  },
  {
    name: "Reductor usado",
    description:
      "Reductores industriales usados en excelente estado, listos para integrarse y prolongar la vida de tus equipos.",
    images: [reductor5, reductor1, reductor2, reductor3, reductor4, reductor6],
    category: "reductores",
  },
];

function ProductCard({
  product,
  productIndex,
  onImageClick,
}: {
  product: Product;
  productIndex: number;
  onImageClick: (productIndex: number, imageIndex: number) => void;
}) {
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hola, quiero mas informacion sobre ${product.name}.`,
  )}`;

  return (
    <Card as="article" className={styles.card} variant="elevated" padding="lg">
      <button
        className={styles.heroImage}
        type="button"
        onClick={() => onImageClick(productIndex, 0)}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
          sizes="(max-width: 900px) 92vw, 360px"
          priority
        />
      </button>
      <div className={styles.thumbnailRow}>
        {product.images.map((image, index) => (
          <button
            className={styles.thumbnail}
            type="button"
            key={`${product.name}-thumb-${index}`}
            onClick={() => onImageClick(productIndex, index)}
          >
            <Image
              src={image}
              alt={`${product.name} vista ${index + 1}`}
              className={styles.thumbnailImage}
              sizes="120px"
            />
          </button>
        ))}
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{product.name}</h2>
        <p className={styles.cardCopy}>{product.description}</p>
      </div>
      <div className={styles.cardPrimaryCta}>
        <Button href={whatsappLink} external variant="whatsapp" size="lg" fullWidth>
          <svg
            className={styles.whatsappIcon}
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16.02 3C9.39 3 4 8.39 4 15.02c0 2.65.86 5.12 2.33 7.12L4 29l7.08-2.27a12 12 0 0 0 4.94 1.04h.01c6.63 0 12.02-5.39 12.02-12.02C28.05 8.39 22.65 3 16.02 3Zm0 2.4a9.62 9.62 0 0 1 9.63 9.62c0 5.3-4.33 9.62-9.63 9.62h-.01a9.5 9.5 0 0 1-4.54-1.15l-.62-.33-4.1 1.31 1.34-3.99-.4-.65a9.5 9.5 0 0 1-1.67-5.41A9.62 9.62 0 0 1 16.02 5.4Zm-2.78 5.7c-.24 0-.53.08-.8.38-.27.3-1.03 1-1.03 2.44s1.06 2.82 1.2 3.02c.14.2 2.05 3.28 5.08 4.47 2.52.99 3.04.79 3.59.74.55-.05 1.77-.73 2.02-1.44.25-.7.25-1.31.18-1.44-.07-.13-.27-.2-.56-.35-.3-.15-1.77-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.64.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.14-.14.3-.37.46-.56.15-.2.2-.33.3-.55.1-.23.05-.43-.02-.58-.08-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5Z" />
          </svg>
          Cotizar por WhatsApp
        </Button>
      </div>
      {product.links ? (
        <div className={styles.cardLinks}>
          {product.links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              external
              variant={link.variant ?? "outline"}
              size="sm"
              fullWidth
            >
              {link.label}
            </Button>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export default function Productos() {
  const [lightbox, setLightbox] = useState<{
    productIndex: number;
    imageIndex: number;
  } | null>(null);
  const [filter, setFilter] = useState<"todos" | Product["category"]>("todos");

  const visibleProducts = useMemo(() => {
    if (filter === "todos") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  const activeProduct = lightbox ? products[lightbox.productIndex] : null;
  const activeImage =
    activeProduct && lightbox ? activeProduct.images[lightbox.imageIndex] : null;

  const goToPreviousImage = () => {
    if (!lightbox) return;
    const product = products[lightbox.productIndex];
    const lastIndex = product.images.length - 1;
    const previousIndex = lightbox.imageIndex === 0 ? lastIndex : lightbox.imageIndex - 1;
    setLightbox({ productIndex: lightbox.productIndex, imageIndex: previousIndex });
  };

  const goToNextImage = () => {
    if (!lightbox) return;
    const product = products[lightbox.productIndex];
    const lastIndex = product.images.length - 1;
    const nextIndex = lightbox.imageIndex === lastIndex ? 0 : lightbox.imageIndex + 1;
    setLightbox({ productIndex: lightbox.productIndex, imageIndex: nextIndex });
  };

  return (
    <section className={styles.page}>
      <SectionHeader
        kicker="Maquinaria industrial"
        title="Catalogo de productos"
        subtitle="Equipos y componentes listos para operar en entornos exigentes. Diseñados para reducir paros, mejorar la eficiencia y mantener la produccion en movimiento."
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
          className={filter === "banda" ? styles.filterActive : styles.filter}
          type="button"
          onClick={() => setFilter("banda")}
          aria-pressed={filter === "banda"}
        >
          Banda transportadora
        </button>
        <button
          className={
            filter === "rodilleria" ? styles.filterActive : styles.filter
          }
          type="button"
          onClick={() => setFilter("rodilleria")}
          aria-pressed={filter === "rodilleria"}
        >
          Rodilleria
        </button>
        <button
          className={filter === "poleas" ? styles.filterActive : styles.filter}
          type="button"
          onClick={() => setFilter("poleas")}
          aria-pressed={filter === "poleas"}
        >
          Poleas
        </button>
        <button
          className={
            filter === "reductores" ? styles.filterActive : styles.filter
          }
          type="button"
          onClick={() => setFilter("reductores")}
          aria-pressed={filter === "reductores"}
        >
          Reductores
        </button>
      </div>
      <div className={styles.grid}>
        {visibleProducts.map((product) => {
          const productIndex = products.findIndex((item) => item.name === product.name);
          return (
          <ProductCard
            key={product.name}
            product={product}
            productIndex={productIndex}
            onImageClick={(nextProductIndex, imageIndex) =>
              setLightbox({ productIndex: nextProductIndex, imageIndex })
            }
          />
          );
        })}
      </div>
      {lightbox && activeProduct && activeImage ? (
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
            {activeProduct.images.length > 1 ? (
              <>
                <button
                  className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPreviousImage();
                  }}
                >
                  ‹
                </button>
                <button
                  className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                  type="button"
                  aria-label="Imagen siguiente"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNextImage();
                  }}
                >
                  ›
                </button>
              </>
            ) : null}
            <Image
              src={activeImage}
              alt={`${activeProduct.name} vista ${lightbox.imageIndex + 1}`}
              className={styles.lightboxImage}
              sizes="(max-width: 900px) 92vw, 900px"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
