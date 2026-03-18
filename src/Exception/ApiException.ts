// Essa classe representa um erro da API.

import { getErrorMessage } from "../Utils/ErrorMessages.js";

type ErrorParam = string | number;

export class ApiException extends Error {

  public readonly code: string;
  public readonly status: number;

  constructor(code: string, status: number, ...params: ErrorParam[]) {

    const template: string = getErrorMessage(code);

    const message: string = formatMessage(template, params);

    super(message);

    this.code = code;
    this.status = status;
  }
}

// Função que substitui os {}
function formatMessage(message: string, params: ErrorParam[]): string {

  let formatted: string = message;

  params.forEach((param: ErrorParam) => {
    formatted = formatted.replace("{}", String(param));
  });

  return formatted;
}