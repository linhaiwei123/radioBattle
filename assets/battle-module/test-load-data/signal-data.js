module.exports = [
    {
        id: 0,
        name: 'attack-up',
        cb: function(target){
            target.attack *= 1.1;
        }
    },
    {
        id: 1,
        name: 'attack-down',
        cb: function(target){
            target.attack *= 0.8;
        }
    },
    {
        id: 2,
        name: 'defend-up',
        cb: function(target){
            target.defend *= 1.1;
        }
    },
    {
        id: 3,
        name: 'defend-down',
        cb: function(target){
            target.defend *= 0.8;
        }
    },
    {
        id: 4,
        name: 'speed-up',
        cb: function(target){
            target.speed *= 1.1;
        }
    },
    {
        id: 5,
        name: 'speed-down',
        cb: function(target){            
            target.speed *= 0.8;
        }
    },
    {
        id: 6,
        name: 'luck-up',
        cb: function(target){
            target.luck *= 1.1;
        }
    },
    {
        id: 7,
        name: 'luck-down',
        cb: function(target){
            target.luck *= 0.8;
        }
    },
    {
        id: 8,
        name: 'strength-up',
        cb: function(target){
            target.maxStrength *= 1.1;
        }
    },
    {
        id: 9,
        name: 'strength-down',
        cb: function(target){
            target.maxStrength *= 0.8;
        }
    },
    {
        id: 10,
        name: 'blood-up',
        cb: function(target){
            target.blood *= 1.1;
        }
    },
    {
        id: 11,
        name: 'blood-down',
        cb: function(target){
            target.blood *= 0.8;
        }
    },
    {
        id: 12,
        name: 'actionDuration-up',
        cb: function(target){
            target.actionDuration *= 1.1;
        }
    },
    {
        id: 13,
        name: 'actionDuration-down',
        cb: function(target){
            target.actionDuration *= 0.8;
        }
    }
];
//random signal lib