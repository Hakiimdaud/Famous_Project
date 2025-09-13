import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AddInfluencer from "./pages/AddInfluencer";
import Influencer from "./pages/Influencer";
import EditInfluencer from "./pages/EditInfluencer";
import Home from "./components/Home";

// Layout leh Header (Home ama pages kale)
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="p-6">{children}</div>
    </div>
  );
}

// Layout leh Dashboard (Dashboard sidebar + content)
function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Dashboard /> {/* Sidebar */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

function App() {
  return (
    
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      {/* Dashboard default route */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-800 ml-[40%]">
              Welcome to Dashboard
            </h1>
          </DashboardLayout>
        }
      />

      {/* Influencer routes inside dashboard */}
      <Route
        path="/addinfluencer"
        element={
          <DashboardLayout>
            <AddInfluencer />
          </DashboardLayout>
        }
      />

      <Route
        path="/influencer"
        element={
          <DashboardLayout>
            <Influencer />
          </DashboardLayout>
        }
      />

      <Route
        path="/updateinfluencer/:id"
        element={
          <DashboardLayout>
            <EditInfluencer />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;
