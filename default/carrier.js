var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.carring && creep.carry.energy == 0) {
            creep.memory.carring = false;
            creep.say('searching');
        }
        if(!creep.memory.carring && creep.carry.energy == creep.carryCapacity) {
            creep.memory.carring = true;
            creep.say('dropping');
        }
        
        if(creep.memory.carring) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_EXTENSION && 
                   i.energy < i.energyCapacity
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_DROPPED_ENERGY);
            creep.say(sources.length);
            if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000', opacity : 1, style:"dotted"}});
            }
        }
        
    }
};

module.exports = roleCarrier;
