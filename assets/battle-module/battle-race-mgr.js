cc.Class({
    extends: cc.Component,

    properties: {
        _battleLoadMgr: {
            get: function(){return this.getComponent("battle-load-mgr")}
        },

        _playerDatas: null,
    },

    race: function () {
        this._playerDatas = this._battleLoadMgr._playerDatas;
        this.schedule(this.raceTick,1);
    },

    raceTick: function(){
        let touchActiveMaxArray = [];
        for(let playerData of this._playerDatas){
            //check alive
            if(playerData.blood <= 0){continue;}
            playerData.actionCurValue += playerData.speed;
            console.log(playerData.actionCurValue);
            if(playerData.actionCurValue >= playerData.actionMaxValue){
                //this.unschedule(this.raceTick);
                //this.scheduleOnce(this.getComponent("battle-main-mgr")._battleFsm["race-end"](playerData).bind(this),0);
                touchActiveMaxArray.push(playerData);
            }
        }
        if(!!touchActiveMaxArray.length){
            this.unschedule(this.raceTick);
            touchActiveMaxArray.sort(function(a,b){ return a.actionCurValue - b.activeCurValue});
            this.getComponent("battle-main-mgr")._battleFsm["race-end"](playerData);
        }
    },

});
