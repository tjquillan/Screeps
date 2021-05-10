import { Builder } from "roles/builder";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "roles/harvester";
import { Upgrader } from "roles/upgrader";

declare global {
  interface CreepMemory {
    role: string;
    working: boolean;
  }
}

export const loop = ErrorMapper.wrapLoop(() => {
  const roles: Map<string, number> = new Map<string, number>();
  for (const name in Memory.creeps) {
    if (name in Game.creeps) {
      const creep = Game.creeps[name];

      // Insert creep into the creeps map. This functions for tallying creeps for now.
      const roleTally = roles.get(creep.memory.role);
      roles.set(creep.memory.role, roleTally ? roleTally + 1 : 1);

      // Have the creep perform its task
      switch (creep.memory.role) {
        case "harvester":
          Harvester.run(creep);
          break;
        case "upgrader":
          Upgrader.run(creep);
          break;
        case "builder":
          Builder.run(creep);
          break;
      }
    } else {
      // Delete memory of missing creeps
      delete Memory.creeps[name];
    }
  }

  let role = roles.get("harvester");
  if (!role || role < 2) {
    const newName = `Harvester ${Game.time}`;
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
      memory: { role: "harvester", working: false }
    });
  }

  role = roles.get("upgrader");
  if (!role || role < 3) {
    const newName = `Upgrader ${Game.time}`;
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: "upgrader", working: false } });
  }

  if (Game.cpu.bucket === 10000) {
    Game.cpu.generatePixel();
  }
});
