cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel: cc.Node,//require('main-panel-script'),
        actionValuePanel: cc.Node,
        playerAttrPanel: cc.Node,
        missionPanel: cc.Node,
        gameDurationPanel: cc.Node,
        actionDurationPanel: cc.Node,
        throwDuration: 1,
        signalPrefab: cc.Prefab,
    },

    onLoad: function () {

    },

    initBattleRender: function(battleLoadMgr){
        this.mainPanel.getComponent("main-panel-script").initBattleRender(battleLoadMgr);

        this.getComponent("battle-main-mgr")._battleFsm["load-end"]();
    },

    throwRender: function(signalData,cb){
        //no wind test
        let playerData = signalData.origin;
        let player = this.mainPanel.getChildByName("player#" + playerData.id);
        let playerPosition = player.position;
        let signalPosition = this.mainPanel.convertToNodeSpaceAR(signalData.worldPosition);
        let signal = cc.instantiate(this.signalPrefab);
        this.mainPanel.addChild(signal);
        signal.position = playerPosition;
        signal.getComponent("signal-script").init(signalData);
        signal.runAction(
            cc.moveTo(this.throwDuration,signalPosition),
            cc.callFunc(
                signal.getComponent("signal-script").onHitGround,
                signal,
                cb
                )
        );
        //signal.getComponent("signal-script").onHitGround;
    },

});
