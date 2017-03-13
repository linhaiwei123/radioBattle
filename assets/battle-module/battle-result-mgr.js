let IdxPool = function(length){
    this._idxPool = [];
    this._length = length;
    for(let i = 0; i < length ;i++){
        this._idxPool.push(i);
    }
    this.getIdx = function(){
        if(!this._idxPool.length){
            this._idxPool.push(this._length);
            this._length++;
        }
        return this._idxPool.shift();
    }
    this.backIdx = function(id){
        this._idxPool.push(id);
    }
};

cc.Class({
    extends: cc.Component,

    properties: {
        _signals: [],
        _signalData: null,  
        _playerDatas: null,
        _idxPool : null,
        mainPanel: cc.Node,

       _battleRenderMgr: {
           get: function(){return this.getComponent('battle-render-mgr');}
       },
       
    //    windMin: 0,
    //    windRange: 30,
    //    _windValue: null,
    //    _windVector: null,
    },

    onLoad: function(){
        this._signalData = require('signal-data');
        this._playerDatas = this.getComponent("battle-load-mgr")._playerDatas;
        this._idxPool = new IdxPool(100);
        
    },

    result: function (event,from,to,arg) {

        //request: merge two signals of ground signal and follow signal and re-order it
        //

        let targetData = arg.targetData;
        let worldDestinationPosition = arg.worldDestinationPosition;
        let signalId = arg.signalId;
        //init signal and throw it 
        //test the default signal 
        //console.log(arg);

        //cal the wind
        // this._windValue = this.windMin + Math.floor(cc.random0To1() * this.windRange);
        // this._windVector = cc.pMult(cc.pNormalize(cc.v2(cc.randomMinus1To1(),cc.randomMinus1To1())),this._windValue);
        let windValue = arg.windValue;
        let windVector = arg.windVector;
        //console.log(this._windVector);
        //render windtips
        //this._battleRenderMgr.windTipsRender(this._windValue,this._windVector);
        //this._battleRenderMgr.windTipsRender(windValue,windVector);

        //update the worldDestionationPosition
        let worldDestinationPositionWithWind = cc.pAdd(worldDestinationPosition,windVector);


        //resume the playerData.curStrength
        targetData.curStrength = targetData.maxStrength;

        let signal = this._signalData[signalId](targetData,worldDestinationPositionWithWind,worldDestinationPosition);
        signal.idx = this._idxPool.getIdx();

        let addRenderSignal = signal;
        //addRenderSignals.push(signal);
        this._battleRenderMgr._resultAnimData.addRenderSignal = addRenderSignal;

        //add up the player's actionDuration
        targetData.actionDuration += Math.max((signal.consume - targetData.speed),10);
        //push the new signals
        this._signals.push(signal);

        //reorder the signals
        this._signals.sort(function(a,b){return a.order - b.order});
        //map enery player and enery signals if touch
        for(let playerData of this._playerDatas){
            //get the child
            let player = this.mainPanel.getChildByName("player#" + playerData.id);
            let playerWorldPosition = player.parent.convertToWorldSpaceAR(player.position);

            //push the mini-signal and re-order it
            let signalsWithMini = [].concat(playerData.followSignals,this._signals);
            //re-order again
            signalsWithMini.sort(function(a,b){return a.order - b.order});

            //iterator the signal with mini
            //for(let signal of this._signals){
              for(let signal of signalsWithMini){
                //add judge of mini-signal
                if(signal.isMini === true){
                    signal.cb();
                }else{
                    let signalWorldPosition = signal.worldPosition;
                    //check if touch the radio
                    let distance = cc.pDistance(playerWorldPosition,signalWorldPosition);
                    if(distance <= signal.radio){
                        //touch
                        let distanceRate = distance/signal.radio;
                        signal.cb(playerData,distanceRate);
                    }
                }
                
            }
        }
        //minus all the signal times
        //if times equal zero  delete

        let removeRenderSignals = [];

        for(let i = 0; i < this._signals.length;i++){
            let signal = this._signals[i];
            signal.times -= 1;
            
            if(signal.times == 0){
                //remove 
                this._signals.splice(i,1);
                this._idxPool.backIdx(signal.idx);
                removeRenderSignals.push(signal);
            }
        }

        //add time minus of mini-signal
        for(let playerData of this._playerDatas){
            for(let i = 0; i < playerData.followSignals.length; i++){
                    let signal = playerData.followSignals[i];
                    signal.times -= 1;
                    
                    if(signal.times == 0){
                        //remove 
                        playerData.followSignals.splice(i,1);
                    }
                }
        }

        this._battleRenderMgr._resultAnimData.removeRenderSignals = removeRenderSignals;

        this._battleRenderMgr._resultAnimFsm["start-throw"]();

        this._battleRenderMgr._resultAnimFsm["onsignal-result-end"] = function(){
            this.getComponent("battle-main-mgr")._battleFsm["result-end"]();
        }.bind(this);

        // let throwCallback = function(){
        //     //console.log("throwCallback");
        //     this.getComponent("battle-main-mgr")._battleFsm["result-end"]();
        // };

        
        //call render 
        // for(let signal of addRenderSignals){
        //     this.getComponent('battle-render-mgr').throwRender(signal,throwCallback.bind(this));
        // }
    
    },

    
});
