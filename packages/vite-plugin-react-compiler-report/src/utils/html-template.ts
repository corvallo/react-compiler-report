import fs from "node:fs";

export function loadReportTemplateHtml(): string {
  const url = new URL("./template/report-template.html", import.meta.url);
  return fs.readFileSync(url, "utf8");
}

export function injectReportData(template: string, json: string): string {
  return template.replace("__REACT_COMPILER_REPORT_DATA__", json);
}
