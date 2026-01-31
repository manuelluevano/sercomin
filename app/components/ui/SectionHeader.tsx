import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={[
        styles.header,
        align === "center" ? styles.center : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
