cc.Class({
    extends: cc.Component,

    properties: {
        _battleFsm: null,
        _battleLoadMgr: null,
    },

    onLoad: function () {
        this._battleLoadMgr = this.getComponent("battle-load-mgr");


        this._battleFsm = require("battle-fsm");
        this._battleFsm.onloading  = this._battleLoadMgr.load();

        this._battleFsm.startup();
        
    },

});
