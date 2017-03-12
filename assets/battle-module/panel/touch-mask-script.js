cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.node.on("touchstart",function(){console.log("mask")})
        this.node.on("touchmove",function(){})
        this.node.on("touchend",function(){})
    },

});
