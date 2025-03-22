// src/components/DatabaseForm.tsx
import React, { useState } from "react";
import { DbConfig } from "../types/dbTypes.ts";

interface DatabaseFormProps {
  onConnect: (config: DbConfig) => void;
}

const DatabaseForm: React.FC<DatabaseFormProps> = ({ onConnect }) => {
  const [client, setClient] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [database, setDatabase] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [port, setPort] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const config: DbConfig = { client, host, user, password, database, token, port };
    onConnect(config);  // Llamamos a la función onConnect que pasamos como prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={client} onChange={(e) => setClient(e.target.value)}>
        <option value="" disabled>Select Client</option>
        <option value="mysql2">MySQL</option>
        <option value="sqlite3">SQLite</option>
        <option value="libsql">LibSQL</option>
      </select>
      <input
      type="text"
      value={host}
      onChange={(e) => setHost(e.target.value)}
      placeholder="Host"
      />
      <input
      type="text"
      value={user}
      onChange={(e) => setUser(e.target.value)}
      placeholder="User"
      />
      <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      />
      <input
      type="text"
      value={database}
      onChange={(e) => setDatabase(e.target.value)}
      placeholder="Database"
      />
      <input
      type="text"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      placeholder="Token"
      />
      <input
      type="text"
      value={port}
      onChange={(e) => setPort(e.target.value)}
      placeholder="Port"
      />
      <button type="submit">Connect</button>
    </form>
  );
};

export default DatabaseForm;
