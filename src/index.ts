import pkg from "../package.json";
import { program, Command } from "commander";
import { create } from "./commands/create";

// adds a gap of spacing between the executing command and the output
console.log();

program.name("cubed-cli").version(pkg.version);
program.addCommand(create);
program.parse();
