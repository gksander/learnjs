import * as React from "react";
import Sidebar from "./Sidebar";

/**
 * App shell
 */
const SiteLayout: React.FC = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100 px-4 md:px-10 py-4 min-h-screen">
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default SiteLayout;
