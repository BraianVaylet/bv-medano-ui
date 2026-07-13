import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';

import '@medano-ui/tokens/vars.css';
import '@medano-ui/fonts/medano-sans.css';
import '@medano-ui/css/base.css';
import '../../../packages/react/src/styles.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'dark';
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Tema medano',
      toolbar: {
        title: 'Tema',
        icon: 'moon',
        items: [
          { value: 'dark', title: 'Oscuro (origen)' },
          { value: 'light', title: 'Claro (derivado)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
  },
};

export default preview;
