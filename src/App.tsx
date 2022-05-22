import React, { useEffect, useState } from 'react';
import './App.css';
import { Waku } from "js-waku";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { lightBlue, blueGrey } from "@material-ui/core/colors";
import WifiIcon from "@material-ui/icons/Wifi";
import {
  initWaku,
} from "./waku";
import { Web3Provider } from "@ethersproject/providers/src.ts/web3-provider";
import GetEncryptionPublicKey from "./GetEncryptionPublicKey";
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
  wakuStatus: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

function App() {
  const [waku, ] = useState<Waku>();
  const [provider, setProvider] = useState<Web3Provider>();
  const [, setEncPublicKey] = useState<Uint8Array>();
  const [address, setAddress] = useState<string>();
  const classes = useStyles();

  // Waku initialization
  useEffect(() => {
    if (waku) return;
  }, [waku]);

  let addressDisplay = "";
  if (address) {
    addressDisplay = address.slice(0, 6) + "..." + address.slice(-4);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.wakuStatus}
              aria-label="waku-status"
            >
              <WifiIcon
                color={"disabled"}
                style={{}}
              />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ethereum Private Message with Wallet Encryption
            </Typography>
            <Typography>{addressDisplay}</Typography>
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
            <fieldset>
              <legend>Encryption Keys</legend>
              <GetEncryptionPublicKey
                setEncPublicKey={setEncPublicKey}
                providerRequest={provider?.provider?.request}
                address={address}
              />
            </fieldset>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
