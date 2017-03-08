cc.Class({
    extends: cc.Component,

    editor: {
      //executeInEditMode: true,  
    },

    properties: {
        _battleFsm: null,
        _battleLoadMgr: null,
        _battleRaceMgr: null,
        _battleCmdMgr: null,
        _battleResultMgr: null,
    },

    onLoad: function () {
        this._battleLoadMgr = this.getComponent("battle-load-mgr");
        this._battleRaceMgr = this.getComponent("battle-race-mgr");
        this._battleCmdMgr = this.getComponent("battle-cmd-mgr");
        this._battleResultMgr = this.getComponent("battle-result-mgr");


        this._battleFsm = require("battle-fsm");
        this._battleFsm.onloading  = this._battleLoadMgr.load.bind(this._battleLoadMgr);
        this._battleFsm.onracing = this._battleRaceMgr.race.bind(this._battleRaceMgr);
        this._battleFsm.oncmding = this._battleCmdMgr.cmd.bind(this._battleCmdMgr);
        this._battleFsm.onresulting = this._battleResultMgr.result.bind(this._battleResultMgr);

        this._battleFsm.startup();
        
    },

});
