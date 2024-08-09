
import { CSSProperties } from "react";

const useStyle = () => {

  const containerBox: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    height: "100%",
    justifyContent: "center"
  };
  const containerItem: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  };
  const containerImg: CSSProperties = {
    textAlign: "center",
  };
  const imgItem: CSSProperties = {
    display: "inline-block",
    maxWidth: "100%",
    width: 150,
  };

  return {
    containerBox,
    containerImg,
    containerItem,
    imgItem,
  };

};
export default useStyle;