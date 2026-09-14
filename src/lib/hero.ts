import { CLIENT_QUOTES } from "./ciiia";

export const FRAME_COUNT = 169;

export const framePath = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  quote: string;
  speaker: string;
  film: string;
};

const DIALOGUE_WINDOWS: [number, number][] = [
  [0.15, 0.4],
  [0.5, 0.75],
];

export const DIALOGUES: Dialogue[] = CLIENT_QUOTES.map((q, i) => ({
  id: q.id,
  show: DIALOGUE_WINDOWS[i][0],
  hide: DIALOGUE_WINDOWS[i][1],
  quote: q.quote,
  speaker: "Voz de cliente",
  film: "CII.IA",
}));

export const HERO_TEXT_FADE_END = 0.08;
