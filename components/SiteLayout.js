import * as React from "react";
import classNames from "classnames";
import Link from "next/link";
import navItems from "../util/navItems";

/**
 * App shell
 */
const SiteLayout = ({ children }) => {
  const [navShown, setNavShown] = React.useState(false);
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-blue-500">
        <button
          className="mr-4 md:hidden"
          onClick={() => setNavShown((v) => !v)}
        >
          Toggle
        </button>
        <span>Home</span>
      </div>
      {/* Content body */}
      <div className="flex-1 flex h-full">
        <div
          className={classNames(
            "w-48 bg-red-200 fixed h-full z-10 md:static md:z-0 md:visible",
            {
              "left-0": navShown,
              ["invisible"]: !navShown,
            },
          )}
        >
          {navItems.map((item, _) => (
            <div key={item.title}>
              <div>{item.title}</div>
              {item.items.map((subItem, _) => (
                <Link key={subItem.title} href={subItem.href} passHref>
                  <a className="block">{subItem.title}</a>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto h-full">
          <div className="container mx-auto px-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SiteLayout;
