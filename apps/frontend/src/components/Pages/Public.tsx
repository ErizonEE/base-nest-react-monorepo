import { useState } from "react";
import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { Box } from "@mui/system";
import { TabList, TabPanel } from "@mui/lab";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

import "./styles/Public.css";

export default function Public() {
  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section className="public-section">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Iniciar Sesión" value="1" />
              <Tab label="Crear Cuenta" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Signin />
          </TabPanel>
          <TabPanel value="2">
            <Signup />
          </TabPanel>
        </TabContext>
      </Box>
    </section>
  );
}
