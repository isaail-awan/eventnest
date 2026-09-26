import { useState } from "react";
import CardPreview from "./CardPreview";
import { formatCardNumber, formatExpiry } from "../utils/card";

const inputClass = (hasError) =>
  "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:ring-2 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40 " +
  (hasError ? "border-red-400 focus:ring-red-200" : "border-border focus:border-sage focus:ring-sage/20 dark:border-white/10");

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

const methods = [
  { id: "card", label: "Card" },
  { id: "easypaisa", label: "Easypaisa" },
  { id: "jazzcash", label: "JazzCash" },
];

export default function PaymentMethod({ payment, setPayment, errors }) {
  const [method, setMethod] = useState("card");

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === "cardNumber") next = formatCardNumber(value);
    if (name === "expiry") next = formatExpiry(value);
    if (name === "cvv") next = value.replace(/\D/g, "").slice(0, 4);
    setPayment({ ...payment, [name]: next });
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">Payment method</label>
      <div className="flex flex-wrap gap-2">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMethod(m.id)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 " +
              (method === m.id ? "bg-sage text-white" : "border border-border text-ink-soft hover:bg-sage/10 hover:text-sage dark:border-white/10 dark:text-paper/60 dark:hover:bg-sage/20 dark:hover:text-sage")
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {method === "card" ? (
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_260px]">
          <div className="space-y-5">
            <Field label="Card number" id="cardNumber" error={errors.cardNumber}>
              <input id="cardNumber" name="cardNumber" type="text" inputMode="numeric" value={payment.cardNumber} onChange={handleCardChange} placeholder="1234 5678 9012 3456" className={inputClass(errors.cardNumber)} />
            </Field>

            <Field label="Name on card" id="cardName" error={errors.cardName}>
              <input id="cardName" name="cardName" type="text" value={payment.cardName} onChange={handleCardChange} placeholder="As shown on the card" className={inputClass(errors.cardName)} />
            </Field>

            <div className="grid grid-cols-2 gap-5">
              <Field label="Expiry" id="expiry" error={errors.expiry}>
                <input id="expiry" name="expiry" type="text" inputMode="numeric" value={payment.expiry} onChange={handleCardChange} placeholder="MM/YY" className={inputClass(errors.expiry)} />
              </Field>
              <Field label="CVV" id="cvv" error={errors.cvv}>
                <input id="cvv" name="cvv" type="password" inputMode="numeric" value={payment.cvv} onChange={handleCardChange} placeholder="123" className={inputClass(errors.cvv)} />
              </Field>
            </div>
          </div>

          <div className="flex items-start justify-center lg:justify-end">
            <CardPreview number={payment.cardNumber} name={payment.cardName} expiry={payment.expiry} />
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-border bg-accent-soft p-5 text-sm text-ink-soft dark:border-white/10 dark:bg-white/5 dark:text-paper/60">
          You will receive an {method === "easypaisa" ? "Easypaisa" : "JazzCash"} payment request on your registered mobile number after confirming this registration.
        </div>
      )}

      <p className="mt-4 rounded-lg bg-accent-soft p-3 text-xs text-ink-soft dark:bg-white/5 dark:text-paper/50">
        Demo payment: no real transaction is processed. Please do not enter real card details.
      </p>
    </div>
  );
}