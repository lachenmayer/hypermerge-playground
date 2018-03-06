# hypermerge-playground

usage:

    > node index.js
    ready
    <HYPERCORE KEY>

in another terminal...

    > node index.js <HYPERCORE KEY>

write messages to stdin, the replicated hypermerge objects will appear.

check out the `content/` directory to see how the [automerge](https://github.com/automerge/automerge) objects are serialized in [hypercore](https://github.com/mafintosh/hypercore).

essentially an extremely simplified version of [the chat example](https://github.com/automerge/hypermerge/blob/master/examples/chat/channel.js), just for learning.