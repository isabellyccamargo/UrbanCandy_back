// Garante que toda resposta enviada tenha a mesma estrutura
export interface ErrorResponse {
  code: string
  message: string
}