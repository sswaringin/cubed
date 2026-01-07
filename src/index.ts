import { program, Command } from "commander";
import { create } from "./commands/create";

// adds a gap of spacing between the executing command and the output
console.log();

program.name("cubed-cli").version("0.1.0");
program.addCommand(create);
program.parse();
