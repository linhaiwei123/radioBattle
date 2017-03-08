cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel : cc.Node,
        cmdTouchPanel: cc.Node,
        _target: cc.Node,
        _targetData: null,
        _touchFsm: null,
        _currentTouchPosition: null,
        movePixel: 2,
    },

    onLoad: function(){
        this.cmdTouchPanel.on("touchstart",this.onTouchStart.bind(this));
        this.cmdTouchPanel.on("touchmove",this.onTouchMove.bind(this));
        this.cmdTouchPanel.on("touchend",this.onTouchEnd.bind(this));
        this._touchFsm = require("battle-touch-fsm");
        this._touchFsm.startup();

    },

    cmd: function (event,from,to,playerData) {
        //touch the map to move
        //touch the player and drag to draw the throw line
        //multi-touch in drag line to exit the drag line
        //drag line and release to commit the line
        this._target = this.mainPanel.getChildByName("player#" + playerData.id);
        this._targetData = playerData;
        this.schedule(this.controlAbleUpdate.bind(this),1/60);
        this.cmdTouchPanel.active = true;
        //move control
        //drag control
        //release control
        //cancel control

    },

    controlAbleUpdate: function(){
        if(this._target && this._touchFsm){
            if(this._touchFsm.current == 'moving' && this._currentTouchPosition){
                //follow the point
                //delete the line gizmo
                let moveNormalVector = cc.pNormalize(cc.pSub(this._currentTouchPosition,this._target.position));
                this._target.position = cc.pAdd(this._target.position,cc.pMult(moveNormalVector,this.movePixel));
            }
            else if(this._touchFsm.current == 'dragging' && this._currentTouchPosition){
                //dragging line
            }
        }
    },

    onTouchStart: function(e){
        //console.log("touchStart");
        if(this._touchFsm.current == 'moving'){
            let touchPostionInTarget = this._target.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
            if(this._targetData.radio >= touchPostionInTarget.mag()){
                this._touchFsm["touchstart-inner"]();
            }
            this._currentTouchPosition = this.node.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
        }
        if(this._touchFsm.current == 'dragging' && e.getTouches().length >=2){
            this._currentTouchPosition = null;
            this._touchFsm["touchstart-multi"]();
        }else{
            this._currentTouchPosition = this.node.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
        }
        
    },

    onTouchMove: function(e){
        //console.log("touchMove");
        if(this._touchFsm.current == 'dragging' && e.getTouches().length >=2){
            this._currentTouchPosition = null;
            this._touchFsm["touchmove-multi"]();
        }else{
            this._currentTouchPosition = this.node.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
        }
    },

    onTouchEnd: function(e){
        //console.log("touchEnd");
        if(this._touchFsm.current == 'dragging' && e.getTouches().length == 1){
            //release
            console.log("dragging release");
        }else if(this._touchFsm.current == 'moving'){
            this._currentTouchPosition = null;
        }
    },

});
