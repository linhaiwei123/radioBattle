### TODO in battle-module

## load

1.load the map-data. <br>
  {
    radio: 600,//px<br>
    totalPlayerNum: 2,<br>
    playerOnePosition: cc.v2(-200,200),<br>
    playerTwoPosition: cc.v2(200,200)<br>
  }<br>

2. load the player-data.<br>
  player-data-template<br>
  {<br>
    radio: 5,//px<br>
    actionMaxValue: 100,<br>
    actionCurValue: 0,<br>
    blood: 100,<br>
    attack : 10,<br>
    defend : 3,<br>
    speed: 10,<br>
    luck: 3,<br>
    //step to move<br>
    //strength: 5* speed<br>
    //moveStepDistance: 2, px<br>
    //moveStepConsume: 2,<br>
  }<br>
3. load the rule-data.<br>
  {<br>
    gameDuration: 300//s<br>
    cmdWaitDuration: 10//s<br>
  }<br>
4. load the signal-data <br>
  signal-data-template<br>
  {<br>
    radio: 10,//px<br>
    //solution 1<br>
    //onPlayerEnterSensor: [function], //enter callback<br>
    //onPlayerStaySensor: [function], //stay callback<br>
    //onPlayerExitSensor: [function], //exit callback<br>
    //solution2<br>
    onPlayerInSensor: [function]<br>
  }<br>
