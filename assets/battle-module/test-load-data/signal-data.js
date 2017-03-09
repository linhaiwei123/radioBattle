let SimpleAttackSignal = function(origin,position){
    let signal = {};
    signal.worldPosition = position;
    signal.radio = 10;
    signal.origin = origin;
    signal.id = 0;
    signal.idx = null;
    signal.name = 'simple-attack',
    signal.consume = 60,
    signal.times = 2,
    signal.order = 90,
    signal.cb = function(target){
        target.blood -= Math.max((target.defend - origin.attack) * 0.3, 1);
    }
    return signal;
}

module.exports = [
    SimpleAttackSignal,
];
//random signal lib