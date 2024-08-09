import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";

import { IProps } from "./IProps";
import useAccountPopoverHelper from "./accountPopover.helper";

export const AccountPopover = ({ anchorEl, onClose, open }: IProps) => {
  const { handleSignOut, auth } = useAccountPopoverHelper(onClose);
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        {/* <Typography variant="overline">Sua Conta</Typography> */}
        <Typography color="text.secondary" variant="body2">
          {auth?.infoUser?.username ?? ""}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
