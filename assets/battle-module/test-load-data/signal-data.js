let colorMgr = require("color-mgr");
let SimpleAttackSignal = function(origin,position,ctrlPosition){
    let signal = {};
    signal.worldPosition = position;
    signal.ctrlPosition = ctrlPosition;
    signal.radio = 40;
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

let BloodUpBuffSignal = function(origin,position,ctrlPosition){
    let signal = {};
    signal.worldPosition = position;
    signal.ctrlPosition = ctrlPosition;
    signal.radio = 30;
    signal.origin = origin;
    signal.id = 1;
    signal.idx = null;
    signal.name = 'blood-up-buff',
    signal.consume = 80,
    signal.times = 4,
    signal.order = 70,
    signal.isMini = false,
    signal.colorSet = colorMgr.good;
    signal.cb = function(target,rate){
        //let data = Math.ceil(Math.max((origin.attack - target.defend) * rate, 1));
        //let data = 5;
        //target.attack += data;

        //generate a mini signal to follow the target
        //mini signal is not need to render
        //just need the logic part
        //mini signal for keep on update when target leave the circle
        let miniSignal = {};
        miniSignal.origin = origin;
        miniSignal.id = 100;
        miniSignal.idx = null;
        miniSignal.name = 'mini-blood-up-buff';
        miniSignal.times = 6;
        miniSignal.order = 1000,
        miniSignal.rate = rate;
        miniSignal.target = target;
        miniSignal.isMini = true;
        miniSignal.cb = function(parentSignal){
            let data = 5;
            this.target.blood += 5;
            target.resultTipsDataArray.push({
                //msg: 'attack+' + data,
                msg: 'hp+' + data,
                color: parentSignal.colorSet,
            });
        }.bind(miniSignal,signal)
        //push mini-signal to target
        target.followSignals.push(miniSignal);

        target.resultTipsDataArray.push({
            //msg: 'attack+' + data,
            msg: "hp up buff add",
            color: signal.colorSet,
        });   
    }
    return signal;
}

module.exports = [
    SimpleAttackSignal,
    BloodUpBuffSignal,
];
//random signal lib