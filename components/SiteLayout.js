import React from "react";
import AppHeader from "./AppHeader";

const SiteLayout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <AppHeader />
      <div className="bg-red-200 flex-1 flex h-full">
        {/*<div className="w-48">Nav Links</div>*/}
        <div className="flex-1 overflow-auto p-2 h-full">{children}</div>
      </div>
    </div>
  );
};

export default SiteLayout;
