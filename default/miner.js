var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.dropping && creep.carry.energy == 0) {
            creep.memory.dropping = false;
            creep.say('harvesting');
        }
        if(!creep.memory.dropping && creep.carry.energy == creep.carryCapacity) {
            creep.memory.dropping = true;
            creep.say('dropping');
        }
        
        if(creep.memory.dropping) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                   i.store[RESOURCE_ENERGY] < i.storeCapacity
            });
            creep.say(targets.length)
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
    }
};

module.exports = roleMiner;
