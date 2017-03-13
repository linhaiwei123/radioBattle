let id = 0;
let playerTestGenerator = function(){
    let player = {};
    player.id = id++;
    player.radio = 5,
    // player.actionMaxValue = 100,
    // player.actionCurValue = 0,
    player.maxStrength = 100,
    player.curStrength = 100,
    player.blood = 100,
    player.attack =  10,
    player.defend = 3,
    player.speed = 10,
    player.luck = 3;
    //fast cal race 
    player.actionDuration = 0;

    //add divided mem for singal communication
    player.signalsMem = {};
    //add stack for follow mini-signal
    player.followSignals = [];

    return player;
}

// module.exports = [
//     new playerTestGenerator(),
//     new playerTestGenerator(),
//]

module.exports = [
    {
        id: 0,
        radio: 5,
        // actionMaxValue: 100,
        // actionCurValue: 0,
        maxStrength: 100,
        curStrength: 100,
        blood: 100,
        attack: 10,
        defend: 3,
        speed: 10,
        luck: 3,
        actionDuration: 0,
        resultTipsDataArray: [],
    },
    {
        id: 1,
        radio: 5,
        // actionMaxValue: 100,
        // actionCurValue: 0,
        maxStrength: 100,
        curStrength: 100,
        blood: 100,
        attack: 10,
        defend: 3,
        speed: 15,
        luck: 3,
        actionDuration: 0,
        resultTipsDataArray: [],
    },
]