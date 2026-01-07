import { Command } from "commander";
import * as p from "@clack/prompts";
import { runCommand, writeDir } from "../utils/common";
import path from "node:path";

export const create = new Command("create")
  .description("scaffolds a new project")
  .action(() => {
    runCommand(async () => {
      const { directory } = await createProject();

      // In the future, here is where additional steps can be introduced.
      // TODO: detect if the base dirs are already created
      // TODO: use a spinner and highlighting to indicate what is happening
      const baseDirs = [
        "./compositions",
        "./blocks",
        "./global",
        "./utilities",
      ];
      baseDirs.forEach((dir) => writeDir(directory, dir));
    });
  });

async function makeDirs() {
  await p.text({ message: "hello" });
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
