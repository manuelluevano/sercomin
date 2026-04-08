"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import catalogData from "./data/catalogo.json";
import styles from "./cotizador.module.css";

type ProductFamily = "Rodilleria";
type ProductSeries = "Carga" | "Impacto" | "Retorno" | "Triple";
type ProductMeasure = '24"' | '30"' | '36"' | '42"';

type CatalogItem = {
  id: string;
  familia: ProductFamily;
  serie: ProductSeries;
  medida: ProductMeasure;
  descripcion: string;
  numeroParte: string;
  existencia: number;
  entrega: string;
  precioUnitario: number;
  unidad: string;
};

type QuoteItem = CatalogItem & {
  cantidad: number;
};

type MobileStep = 1 | 2 | 3 | 4 | 5;

const ACCESS_KEY = "SERCOMIN_COTIZADOR_SESSION";
const ACCESS_WORKER_KEY = "SERCOMIN_COTIZADOR_WORKER";
const BASE_FOLIO = 202601210;
const IVA_RATE = 0.16;
const ACCESS_CODES: Record<string, string> = {
  "sercomin-manuel": "Manuel Luevano",
  "sercomin-leo": "Leonardo Luevano",
};
const DEFAULT_NOTES = [
  "** Precios en PESOS",
  "** Precios mas el 16% de IVA",
  "** LAB: Guadalajara",
  "** Tiempo de entrega segun producto",
  "** Precios y existencia sujeta a cambios",
  "** Vigencia de cotizacion 15 DIAS",
  "** Sujeto a disponibilidad",
  "** Penalizacion por cancelacion del 40%",
];

const catalog = catalogData as CatalogItem[];
const families = [...new Set(catalog.map((item) => item.familia))] as ProductFamily[];
const series = [...new Set(catalog.map((item) => item.serie))] as ProductSeries[];
const measures = [...new Set(catalog.map((item) => item.medida))] as ProductMeasure[];

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDateInput(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CotizadorInterno() {
  const clientNameInputRef = useRef<HTMLInputElement>(null);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [generateError, setGenerateError] = useState("");
  const [clientError, setClientError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileStep, setMobileStep] = useState<MobileStep>(1);
  const [quantityDrafts, setQuantityDrafts] = useState<Record<string, string>>({});
  const [selectedQuantityDraft, setSelectedQuantityDraft] = useState("1");
  const [family, setFamily] = useState<ProductFamily>(families[0]);
  const [seriesValue, setSeriesValue] = useState<ProductSeries>(series[0]);
  const [measure, setMeasure] = useState<ProductMeasure>(measures[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [folio, setFolio] = useState(BASE_FOLIO);
  const [clientName, setClientName] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [quoteDate, setQuoteDate] = useState(formatDateInput());
  const [validity, setValidity] = useState("15 DIAS");

  useEffect(() => {
    const saved = window.sessionStorage.getItem(ACCESS_KEY);
    const savedWorker = window.sessionStorage.getItem(ACCESS_WORKER_KEY);

    if (saved === "ok") {
      setAuthorized(true);
    }

    if (savedWorker) {
      setWorkerName(savedWorker);
    }

    fetch("/api/cotizacion-xlsx")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }

        return (await response.json()) as { next_folio: number };
      })
      .then((data) => setFolio(data.next_folio))
      .catch(() => setFolio(BASE_FOLIO))
      .finally(() => setIsCheckingAccess(false));
  }, []);

  const selectedItem = useMemo(
    () =>
      catalog.find(
        (item) =>
          item.familia === family && item.serie === seriesValue && item.medida === measure
      ) ?? catalog[0],
    [family, seriesValue, measure]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0),
    [items]
  );
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;
  const printableFolio = `SRCM NO. ${folio}`;
  const needsWorkerCode = authorized && !workerName;
  const canGoToProductsStep = clientName.trim().length > 0;
  const canGoToReviewStep = items.length > 0;

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCode = code.trim().toLowerCase();
    const worker = ACCESS_CODES[normalizedCode];

    if (!worker) {
      setAccessError("Clave incorrecta.");
      return;
    }

    window.sessionStorage.setItem(ACCESS_KEY, "ok");
    window.sessionStorage.setItem(ACCESS_WORKER_KEY, worker);
    setAuthorized(true);
    setWorkerName(worker);
    setAccessError("");
  }

  function handleAddItem() {
    if (!selectedItem || selectedQuantity <= 0) {
      return;
    }

    setItems((current) => {
      const existing = current.find((item) => item.id === selectedItem.id);

      if (existing) {
        return current.map((item) =>
          item.id === selectedItem.id
            ? { ...item, cantidad: item.cantidad + selectedQuantity }
            : item
        );
      }

      return [...current, { ...selectedItem, cantidad: selectedQuantity }];
    });

    setMobileStep(3);
    setSelectedQuantity(1);
    setSelectedQuantityDraft("1");
  }

  function updateSelectedQuantity(rawValue: string) {
    const sanitizedValue = rawValue.replace(/[^\d]/g, "");
    const normalizedValue = sanitizedValue.replace(/^0+(?=\d)/, "");

    setSelectedQuantityDraft(normalizedValue);

    if (normalizedValue.trim() === "") {
      return;
    }

    const cantidad = Number(normalizedValue);
    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return;
    }

    setSelectedQuantity(cantidad);
  }

  function commitSelectedQuantity() {
    const cantidad = Number(selectedQuantityDraft);

    if (!selectedQuantityDraft.trim() || Number.isNaN(cantidad) || cantidad <= 0) {
      setSelectedQuantityDraft(String(selectedQuantity));
      return;
    }

    setSelectedQuantity(cantidad);
    setSelectedQuantityDraft(String(cantidad));
  }

  function updateQuantity(id: string, rawValue: string) {
    const sanitizedValue = rawValue.replace(/[^\d]/g, "");
    const normalizedValue = sanitizedValue.replace(/^0+(?=\d)/, "");

    setQuantityDrafts((current) => ({ ...current, [id]: normalizedValue }));

    if (normalizedValue.trim() === "") {
      return;
    }

    const cantidad = Number(normalizedValue);
    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return;
    }

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  }

  function commitQuantity(id: string) {
    const draft = quantityDrafts[id];

    if (draft === undefined) {
      return;
    }

    const cantidad = Number(draft);
    if (!draft.trim() || Number.isNaN(cantidad) || cantidad <= 0) {
      const currentItem = items.find((item) => item.id === id);
      setQuantityDrafts((current) => ({
        ...current,
        [id]: currentItem ? String(currentItem.cantidad) : "1",
      }));
      return;
    }

    setQuantityDrafts((current) => ({
      ...current,
      [id]: String(cantidad),
    }));
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    setQuantityDrafts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  async function handleDownloadXlsx() {
    const normalizedClientName = clientName.trim();

    if (!normalizedClientName) {
      setClientError("Nombre del cliente obligatorio.");
      setGenerateError("Captura el nombre del cliente para descargar el formato.");
      clientNameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      clientNameInputRef.current?.focus();
      return;
    }

    try {
      setIsGenerating(true);
      setGenerateError("");
      setClientError("");

      const response = await fetch("/api/cotizacion-xlsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: normalizedClientName,
          workerName,
          quoteDate,
          validity,
          notes: DEFAULT_NOTES,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const blob = await response.blob();
      const fileName =
        response.headers.get("Content-Disposition")?.match(/filename="(.+)"/)?.[1] ??
        `${printableFolio}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);

      const nextFolio = Number(response.headers.get("X-Next-Folio"));
      if (Number.isFinite(nextFolio)) {
        setFolio(nextFolio);
      }
    } catch (error) {
      setGenerateError(
        error instanceof Error ? error.message : "No se pudo generar el Excel desde la plantilla."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function goToStep(step: MobileStep) {
    if (step === 2 && !canGoToProductsStep) {
      setClientError("Nombre del cliente obligatorio.");
      clientNameInputRef.current?.focus();
      return;
    }

    if ((step === 3 || step === 4 || step === 5) && !canGoToReviewStep) {
      return;
    }

    setMobileStep(step);
  }

  if (isCheckingAccess) {
    return <section className={styles.page} />;
  }

  if (!authorized || needsWorkerCode) {
    return (
      <section className={styles.lockScreen}>
        <div className={styles.lockCard}>
          <p className={styles.kicker}>Area interna</p>
          <h1 className={styles.lockTitle}>
            {needsWorkerCode
              ? "Identifica al trabajador"
              : "Cotizador privado para vendedores"}
          </h1>
          <p className={styles.lockCopy}>
            {needsWorkerCode
              ? "Falta identificar al vendedor. Ingresa el codigo para colocar su nombre en la cotizacion."
              : "Esta seccion solo desbloquea el flujo interno para generar el Excel de cotizacion."}
          </p>
          <form className={styles.lockForm} onSubmit={handleUnlock}>
            <label className={styles.fieldLabel} htmlFor="access-code">
              Clave de acceso
            </label>
            <input
              id="access-code"
              className={styles.input}
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Ingresa la clave"
            />
            {accessError ? <p className={styles.error}>{accessError}</p> : null}
            <button className={styles.primaryButton} type="submit">
              Entrar al cotizador
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.kicker}>Seccion oculta / vendedores</p>
          <h1 className={styles.title}>Cotizador SERCOMIN</h1>
        </div>
      </div>
      {generateError ? <p className={styles.error}>{generateError}</p> : null}

      <div className={styles.mobileWizard}>
        <div className={styles.mobileStepHeader}>
          <p className={styles.mobileStepLabel}>Paso {mobileStep} de 5</p>
          <div className={styles.mobileProgress}>
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`${styles.mobileProgressDot} ${
                  mobileStep >= step ? styles.mobileProgressDotActive : ""
                }`}
              />
            ))}
          </div>
        </div>

        {mobileStep === 1 ? (
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Cliente</h2>
              <span className={styles.badge}>{printableFolio}</span>
            </div>
            <div className={styles.mobileStepContent}>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Nombre del cliente</span>
                <input
                  ref={clientNameInputRef}
                  className={styles.input}
                  value={clientName}
                  onChange={(event) => {
                    setClientName(event.target.value);
                    if (clientError) {
                      setClientError("");
                    }
                  }}
                  placeholder="Ingresa el nombre del cliente"
                />
                {clientError ? <p className={styles.inlineError}>{clientError}</p> : null}
              </label>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Fecha</span>
                <input
                  className={styles.input}
                  type="date"
                  value={quoteDate}
                  onChange={(event) => setQuoteDate(event.target.value)}
                />
              </label>
            </div>
            <div className={styles.mobileStepActions}>
              <button className={styles.primaryButton} type="button" onClick={() => goToStep(2)}>
                Siguiente
              </button>
            </div>
          </article>
        ) : null}

        {mobileStep === 2 ? (
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Producto</h2>
              <span className={styles.badge}>Rodilleria</span>
            </div>
            <div className={styles.mobileStepContent}>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Familia</span>
                <select
                  className={styles.select}
                  value={family}
                  onChange={(event) => setFamily(event.target.value as ProductFamily)}
                >
                  {families.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Sub serie</span>
                <select
                  className={styles.select}
                  value={seriesValue}
                  onChange={(event) => setSeriesValue(event.target.value as ProductSeries)}
                >
                  {series.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Medida</span>
                <select
                  className={styles.select}
                  value={measure}
                  onChange={(event) => setMeasure(event.target.value as ProductMeasure)}
                >
                  {measures.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.fieldWide}>
                <span className={styles.fieldLabel}>Cantidad</span>
                <input
                  className={styles.input}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={selectedQuantityDraft}
                  onFocus={(event) => event.currentTarget.select()}
                  onChange={(event) => updateSelectedQuantity(event.target.value)}
                  onBlur={commitSelectedQuantity}
                />
              </label>
              <div className={styles.snapshot}>
                <span>Descripcion: {selectedItem.descripcion}</span>
                <span>Precio: {formatMoney(selectedItem.precioUnitario)}</span>
                <span>Stock: {selectedItem.existencia}</span>
                <span>Entrega: {selectedItem.entrega}</span>
              </div>
            </div>
            <div className={styles.mobileStepActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => goToStep(1)}>
                Atras
              </button>
              <button className={styles.primaryButton} type="button" onClick={handleAddItem}>
                Agregar producto
              </button>
            </div>
          </article>
        ) : null}

        {mobileStep === 3 ? (
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Productos</h2>
              <span className={styles.badge}>{items.length} agregados</span>
            </div>
            <div className={styles.mobileItemsForce}>
              {items.length === 0 ? (
                <p className={styles.emptyState}>No hay productos todavia.</p>
              ) : (
                items.map((item) => (
                  <article key={`wizard-${item.id}`} className={styles.mobileItemCard}>
                    <div className={styles.mobileItemTop}>
                      <strong>{item.descripcion}</strong>
                      <button
                        className={styles.tableAction}
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        Quitar
                      </button>
                    </div>
                    <div className={styles.mobileItemMeta}>
                      <span>P.U.: {formatMoney(item.precioUnitario)}</span>
                      <span>Subtotal: {formatMoney(item.cantidad * item.precioUnitario)}</span>
                    </div>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Cantidad</span>
                      <input
                        className={styles.tableInput}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={quantityDrafts[item.id] ?? String(item.cantidad)}
                        onFocus={(event) => event.currentTarget.select()}
                        onChange={(event) => updateQuantity(item.id, event.target.value)}
                        onBlur={() => commitQuantity(item.id)}
                      />
                    </label>
                  </article>
                ))
              )}
            </div>
            <div className={styles.mobileStepActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => goToStep(2)}>
                Agregar otro
              </button>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => goToStep(4)}
                disabled={!canGoToReviewStep}
              >
                Vista previa
              </button>
            </div>
          </article>
        ) : null}

        {mobileStep === 4 ? (
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Vista previa</h2>
              <span className={styles.badge}>Cotizacion</span>
            </div>
            <div className={styles.document}>
              <div className={styles.documentTop}>
                <div>
                  <p className={styles.documentLabel}>Cotizacion</p>
                  <h3 className={styles.documentNumber}>{printableFolio}</h3>
                </div>
                <div className={styles.documentMeta}>
                  <p className={styles.documentDate}>Fecha: {quoteDate}</p>
                  <p className={styles.documentDate}>Cliente: {clientName}</p>
                </div>
              </div>

              <div className={styles.previewTableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Cantidad</th>
                      <th>Descripcion</th>
                      <th>No. parte</th>
                      <th>P.U.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={`preview-${item.id}`}>
                        <td>{item.cantidad}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.numeroParte || "-"}</td>
                        <td>{formatMoney(item.precioUnitario)}</td>
                        <td>{formatMoney(item.cantidad * item.precioUnitario)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.summaryTotals}>
                <div><span>SUMA</span><strong>{formatMoney(subtotal)}</strong></div>
                <div><span>IVA 16%</span><strong>{formatMoney(iva)}</strong></div>
                <div><span>TOTAL</span><strong>{formatMoney(total)}</strong></div>
              </div>

              <div className={styles.notesList}>
                {DEFAULT_NOTES.map((note) => (
                  <p key={note}>{note.replace("15 DIAS", validity)}</p>
                ))}
              </div>
            </div>
            <div className={styles.mobileStepActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => goToStep(3)}>
                Atras
              </button>
              <button className={styles.primaryButton} type="button" onClick={() => goToStep(5)}>
                Continuar
              </button>
            </div>
          </article>
        ) : null}

        {mobileStep === 5 ? (
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Descargar</h2>
              <span className={styles.badge}>Final</span>
            </div>
            <div className={styles.summaryPanel}>
              <div className={styles.summaryRow}>
                <span>Cliente</span>
                <strong>{clientName || "Pendiente"}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Folio</span>
                <strong>{printableFolio}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Productos</span>
                <strong>{items.length}</strong>
              </div>
            </div>
            <div className={styles.mobileStepActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => goToStep(4)}>
                Atras
              </button>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={handleDownloadXlsx}
                disabled={isGenerating}
              >
                {isGenerating ? "Generando..." : "Descargar Excel"}
              </button>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
