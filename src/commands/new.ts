import { Command } from "../core/registry.js";
import { createFolder, createFile } from "../core/filesystem.js";
import * as path from "path";

export const newCommand: Command = {

    name: "new",

    description: "Create new KORAVA project",

    run(args: string[]) {

        const projectName = args[0];

        if (!projectName) {

            console.log("Please enter project name.");

            return;

        }

        const root = path.join(process.cwd(), projectName);

        createFolder(root);

        createFolder(path.join(root, "src"));

        createFolder(path.join(root, "docs"));

        createFile(
            path.join(root, "README.md"),
            `# ${projectName}\n\nCreated with KORAVA Builder`
        );

        console.log("");

        console.log("Project created successfully.");

        console.log(root);

        console.log("");

    }

};