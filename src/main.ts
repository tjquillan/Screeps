import { Kernel } from "os/kernel";

declare global {
  interface Memory {
    os: {
      processTable: any[];
      cache: { [id: string]: any };
    };
  }
}

const kernel = new Kernel();

export function loop(): void {
  kernel.tick();
}
