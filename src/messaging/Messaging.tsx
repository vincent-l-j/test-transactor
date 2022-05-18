import Messages, { Message } from "./Messages";
import { Waku } from "js-waku";
import SendMessage from "./SendMessage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "left",
    flexDirection: "column",
    margin: "5px",
  },
});

interface Props {
  waku: Waku | undefined;
  recipients: Map<string, Uint8Array>;
  messages: Message[];
  address: string | undefined;
  providerRequest:
    | ((request: { method: string; params?: Array<any> }) => Promise<any>)
    | undefined;
}

export default function Messaging({ waku, recipients, messages, address, providerRequest }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SendMessage recipients={recipients} waku={waku} address={address} providerRequest={providerRequest}/>
      <Messages messages={messages} />
    </div>
  );
}
