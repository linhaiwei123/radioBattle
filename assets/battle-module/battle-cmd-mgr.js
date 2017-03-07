cc.Class({
    extends: cc.Component,

    properties: {
        mainPanel : cc.Node,
    },

    cmding: function (playerData) {
        //touch the map to move
        //touch the player and drag to draw the throw line
        //multi-touch in drag line to exit the drag line
        //drag line and release to commit the line
        let player = ths.mainPanel.getChildByName("player#" + playerData.id);
        
        //move control
        //drag control
        //release control
        //cancel control
        
    },

});
