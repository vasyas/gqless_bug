/**
 * @type {import("@gqless/cli").GqlessConfig}
 */
const config = {
  endpoint: "/api/graphql",
  enumsAsStrings: false,
  react: true,
  scalars: { DateTime: "string" },
  preImport: "",
  introspection: { endpoint: "http://127.0.0.1:3000/api/graphql" },
  destination: "./src/gqless/index.ts",
  subscriptions: true
};

module.exports = config;
