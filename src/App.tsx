import React, { useState } from 'react';
import './App.css';
import { AppBar, Toolbar } from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { lightBlue, blueGrey } from "@material-ui/core/colors";
import { Web3Provider } from "@ethersproject/providers/src.ts/web3-provider";
import ConnectWallet from "./ConnectWallet";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[300],
    },
    secondary: {
      main: lightBlue[600],
    },
  },
});

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appBar: {
  },
  container: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    margin: "10px",
  },
});

function App() {
  const [, setProvider] = useState<Web3Provider>();
  const [, setAddress] = useState<string>();
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
          </Toolbar>
        </AppBar>

        <div className={classes.container}>
          <main className={classes.main}>
            <fieldset>
              <legend>Wallet</legend>
              <ConnectWallet
                setProvider={setProvider}
                setAddress={setAddress}
              />
            </fieldset>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
