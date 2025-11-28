import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Override svelte compiler options for Storybook
    // Find the svelte plugin and modify its options
    if (config.plugins) {
      for (const plugin of config.plugins) {
        if (plugin && typeof plugin === 'object' && 'name' in plugin) {
          if ((plugin as any).name === 'vite-plugin-svelte') {
            // Access the svelte plugin's config and disable customElement
            const sveltePlugin = plugin as any;
            if (sveltePlugin.api?.options?.compilerOptions) {
              sveltePlugin.api.options.compilerOptions.customElement = false;
            }
          }
        }
      }
    }
    return config;
  },
};
export default config;
