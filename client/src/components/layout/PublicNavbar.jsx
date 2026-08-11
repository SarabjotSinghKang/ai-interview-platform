import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import Container from "../common/Container.jsx";
import Logo from "../common/Logo.jsx";
import Button from "../ui/Button.jsx";

const navigationItems = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "Benefits",
    href: "#benefits",
  },
];

function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Logo light />

          <div className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Sign in
            </Link>

            <Link to="/register">
              <Button size="sm">
                Get started
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-3 grid gap-3 border-t border-white/10 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default PublicNavbar;