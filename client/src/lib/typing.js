/**
 * Utility that reveals text progressively like a terminal typing effect.
 * Returns an async iterator yielding substrings; consumer renders each chunk.
 */
export async function* typeOut(str, speed = 12) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    out += str[i];
    yield out;
    await new Promise((r) => setTimeout(r, speed));
  }
}
