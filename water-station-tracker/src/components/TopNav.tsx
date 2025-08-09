import { Link, NavLink } from "react-router-dom";

export default function TopNav() {
  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: "8px 12px",
    borderRadius: 8,
    background: isActive ? "#1d2a52" : "transparent",
    color: isActive ? "#a6c8ff" : "inherit",
  });

  return (
    <div className="panel" style={{ padding: 12, marginBottom: 16 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ fontWeight: 800 }}>💧 Water Station Tracker</Link>
        <div className="row">
          <NavLink to="/" style={navStyle} end>Dashboard</NavLink>
          <NavLink to="/stations" style={navStyle}>Stations</NavLink>
        </div>
      </div>
    </div>
  );
}
