import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";

type Command = () => Promise<void>;

export async function runCommand(command: Command): Promise<void> {
  try {
    p.intro("Welcome to the cubed cli!");

    await command();
    // p.outro("all done");
  } catch (error) {
    if (error instanceof Error) {
      p.log.error(error.stack ?? String(error));
      p.log.message();
    }
    p.cancel("an error has occurred");
  }
}

export function writeFile(
  workspace: string,
  filePath: string,
  content: string
): void {
  const fullFilePath = path.resolve(workspace, filePath);
  const fullDirPath = path.dirname(fullFilePath);

  // make directory if it doesn't already exist
  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(fullDirPath);
  }

  // what happens if the file already exists?
  fs.writeFileSync(fullFilePath, content, "utf8");
}

export function writeDir(dirPath: string, dirName: string): void {
  const fullDirPath = path.resolve(dirPath, dirName);

  // make directory if it doesn't already exist
  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(fullDirPath, { recursive: true });
  }
}

export const isDir = (filename: string) => {
  return fs.lstatSync(filename).isDirectory();
};
