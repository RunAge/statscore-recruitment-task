export default {
  files: ["src/**/*.test.ts"],
  extensions: {
    ts: "module",
  },
  nodeArguments: ["--no-warnings", "--loader=ts-node/esm"],
};
