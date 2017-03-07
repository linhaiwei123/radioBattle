### TODO in battle-module

## load
1.load the map-data. 
  {
    radio: 600,//px
    totalPlayerNum: 2,
    playerOnePosition: cc.v2(-200,200),
    playerTwoPosition: cc.v2(200,200)
  }
2. load the player-data.
  player-data-template
  {
    radio: 5,//px
    actionMaxValue: 100,
    actionCurValue: 0,
    blood: 100,
    attack : 10,
    defend : 3,
    speed: 10,
    luck: 3,
    //step to move
    //strength: 5* speed
    //moveStepDistance: 2, px
    //moveStepConsume: 2,
  }
3. load the rule-data.
  {
    gameDuration: 300//s
    cmdWaitDuration: 10//s
  }
4. load the signal-data 
  signal-data-template
  {
    radio: 10,//px
    //solution 1
    //onPlayerEnterSensor: [function], //enter callback
    //onPlayerStaySensor: [function], //stay callback
    //onPlayerExitSensor: [function], //exit callback
    //solution2
    onPlayerInSensor: [function]
  }