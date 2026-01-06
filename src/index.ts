import { program, Command } from "commander";
import { create } from "./commands/create";

program.name("cubed-cli").version("0.1.0");
program.addCommand(create);
program.parse();
