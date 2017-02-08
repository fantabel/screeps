
var roleHarvester = require('harvester.js');
var roleUpgrader = require('upgrader.js');
var roleBuilder = require('builder.js');

module.exports.loop = function() {
    
    for(var i in Memory.creeps) {
       if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
}