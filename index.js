const Hypermerge = require('hypermerge')
const ram = require('random-access-memory')
const readline = require('readline')

async function makeHypermerge(key) {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const hm = new Hypermerge({ path: 'content/' + (key || 'initiator') })
  hm.once('ready', () => {
    hm.joinSwarm()
    console.log('ready')
    if (key) {
      // Check out an existing document
      hm.open(key)
      hm.once('document:ready', (docId, doc) => {
        hm.on('document:updated', (docId, newDoc) => {
          doc = newDoc
          console.log('replicated')
          console.log(doc)
        })
        interface.on('line', line => {
          hm.change(doc, 'change', doc => {
            if (doc.messages != null && doc.messages.push != null) {
              doc.messages.push({ ts: new Date().toISOString(), message: line })
            } else {
              doc.messages = []
            }
          })
        })
      })
    } else {
      // Create a new document
      hm.create()
      hm.once('document:ready', (docId, doc) => {
        console.log(docId)
        hm.on('document:updated', (docId, newDoc) => {
          doc = newDoc
          console.log('replicated')
          console.log(doc)
        })
        interface.on('line', line => {
          hm.change(doc, 'change', doc => {
            if (doc.messages != null && doc.messages.push != null) {
              doc.messages.push({ ts: new Date().toISOString(), message: line })
            } else {
              doc.messages = []
            }
          })
          console.log(doc)
        })
      })
    }
  })
}

const args = process.argv.slice(2)
if (args.length === 0) {
  makeHypermerge()
} else {
  makeHypermerge(args[0])
}
