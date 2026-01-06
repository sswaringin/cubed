import fs from "node:fs";
import path from "node:path";

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
