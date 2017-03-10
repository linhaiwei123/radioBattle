cc.Class({
    extends: cc.Component,

    properties: {
        radio: 50,
        _bgCtx: {
            get: function(){
                return this.getComponent(cc.Graphics);
            }
        },
        _windValueLabel: {
            get: function(){
                return this.node.getChildByName("wind-value").getComponent(cc.Label);
            }
        },
        _windVectorCtx: {
            get: function(){
                return this.node.getChildByName("wind-vector").getComponent(cc.Graphics);
            }
        },
    },

    onLoad: function () {
        this._bgCtx.circle(0,0,this.radio);
        this._bgCtx.fill();
    },
    updateWind: function(windValue,windVector){
        this._windVectorCtx.clear();
        let windNormalVector = cc.pNormalize(windVector);
        //let startPosition = cc.pMult(cc.pNeg(windNormalVector),this.radio - 2);
        let startPosition = cc.v2(0,0);
        //let endPosition = cc.pNeg(startPosition);
        let endPosition = cc.pMult(windNormalVector,this.radio - 5);
        this._windVectorCtx.moveTo(startPosition.x,startPosition.y);
        this._windVectorCtx.lineTo(endPosition.x,endPosition.y);
        this._windVectorCtx.stroke();
        this._windVectorCtx.circle(endPosition.x,endPosition.y,this.radio * 0.3);
        this._bgCtx.fill();
        
        this._windValueLabel.string = windValue;
    }

});
