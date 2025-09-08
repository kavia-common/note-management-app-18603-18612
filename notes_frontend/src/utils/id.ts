export function uid(): string {
  // RFC4122-ish simple UUID v4 implementation using random values
  const rnd = (n = 16) => Math.floor(Math.random() * n);
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = rnd(16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
