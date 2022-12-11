import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';

import { useColorSchemeState } from './hooks/use-color-scheme.hooks';
import { Home } from './pages';

/** Create a client */
const queryClient = new QueryClient();

/**
 * App Starts the application.
 */
function App(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useColorSchemeState();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Home />
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
