import react from "@vitejs/plugin-react";
import { reactCompilerLogger, reactCompilerReport } from "vite-plugin-react-compiler-report";

export default {
  plugins: [
    react({
      babel: {
        plugins: [["react-compiler", { logger: { logEvent: reactCompilerLogger } }]],
      },
    }),
    reactCompilerReport({ ui: true}),
  ],
};
