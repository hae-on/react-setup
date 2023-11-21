import React from 'react';
import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </QueryClientProvider>
  ),
  mswDecorator,
];
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: [],
  },
};

export default preview;
