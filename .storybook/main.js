module.exports = {
  stories: [
    // "../src/**/*.stories.mdx",
    // "../src/**/*.stories.@(js|jsx|ts|tsx)",
    // "../src/widgets/GSM/**/*.stories.mdx",
    // "../src/widgets/GSM/**/*.stories.@(js|jsx|ts|tsx)",

    "../src/v1/**/*.stories.mdx",
    "../src/v1/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  features: { emotionAlias: false },
};
