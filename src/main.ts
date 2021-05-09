import { Builder } from "roles/builder";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "roles/harvester";
import { Upgrader } from "roles/upgrader";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const harvesters: Creep[] = Object.values(Game.creeps).filter((creep) => creep.memory.role === "harvester");
  const upgraders: Creep[] = Object.values(Game.creeps).filter((creep) => creep.memory.role === "upgrader");

  if (harvesters.length < 2) {
    const newName = `Harvester ${Game.time}`;
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "harvester", working: false } });
  }

  if (upgraders.length < 1) {
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
