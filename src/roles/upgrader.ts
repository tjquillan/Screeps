export class Upgrader {
  public static run(creep: Creep): void {
    if (creep.memory.working && creep.store.energy === 0) {
      creep.memory.working = false;
    } else if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
}
