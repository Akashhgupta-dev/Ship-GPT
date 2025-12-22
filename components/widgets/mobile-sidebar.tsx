"use client";

import { Drawer } from "@mui/material";
import Sidebar from "@/components/widgets/sidebar";

type Props = {
  open: boolean;
  onClose: () => void;
  sidebarProps: React.ComponentProps<typeof Sidebar>;
};

const MobileSidebarDrawer = ({ open, onClose, sidebarProps }: Props) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      ModalProps={{
        keepMounted: true,
        disableAutoFocus: true,
        disableEnforceFocus: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: "80%",
        },
      }}
    >
      <Sidebar {...sidebarProps} />
    </Drawer>
  );
};

export default MobileSidebarDrawer;
