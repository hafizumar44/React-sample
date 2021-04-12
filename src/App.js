import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux";
import Routes from "./Routes";
import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#50627E",
    },
    secondary: {
      main: "#50627E",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      cs: 800,
      md: 960,
      lg: 1024,
      xl: 1440,
    }
  }
});

function App() {
  if (process.env.NODE_ENV === "production") {
    const noop = () => {};
    [
      "assert","clear","count","debug","dir","dirxml","error","exception",
      "group","groupCollapsed","groupEnd","info","log","markTimeline",
      "profile","profileEnd","table","time","timeEnd","timeline",
      "timelineEnd","timeStamp","trace","warn"
    ].forEach((method) => {
      window.console[method] = noop;
    });
  }
  useEffect(() => {
    axios.defaults.baseURL = "https://api-stage.onebox.live";
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Routes />
            </MuiPickersUtilsProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
