import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function generateReportUI(
  outputDir: string,
  uiDirName: string,
  data: Record<string, any>
) {
  try {
 
    
    const templatePath = fileURLToPath(
      new URL("./template/report-template.html", import.meta.url)
    );

    if (!fs.existsSync(templatePath)) {
      console.warn("⚠ Report template not found at", templatePath);
      return null;
    }

    let html = fs.readFileSync(templatePath, "utf-8");
    
   
    const jsonString = JSON.stringify(data);
    html = html.replace("__REACT_COMPILER_REPORT_DATA__", jsonString);

    const uiOutDir = path.join(outputDir, uiDirName);
    fs.mkdirSync(uiOutDir, { recursive: true });
    
    const maxHtmlPath = path.join(uiOutDir, "index.html");
    fs.writeFileSync(maxHtmlPath, html);

    return maxHtmlPath;
  } catch (e) {
    console.error("Failed to generate report UI", e);
    return null;
  }
}
