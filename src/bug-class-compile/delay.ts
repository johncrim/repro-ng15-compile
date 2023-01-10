/**
 * Returns a Promise that resolves in `ms` milliseconds.
 *
 * @param ms The number of milliseconds to delay.
 */
export function delay(ms?: number): Promise<void> {
  let timeoutHandle: number;
  return new Promise((resolve) => {
    timeoutHandle = window.setTimeout(resolve, ms);
  });
}
