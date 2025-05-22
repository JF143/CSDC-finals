import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import Divider from "@mui/material/Divider";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import Box from "@mui/material/Box";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();

  return (
    <AppBar
      position={sticky ? "sticky" : "relative"}
      elevation={0}
      sx={{ 
        px: 3,
        py: 1,
        borderRadius: 3,
        mt: 2,
        mx: "auto",
        maxWidth: 1200,
        background: mode === "dark" 
          ? "linear-gradient(90deg, #23272f 60%, #283046 100%)" 
          : "linear-gradient(90deg, #e3f2fd 60%, #f8fafc 100%)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)", 
        transition: "background 0.3s",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Logo or Title */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              p: 0.5,
              boxShadow: "none",
              minWidth: 40,
              minHeight: 40,
            }}
          >
            <HamburgerMenu />
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              variant="rounded"
              sx={{ 
                width: 32,
                height: 32,
                bgcolor: mode === "dark" ? "#4c566a" : "#e0e7ef",
                color: mode === "dark" ? "#ffe082" : "#1976d2",
                fontWeight: 700,
                fontSize: 20,
                boxShadow: "0 2px 8px rgba(60,60,60,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MenuBookOutlined sx={{ fontSize: 22, color: mode === "dark" ? "#ffe082" : "#1976d2" }} />
            </Avatar>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: "linear-gradient(90deg, #1976d2 30%, #64b5f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 1,
              }}
            >
              My Blogsite
            </Typography>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 5, fontStyle: "italic" }}
          >
            {/* Optional subtitle or tagline */}
          </Typography>
        </Stack>

        {/* Right: Theme toggle + user */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="inherit"
            onClick={() => setMode()}
            sx={{
              borderRadius: 2,
              background: mode === "dark" ? "#3b4252" : "#e0e7ef",
              border: mode === "dark" ? "1px solid #4c566a" : "1px solid #cfd8dc",
              boxShadow: "0 2px 8px rgba(60,60,60,0.08)",
              "&:hover": {
                backgroundColor: mode === "dark" ? "#434c5e" : "#d1d9e6",
                borderColor: mode === "dark" ? "#5e81ac" : "#b0bec5",
              },
              transition: "background 0.2s, border 0.2s",
              p: 1.2,
            }}
          >
            {mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: 26, color: "#ffe082" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: 26, color: "#fbc02d" }} />
            )}
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#e0e0e0" }} />

          {(user?.avatar || user?.name) && (
            <Stack direction="row" spacing={1} alignItems="center">
              {user?.name && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    fontWeight: 400,
                    color: "text.primary",
                  }}
                >
                  {user.name}
                </Typography>
              )}
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  width: 36,
                  height: 36,
                }}
              />
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};