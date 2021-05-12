import { Process } from "./process";
import { Thread } from "./thread";

export class Kernel {
  private readonly threads = new Map<string, Thread>();
  private readonly processes = new Map<string, Process>();
  private readonly startTime = Game.time;

  public tick(): void {
    // Build up a buffer for extra CPU
    if (Game.cpu.bucket < 1000) return;

    const uptime = Game.time - this.startTime;
    const count = 0;
  }

  public hasThread(name: string): boolean {
    return this.threads.has(name);
  }

  public createThread(processName: string, name: string, fn: () => void, ...args): void {
    const process = this.processes.get(processName);
    if (!process) {
      throw new Error(`Tried creating thread '${name}' for nonexistant process '${processName}'`);
    }
    const thread = new Thread(process, name, fn, args);
  }
}
