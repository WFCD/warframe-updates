# warframe-updates
Get notified whenever a new patch deploys.

<br>

## Installation
`npm install warframe-updates`

<br>

## Usage
```js
const WarframeVersion = require("warframe-updates")
const warframeVersion = new WarframeVersion()

warframeVersion.on("update", update => {
  // do something with update data
})
```

<br>

## Update Data
```js
{ 
    title: "Chains of Harrow: Hotfix 21.0.1",
    version: "21.0.1",
    link: "https://forums.warframe.com/topic/813821-chains-of-harrow-hotfix-2101/",
    image: "https://n8k6e2y6.ssl.hwcdn.net/genericImgs/generichotfix_website.jpg"
    date: "2017-05-30T18:12:33.000Z"
}
```

<br>

## Options
Modify functionality like this
```js
const WarframeVersion = require("warframe-updates")
const warframeVersion = new WarframeVersion({
  interval: 60000
})
```

| Key | Description | Default |
| --- | ----------- | ------- |
| interval | Duration until checking for new updates | 60000 |

<br>

## License
[MIT](/LICENSE)
