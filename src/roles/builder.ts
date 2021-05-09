export class Builder {
  public static run(creep: Creep): void {
    if (creep.memory.working && creep.store.energy === 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length > 0) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
}
