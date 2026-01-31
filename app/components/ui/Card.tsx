import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardVariant = "surface" | "elevated" | "soft";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = {
  children: ReactNode;
  as?: "div" | "section" | "article";
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
};

export default function Card({
  children,
  as: Tag = "div",
  variant = "surface",
  padding = "md",
  className,
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[padding],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
