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
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewFamous from "./pages/ViewFamous";
import InfluencersPage from "./pages/InfluencersPage";
import ProtectedRouter from "./pages/ProtectedRouter";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound ";
import ProfileDashboard from "./pages/ProfileDashboard";
import Footer from "./components/Footer";

// Layout leh Header (Home ama pages kale)
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
      <Footer />
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

      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/Profile/:id"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route
        path="/viewfamous/:id"
        element={
          <MainLayout>
            <ViewFamous />
          </MainLayout>
        }
      />
      <Route
        path="/influencers"
        element={
          <MainLayout>
            <InfluencersPage />
          </MainLayout>
        }
      />
      {/* Dashboard default route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRouter>
            <DashboardLayout>
              <h1 className="text-3xl font-bold text-gray-800 ml-[40%]">
                Welcome to Dashboard
              </h1>
            </DashboardLayout>
          </ProtectedRouter>
        }
      />

      {/* Influencer routes inside dashboard */}
      <Route
        path="/addinfluencer"
        element={
          <ProtectedRouter>

            <DashboardLayout>
              <AddInfluencer />
            </DashboardLayout>
          </ProtectedRouter>
        }
      />
      <Route
        path="/ProfileDashboard/:id"
        element={
          <ProtectedRouter>

            <DashboardLayout>
              <ProfileDashboard />
            </DashboardLayout>
          </ProtectedRouter>
        }
      />

      <Route
        path="/influencer"
        element={
          <ProtectedRouter>

            <DashboardLayout>
              <Influencer />
            </DashboardLayout>
          </ProtectedRouter>
        }
      />
      

      <Route
        path="/updateinfluencer/:id"
        element={
          <ProtectedRouter>

            <DashboardLayout>
              <EditInfluencer />
            </DashboardLayout>
          </ProtectedRouter>
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
        <ProtectedRouter>

          <DashboardLayout>
            <GetContactData />
          </ DashboardLayout>
        </ProtectedRouter>
      } />
      <Route path="/getcomplaints" element={
        <ProtectedRouter>
          <DashboardLayout>
            <GetComplaintsData />
          </ DashboardLayout>
        </ProtectedRouter>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
