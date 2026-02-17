export class InternalServerError extends Error {
  constructor({ cause }) {
    super(
      "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.",
      cause,
    );
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte caso o problema persista";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
