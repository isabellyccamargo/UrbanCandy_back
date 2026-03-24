// Esse arquivo lê o arquivo .properties e guarda as mensagens em memória.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath: string = path.join(__dirname, "..", "config", "errors_messages.properties");

const messages: Record<string, string> = {};

try {
  const fileContent: string = fs.readFileSync(filePath, "utf-8");

  fileContent.split(/\r?\n/).forEach((line: string) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) return;

    const [key, ...valueParts] = trimmedLine.split("=");

    if (key && valueParts.length > 0) {
      messages[key.trim()] = valueParts.join("=").trim();
    }
  });
} catch (error) {
  console.error(`🚨 Erro crítico: Não foi possível ler o arquivo de mensagens em ${filePath}`);
}
const file: string = fs.readFileSync(filePath, "utf-8");

file.split("\n").forEach((line: string) => {
  const [key, ...value] = line.split("=");
  if (key && value.length) {
    messages[key.trim()] = value.join("=").trim();
  }
});

export function getErrorMessage(code: string): string {
  return messages[code] ?? `[${code}] (Mensagem não definida)`;
}