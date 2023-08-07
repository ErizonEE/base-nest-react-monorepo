// TODO: IMPROVE THIS COMPONENTE WAS BUILT IN A FEW MINUTES...
/* eslint-disable max-lines */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { loginSuccess } from "../redux-store/slices/AuthUserSlice";

import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";

import "./Styles/Menu.css";

import { getAuthUser } from "../services/AuthService";
import AppActionButtons from "./S-S/AppActionButtons";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Menu = (props: Props) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUserReducer.authUser);
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const options = [
    {
      label: "Mi Cuenta",
      icon: <>Account</>,
      to: "/mi-cuenta",
      requiredAuth: true,
    },
  ];

  const drawer = (
    <div>
      <ListSubheader>
        <StyledLink
          to="/"
          onClick={() => setMobileOpen((prevValue) => !prevValue)}
        >
          App
        </StyledLink>
      </ListSubheader>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (!authUser) {
      getAuthUser().then((user) => {
        if (user) {
          dispatch(loginSuccess({ ...user }));
        }
      });
    }
  }, [authUser]);

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <AppActionButtons
        onSetMobileOpen={() => setMobileOpen((prevVal) => !prevVal)}
      />
    </>
  );
};
