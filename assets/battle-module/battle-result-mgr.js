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
    },

    onLoad: function(){
        this._signalData = require('signal-data');
        this._playerDatas = this.getComponent("battle-load-mgr")._playerDatas;
        this._idxPool = new IdxPool(100);
    },

    result: function (event,from,to,arg) {
        let targetData = arg.targetData;
        let worldDestinationPosition = arg.worldDestinationPosition;
        let signalId = arg.signalId;
        //init signal and throw it 
        //test the default signal 
        //console.log(arg);

        let signal = this._signalData[signalId](targetData,worldDestinationPosition);
        signal.idx = this._idxPool.getIdx();

        let addRenderSignals = [];
        addRenderSignals.push(signal);

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
            for(let signal of this._signals){
                let signalWorldPosition = signal.worldPosition;
                //check if touch the radio
                if(cc.pDistance(playerWorldPosition,signalWorldPosition) <= signal.radio){
                    //touch
                    signal.cb(player);
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

        let throwCallback = function(){
            //console.log("throwCallback");
            this.getComponent("battle-main-mgr")._battleFsm["result-end"]();
        };

        
        //call render 
        for(let signal of addRenderSignals){
            this.getComponent('battle-render-mgr').throwRender(signal,throwCallback.bind(this));
        }
    
    },

    
});
