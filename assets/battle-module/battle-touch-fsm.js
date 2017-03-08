let StateMachine = require('state-machine');
let fsm = StateMachine.create({
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"moving"},
{"name":"touchstart-inner","from":"moving","to":"dragging"},
{"name":"touchstart-multi","from":"dragging","to":"moving"},
{"name":"touchmove-multi","from":"dragging","to":"moving"}
]
});
module.exports = fsm