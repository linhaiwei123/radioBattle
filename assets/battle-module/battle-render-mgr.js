cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel: cc.Node,//require('main-panel-script'),
        //actionValuePanel: cc.Node,
        playerAttrPanel: cc.Node,
        missionPanel: cc.Node,
        gameDurationPanel: cc.Node,
        //actionDurationPanel: cc.Node,
        windTipsPanel: cc.Node,
        throwDuration: 1,
        signalPrefab: cc.Prefab,
        _resultAnimFsm: null,
         _resultAnimData: null,

        resultTipsPrefab: cc.Prefab,
    },

    onLoad: function () {
        this._resultAnimFsm = require("result-anim-fsm");
        this._resultAnimData = {};

        this._resultAnimFsm.onthrow = this.throwRender.bind(this);
        this._resultAnimFsm["onupdate-signal-render"] = this.removeSignalRender.bind(this);
        this._resultAnimFsm["onsignal-result-render"] = this.signalResultRender.bind(this);
        this._resultAnimFsm.startup();

        
    },

    windTipsRender: function(windValue,windVector){
        this.windTipsPanel.getComponent("windtips-panel-script").updateWind(windValue,windVector);
    },

    signalResultRender: function(){
        console.log("resultRender");
        let playerDatas = this.getComponent("battle-load-mgr")._playerDatas;
        for(let playerData of playerDatas){
            //console.log(playerData);
            let player = this.mainPanel.getChildByName("player#" + playerData.id);
            for(let resultTipsData of playerData.resultTipsDataArray){
                let resultTips = cc.instantiate(this.resultTipsPrefab);
                player.parent.addChild(resultTips);
                resultTips.zIndex = 2000;
                resultTips.position = player.position;
                resultTips.getComponent("resultTips-script").init(resultTipsData);
            }
            playerData.resultTipsDataArray = [];
        }
        this._resultAnimFsm["signal-result-end"]();
    },

    removeSignalRender: function(){
        for(let removeSignal of this._resultAnimData.removeRenderSignals){
            let signal = this.mainPanel.getChildByName("signal#" + removeSignal.idx);
            signal.removeFromParent();
        }
        this._resultAnimFsm["signal-update-end"]();
    },



    initBattleRender: function(battleLoadMgr){
        this.mainPanel.getComponent("main-panel-script").initBattleRender(battleLoadMgr);

        this.getComponent("battle-main-mgr")._battleFsm["load-end"]();
    },

    throwRender: function(){

        let signalData = this._resultAnimData.addRenderSignal;
        let cb = function(){
            this._resultAnimFsm['throw-end']();
        }

        //no wind test
        let playerData = signalData.origin;
        let player = this.mainPanel.getChildByName("player#" + playerData.id);
        let playerPosition = player.position;
        let signalPosition = this.mainPanel.convertToNodeSpaceAR(signalData.worldPosition);
        let signalCtrlPosition = this.mainPanel.convertToNodeSpaceAR(signalData.ctrlPosition);
        let signal = cc.instantiate(this.signalPrefab);
        this.mainPanel.addChild(signal);
        signal.position = playerPosition;
        signal.getComponent("signal-script").init(signalData);
        let bezier = [signalCtrlPosition, signalCtrlPosition, signalPosition];
        signal.runAction(cc.sequence(
            //cc.moveTo(this.throwDuration,signalPosition),
            //add wind ,so bezier move
            cc.bezierTo(2, bezier),
            cc.callFunc(
                signal.getComponent("signal-script").onHitGround.bind(signal.getComponent("signal-script"),cb.bind(this)),
                )
            )
        );
    },

});
