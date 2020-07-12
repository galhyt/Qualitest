const EchoDL = require('./DL')

class EchoBL {
    static initializeApp() {
        EchoDL.initializeDB()

    }

    static async registerMsg(msg, time) {
        if (isNaN(time)) {
            try {
                time = Date.parse(time)
                if (isNaN(time)) return false
            }
            catch {
                return false
            }
        }

        const ret = await EchoDL.registerMsg(msg, time)
        if (!ret) console.log(`Error occured while trying to register message "${msg}"`)
        return ret
    }

    static async echoMessages() {
        const msgs = await EchoDL.getMessagesToEcho()
        var promises = []
        for (var i in msgs) {
            const msg = msgs[i]
            console.log(`${dateFormat(new Date())} - "${msg.msg}" scheduled for ${dateFormat(new Date(msg.time))} created at ${dateFormat(new Date(msg.timestamp))}`)
            promises.push(EchoDL.markAsSent(msg._id))
            await sleep(100)
        }

        function dateFormat(d) {
            return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
        }

        await Promise.all(promises)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = EchoBL;