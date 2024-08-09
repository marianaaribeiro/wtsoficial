import { CSSProperties } from "react";

const useStyle = () => {
  const boxContainer: CSSProperties = {
    display: "flex",
    flex: "1 1 auto",
  };

  const gridContainer: CSSProperties = {
    flex: "1 1 auto",
  };

  const gridItem: CSSProperties = {
    backgroundColor: "background.paper",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  };

  return {
    boxContainer,
    gridContainer,
    gridItem,
  };
};

export default useStyle;
