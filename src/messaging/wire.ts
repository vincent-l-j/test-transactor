import * as protobuf from "protobufjs/light";

export interface PublicKeyMessagePayload {
  encryptionPublicKey: Uint8Array;
  ethAddress: Uint8Array;
  signature: Uint8Array;
}

const Root = protobuf.Root,
  Type = protobuf.Type,
  Field = protobuf.Field;

/**
 * Message used to communicate the encryption public key linked to a given Ethereum account
 */
export class PublicKeyMessage {
  private static Type = new Type("PublicKeyMessage")
    .add(new Field("encryptionPublicKey", 1, "bytes"))
    .add(new Field("ethAddress", 2, "bytes"))
    .add(new Field("signature", 3, "bytes"));
  private static Root = new Root()
    .define("messages")
    .add(PublicKeyMessage.Type);

  constructor(public payload: PublicKeyMessagePayload) {}

  public encode(): Uint8Array {
    const message = PublicKeyMessage.Type.create(this.payload);
    return PublicKeyMessage.Type.encode(message).finish();
  }

  public static decode(
    bytes: Uint8Array | Buffer
  ): PublicKeyMessage | undefined {
    const payload = PublicKeyMessage.Type.decode(
      bytes
    ) as unknown as PublicKeyMessagePayload;
    if (
      !payload.signature ||
      !payload.encryptionPublicKey ||
      !payload.ethAddress
    ) {
      console.log("Field missing on decoded Public Key Message", payload);
      return;
    }
    return new PublicKeyMessage(payload);
  }

  get encryptionPublicKey(): Uint8Array {
    return this.payload.encryptionPublicKey;
  }

  get ethAddress(): Uint8Array {
    return this.payload.ethAddress;
  }

  get signature(): Uint8Array {
    return this.payload.signature;
  }
}
