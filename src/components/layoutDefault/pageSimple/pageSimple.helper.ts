import { useAuth } from "../../../hooks/useAuth";
import { createTheme } from "../../../theme";

const usePageSimple = () => {

  const data = useAuth()
  const theme = createTheme(data?.listTheme);

  return {
    theme
  };
};

export default usePageSimple;
