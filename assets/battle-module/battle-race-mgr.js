cc.Class({
    extends: cc.Component,

    properties: {
        _battleLoadMgr: {
            get: function(){return this.getComponent("battle-load-mgr")}
        },

        _playerDatas: null,
        //_touchActiveMaxArray : [],
    },

    race: function () {
        this._playerDatas = this._battleLoadMgr._playerDatas;
        //don't need to schedule it just cal the final actionDuration;

        let target = null;
        for(let playerData of this._playerDatas){
            if(target == null || target.actionDuration > playerData.actionDuration){target = playerData;}
        }
        for(let playerData of this._playerDatas){
            playerData.actionDuration -= target.actionDuration;
        }
        this.getComponent("battle-main-mgr")._battleFsm["race-end"](target);

        //this.schedule(this.raceTick,1);
    },

    // raceTick: function(){
    //     //let touchActiveMaxArray = [];
    //     if(!!this._touchActiveMaxArray.length){
    //         this.unschedule(this.raceTick);
    //         this._touchActiveMaxArray.sort(function(a,b){ return a.actionCurValue - b.activeCurValue});
    //         this.getComponent("battle-main-mgr")._battleFsm["race-end"](this._touchActiveMaxArray.shift());
    //         return;
    //     }

    //     for(let playerData of this._playerDatas){
    //         //check alive
    //         if(playerData.blood <= 0){continue;}
    //         playerData.actionCurValue += playerData.speed;
    //         console.log(playerData.actionCurValue);
    //         if(playerData.actionCurValue >= playerData.actionMaxValue){
    //             //this.unschedule(this.raceTick);
    //             //this.scheduleOnce(this.getComponent("battle-main-mgr")._battleFsm["race-end"](playerData).bind(this),0);
    //             this._touchActiveMaxArray.push(playerData);
    //         }
    //     }
    //     if(!!this._touchActiveMaxArray.length){
    //         this.unschedule(this.raceTick);
    //         this._touchActiveMaxArray.sort(function(a,b){ return a.actionCurValue - b.activeCurValue});
    //         this.getComponent("battle-main-mgr")._battleFsm["race-end"](this._touchActiveMaxArray.shift());
    //     }
    // },

});
