import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "./components/tremor/Button";
import DatabaseForm from "./components/DatabaseForm";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { signOut } from "../backend/firebase/login";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getAllDatabaseConnections } from "../backend/firebase/connections";
import TableList from "./components/TableList";
import { DbConfig } from "./types/dbTypes";

const user = localStorage.getItem("user");
const userId = user ? JSON.parse(user!).uid : "";

const Layout = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  interface Connection {
    name: string;
    dbConfig: DbConfig;
  }

  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedTable, setSelectedTable] = useState(null); // New state for selected table
  const [selectedDbConfig, setSelectedDbConfig] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try { // Replace with actual user ID logic
        const fetchedConnections = await getAllDatabaseConnections(userId);
        setConnections(fetchedConnections);
      } catch (error) {
        console.error("Error fetching database connections:", error);
      }
    };

    fetchConnections();
  }, []);

  const handleConnect = () => {
    setIsPopupVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleTableSelect = (table, dbConfig) => {
    setSelectedTable(table); // Update selected table
    setSelectedDbConfig(dbConfig);
  };

  return (
    <div className="flex h-screen">
      {/* Barra lateral fija */}
      <nav className="w-64 bg-gray-900 text-white p-5 border-r border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <img src="/dbreeze.png" className="w-10"></img>
          <h2 className="text-2xl font-bold">DBreeze</h2>
        </div>
        <ul>
          <li className="mb-2">
            <Link to="/" className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium transition text-gray-300 hover:text-white hover:bg-gray-100 hover:dark:bg-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/content" className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium transition text-gray-300 hover:text-white hover:bg-gray-100 hover:dark:bg-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
              </svg>Content
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/overview" className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium transition text-gray-300 hover:text-white hover:bg-gray-100 hover:dark:bg-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>Overview
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/settings" className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium transition text-gray-300 hover:text-white hover:bg-gray-100 hover:dark:bg-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>Settings
            </Link>
          </li>
        </ul>
        <Button
          variant="primary"
          className="my-4 gap-2"
          onClick={() => setIsPopupVisible(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add connection
        </Button>
        <div>
          <span className="text-xs font-medium leading-6 text-gray-500">
            Databases
          </span>
          <ul className="mt-2">
            {connections.map((connection, index) => (
              <li key={index} className="mb-2">
                {connection.name}
                <TableList dbConfig={connection.dbConfig} onTableSelect={ handleTableSelect } />
              </li>
            ))}
          </ul>
        </div>
        <Button variant="primary" className="my-4 gap-2" onClick={signOut}>Cerrar sesión</Button>
      </nav>

      {/* Contenido dinámico */}
      <main className="flex-1 p-8">
        <Outlet context={{ selectedTable, selectedDbConfig }} /> {/* Pass selectedTable as context */}
      </main>

      {/* Popup for DatabaseForm */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg relative text-white text-lg">
            <h2 className="text-lg font-bold ml-4">Add connection</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPopupVisible(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <DatabaseForm onConnect={ handleConnect } />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
