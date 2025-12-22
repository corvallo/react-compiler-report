export type ReactCompilerReportOptions = {
  outputDir?: string; 
  ui?: boolean;
  build?: {
    fileName?: string;
  };
};
export type ReactCompilerEvent =
  | { kind: "CompileSuccess" }
  | {
      kind: "CompileError";
      detail?: {
        category?: string;
        reason?: string;
        description?: string;
        loc?: { start?: { line: number; column: number } };
        suggestions?: string[];
      };
    }
  | { kind: string; [k: string]: any };

export type Item = {
  filename: string;
  event: ReactCompilerEvent;
  time: number;
};

export type Store = {
  all: { success: Item[]; error: Item[]; other: Item[] };
  batch: { success: Item[]; error: Item[]; other: Item[] };
  batchId: number;
};
