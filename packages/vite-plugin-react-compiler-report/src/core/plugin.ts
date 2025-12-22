import type { Plugin, ResolvedConfig } from "vite";

import type { ReactCompilerReportOptions } from "./types";
import { onCompilerEvent, clearCompilerEventListeners } from "./events";
import { createDevReporter } from "../dev/reporter";
import { buildReportData } from "../report/serialize";
import { resolveOutputDir } from "../paths/output";
import { writeJsonReport } from "../builder/writer";
import { generateReportUI } from "./generator"; 
import { color as c } from "../utils/colors";

export function reactCompilerReport(opts: ReactCompilerReportOptions = {}): Plugin {
  const options = {
    outputDir: opts.outputDir ?? ".react-compiler/report",
    ui: opts.ui ?? false,
    build: {
      fileName: opts.build?.fileName ?? "react-compiler-report.json",
    },
  };

  let config: ResolvedConfig | null = null;
  let unsubscribe: null | (() => void) = null;

  return {
    name: "vite-plugin-react-compiler-report",

    configResolved(rc) {
      config = rc;

      if (config.command === "serve") {
        const devReporter = createDevReporter();

        unsubscribe = onCompilerEvent(() => devReporter.schedule());
      }
    },

    async closeBundle() {
      unsubscribe?.();
      unsubscribe = null;
      clearCompilerEventListeners();

      if (!config || config.command !== "build") return;

      const outputDir = resolveOutputDir(options.outputDir);

      const data = buildReportData();
      const jsonPath = writeJsonReport(outputDir, options.build.fileName, data);

      const indexHtml = options.ui 
        ? generateReportUI(outputDir, "ui", data) 
        : null;

      const successCount = data.totals.ok;
      const failureCount = data.totals.failed;

      console.log(
        "\n" +
          c.bold("React Compiler report") +
          "\n" +
          c.green(`✓ ${successCount} components optimized`) +
          "\n" +
          (failureCount > 0 ? c.red(`✕ ${failureCount} components failed`) + "\n" : "") +
          "\n" +
          c.gray("JSON: ") +
          c.dim(jsonPath) +
          "\n" +
          (indexHtml ? c.gray("UI:   ") + c.dim(indexHtml) + "\n" : "")
      );
    },
  };
}
