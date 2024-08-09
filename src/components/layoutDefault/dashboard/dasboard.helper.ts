
import { useCallback, useEffect, useState } from "react";

import { createTheme } from "../../../theme";
import { useAuth } from "../../../hooks/useAuth";

const useDashboardHelper = () => {
  const pathname = window.location.pathname
  const data = useAuth()
  const theme = createTheme(data?.listTheme);
  const [openNav, setOpenNav] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
      setOpenSideBar(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    [pathname]
  );

  return {
    openNav,
    theme,
    openSideBar,
    setOpenSideBar,
    setOpenNav,
  };
};

export default useDashboardHelper;
