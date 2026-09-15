"use client";
import { useState } from "react";
import { ArrowUpRight, FileCheck2 } from "lucide-react";

export default function ECommercialDemo() {
  const [step, setStep] = useState(0);
  const [qty, setQty] = useState(100);
  const [valid, setValid] = useState(false);
  const total = qty * 50;
  const labels = ["Authentication", "Order", "Calculation", "Validation", "Documents"];

  return (
    <div className="max-w-5xl mx-auto p-5 md:p-10">
      <div className="flex flex-wrap gap-2 mb-6" aria-label="Demo steps">
        {labels.map((x, i) => (
          <button
            key={x}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
            className={
              "px-3 py-2 rounded-xl text-xs mono border " +
              (step === i ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300" : "border-white/10 text-slate-500")
            }
          >
            0{i + 1} {x}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="max-w-md mx-auto py-8">
          <div className="text-center mb-7">
            <div className="text-2xl font-bold text-white">E-COMMERCIAL</div>
            <div className="text-slate-500 text-sm mt-2">Secure access</div>
          </div>
          <label htmlFor="demo-username" className="block text-xs mono text-slate-400 mb-2">Username</label>
          <input id="demo-username" autoComplete="username" className="w-full mb-3 rounded-xl bg-black/30 border border-white/10 p-3 text-white" placeholder="Enter username" />
          <label htmlFor="demo-password" className="block text-xs mono text-slate-400 mb-2">Password</label>
          <input id="demo-password" autoComplete="current-password" className="w-full mb-4 rounded-xl bg-black/30 border border-white/10 p-3 text-white" placeholder="Enter password" type="password" />
          <button onClick={() => setStep(1)} className="w-full rounded-xl bg-cyan-300 text-black font-semibold py-3">LOGIN</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="grid md:grid-cols-4 gap-3 mb-6">
            {[["ORDERS", "128"], ["PENDING", "07"], ["PRODUCTS", "24"], ["HISTORY", "342"]].map((a) => (
              <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4" key={a[0]}>
                <div className="text-xs text-slate-500 mono">{a[0]}</div>
                <div className="text-2xl font-bold mt-2 text-white">{a[1]}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="rounded-xl bg-white text-black px-5 py-3 font-semibold">
            Create order <ArrowUpRight className="inline" size={17} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs mono text-slate-500">PRODUCT</div>
            <div className="mt-2 p-3 rounded-xl border border-white/10 text-white">Sugar</div>
            <div className="block text-xs mono text-slate-500 mt-5">PACKAGE WEIGHT</div>
            <div className="mt-2 p-3 rounded-xl border border-white/10 text-white">50 kg</div>
            <label htmlFor="demo-quantity" className="block text-xs mono text-slate-500 mt-5">QUANTITY</label>
            <input
              id="demo-quantity"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              min="1"
              type="number"
              className="mt-2 w-full p-3 rounded-xl border border-white/10 bg-black/20 text-white"
            />
          </div>
          <div className="rounded-2xl bg-cyan-300/10 border border-cyan-300/20 p-7 flex flex-col justify-center">
            <div className="text-xs mono text-cyan-300">AUTOMATIC CALCULATION</div>
            <div className="text-4xl font-bold mt-5 text-white">{qty} × 50 kg</div>
            <div className="text-5xl font-black mt-2 text-white">{total.toLocaleString()} kg</div>
            <div className="text-slate-400 mt-2">= {(total / 1000).toFixed(2)} tonnes</div>
            <button onClick={() => setStep(3)} className="mt-7 rounded-xl bg-cyan-300 text-black py-3 font-semibold">Continue to validation</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="flex justify-between">
              <div>
                <div className="mono text-xs text-slate-500">ORDER #EC-1024</div>
                <h3 className="text-2xl font-bold mt-2 text-white">ABC COMPANY</h3>
                <p className="text-slate-400">{(total / 1000).toFixed(2)} tonnes · Sugar</p>
              </div>
              <span className={"px-3 py-1 rounded-full text-xs " + (valid ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300")}>
                {valid ? "VALIDATED" : "PENDING"}
              </span>
            </div>
            <button disabled={valid} onClick={() => setValid(true)} className="mt-7 rounded-xl bg-white text-black px-5 py-3 font-semibold disabled:opacity-50">
              {valid ? "✓ Order validated" : "Validate order"}
            </button>
            {valid && (
              <button onClick={() => setStep(4)} className="ml-3 rounded-xl border border-white/10 px-5 py-3 text-white">Generate documents</button>
            )}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid md:grid-cols-3 gap-4">
          {["Delivery Document", "Order Document", "Commercial Document"].map((x) => (
            <div key={x} className="rounded-2xl border border-white/10 p-5">
              <FileCheck2 className="text-cyan-300" />
              <div className="font-semibold mt-4 text-white">{x}</div>
              <div className="text-xs text-slate-500 mt-1">PDF document</div>
              <button onClick={() => alert("Demo: document generated successfully.")} className="mt-5 text-sm text-cyan-300">Generate PDF →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
