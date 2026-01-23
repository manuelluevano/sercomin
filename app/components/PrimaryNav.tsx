"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
];

export default function PrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-shell">
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
      </nav>
    </div>
  );
}
