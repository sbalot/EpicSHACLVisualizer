import React, { useEffect, useState } from "react";
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import { Typography, StyledEngineProvider, CssBaseline, ThemeProvider, Button } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles';
import Viewer from './Viewer'
const packageJSON = require("../package.json");
const muiTheme = responsiveFontSizes(createTheme({/* your custom theme */ }));

ClassNameGenerator.configure((componentName) => `${packageJSON.name}-${componentName}`);

function App(props) {

  if (props.inactive) return <></>;

  return (
    <div style={{margin: 30}}>
      <Viewer {...props} models={["https://raw.githubusercontent.com/LBDserver/resources/main/duplex/BIM4Ren_DUNANT_cleaned_IFC2x3.gltf"]}/>
    </div>
  )
}

const withJssAndCustomTheme = App => props => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <App {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App