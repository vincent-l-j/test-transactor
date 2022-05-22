import { Dispatch, SetStateAction } from "react";
import { utils, Waku, WakuMessage } from "js-waku";
import { PublicKeyMessage } from "./messaging/wire";
import { validatePublicKeyMessage } from "./crypto";
import { equals } from "uint8arrays/equals";

export const PublicKeyContentTopic =
  "/eth-pm-wallet/1/encryption-public-key/proto";

export async function initWaku(): Promise<Waku> {
  const waku = await Waku.create({ bootstrap: { default: true } });

  // Wait to be connected to at least one peer
  await new Promise((resolve, reject) => {
    // If we are not connected to any peer within 10sec let's just reject
    // As we are not implementing connection management in this example

    setTimeout(reject, 10000);
    waku.libp2p.connectionManager.on("peer:connect", () => {
      resolve(null);
    });
  });

  return waku;
}

export function handlePublicKeyMessage(
  myAddress: string | undefined,
  setPublicKeys: Dispatch<SetStateAction<Map<string, Uint8Array>>>,
  msg: WakuMessage
) {
  console.log("Public Key Message received:", msg);
  if (!msg.payload) return;
  const publicKeyMsg = PublicKeyMessage.decode(msg.payload);
  if (!publicKeyMsg) return;
  if (myAddress && equals(publicKeyMsg.ethAddress, utils.hexToBytes(myAddress)))
    return;

  const res = validatePublicKeyMessage(publicKeyMsg);
  console.log("Is Public Key Message valid?", res);

  if (res) {
    setPublicKeys((prevPks: Map<string, Uint8Array>) => {
      prevPks.set(
        utils.bytesToHex(publicKeyMsg.ethAddress),
        publicKeyMsg.encryptionPublicKey
      );
      return new Map(prevPks);
    });
  }
}
