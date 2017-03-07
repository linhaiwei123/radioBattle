cc.Class({
    extends: cc.Component,

    editor: {
      //executeInEditMode: true,  
    },

    properties: {
        _battleFsm: null,
        _battleLoadMgr: null,
        _battleRaceMgr: null,
    },

    onLoad: function () {
        this._battleLoadMgr = this.getComponent("battle-load-mgr");
        this._battleRaceMgr = this.getComponent("battle-race-mgr");


        this._battleFsm = require("battle-fsm");
        this._battleFsm.onloading  = this._battleLoadMgr.load.bind(this._battleLoadMgr);
        this._battleFsm.onracing = this._battleRaceMgr.race.bind(this._battleRaceMgr);

        this._battleFsm.startup();
        
    },

});
