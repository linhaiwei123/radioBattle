cc.Class({
    extends: cc.Component,

    properties: {
        _mapData: null,
        _playerDatas: null,
        _ruleData: null,
        _signalData: null,

    },

    onLoad: function () {
        this._mapData = require('map-data');
        this._playerDatas = require('player-data');
        this._ruleData = require('rule-data');
        this._signalData = require('signal-data');

        this.getComponent('battle-render-mgr').initBattleRender(this);
    },


});
