cc.Class({
    extends: cc.Component,

    properties: {
       _signalData: null,
       _ctx : {
           get: function(){return this.getComponent(cc.Graphics);}
       },
       _signalColor: null,
    },

    init: function (signalData) {
        this._signalData = signalData;
        this._signalColor = cc.hexToColor(require("signal-circle-color-data")[this._signalData.id]);
        //console.log(this._signalColor);
        //rename
        this.node.name = "signal#" + this._signalData.idx;
        this.node.getChildByName("signal-core").color = this._signalColor;
        //this.node.setSiblingIndex(1000);
        this.node.zIndex = 50;
    },

    onHitGround: function(cb,targetNode){
        this._ctx.fillColor = this._signalColor;
        this._ctx.circle(0,0,this._signalData.radio);
        this._ctx.fill();
        cb();
    },

    // update: function(){
    //     //console.log(this.node.position);
    // }

});
