import { promises as fs } from "fs";
import path from "path";

export type QuoteItem = {
  cantidad: number;
  descripcion: string;
  numeroParte: string;
  existencia: number;
  entrega: string;
  precioUnitario: number;
  unidad: string;
};

export type QuotePayload = {
  folio?: string;
  clientName: string;
  workerName: string;
  quoteDate: string;
  validity: string;
  notes: string[];
  items: QuoteItem[];
};

export type FolioRegistry = {
  base_folio: number;
  last_folio: number;
  history: Array<{
    folio: string;
    client_name: string;
    worker_name: string;
    quote_date: string;
    generated_at: string;
    item_count: number;
    file_name: string;
    file_type: "xlsx";
  }>;
};

const registryPath = path.join(
  process.cwd(),
  "app",
  "area-interna",
  "cotizador",
  "data",
  "folio-registro.json"
);

export function sanitizeFilePart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

export async function readRegistry() {
  const raw = await fs.readFile(registryPath, "utf8");
  return JSON.parse(raw) as FolioRegistry;
}

export async function writeRegistry(registry: FolioRegistry) {
  await fs.writeFile(registryPath, JSON.stringify(registry, null, 2), "utf8");
}

export function buildFolioNumber(lastFolio: number, baseFolio: number) {
  return Math.max(lastFolio + 1, baseFolio);
}

export function buildDownloadName(clientName: string, folio: string, extension: "xlsx") {
  const clientPart = sanitizeFilePart(clientName || "cliente");
  const folioPart = sanitizeFilePart(folio);
  return `${clientPart}_${folioPart}.${extension}`;
}
