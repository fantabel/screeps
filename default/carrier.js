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
            
            if (sources.length) {
                if (creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000', opacity : 1, style:"dotted"}});
                }
            } else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                   i.store[RESOURCE_ENERGY] > 0 });
                if (containers.length) {
                    if (creep.withdraw(containers[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {stroke: "#00ff00", opacity:0.9})
                    }
                }
            }
        }
    }
    /*
    buildOne = function() {
        console.log("Creating creep.")
    }*/
};

module.exports = roleCarrier;

var moo = {
  buildOne: function() {
      console.log("Creating creep.")
  }
}

//module.exports = moo;
