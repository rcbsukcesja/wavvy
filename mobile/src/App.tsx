import { QueryClient, QueryClientProvider } from 'react-query';

import { RootStack } from './navigation/navigators/RootStack.navigator';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootStack />
    </QueryClientProvider>
  );
}
