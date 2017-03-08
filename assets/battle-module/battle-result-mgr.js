cc.Class({
    extends: cc.Component,

    properties: {
        
    },


    result: function (event,from,to,arg) {
        let targetData = arg.targetData;
        let worldDestinationPosition = arg.worldDestinationPosition;
        //init signal and throw it 
        //test the default signal
        console.log(arg);
    },


});
