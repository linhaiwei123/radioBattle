cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel : cc.Node,
        cmdTouchPanel: cc.Node,
        _target: cc.Node,
        _targetData: null,
        _touchFsm: null,
        _currentWorldTouchPosition: null,
        _worldDestinationPosition: null,
        movePixel: 2,
        _dragLineCtx: null,
    },

    onLoad: function(){
        this.cmdTouchPanel.on("touchstart",this.onTouchStart.bind(this));
        this.cmdTouchPanel.on("touchmove",this.onTouchMove.bind(this));
        this.cmdTouchPanel.on("touchend",this.onTouchEnd.bind(this));
        this._touchFsm = require("battle-touch-fsm");
        this._touchFsm.startup();
        this._dragLineCtx = this.cmdTouchPanel.getComponent(cc.Graphics);
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
            if(this._touchFsm.current == 'moving' && this._currentWorldTouchPosition){
                //follow the point
                //delete the line gizmo
                //#
                let moveNormalVector = cc.pNormalize(this._target.convertToNodeSpaceAR(this._currentWorldTouchPosition));
                this._target.position = cc.pAdd(this._target.position,cc.pMult(moveNormalVector,this.movePixel));
            }
            else if(this._touchFsm.current == 'dragging' && this._currentWorldTouchPosition){
                //dragging line
                //gizmo render
                //let startPointInCtx = this.cmdTouchPanel.convertToNodeSpaceAR(this._target.parent.convertToWorldSpaceAR(this._target.position));
                let startPointInCtx = this._target.parent.convertToWorldSpaceAR(this._target.position);
                let endPointInCtx = this.getEndPointInCtx(this._currentWorldTouchPosition);
                this._dragLineCtx.clear();
                this._dragLineCtx.moveTo(startPointInCtx.x,startPointInCtx.y);
                this._dragLineCtx.lineTo(endPointInCtx.x,endPointInCtx.y);
                this._dragLineCtx.stroke();
            }
        }
    },

    getEndPointInCtx: function(worldTouchPosition){
        let worldPositionOfTarget = this._target.parent.convertToWorldSpaceAR(this._target.position);
        let worldDestinationPosition = cc.pAdd(worldPositionOfTarget,cc.pMult(cc.pSub(worldPositionOfTarget,worldTouchPosition),2));
        //return this.cmdTouchPanel.convertToNodeSpaceAR(worldDestinationPosition);
        this._worldDestinationPosition = worldDestinationPosition;
        return worldDestinationPosition;
    },

    onTouchStart: function(e){
        //console.log("touchStart");
        if(this._touchFsm.current == 'moving'){
            let touchPostionInTarget = this._target.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
            if(this._targetData.radio >= touchPostionInTarget.mag()){
                this._touchFsm["touchstart-inner"]();
            }
            this._currentWorldTouchPosition = e.getTouches()[0].getLocation();
        }
        if(this._touchFsm.current == 'dragging' && e.getTouches().length >=2){
            this._currentWorldTouchPosition = null;
            this._touchFsm["touchstart-multi"]();
        }
        // else{
        //     this._currentWorldTouchPosition = e.getTouches()[0].getLocation();
        // }
        
    },

    onTouchMove: function(e){
        //console.log("touchMove");
        if(this._touchFsm.current == 'dragging' && e.getTouches().length >=2){
            this._currentWorldTouchPosition = null;
            this._touchFsm["touchmove-multi"]();
        }else{
            this._currentWorldTouchPosition = e.getTouches()[0].getLocation();
        }
    },

    onTouchEnd: function(e){
        //console.log("touchEnd");
        if(this._touchFsm.current == 'dragging' && e.getTouches().length == 1){
            //release
            console.log("dragging release");
            this.cmdTouchPanel.active = false;
            this.unschedule(this.controlAbleUpdate.bind(this));
            this._dragLineCtx.clear();
            this.getComponent('battle-main-mgr')._battleFsm["cmd-end"]({targetData: this._targetData, worldDestinationPosition : this._worldDestinationPosition});

        }else if(this._touchFsm.current == 'moving'){
            this._currentWorldTouchPosition = null;
        }
    },

});
