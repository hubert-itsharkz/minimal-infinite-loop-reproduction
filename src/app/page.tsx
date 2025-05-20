"use client";

import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { useState } from "react";
import ConnectButton from "./ConnectButton";
import Transfer from "./Transfer";

export default function Home() {
  const [Tezos] = useState(new TezosToolkit("https://rpc.sandbox.jstz.info"));
  const [wallet, setWallet] = useState<BeaconWallet | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {(() => {
        switch (userAddress) {
          case null:
            return (
              <ConnectButton
                Tezos={Tezos}
                setUserAddress={setUserAddress}
                setWallet={setWallet}
                wallet={wallet}
              />
            );
          default:
            return <Transfer Tezos={Tezos} />;
        }
      })()}
    </div>
  );
}
