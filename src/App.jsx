import Tbox from "./components/Tbox"; // Assuming Tbox is already a functional component
import Host from "./components/Host"; // Assuming Host is already converted to functional
import Orders from "./components/Orders"; // Assuming Orders is already functional

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex items-center justify-center py-4 bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold text-blue-700">NAV-APP</h1>
      </header>
      <main className="flex flex-grow p-4">
        <Tbox />
        <Host />
        <Orders />
      </main>
    </div>
  );
}

export default App;
