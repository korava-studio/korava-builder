"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionCommand = void 0;
const registry_1 = require("../core/registry");
exports.versionCommand = {
    name: "version",
    description: "Show builder version",
    run() {
        console.log("");
        console.log("KORAVA Builder");
        console.log("v0.1.0");
        console.log("");
    }
};
//# sourceMappingURL=version.js.map