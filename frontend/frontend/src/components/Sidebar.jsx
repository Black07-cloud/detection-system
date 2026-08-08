import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCamera,
  FiClock,
  FiBarChart2,

  
} from "react-icons/fi";

import "../styles/sidebar.css";

const menu = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/detect", label: "Animal Detection", icon: FiCamera },
  { to: "/history", label: "Detection History", icon: FiClock },
  { to: "/statistics", label: "Statistics", icon: FiBarChart2 },
 
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-box">WG</div>

        <h2>WildGuard AI</h2>

        <p>AI Animal Detection</p>

      </div>

      <nav className="menu">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <Icon />

              <span>{item.label}</span>

            </NavLink>
          );
        })}

      </nav>

      

    </aside>
  );
}