import React from "react";

/**
 * App Image
 */
const AppImage: React.FC = (props) => {
  return (
    <div className="rounded overflow-hidden border shadow mx-auto">
      <img {...props} />
    </div>
  );
};

export default AppImage;
