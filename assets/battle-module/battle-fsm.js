let StateMachine = require('state-machine');
let fsm = StateMachine.create({
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"loading"},
{"name":"load-end","from":"loading","to":"racing"},
{"name":"on-block","from":"racing","to":"result-rendering"},
{"name":"block-end","from":"result-rendering","to":"racing"},
{"name":"race-end","from":"racing","to":"cmding"},
{"name":"cmd-end","from":"cmding","to":"resulting"},
{"name":"result-end","from":"resulting","to":"racing"},
{"name":"battle-end","from":"resulting","to":"end"}
]
});
module.exports = fsm