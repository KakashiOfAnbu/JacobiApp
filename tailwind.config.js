const mode = process.env.TAILWIND_MODE ? "jit" : "aot";

module.exports = {
  mode: mode,
  purge: ["./src/**/*.{html,ts}", "./projects/**/*.{html,ts}"],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
