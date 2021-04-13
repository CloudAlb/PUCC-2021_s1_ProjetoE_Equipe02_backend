class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    // TODO, consertar
    this.statusCode = 200;
  }
}

export default AppError;
