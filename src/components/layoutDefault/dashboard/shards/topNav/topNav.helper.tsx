import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuItemIProps } from "./IProps";

import { usePopover } from "../../../../../hooks/usePopover";

const useTopNavHelper = () => {
  const { i18n: { changeLanguage, language } } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [itemLanguages, setLanguage] = useState<string>(language);

  const SIDE_NAV_WIDTH = 280;
  const TOP_NAV_HEIGHT = 64;

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);

    const newLanguage = currentLanguage === "en" ? "pt" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }

  const dataMenuSelect: MenuItemIProps[] = [
    {
      value: "en",
      context: <img src="/assets/flags/us.png" style={{ marginLeft: "2px" }} />
    },
    {
      value: "pt",
      context: <img src="/assets/flags/pt.png" style={{ marginLeft: "2px" }
      } />
    }
  ]


  return {
    SIDE_NAV_WIDTH,
    TOP_NAV_HEIGHT,
    lgUp,
    accountPopover,
    itemLanguages,
    dataMenuSelect,
    handleChangeLanguage,
  };
};

export default useTopNavHelper;
