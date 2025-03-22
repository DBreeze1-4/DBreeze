import knex from "knex";
import Client_LibSQL from '@libsql/knex-libsql';

// Crear la conexión a la base de datos de forma dinámica
export const createDatabaseConnection = ({ client, host, user, password, database, token, port }) => {
  const config = {
    client: client,  // mysql o sqlite
    connection: {},
  };

  if (client === 'mysql2') {
    config.connection = {
      host: host,
      user: user,
      password: password,
      database: database,
      port: port || 3306,
    };
  } else if (client === 'sqlite3') {
    config.connection = {
      filename: database,  // Ruta del archivo SQLite local
    };
  } else if (client === 'libsql') {
    config.client = Client_LibSQL
    config.connection = {
      filename: database + "?authToken=" + token,  // URL de la base de datos
    };
    config.useNullAsDefault = true;
  }

  return knex(config);
};
