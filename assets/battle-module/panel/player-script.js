cc.Class({
    extends: cc.Component,

    properties: {
        _ctx: {
            get: function(){return this.getComponent(cc.Graphics)}
        },
        _playerData: null,
        _bloodProgress: {
            get: function(){return this.node.getChildByName("blood-progress").getComponent(cc.ProgressBar)}
        },
        _strengthProgress: {
            get: function(){return this.node.getChildByName("strength-progress").getComponent(cc.ProgressBar)}
        },

        //blood should set total first
        _bloodTotal: null,
    },

    // use this for initialization
    onLoad: function () {
        //this._ctx = this.getComponent(cc.Graphics);
    },

    init: function(playerData){
        let radio = playerData.radio;
        this._ctx.circle(0,0,radio);
        this._ctx.fill();
        this.node.name = "player#" + playerData.id;
        this.node.zIndex = 1000;

        //add playerdata tips
        this._playerData = playerData;
        this._bloodTotal = this._playerData.blood;
    },

    updatePlayerDataTips: function(){
        this._bloodProgress.progress = cc.clamp01(this._playerData.blood / this._bloodTotal);
        this._strengthProgress.progress = cc.clamp01(this._playerData.curStrength / this._playerData.maxStrength);
    }

});
