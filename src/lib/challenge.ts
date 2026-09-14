export const CHALLENGE_FRAME_COUNT = 169;

export const challengeFramePath = (n: number) =>
  `/frames2/frame_${String(n).padStart(4, "0")}.jpg`;

export const CHALLENGE_TEXT_FADE_IN_END = 0.18;
