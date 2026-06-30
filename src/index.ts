import { createCLI } from "./cli/cli.js";
import { banner } from "./core/banner.js";

const cli = createCLI();

async function main() {
  console.log(banner);
  const args = process.argv.slice(2);
  const code = await cli.run(args);
  process.exit(code);
}

main();
