import { Builder } from "roles/builder";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "roles/harvester";
import { Upgrader } from "roles/upgrader";

export const loop = ErrorMapper.wrapLoop(() => {
  const creeps: Map<string, Creep[]> = new Map<string, Creep[]>();
  for (const name in Memory.creeps) {
    if (name in Game.creeps) {
      const creep = Game.creeps[name];
      if (!creeps.has(creep.memory.role)) {
        creeps.set(creep.memory.role, []);
      }
      creeps.get(creep.memory.role)?.push(creep);
    } else {
      // Delete memory of missing creeps
      delete Memory.creeps[name];
    }
  }

  let role = creeps.get("harvester");
  if (!role || role.length < 2) {
    const newName = `Harvester ${Game.time}`;
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "harvester", working: false } });
  }

  role = creeps.get("upgrader");
  if (!role || role.length < 3) {
    const newName = `Upgrader ${Game.time}`;
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "upgrader", working: false } });
  }

  for (const creep of Object.values(Game.creeps)) {
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
  }
});
