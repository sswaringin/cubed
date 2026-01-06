import { program, Command } from "commander";
import p from "@clack/prompts";

export const create = new Command("create")
  .description("scaffolds a new project")
  .action(async () => {
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

    console.log(`Destination directory: ${directory}`);
  });
