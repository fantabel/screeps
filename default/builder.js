var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
//say(creep.memory.building);
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var repairSites = creep.room.find(FIND_STRUCTURES);
                var working = false;
                for (struct in repairSites) {
                    if (repairSites[struct].structureType != STRUCTURE_WALL) {
                        if (repairSites[struct].hits / repairSites[struct].hitsMax < .8) {
                            working = true;
                        //if (repairSites[struct].hits < repairSites[struct].hitsMax) {
                            if (creep.repair(repairSites[struct]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repairSites[struct], {visualizePathStyle: {stroke: '#ffffff'}});
                                return;
                            }
                        }
                    }
                }
                if (!working) {
                   for (struct in repairSites) {
                    if (repairSites[struct].structureType == STRUCTURE_WALL) {
                        if (repairSites[struct].hits < 100000) {
                        //if (repairSites[struct].hits < repairSites[struct].hitsMax) {
                            if (creep.repair(repairSites[struct]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repairSites[struct], {visualizePathStyle: {stroke: '#ffffff'}});
                                return;
                            }
                        }
                    }
                } 
                }
                
            }
        }
        else {
            /*
            var extensions = creep.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } });
            for (let ext in extensions) {
                if (extensions[ext].energy > 0) {
                    //console.log(creep.withdraw(extensions[ext], RESOURCE_ENERGY));
                    if (creep.withdraw(extensions[ext], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(extensions[ext], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }*/
            
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                   i.store[RESOURCE_ENERGY] > 0 });
            if (containers.length) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {stroke: "#00ff00", opacity:0.9})
                }
            }
                /*
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/
        }
    }
};

module.exports = roleBuilder;