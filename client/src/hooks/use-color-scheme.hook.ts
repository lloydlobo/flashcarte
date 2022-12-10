import { useState } from 'react';

import { ColorScheme } from '@mantine/core';

/**
 * Toggles the theme between light and dark.
 * @param colorScheme The current color scheme.
 * @param themes The themes to toggle between.
 * @returns The new color scheme.
 */ // prettier-ignore
function toggleTheme<T = ColorScheme>(colorScheme: T, themes:{ light: T; dark: T }): T {
  return colorScheme === themes.dark ? themes.light : themes.dark;
}

/**
 * Custom React hook to toggle and set the theme with React.useState.
 * Implement in ColorSchemeProvider & MantineProvider components.
 */
function useColorSchemeState<T = ColorScheme>() {
  const themes = { light: 'light' as T, dark: 'dark' as T };
  const [colorScheme, setColorScheme] = useState<T>(themes.dark);

  /**
   * Toggles the color scheme.
   * If a value is passed in, return that value.
   * @param value The ColorSchema value to set the color scheme to.
   * @param toggled The opposite of current colorScheme.
   */
  const toggleColorScheme = (value?: T) => {
    const toggled = value || toggleTheme<T>(colorScheme, themes);
    return setColorScheme(toggled);
  };

  return { colorScheme, toggleColorScheme };
}

export { useColorSchemeState };
