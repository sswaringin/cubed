import { Command } from "commander";
import * as p from "@clack/prompts";
import { runCommand } from "../utils/common";
import path from "node:path";

export const create = new Command("create")
  .description("scaffolds a new project")
  .action(() => {
    runCommand(async () => {
      const { directory } = await createProject();

      console.log({ directory, cwd: process.cwd() });
      const relative = path.relative(process.cwd(), directory);

      console.log("The relative path is: ", relative);
    });
  });

async function createProject() {
  const { directory } = await p.group(
    {
      directory: () => {
        const defaultPath = "./";

        return p.text({
          message: "Where would you like to place this project?",
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
