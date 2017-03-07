cc.Class({
    extends: cc.Component,

    properties: {
        _ctx: {
            get: function(){return this.getComponent(cc.Graphics)}
        },
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
    }

});
