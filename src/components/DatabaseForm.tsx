// src/components/DatabaseForm.tsx
import React, { useState } from "react";
import { DbConfig } from "../types/dbTypes.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { saveDatabaseConnection } from "../../backend/firebase/connections";

interface DatabaseFormProps {
  onConnect: (config: DbConfig) => void;
}

const user = localStorage.getItem("user");
const userId = user ? JSON.parse(user!).uid : "";

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
    saveDatabaseConnection(userId, config.database, config); // Call saveDatabaseConnection
    onConnect(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg max-w-md mx-auto space-y-4"
    >
      <select
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
      >
        <option className="text-white" value="" disabled>Select Client</option>
        <option className="text-white" value="mysql2">MySQL</option>
        <option className="text-white" value="sqlite3">SQLite</option>
        <option className="text-white" value="libsql">LibSQL</option>
      </select>
      { client === "mysql2" && <div className="flex justify-between gap-2">
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="Host"
          className="w-auto p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
          className="w-auto p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div> }
      { client === "mysql2" && <div className="flex justify-between gap-2">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User"
          className="w-auto p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-auto p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>}
      <input
        type="text"
        value={database}
        onChange={(e) => setDatabase(e.target.value)}
        placeholder={ "Database" + (client === "sqlite3" ? " file path" : client === "libsql" ? " url" : " name") }
        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
      />
      { client === "libsql" && <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Token"
        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
      /> }
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect
      </button>
    </form>
  );
};

export default DatabaseForm;
