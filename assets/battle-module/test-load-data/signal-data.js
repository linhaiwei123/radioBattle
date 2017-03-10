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
    signal.cb = function(target,rate){
        let data = Math.ceil(Math.max((origin.attack - target.defend) * rate, 1));
        target.blood -= data;
        target.resultTipsDataArray.push({
            msg: 'hp-' + data,
            color: cc.hexToColor('#F81919'),
        });

        
    }
    return signal;
}

module.exports = [
    SimpleAttackSignal,
];
//random signal lib