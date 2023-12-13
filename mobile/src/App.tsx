import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'src/theme/ThemeProvider';

import { RootStack } from './navigation/navigators/RootStack.navigator';

// if (__DEV__) {
//   import('../ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
      <StatusBar translucent />
    </QueryClientProvider>
  );
}
