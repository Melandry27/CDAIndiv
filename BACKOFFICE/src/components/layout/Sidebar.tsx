import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Admins", path: "/admins" },
    { name: "Breathing Exercises", path: "/exercises" },
    { name: "Exercise Sessions", path: "/sessions" },
    { name: "Histories", path: "/histories" },
    { name: "Categories", path: "/categories" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">CESIZen</h1>

      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className="justify-start"
          asChild
        >
          <Link to={item.path}>{item.name}</Link>
        </Button>
      ))}
    </aside>
  );
}
