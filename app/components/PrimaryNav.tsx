"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos/", label: "Productos" },
  { href: "/servicios/", label: "Servicios" },
  { href: "/contacto/", label: "Contacto" },
  { href: "/sobre-nosotros/", label: "Sobre nosotros" },
];

export default function PrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={`nav-shell${open ? " nav-shell-open" : ""}`}>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <nav className={`nav${open ? " nav-open" : ""}`} id="primary-nav">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const className = isActive ? "is-active" : undefined;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={className}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="socials nav-socials" aria-label="Redes sociales">
          <a
            className="social facebook"
            href="https://www.facebook.com/sercomin1/?locale=es_LA"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M19 12h3.2V8.6H19c-2.8 0-4.6 1.8-4.6 4.6v2.2H12v3.4h2.4V28h3.6v-9.2h3l.4-3.4H18v-1.8c0-.9.5-1.6 1.6-1.6Z" />
            </svg>
          </a>
          <a
            className="social tiktok"
            href="https://www.tiktok.com/@sercomin.mx"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M23.8 6.2c1.4 1 3 1.6 4.7 1.6v4.2c-1.9 0-3.7-.5-5.3-1.3v8.6c0 3.9-3.2 7.1-7.1 7.1S9 23.1 9 19.2s3.2-7.1 7.1-7.1c.4 0 .9.1 1.3.2v4.3c-.4-.2-.8-.3-1.3-.3-1.5 0-2.8 1.3-2.8 2.8s1.3 2.8 2.8 2.8 2.8-1.3 2.8-2.8V3.6h4.2c.1 1 .6 1.9 1.5 2.6Z" />
            </svg>
          </a>
          <a
            className="social whatsapp"
            href="https://wa.me/523312423096"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16.02 3C9.39 3 4 8.39 4 15.02c0 2.65.86 5.12 2.33 7.12L4 29l7.08-2.27a12 12 0 0 0 4.94 1.04h.01c6.63 0 12.02-5.39 12.02-12.02C28.05 8.39 22.65 3 16.02 3Zm0 2.4a9.62 9.62 0 0 1 9.63 9.62c0 5.3-4.33 9.62-9.63 9.62h-.01a9.5 9.5 0 0 1-4.54-1.15l-.62-.33-4.1 1.31 1.34-3.99-.4-.65a9.5 9.5 0 0 1-1.67-5.41A9.62 9.62 0 0 1 16.02 5.4Zm-2.78 5.7c-.24 0-.53.08-.8.38-.27.3-1.03 1-1.03 2.44s1.06 2.82 1.2 3.02c.14.2 2.05 3.28 5.08 4.47 2.52.99 3.04.79 3.59.74.55-.05 1.77-.73 2.02-1.44.25-.7.25-1.31.18-1.44-.07-.13-.27-.2-.56-.35-.3-.15-1.77-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.64.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.14-.14.3-.37.46-.56.15-.2.2-.33.3-.55.1-.23.05-.43-.02-.58-.08-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5Z" />
            </svg>
          </a>
          <a
            className="social phone"
            href="tel:+523312423096"
            aria-label="Llamar"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 2.9c.3-.3.7-.4 1.1-.3l2.8.9c.4.1.7.4.8.8l.6 2.6c.1.4 0 .8-.3 1.1l-1.6 1.6c1 1.9 2.5 3.4 4.4 4.4l1.6-1.6c.3-.3.7-.4 1.1-.3l2.6.6c.4.1.7.4.8.8l.9 2.8c.1.4 0 .8-.3 1.1l-1.4 1.4c-.4.4-1 .6-1.6.5-7.4-1.1-13.2-6.9-14.3-14.3-.1-.6.1-1.2.5-1.6L6.6 2.9Z" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}
