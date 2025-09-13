import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AddInfluencer from "./pages/AddInfluencer";
import Influencer from "./pages/Influencer";
import EditInfluencer from "./pages/EditInfluencer";
import Home from "./components/Home";
import Contact from "./pages/contact";
import GetContactData from "./pages/getcontactData";
import Complaints from "./pages/complint";
import GetComplaintsData from "./pages/getcomplaintsData";

// Layout leh Header (Home ama pages kale)
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
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
      <Route path="/contact" element={
        <MainLayout>
          <Contact />
        </MainLayout>
      } />
      <Route path="/complaints" element={
        <MainLayout>
          <Complaints />
        </MainLayout>
      } />

      <Route path="/getcontact" element={
        <DashboardLayout>
          <GetContactData />
        </ DashboardLayout>
      } />
      <Route path="/getcomplaints" element={
        <DashboardLayout>
          <GetComplaintsData />
        </ DashboardLayout>
      } />
    </Routes>
  );
}

export default App;
