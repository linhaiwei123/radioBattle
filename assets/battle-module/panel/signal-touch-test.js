cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        this.node.on("touchend",function(){
            console.log(this.node.name);
        }.bind(this))
    },

});
