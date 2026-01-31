import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "outline" | "ghost" | "dark" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export default function Button({
  children,
  href,
  external = false,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a
          className={classes}
          href={href}
          onClick={onClick}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
