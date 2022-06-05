// to run this version change package.json : dev
// "nodemon --exec npx ts-node src/index.ts" to "nodemon src/index.js"

import { Dialute } from 'dialute';

function* script(r) {
  const rsp = r.buildRsp();
  const state = { count: 0 };

  rsp.msg = 'Hello world from Dialute!';
  rsp.data = state;
  rsp.kbrd = ['Button 1', 'Button 2'];

  yield rsp;

  while (true) {
    if (r.type === 'SERVER_ACTION' && r.act?.action_id === 'click') {
      state.count++;
      rsp.msg = 'You have clicked the button';
    } else {
      rsp.msg = 'You have said something';
    }
    // yield 'Hello world from Dialute!';  // also possible
    yield rsp;
  }
}

Dialute.fromEntrypoint(script).start();
