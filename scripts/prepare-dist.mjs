import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  mkdirSync(dist, { recursive: true });
}

const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const distPkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  description: rootPkg.description,
  author: rootPkg.author,
  repository: rootPkg.repository,
  main: "index.html",
  logseq: {
    ...rootPkg.logseq,
    icon: "./icon.png",
  },
};

writeFileSync(join(dist, "package.json"), JSON.stringify(distPkg, null, 2) + "\n");

console.log("Prepared dist/ as loadable Logseq plugin root");
