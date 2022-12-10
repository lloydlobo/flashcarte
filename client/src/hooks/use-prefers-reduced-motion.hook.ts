import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const isRenderingOnServer = typeof window === 'undefined';

/**
 * For our initial server render, we won't know if the user  prefers reduced
 * motion, but it doesn't matter. This value will be overwritten on the
 * client, before any animations occur.
 */
function getInitialState() {
  const isPrefersReducedMotion = !window.matchMedia(QUERY).matches;
  return isRenderingOnServer ? true : isPrefersReducedMotion;
}

/**
 * Checks if the user's browser has permitted preference for reduced motion.
 *
 * For the best possible user experience, we want to re-render components that
 * rely on this hook when the user toggles prefers-reduced-motion on or off.
 * In older browsers, this is done with mediaQueryList.addListener(...). This
 * syntax has been updated in newer browsers to be a bit more conventional:
 * mediaQueryList.addEventListener('change', ...).
 * To make sure we support as many browsers as possible, we'll use both.
 *
 * @see https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => { setPrefersReducedMotion(!event.matches) }; // prettier-ignore

    return handleUseEffect(mediaQueryList, listener);
  }, []);

  return prefersReducedMotion;
}

export { usePrefersReducedMotion };
    function handleUseEffect(mediaQueryList: MediaQueryList, listener: (event: MediaQueryListEvent) => void) {
        if (mediaQueryList.addEventListener) mediaQueryList.addEventListener('change', listener); // prettier-ignore
        else mediaQueryList.addListener(listener);

        return () => {
            if (mediaQueryList.removeEventListener) mediaQueryList.removeEventListener('change', listener); // prettier-ignore
            else mediaQueryList.removeListener(listener);
        };
    }

