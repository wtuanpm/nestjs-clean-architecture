export interface DatabaseConfig {
  getPort(): string;
  getMongoUri(): string;
}
