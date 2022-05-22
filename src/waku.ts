import { Waku } from "js-waku";

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
