# vite-plugin-react-compiler-report
[![npm version](https://img.shields.io/npm/v/vite-plugin-react-compiler-report)](https://www.npmjs.com/package/vite-plugin-react-compiler-report)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-react-compiler-report)](https://www.npmjs.com/package/vite-plugin-react-compiler-report)
[![CI](https://img.shields.io/github/actions/workflow/status/corvallo/react-compiler-report/publish.yml)](https://github.com/corvallo/react-compiler-report/actions)
A Vite plugin that generates detailed reports for the React Compiler. It provides terminal logging during development and builds, and optionally generates a visual HTML report.

## Features

- **Dev Mode Logging**: Real-time feedback in the terminal about compiled components and failures.
- **Build Report**: Summary of optimization success rates at the end of the build.
- **HTML Report**: A premium, dark-mode UI to explore compilation details and errors (optional).
- **Zero Config**: Works out of the box with sensible defaults.

## Installation

```bash
npm install -D vite-plugin-react-compiler-report
# or
pnpm add -D vite-plugin-react-compiler-report
```

## Usage

1. Configure the React Compiler in your Vite config (using `babel` options).
2. Add the `reactCompilerLogger` passed to the compiler options.
3. Add `reactCompilerReport` to your plugins list.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { 
  reactCompilerLogger, 
  reactCompilerReport 
} from "vite-plugin-react-compiler-report";

const ReactCompilerConfig = {
  target: "19",
  logger: {
    logEvent: reactCompilerLogger,
  },
};

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    reactCompilerReport({
      // Options
      ui: true, // Generate the HTML report
    }),
  ],
});
```

## Configuration

You can customize the plugin by passing an options object:

```ts
reactCompilerReport({
  // Directory where reports will be generated
  // Default: ".react-compiler/report"
  outputDir: ".react-compiler/report",

  // Enable the HTML visual report
  // Default: false
  ui: true,
  
  build: {
    // Filename for the raw JSON report
    // Default: "react-compiler-report.json"
    fileName: "react-compiler-report.json"
  }
})
```

## HTML Report

If `ui: true` is enabled, a static HTML report will be generated in `outputDir/ui/index.html`.
The path to this file will be printed in the terminal at the end of the build.

You can open this file in any browser to inspect:
- Total optimized components
- Compilation failures
- Detailed error messages and code locations
