"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Route = {
  name: string;
  component: React.ReactNode;
};

type DashboardNavContextType = {
  activeRoute: Route;
  setActiveRoute: (route: Route) => void;
};

const DashboardNavContext = createContext<DashboardNavContextType | undefined>(undefined);

export const useDashboardNav = () => {
  const context = useContext(DashboardNavContext);
  if (!context) throw new Error("useDashboardNav must be used within a DashboardNavProvider");
  return context;
};

export const DashboardNavProvider = ({
  children,
  initialRoute,
}: {
  children: ReactNode;
  initialRoute: Route;
}) => {
  const [activeRoute, setActiveRoute] = useState<Route>(initialRoute);

  return (
    <DashboardNavContext.Provider value={{ activeRoute, setActiveRoute }}>
      {children}
    </DashboardNavContext.Provider>
  );
};
