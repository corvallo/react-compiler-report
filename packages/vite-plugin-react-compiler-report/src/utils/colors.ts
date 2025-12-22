export const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  gray: "\x1b[90m",
};

export const color = {
  red: (s: string) => `${ANSI.red}${s}${ANSI.reset}`,
  yellow: (s: string) => `${ANSI.yellow}${s}${ANSI.reset}`,
  green: (s: string) => `${ANSI.green}${s}${ANSI.reset}`,
  dim: (s: string) => `${ANSI.dim}${s}${ANSI.reset}`,
  bold: (s: string) => `${ANSI.bold}${s}${ANSI.reset}`,
  gray: (s: string) => `${ANSI.gray}${s}${ANSI.reset}`,
};
