cc.Class({
    extends: cc.Component,

    properties: {

    },

    init: function (resultTipsData) {
        this.getComponent(cc.Label).string = resultTipsData.msg;
        if(resultTipsData.color){
            //divide color
            //this.node.color = resultTipsData.color;
            this.node.color = resultTipsData.color.signalResultColor;
        }
        let randomDestionationX = cc.randomMinus1To1() * 20;
        let randomDestionationY = cc.randomMinus1To1() * 20;
        this.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(1,cc.v2(randomDestionationX,randomDestionationY)).easing(cc.easeOut(3.0)),
                    cc.fadeOut(1),
                ),
                cc.removeSelf(true)
            )
        );
    },

});
