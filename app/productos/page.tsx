"use client";

import Image, { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

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

type Product = {
  name: string;
  description: string;
  images: StaticImageData[];
  category: "banda" | "rodilleria" | "poleas";
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
  },
];

function ProductCard({
  product,
  onImageClick,
}: {
  product: Product;
  onImageClick: (image: StaticImageData, label: string) => void;
}) {
  const whatsappNumber = "523312423096";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hola, quiero mas informacion sobre ${product.name}.`,
  )}`;

  return (
    <article className={styles.card}>
      <button
        className={styles.heroImage}
        type="button"
        onClick={() => onImageClick(product.images[0], product.name)}
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
            onClick={() => onImageClick(image, product.name)}
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
      <a
        className={styles.whatsapp}
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className={styles.whatsappIcon}
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M16.02 3C9.39 3 4 8.39 4 15.02c0 2.65.86 5.12 2.33 7.12L4 29l7.08-2.27a12 12 0 0 0 4.94 1.04h.01c6.63 0 12.02-5.39 12.02-12.02C28.05 8.39 22.65 3 16.02 3Zm0 2.4a9.62 9.62 0 0 1 9.63 9.62c0 5.3-4.33 9.62-9.63 9.62h-.01a9.5 9.5 0 0 1-4.54-1.15l-.62-.33-4.1 1.31 1.34-3.99-.4-.65a9.5 9.5 0 0 1-1.67-5.41A9.62 9.62 0 0 1 16.02 5.4Zm-2.78 5.7c-.24 0-.53.08-.8.38-.27.3-1.03 1-1.03 2.44s1.06 2.82 1.2 3.02c.14.2 2.05 3.28 5.08 4.47 2.52.99 3.04.79 3.59.74.55-.05 1.77-.73 2.02-1.44.25-.7.25-1.31.18-1.44-.07-.13-.27-.2-.56-.35-.3-.15-1.77-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.64.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.14-.14.3-.37.46-.56.15-.2.2-.33.3-.55.1-.23.05-.43-.02-.58-.08-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5Z" />
        </svg>
        Cotizar
      </a>
    </article>
  );
}

export default function Productos() {
  const [lightbox, setLightbox] = useState<{
    image: StaticImageData;
    label: string;
  } | null>(null);
  const [filter, setFilter] = useState<"todos" | Product["category"]>("todos");

  const visibleProducts = useMemo(() => {
    if (filter === "todos") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Maquinaria industrial</p>
        <h1 className={styles.title}>Catalogo de productos</h1>
        <p className={styles.subtitle}>
          Equipos y componentes listos para operar en entornos exigentes.
          Diseñados para reducir paros, mejorar la eficiencia y mantener la
          produccion en movimiento.
        </p>
      </header>
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
      </div>
      <div className={styles.grid}>
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onImageClick={(image, label) => setLightbox({ image, label })}
          />
        ))}
      </div>
      {lightbox ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            className={styles.lightboxInner}
            type="button"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightbox.image}
              alt={lightbox.label}
              className={styles.lightboxImage}
              sizes="(max-width: 900px) 92vw, 900px"
              priority
            />
          </button>
        </div>
      ) : null}
    </section>
  );
}
