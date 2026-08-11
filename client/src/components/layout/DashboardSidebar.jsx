import {
  BarChart3,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

import Logo from "../common/Logo.jsx";
import Avatar from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Create interview",
    to: "/interviews/create",
    icon: PlusCircle,
  },
  {
    label: "Interview history",
    to: "/interviews",
    icon: History,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: UserRound,
  },
];

function DashboardSidebar({
  isMobileOpen,
  onCloseMobile,
}) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onCloseMobile?.();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <Logo light />

        <button
          type="button"
          onClick={onCloseMobile}
          className="grid size-10 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `
                  group flex items-center gap-3 rounded-2xl px-4 py-3
                  text-sm font-semibold transition
                  ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `
              }
            >
              <Icon className="size-5 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            <Avatar
              name={user?.name || "User"}
              imageUrl={user?.profilePicture || ""}
              size="md"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                {user?.name || "InterviewAI User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="mt-4 w-full"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950 lg:block">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-label="Close navigation overlay"
          />

          <aside className="relative h-full w-[min(86vw,320px)] border-r border-white/10 bg-slate-950 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

export default DashboardSidebar;