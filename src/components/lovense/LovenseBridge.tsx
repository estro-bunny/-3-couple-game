"use client";

import { useEffect, useRef, useState } from "react";

type LovenseToy = {
  id: string;
  name: string;
  toyType?: string;
  nickname?: string;
  battery?: number;
  connected?: boolean;
};

type LovenseSdk = {
  on: (event: string, callback: (...args: any[]) => void) => void;
  getQrcode: () => Promise<{ qrcodeUrl?: string }>;
  getOnlineToys: () => LovenseToy[];
  connectLovenseAPP: () => void;
  stopToyAction: (toyId?: string) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    LovenseBasicSdk?: new (options: Record<string, unknown>) => LovenseSdk;
  }
}

const UID_KEY = "coupleplayhub:lovense:uid";

function getAnonymousUid() {
  const existing = window.localStorage.getItem(UID_KEY);
  if (existing) return existing;
  const uid = "cph_" + crypto.randomUUID().replaceAll("-", "");
  window.localStorage.setItem(UID_KEY, uid);
  return uid;
}

export default function LovenseBridge() {
  const sdkRef = useRef<LovenseSdk | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "connected" | "error">("idle");
  const [message, setMessage] = useState("Optional toy connection. Nothing connects until you choose to.");
  const [qr, setQr] = useState<string | null>(null);
  const [toys, setToys] = useState<LovenseToy[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setStatus("loading");
      try {
        await new Promise<void>((resolve, reject) => {
          if (window.LovenseBasicSdk) return resolve();
          const script = document.createElement("script");
          script.src = "https://api.lovense-api.com/basic-sdk/core.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Lovense SDK failed to load"));
          document.head.appendChild(script);
        });

        const uid = getAnonymousUid();
        const response = await fetch("/.netlify/functions/lovense-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || "Lovense integration is not configured yet.");
        }

        const { authToken, platform, uid: serverUid } = await response.json();
        if (cancelled || !window.LovenseBasicSdk) return;

        const sdk = new window.LovenseBasicSdk({
          platform,
          authToken,
          uid: serverUid || uid,
          appType: "connect",
          debug: false,
        });

        sdkRef.current = sdk;

        sdk.on("ready", async (instance) => {
          if (cancelled) return;
          setStatus("ready");
          setMessage("Ready. Pair your toy with Lovense Connect when you want to play.");
          try {
            const result = await instance.getQrcode();
            if (!cancelled) setQr(result.qrcodeUrl ?? null);
          } catch {}
          setToys(instance.getOnlineToys?.() ?? []);
        });

        sdk.on("appStatusChange", (connected) => {
          if (cancelled) return;
          setStatus(connected ? "connected" : "ready");
          setMessage(connected ? "Lovense Connect is linked." : "Lovense Connect disconnected.");
        });

        sdk.on("toyInfoChange", (nextToys) => {
          if (cancelled) return;
          setToys(Array.isArray(nextToys) ? nextToys : []);
          if (Array.isArray(nextToys) && nextToys.some((toy) => toy.connected)) {
            setStatus("connected");
            setMessage("Toy connected. Game controls can now optionally drive it.");
          }
        });

        sdk.on("toyOnlineChange", (online) => {
          if (cancelled) return;
          setToys(sdk.getOnlineToys?.() ?? []);
          setStatus(online ? "connected" : "ready");
        });

        sdk.on("sdkError", (error) => {
          if (cancelled) return;
          setStatus("error");
          setMessage(error?.message || "Lovense reported an integration error.");
        });
      } catch (error) {
        if (cancelled) return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Lovense integration unavailable.");
      }
    }

    boot();
    return () => {
      cancelled = true;
      sdkRef.current?.destroy();
      sdkRef.current = null;
    };
  }, []);

  const connected = toys.filter((toy) => toy.connected);
  const canControl = status === "connected" && connected.length > 0;

  return (
    <aside className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-[#0b0912]/75 p-5 shadow-[0_0_45px_rgba(0,229,255,.08)] backdrop-blur-xl">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-black tracking-[.3em] text-secondary uppercase">OPTIONAL // HARDWARE LINK</p>
            <h2 className="mt-2 text-xl font-black font-headline">LOVENSE <span className="text-primary">CHAOS LINK</span></h2>
          </div>
          <span className={"rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-widest " + (canControl ? "border-secondary/40 text-secondary" : "border-white/10 text-on-surface-variant")}>
            {canControl ? "CONNECTED" : status === "error" ? "OFFLINE" : "STANDBY"}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-surface-variant">{message}</p>

        {status === "error" && (
          <p className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary/80">
            This is intentionally optional. CouplePlayHub remains fully playable without Lovense.
          </p>
        )}

        {qr && status !== "error" && (
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
            <img src={qr} alt="Lovense connection QR code" className="h-28 w-28 rounded-xl border border-secondary/20 bg-white p-2" />
            <div className="text-center sm:text-left">
              <p className="font-bold">Pair with Lovense Connect</p>
              <p className="mt-1 text-xs text-on-surface-variant">Scan the code in the Lovense app, then come back here.</p>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {status !== "error" && (
            <button type="button" onClick={() => sdkRef.current?.connectLovenseAPP()} disabled={!sdkRef.current} className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black tracking-wide text-primary transition hover:border-primary hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40">
              OPEN LOVENSE CONNECT
            </button>
          )}
          {canControl && (
            <button type="button" onClick={() => sdkRef.current?.stopToyAction()} className="rounded-xl border border-secondary/30 bg-secondary/5 px-4 py-2 text-xs font-black tracking-wide text-secondary transition hover:bg-secondary/10">
              STOP TOYS
            </button>
          )}
        </div>

        {connected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {connected.map((toy) => (
              <span key={toy.id} className="rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1 text-[10px] font-bold text-secondary">
                {toy.nickname || toy.name}{typeof toy.battery === "number" ? " · " + toy.battery + "%" : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
