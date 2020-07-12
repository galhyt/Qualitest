require('custom-env').env(true)
const request = require('request')

const appUrl = process.env.APP_URL


async function main() {
    var sleepTime = 500
    var msgTimeInterval = 200
    if (process.argv.length > 2) {
        const argvCodes = process.argv.slice(2)
        sleepTime = argvCodes[0]
        if (process.argv.length > 3) msgTimeInterval = Number(argvCodes[1])
    }

    var time = new Date()
    time.setTime(time.getTime() - 60000)
    for (var i = 1 ;; i++, time.setTime(time.getTime()+msgTimeInterval) ) {
        var url = `${appUrl}/echoAtTime?msg=message No. ${i}&time=${formatDate(time)}`
        await registerMsg()
        await sleep(sleepTime)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function registerMsg() {
        var error =  null
        await new Promise((resolve, reject) => {
            request(url, {}, (err, res, body) => {
                if (err)
                    reject(err)
                else
                    resolve()
            })
        }).catch(err => error = err)

//        if (error) exit

    }

    function formatDate(d) {
        return `${d.getFullYear()}-${leadingZero(d.getMonth()+1)}-${leadingZero(d.getDate())}T${leadingZero(d.getHours())}:${leadingZero(d.getMinutes())}:${leadingZero(d.getSeconds())}`

        function leadingZero(n) {
            return (n < 10 ? '0' : '') + n
        }
    }
}

main()