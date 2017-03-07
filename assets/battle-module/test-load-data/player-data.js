let id = 0;
let playerTestGenerator = function(){
    let player = {};
    player.id = id++;
    player.radio = 5,
    player.actionMaxValue = 100,
    player.actionCurValue = 0,
    player.blood = 100,
    player.attack =  10,
    player.defend = 3,
    player.speed = 10,
    player.luck = 3;
    return player;
}

module.exports = [
    new playerTestGenerator(),
    new playerTestGenerator(),
]