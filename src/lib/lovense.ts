export type LovensePattern = {
  strength: number[];
  timeSeconds?: number;
  intervalMs?: number;
};

export type LovenseBridge = {
  sendToyCommand: (command: Record<string, unknown>) => void;
  sendPatternCommand: (command: Record<string, unknown>) => void;
  stopToyAction: (toyId?: string) => void;
};

export function playLovensePulse(bridge: LovenseBridge | null, strength: number, timeSeconds = 2) {
  if (!bridge) return;
  const level = Math.max(0, Math.min(20, Math.round(strength)));
  bridge.sendToyCommand({ vibrate: level, time: Math.max(1, timeSeconds) });
}

export function playLovensePattern(bridge: LovenseBridge | null, pattern: LovensePattern) {
  if (!bridge || pattern.strength.length === 0) return;
  const strength = pattern.strength.slice(0, 50).map((value) => Math.max(0, Math.min(20, Math.round(value)))).join(";");
  bridge.sendPatternCommand({
    strength,
    time: pattern.timeSeconds ?? 3,
    interval: Math.max(101, pattern.intervalMs ?? 250),
  });
}
