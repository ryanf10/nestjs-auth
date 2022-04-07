export interface IDatabaseConfigAttributes {
  dialect?: string;
  host?: string;
  port?: string | number;
  database?: string;
  username?: string;
  password?: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
