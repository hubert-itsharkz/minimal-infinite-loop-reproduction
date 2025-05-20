import { type Dispatch, type SetStateAction, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";

interface ButtonProps {
  Tezos: TezosToolkit;
  setUserAddress: Dispatch<SetStateAction<string | null>>;
  setWallet: Dispatch<SetStateAction<BeaconWallet | null>>;
  wallet: BeaconWallet | null;
}

export default function ConnectButton({
  Tezos,
  setUserAddress,
  setWallet,
  wallet,
}: ButtonProps) {
  async function connectWallet() {
    try {
      await wallet!.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.tezos.ecadinfra.com",
        },
      });

      const userAddress = await wallet!.getPKH();
      setUserAddress(userAddress);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const wallet = new BeaconWallet({
      name: "My dApp",
      preferredNetwork: NetworkType.GHOSTNET,
      disableDefaultEvents: false,
      enableMetrics: true,
    });

    Tezos.setWalletProvider(wallet);
    setWallet(wallet);
  }, []);

  return (
    <div className="buttons">
      <button className="button" onClick={connectWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect wallet
        </span>
      </button>
    </div>
  );
}
