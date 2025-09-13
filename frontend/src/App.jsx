import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInfluencer from "./pages/AddInfluencer";
import Influencer from "./pages/Influencer";
import EditInfluencer from "./pages/EditInfluencer";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
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