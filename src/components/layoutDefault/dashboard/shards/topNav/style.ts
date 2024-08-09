import { CSSProperties } from "react";

const useStyle = () => {
  const containerTopNav: CSSProperties = {
    backdropFilter: "blur(6px)",
    position: "sticky",
    top: 0,
  };

  const containerAvatar: CSSProperties = {
    cursor: "pointer",
    height: 40,
    width: 40,
  };

  return {
    containerTopNav,
    containerAvatar,
  };
};

export default useStyle;
