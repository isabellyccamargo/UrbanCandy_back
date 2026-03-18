// Esse arquivo lê o arquivo .properties e guarda as mensagens em memória.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath: string = path.resolve(
  __dirname,
  "../config/errors_messages.properties"
);

const file: string = fs.readFileSync(filePath, "utf-8");

const messages: Record<string, string> = {};

file.split("\n").forEach((line: string) => {

  const [key, ...value] = line.split("=");

  if (key && value.length) {
    messages[key.trim()] = value.join("=").trim();
  }

});

export function getErrorMessage(code: string): string {
  return messages[code] ?? "Erro desconhecido";
}