const EventEmitter = require("events")
const request = require("request-promise")
const WorldState = require("warframe-worldstate-parser")

class Update extends EventEmitter {
    constructor(options = {
        interval: 60000
    }) {
        super()
        this.refresh() // Get current version immediately
        setInterval(() => this.refresh(), options.interval)
    }

    refresh() {
        request.get("http://content.warframe.com/dynamic/worldState.php")
            .then(res => {
                this.getUpdates(new WorldState(res))
            })
            .catch(err => {

            })
    }

    getUpdates(ws) {
        for (let news of ws.news) {
            if (news.message.includes("Update") || news.message.includes("Hotfix")) {
                this.setUpdate(news)
                break // avoid detecting older patches
            }
        }
    }

    setUpdate(news) {
        let title = news.message
        let version = news.message.replace(/([^0-9.])/g, "")

        if (!this.title) {
            this.title = title
            this.version = version
            this.link = news.link
            this.image = news.imageLink
            this.date = news.date
        } else if (title !== this.title) {
            this.title = title
            this.version = version
            this.link = news.link
            this.image = news.imageLink
            this.date = news.date

            this.emit("update", {
                title: title,
                version: version,
                link: news.link,
                image: news.imageLink,
                date: news.date
            })
        }
    }
}

module.exports = Update
