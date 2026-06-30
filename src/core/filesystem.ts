import * as fs from "fs";
import * as path from "path";

export function createFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

export function createFile(filePath: string, content = "") {
    createFolder(path.dirname(filePath));

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
}