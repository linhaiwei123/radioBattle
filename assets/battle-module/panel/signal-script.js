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
        //this._signalColor = cc.hexToColor(require("signal-circle-color-data")[this._signalData.id]);
        //use the same as signal tips
        //this._signalColor = signalData.color;
        this.node.opacity = 120;
        let color = cc.hexToColor(cc.colorToHex(cc.color(signalData.color.r,signalData.color.g,signalData.color.b,this.node.opacity)));
        this._signalColor = color;
        
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
