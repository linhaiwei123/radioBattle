cc.Class({
    extends: cc.Component,

    properties: {
        _ctx: {
            get: function(){return this.getComponent(cc.Graphics)}
        },
        _battleLoadMgr: null,
        playerPrefab: cc.Prefab,
    },


    onLoad: function () {
        //this._ctx = this.getComponent(cc.Graphics);
    },

    initBattleRender: function(battleLoadMgr){
        this._battleLoadMgr = battleLoadMgr;
        let mapData = this._battleLoadMgr._mapData;

        //render the map
        this._ctx.circle(0,0,mapData.radio);
        this._ctx.fill();

        //render the player
        //if(!!this.node.getChildByName("player#0")){return;}
        let playerDatas = this._battleLoadMgr._playerDatas;
        for(let i = 0 ; i < mapData.totalPlayerNum; i++){
            let player = cc.instantiate(this.playerPrefab);
            this.node.addChild(player);
            player.position = mapData.playerPositions[i];
            player.getComponent('player-script').init(playerDatas[i]);
        }
    },

});
