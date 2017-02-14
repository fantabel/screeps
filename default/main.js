
var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');
var roleMiner = require('miner');
var roleCarrier = require('carrier');

console.log("Init");

module.exports.loop = function() {
    
    var hostiles = Game.rooms['E3S87'].find(FIND_HOSTILE_CREEPS);
    //hostiles = [];
    
    if(hostiles.length > 0) {
        if (Game.creeps.Killer == undefined) {
            Game.spawns.Home.createCreep([TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], "Killer", {role: "scout"});
        }
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        //var towers = Game.rooms[roomName].find(         FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        if (Game.creeps.Killer.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
            Game.creeps.Killer.moveTo(hostiles[0]);
        }
    }
    
    var harvesterCount = _.filter(Game.creeps, {memory : { role : "harvester"}}).length;
    var upgraderCount = _.filter(Game.creeps, {memory : { role : "upgrader"}}).length;
    var builderCount = _.filter(Game.creeps, {memory : { role : "builder"}}).length;
    
    //console.log("h:", harvesterCount, " u:", upgraderCount, " b:", builderCount);
    
    if (harvesterCount === 0) {
        Game.spawns.Home.createCreep([WORK, WORK, CARRY, MOVE], {role:"harvester"});
        console.log("Building a harvester tiny " + (harvesterCount + 1));
    
        
    } else if (harvesterCount < 4) {
        if (Game.spawns.Home.canCreateCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]) == OK) {
            Game.spawns.Home.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], {role:"harvester"});
            console.log("Building a harvester " + (harvesterCount + 1));
        }
    } else if (upgraderCount < 2) {
        if (Game.spawns.Home.canCreateCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) == OK) {
            Game.spawns.Home.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], {role:"upgrader"});
            console.log("Building a upgrader " + (upgraderCount + 1));
        }
    } else if (builderCount < 5) {
        
        if (Game.spawns.Home.canCreateCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]) == OK) {
            Game.spawns.Home.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], {role:"builder"});
            console.log("Building a builder " + (builderCount + 1));
        }
    }
    
    for(var i in Memory.creeps) {
       if(!Game.creeps[i]) {
           console.log(i, " (", Memory.creeps[i].role, ") died.")
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
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
    
}