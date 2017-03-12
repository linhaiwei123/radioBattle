cc.Class({
    extends: cc.Component,

    properties: {
        showPosition: cc.v2(0,0),
        hidePosition: cc.v2(0,0),
        _isShow: false,
        isShow: {
            get: function(){return this._isShow;},
            set: function(v){this._isShow = v; this.movePanel() }
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on("touchstart",this.toggle.bind(this))
    },

    toggle: function(){
        this.isShow = !this.isShow;
    },

    movePanel: function(){
        this.node.parent.stopAllActions();
        this.node.stopAllActions();
        if(this._isShow){
            this.node.parent.runAction(cc.moveTo(0.3,this.showPosition).easing(cc.easeSineOut(1)));
            this.node.runAction(cc.rotateTo(0.3,180).easing(cc.easeSineOut(1)));
        }else{
            this.node.parent.runAction(cc.moveTo(0.3,this.hidePosition).easing(cc.easeSineOut(1)));
            this.node.runAction(cc.rotateTo(0.3,0).easing(cc.easeSineOut(1)));
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
