import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import { useState } from "react";
import { Link, Outlet } from "react-router";

import Avatar from "../ui/Avatar.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


function DashboardLayout() {
  const { user, logout } = useAuth();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] =
    useState(false);


  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <DashboardSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() =>
          setIsMobileSidebarOpen(false)
        }
      />


      <div className="lg:pl-72">

        {/* Header */}

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">

          <div className="flex h-20 items-center gap-4 px-5 sm:px-6 lg:px-8">

            {/* Mobile menu */}

            <button
              type="button"
              onClick={() =>
                setIsMobileSidebarOpen(true)
              }
              className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>


            {/* Search */}

            <div className="hidden max-w-md flex-1 md:block">

              <div className="relative">

                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  placeholder="Search interviews..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
                />

              </div>

            </div>


            {/* Right side */}

            <div className="ml-auto flex items-center gap-3">

              {/* Notifications */}

              <button
                type="button"
                className="relative grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
                aria-label="Notifications"
              >
                <Bell className="size-5" />

                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-brand-500 ring-2 ring-white" />
              </button>


              {/* User menu */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setIsProfileMenuOpen(
                      (current) => !current
                    )
                  }
                  className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition hover:border-slate-200 hover:bg-slate-50"
                  aria-expanded={
                    isProfileMenuOpen
                  }
                  aria-haspopup="menu"
                >

                  <Avatar
                    name={
                      user?.name || "User"
                    }
                    imageUrl={
                      user?.profilePicture || ""
                    }
                    size="sm"
                  />

                  <div className="hidden max-w-40 text-left sm:block">

                    <p className="truncate text-sm font-bold text-slate-950">
                      {user?.name ||
                        "InterviewAI User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user?.email ||
                        "user@example.com"}
                    </p>

                  </div>

                  <ChevronDown
                    className={`hidden size-4 text-slate-400 transition sm:block ${
                      isProfileMenuOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>


                {/* Dropdown */}

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"
                    role="menu"
                  >

                    {/* User information */}

                    <div className="border-b border-slate-100 px-3 py-3">

                      <p className="truncate text-sm font-bold text-slate-950">
                        {user?.name ||
                          "InterviewAI User"}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {user?.email ||
                          "user@example.com"}
                      </p>

                    </div>


                    {/* Profile */}

                    <Link
                      to="/profile"
                      onClick={() =>
                        setIsProfileMenuOpen(
                          false
                        )
                      }
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                      role="menuitem"
                    >
                      <UserRound className="size-4 text-slate-400" />
                      Profile
                    </Link>


                    {/* Settings */}

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(
                          false
                        );
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                      role="menuitem"
                    >
                      <Settings className="size-4 text-slate-400" />
                      Settings
                    </button>


                    {/* Logout */}

                    <div className="my-2 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      role="menuitem"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

        </header>


        {/* Page content */}

        <main className="px-5 py-8 sm:px-6 lg:px-8">

          <div className="mx-auto w-full max-w-[1600px]">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}


export default DashboardLayout;