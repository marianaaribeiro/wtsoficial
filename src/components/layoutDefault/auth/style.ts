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

  const ContainerGridItem: CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    borderBottom: "1px solid black",
    height: "auto"
  };
  return {
    gridContainer,
    gridItem,
    ContainerGridItem,
    boxContainer,
  };
};

export default useStyle;
