import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

export default function MainLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}