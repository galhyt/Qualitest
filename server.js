const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env(true)
const pino = require('express-pino-logger')();
const EchoBL = require('./BL');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(pino);

var PORT = process.env.API_PORT || process.env.PORT

app.get('/echoAtTime', async (req, res) => {
    const {msg, time} = req.query
    await EchoBL.registerMsg(msg, time)

  res.setHeader('Content-Type', 'text/plain');
  res.send(`Message "${msg}" sent for registration!`)
});

const server = app.listen(PORT, () => {
    EchoBL.initializeApp()
    console.log('Express server is running on '+ server.address().address+':'+server.address().port)
    main()
});

async function main() {
    await echoMessages()

    async function echoMessages() {
        await EchoBL.echoMessages()
        setTimeout(echoMessages, 10000)
    }

}
