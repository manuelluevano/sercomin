import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import {
  buildDownloadName,
  buildFolioNumber,
  readRegistry,
  writeRegistry,
  type QuotePayload,
} from "../cotizacion-shared";

const execFileAsync = promisify(execFile);
const scriptPath = path.join(process.cwd(), "scripts", "generate_quote_xlsx.py");

export const runtime = "nodejs";

export async function GET() {
  try {
    const registry = await readRegistry();
    const nextFolioNumber = buildFolioNumber(registry.last_folio, registry.base_folio);

    return Response.json({ next_folio: nextFolioNumber });
  } catch (error) {
    console.error(error);
    return new Response("No se pudo obtener el siguiente folio.", { status: 500 });
  }
}

export async function POST(request: Request) {
  let tempDir = "";

  try {
    const payload = (await request.json()) as QuotePayload;
    const registry = await readRegistry();
    const nextFolioNumber = buildFolioNumber(registry.last_folio, registry.base_folio);
    const folio = `SRCM NO. ${nextFolioNumber}`;
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sercomin-quote-xlsx-"));

    const payloadPath = path.join(tempDir, "payload.json");
    await fs.writeFile(payloadPath, JSON.stringify({ ...payload, folio }), "utf8");

    const { stdout, stderr } = await execFileAsync("python3", [scriptPath, payloadPath, tempDir], {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
    });

    if (stderr) {
      console.error(stderr);
    }

    const result = JSON.parse(stdout) as { xlsx_path: string; file_name: string };
    const xlsxBuffer = await fs.readFile(result.xlsx_path);
    const downloadName = buildDownloadName(payload.clientName, folio, "xlsx");

    registry.last_folio = nextFolioNumber;
    registry.history.push({
      folio,
      client_name: payload.clientName,
      worker_name: payload.workerName,
      quote_date: payload.quoteDate,
      generated_at: new Date().toISOString(),
      item_count: payload.items.length,
      file_name: downloadName,
      file_type: "xlsx",
    });
    await writeRegistry(registry);
    const followingFolio = buildFolioNumber(registry.last_folio, registry.base_folio);

    return new Response(xlsxBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "X-Next-Folio": String(followingFolio),
      },
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "No se pudo generar el Excel desde la plantilla.";

    return new Response(message, { status: 500 });
  } finally {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }
}
