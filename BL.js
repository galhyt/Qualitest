const EchoDL = require('./DL')

class EchoBL {
    static initializeApp() {
        EchoDL.initializeDB()

    }

    static async registerMsg(msg, time) {
        if (isNaN(time)) {
            try {
                time = Date.parse(time)
            }
            catch {
                return false
            }
        }

        const ret = await EchoDL.registerMsg(msg, time)
        if (!ret) console.log(`Error occured while trying to register message "${msg}"`)
        return ret
    }
}

module.exports = EchoBL;