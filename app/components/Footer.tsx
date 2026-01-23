import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-title">Sercomin</p>
          <p className="footer-copy">Maquinaria industrial y componentes.</p>
        </div>
        <div className="footer-links">
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/sobre-nosotros">Sobre nosotros</Link>
        </div>
      </div>
    </footer>
  );
}
