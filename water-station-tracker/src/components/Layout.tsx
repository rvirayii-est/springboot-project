import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

export default function Layout() {
  return (
    <div className="container">
      <TopNav />
      <Outlet />
    </div>
  );
}
