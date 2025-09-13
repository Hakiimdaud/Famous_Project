import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInfluencer from "./pages/AddInfluencer";
import Influencer from "./pages/Influencer";
import EditInfluencer from "./pages/EditInfluencer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Addinfluencer" element={<AddInfluencer />} />
        <Route path="/influencer" element={<Influencer />} />
        <Route path="/updateinfluencer/:id" element={<EditInfluencer />} />
      </Routes>
    </div>
  );  
}

export default App