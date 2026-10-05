/** A modal must release focus and scrolling even if its visual effect stalls.
 * Returns cleanup for unmount; the callback runs at most once. */
export function afterAnimation(
  animation: Animation,
  complete: () => void,
  timeoutMs: number,
): () => void {
  let settled = false;
  const cleanup = () => {
    settled = true;
    clearTimeout(timer);
    animation.onfinish = null;
    animation.oncancel = null;
  };
  const finish = () => {
    if (settled) return;
    cleanup();
    complete();
  };
  const timer = setTimeout(finish, timeoutMs);
  animation.onfinish = finish;
  animation.oncancel = finish;
  // An implementation may complete synchronously or expose a zero duration.
  if (animation.playState === "finished") finish();
  return cleanup;
}
