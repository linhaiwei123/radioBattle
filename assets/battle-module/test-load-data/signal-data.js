let colorMgr = require("color-mgr");
let SimpleAttackSignal = function(origin,position,ctrlPosition){
    let signal = {};
    signal.worldPosition = position;
    signal.ctrlPosition = ctrlPosition;
    signal.radio = 10;
    signal.origin = origin;
    signal.id = 0;
    signal.idx = null;
    signal.name = 'simple-attack',
    signal.consume = 60,
    signal.times = 2,
    signal.order = 90,
    signal.colorSet = colorMgr.bad;
    signal.cb = function(target,rate){
        let data = Math.ceil(Math.max((origin.attack - target.defend) * rate, 1));
        target.blood -= data;
        target.resultTipsDataArray.push({
            msg: 'hp-' + data,
            color: signal.colorSet
        });   
    }
    return signal;
}

let AttackUpSignal = function(origin,position,ctrlPosition){
    let signal = {};
    signal.worldPosition = position;
    signal.ctrlPosition = ctrlPosition;
    signal.radio = 30;
    signal.origin = origin;
    signal.id = 1;
    signal.idx = null;
    signal.name = 'attack-up',
    signal.consume = 80,
    signal.times = 4,
    signal.order = 70,
    signal.colorSet = colorMgr.good;
    signal.cb = function(target,rate){
        //let data = Math.ceil(Math.max((origin.attack - target.defend) * rate, 1));
        let data = 5;
        target.attack += data;
        target.resultTipsDataArray.push({
            msg: 'attack+' + data,
            color: signal.colorSet,
        });   
    }
    return signal;
}

module.exports = [
    SimpleAttackSignal,
    AttackUpSignal,
];
//random signal lib