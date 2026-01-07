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
