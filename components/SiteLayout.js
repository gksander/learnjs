import * as React from "react";
import Sidebar from "./Sidebar";

/**
 * App shell
 */
const SiteLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100 px-4 md:px-10 py-4 min-h-screen">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default SiteLayout;
