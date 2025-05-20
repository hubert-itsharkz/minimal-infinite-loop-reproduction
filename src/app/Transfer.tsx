import { useRef, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

interface TransferProps {
  Tezos: TezosToolkit;
}

export default function Transfer({ Tezos }: TransferProps) {
  const recipient = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function sendTez() {
    if (!(recipient && amount)) return;

    setLoading(true);
    try {
      const op = await Tezos.wallet
        .transfer({
          to: recipient.current!.value,
          amount: +amount.current!.value,
          mutez: true,
        })
        .send();

      await op.confirmation();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col mx-auto gap-4 w-120">
      <div className="flex flex-col gap-2">
        <label>Recipient:</label>
        <input
          ref={recipient}
          defaultValue="tz1RaUm4HxSLUYCJAhRs2SX8nnZJzinML2eM"
          type="text"
          placeholder="Recipient"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Amount in uTez:</label>
        <input ref={amount} type="number" placeholder="Amount" />
      </div>

      <button
        className="button"
        disabled={!recipient && !amount}
        onClick={sendTez}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Sending...
          </span>
        ) : (
          <span>
            <i className="far fa-paper-plane"></i>&nbsp; Send
          </span>
        )}
      </button>
    </div>
  );
}
