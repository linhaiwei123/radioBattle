cc.Class({
    extends: cc.Component,

    properties: {
        _mapData: null,
        _playerData: null,
        _ruleData: null,
        _signalData: null,

    },

    onLoad: function () {
        _mapData = require('map-data');
        _playerData = require('player-data');
        _ruleData = require('rule-data');
        _signalData = require('signal-data');
    },

});
