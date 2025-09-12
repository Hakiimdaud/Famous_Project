import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInfluencer from "./pages/AddInfluencer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Addinfluencer" element={<AddInfluencer />} />
      </Routes>
    </div>
  );  
}

export default App