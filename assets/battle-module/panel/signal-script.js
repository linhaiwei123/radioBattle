cc.Class({
    extends: cc.Component,

    properties: {
       _signalData: null,
       _ctx : {
           get: function(){return this.getComponent(cc.Graphics);}
       },
       _signalSensorColor: null,

    },

    init: function (signalData) {
        this._signalData = signalData;
       
        this._signalSensorColor = signalData.colorSet.signalSensorColor;

        
        //rename
        this.node.name = "signal#" + this._signalData.idx;
        //modify add huaji as sprite
        //not need to render the color
        //this.node.getChildByName("signal-core").color = signalData.colorSet.signalCoreColor;
        //this.node.setSiblingIndex(1000);
        this.node.zIndex = 50;
    },

    onHitGround: function(cb,targetNode){
        //fix the color merge between sensor and tips
        //by draw a stroke circle and line linked between core and sensor edge
        
        // this._ctx.fillColor = this._signalSensorColor;
        // this._ctx.circle(0,0,this._signalData.radio);
        // this._ctx.fill();
        // cb();
            // # still hard to recoginze
            // this._ctx.strokeColor = this._signalSensorColor;
            // this._ctx.circle(0,0,this._signalData.radio);
            // this._ctx.stroke();
            // cb();

            // try strong stroke with black egde
            this._ctx.strokeColor = cc.Color.BLACK;
            this._ctx.fillColor = this._signalSensorColor;
            this._ctx.circle(0,0,this._signalData.radio);
            this._ctx.stroke();
            this._ctx.fill();
            cb();
    },

    // update: function(){
    //     //console.log(this.node.position);
    // }

});
