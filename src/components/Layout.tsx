import React from "react";
import { NavLink, Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";

// framer-motion
import { motion } from "framer-motion";

// components
import Icon from "~/components/shared/Icon";
import Input from "~/components/shared/Input";
import Image from "~/components/shared/Image";

// utils
import { cn } from "~/utils/cn";

// config
import * as Images from "~/config/images";

const pageVariants = {
  initial: {
    opacity: 0.5,
    scale: 0.99
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0.5,
    scale: 1.1
  }
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.2
};

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <AppHeader />

      <main className="flex flex-1 flex-col w-full h-full pt-16">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </main>

      <AppFooter />

      <ScrollRestoration />
    </div>
  );
}

function AppLogo() {
  return (
    <Link
      to="/"
      title="Ethereum Explorer"
      aria-label="Ethereum Explorer"
      className="flex items-center gap-x-2 min-w-[240px] font-bold text-sm uppercase tracking-tight"
    >
      <span className="relative flex w-6 h-6 overflow-hidden">
        <Image src={Images.Ethereum} objectFit="contain" width="100%" height="100%" />
      </span>
      ethereum explorer
    </Link>
  );
}

function AppHeader() {
  return (
    <header className="fixed inset-x-0 w-full h-16 backdrop-blur-md border-b border-solid border-border z-10">
      <Container className="h-full">
        <div className="flex flex-1 justify-between items-center w-full h-full">
          <AppLogo />
          <AppSearcher />
          <AppNavigation />
        </div>
      </Container>
    </header>
  );
}

function AppSearcher() {
  return (
    <div className="relative flex items-center w-full max-w-[400px] mx-auto">
      <Icon icon="search" className="absolute left-4 w-3.5 h-3.5 text-muted-foreground" />
      <Input placeholder="Search address, tx or block..." className="pl-10" />
    </div>
  );
}

function AppNavigation() {
  return (
    <nav role="navigation" className="flex items-center gap-x-6">
      <NavLink
        to="/unit-converter"
        title="Unit Converter"
        aria-label="Unit Converter"
        className={({ isActive }) =>
          cn(
            "flex items-center text-sm uppercase text-muted-foreground tracking-tight gap-x-2 transition-colors duration-75",
            {
              "text-foreground": isActive
            }
          )
        }
      >
        <Icon icon="sync" className="w-3 h-3" />
        Unit Converter
      </NavLink>
      <NavLink
        to="/balance-checker"
        title="Account Balance"
        aria-label="Account Balance"
        className={({ isActive }) =>
          cn(
            "flex items-center text-sm uppercase text-muted-foreground tracking-tight gap-x-2 transition-colors duration-75",
            {
              "text-foreground": isActive
            }
          )
        }
      >
        <Icon icon="account" className="w-3 h-3" />
        Account Balance
      </NavLink>
    </nav>
  );
}

function AppFooter() {
  return (
    <footer className="relative flex flex-1 border-t border-solid border-border bg-background">
      <Container>
        <div className="flex flex-1 items-start justify-between py-4">
          <div className="flex flex-col gap-y-4">
            <AppLogo />

            <small className="text-xs text-muted-foreground leading-normal">
              Open-Source ethereum block explorer application. <br />
              Made with <Icon icon="heart" className="inline-flex align-middle w-3 h-3 text-red-500" /> by eren.
            </small>
          </div>

          <Link
            to="https://github.com/mrberenben"
            target="_blank"
            rel="noreferrer noopenner"
            className="flex items-end gap-x-2 text-xs text-muted-foreground font-bold uppercase hover:text-foreground transition-colors duration-75"
          >
            <span>Github</span>
            <Icon icon="arrow_right" className="w-3 h-3 -rotate-45" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}

/**
 *
 * Shared layout
 */
interface DefaultLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: DefaultLayoutProps) {
  return <div className={cn("block w-full max-w-[1400px] mx-auto px-3 md:px-10", className)}>{children}</div>;
}

interface SectionProps extends DefaultLayoutProps {
  title?: string | React.ReactNode;
  className?: string;
}

export function Section({ title, className, children }: SectionProps) {
  return (
    <section className={cn("flex flex-1 flex-col gap-y-4 py-10", className)}>
      {title ? typeof title === "string" ? <h3 className="text-xl font-black uppercase">{title}</h3> : title : null}

      <div className="flex flex-col w-full">{children}</div>
    </section>
  );
}
