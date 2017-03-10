let StateMachine = require('state-machine');
let fsm = StateMachine.create({
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"done"},
{"name":"throw-end","from":"throw","to":"update-signal-render"},
{"name":"signal-update-end","from":"update-signal-render","to":"signal-result-render"},
{"name":"signal-result-end","from":"signal-result-render","to":"done"},
{"name":"start-throw","from":"done","to":"throw"}
]
});
module.exports = fsm