import * as React from "react";
import Link from "next/link";

/**
 * App logo, used in layout
 */
const AppLogo: React.FC = () => (
  <Link href="/" passHref>
    <a className="py-2 text-xl font-black">
      <span className="text-blue-800">Math</span>
      <span>Code</span>
    </a>
  </Link>
);

export default AppLogo;
