/**
 * For more information on this hook:
 * @see https://www.joshwcomeau.com/react/boop
 */

import { useCallback, useEffect, useState } from 'react';

import { SpringValue, useSpring } from 'react-spring';

import { usePrefersReducedMotion } from './use-prefers-reduced-motion.hook';

export interface ISpring {
  transform: string;
  config: {
    tension: number;
    friction: number;
  };
}
export interface ITransformSpringValue {
  transform: SpringValue<string>;
}

/**
 * useBoop hook
 *
 * @param props
 * @param props.x
 * @param props.y
 * @param props.rotation
 * @param props.scale
 * @param props.timing
 * @param props.springConfig
 */
function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = { tension: 300, friction: 10 },
}) {
  const prefersReducedMotion: boolean = usePrefersReducedMotion();
  const [isBooped, setIsBooped] = useState<boolean>(false);
  const style: ITransformSpringValue = UseSpringTransform(
    isBooped,
    x, y, rotation, scale,
    springConfig,
  ); // prettier-ignore

  /**
   * Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   */
  useEffect(() => {
    if (!isBooped) return;
    const timeoutId: number = window.setTimeout(() => {
      setIsBooped(false);
    }, Number(timing));

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  const appliedStyle: {} = prefersReducedMotion ? {} : style;
  return [appliedStyle, trigger];
}

export { useBoop };

/**
 * UseSpringTransform is a function that returns a spring value.
 *
 * @param isBooped A boolean value that determines if the spring value is booped.
 * @param x The x-axis value.
 * @param y The y-axis value.
 * @param rotation The rotation value.
 * @param scale The scale value.
 * @param springConfig The spring config object.
 * @returns A spring value.
 */
function UseSpringTransform(
  isBooped: boolean,
  x: number,
  y: number,
  rotation: number,
  scale: number,
  springConfig: { tension: number; friction: number },
): ITransformSpringValue {
  /**
   * The prop to pass in useSpring hook.
   */
  const props: ISpring = {
    /**
     * @param propsSpring.transform The transform CSS Attribute.
     */
    transform: isBooped
      ? `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
      : `translate(0px, 0px) rotate(0deg) scale(1)`,

    /**
     * @param propsSpring.config The springConfig object with tension & friction.
     */
    config: springConfig,
  };

  /**
   * Updated on every render, with state inferred from forward props.
   * @param propsSpring The forwarded props.
   */
  const style: ITransformSpringValue = useSpring<ISpring>(props);

  return style;
}
