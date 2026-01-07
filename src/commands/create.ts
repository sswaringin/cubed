import { Command } from "commander";
import * as p from "@clack/prompts";
import { runCommand, writeDir, writeFile } from "../utils/common";

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

      // TODO: convert baseFiles to key value pairs to link each path to its content
      // TODO: consider more efficient approaches compared to manually tracking all file paths
      // TODO: when do I update the "global.css" file? after each base file is created? Don't assume things will always succeed.
      const baseFiles = [
        "./global.css",
        "./global/global-styles.css",
        "./global/reset.css",
      ];
      baseFiles.forEach((file) => writeFile(directory, file, "testing123"));
    });
  });

async function makeDirs() {
  await p.text({ message: "making dirs" });
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
