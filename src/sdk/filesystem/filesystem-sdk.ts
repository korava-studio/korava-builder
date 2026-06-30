import * as fs from "fs/promises";
import * as path from "path";

/** FilesystemSDK - thin async wrapper around fs.promises */
export class FileSystemSDK {
  async exists(p: string) {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  }

  async copy(src: string, dest: string) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }

  async move(src: string, dest: string) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.rename(src, dest);
  }

  async remove(p: string) {
    try {
      await fs.rm(p, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  async mkdir(p: string) {
    await fs.mkdir(p, { recursive: true });
  }

  async read(p: string) {
    return fs.readFile(p, "utf8");
  }

  async write(p: string, content: string) {
    await fs.mkdir(path.dirname(p), { recursive: true });
    return fs.writeFile(p, content, "utf8");
  }
}
