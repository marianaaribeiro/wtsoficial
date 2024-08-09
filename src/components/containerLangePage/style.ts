import { CSSProperties } from "react";

const useStyle = () => {
  const boxContainer: CSSProperties = {
    display: "flex",
    flex: "1 1 auto",
  };

  const gridContainer: CSSProperties = {
    flex: "1 1 auto",
  };


  const ContainerGridItem: CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  };
  return {
    gridContainer,
    ContainerGridItem,
    boxContainer,
  };
};

export default useStyle;
