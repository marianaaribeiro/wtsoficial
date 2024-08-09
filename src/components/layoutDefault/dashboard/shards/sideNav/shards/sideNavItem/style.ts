import { CSSProperties } from "react";

const useStyle = () => {
  const containerButton: CSSProperties = {
    alignItems: "center",
    borderRadius: 1,
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
    width: "100%",
  };

  const containerIcon: CSSProperties = {
    alignItems: "center",
    color: "neutral.400",
    display: "inline-flex",
    justifyContent: "center",
  };

  const styleTitle: CSSProperties = {
    color: "neutral.400",
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "24px",
    whiteSpace: "nowrap",
  };
  return {
    containerButton,
    containerIcon,
    styleTitle,
  };
};

export default useStyle;
