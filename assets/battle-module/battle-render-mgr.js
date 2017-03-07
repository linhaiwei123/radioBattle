cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel: require('main-panel-script'),
        actionValuePanel: cc.Node,
        playerAttrPanel: cc.Node,
        missionPanel: cc.Node,
        gameDurationPanel: cc.Node,
        actionDurationPanel: cc.Node,
    },

    onLoad: function () {

    },

    initBattleRender: function(battleLoadMgr){
        this.mainPanel.initBattleRender(battleLoadMgr);

        this.getComponent("battle-main-mgr")._battleFsm["load-end"]();
    },

});
