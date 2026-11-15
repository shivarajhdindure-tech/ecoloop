import { useState } from 'react';

function detectWebGLSupport(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false });

    if (!context) {
      return false;
    }

    const loseContextExt = context.getExtension('WEBGL_lose_context');
    loseContextExt?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function useWebGLSupport(): boolean {
  const [isSupported] = useState<boolean>(() => detectWebGLSupport());
  return isSupported;
}
