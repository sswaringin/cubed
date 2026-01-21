import { Command } from "commander";
import * as p from "@clack/prompts";
import {
  isDir,
  readFile,
  runCommand,
  writeDir,
  writeFile,
} from "../utils/common";
import * as fs from "node:fs";
import path from "node:path";

export const create = new Command("create")
  .description("scaffolds a new project")
  .action(() => {
    runCommand(async () => {
      const { directory } = await createProject();

      // In the future, here is where additional steps can be introduced.
      // TODO: detect if the base dirs are already created
      // TODO: use a spinner and highlighting to indicate what is happening
      // TODO: how to cleanup files if something fails mid process
      const templatesPath = path.join(__dirname, "../templates");
      copyTemplateFiles(templatesPath, directory);
    });
  });

async function makeDirs() {
  await p.text({ message: "making dirs" });
}

// recursively generate base directories and files
function copyTemplateFiles(sourcePath: string, destPath: string): void {
  const entries = fs.readdirSync(sourcePath);

  entries.forEach((entry) => {
    const sourceEntryPath = path.join(sourcePath, entry);
    const relativeEntryPath = path.relative(
      path.join(__dirname, "../templates"),
      sourceEntryPath
    );

    if (isDir(sourceEntryPath)) {
      // Recursively process subdirectories
      copyTemplateFiles(sourceEntryPath, destPath);
    } else {
      // Copy file
      const content = readFile(
        path.join(__dirname, "../templates"),
        relativeEntryPath
      );
      writeFile(destPath, relativeEntryPath, content);
    }
  });
}

async function createProject() {
  const { directory } = await p.group(
    {
      directory: () => {
        const defaultPath = "./styles";

        return p.text({
          message: "Where would you like to generate the styles?",
          placeholder: `(hit Enter to use '${defaultPath}')`,
          defaultValue: defaultPath,
        });
      },
    },
    {
      onCancel: () => {
        p.cancel("operation cancelled");
        process.exit(0);
      },
    }
  );

  return { directory };
}
