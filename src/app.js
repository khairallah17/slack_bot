import { RTMClient } from "@slack/rtm-api";
import { WebClient } from "@slack/web-api";
import { SLACK_OAUTH_TOKEN } from "./constants";
import { BOT_SPAM_CHANNEL } from "./constants";

const packageJson = require("../package.json");
const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
    .catch(console.error());

rtm.on('ready', async () => {
    console.log('bot online');
    send_message(BOT_SPAM_CHANNEL, `bot version ${packageJson.version} is online`);
});


rtm.on('slack_event', async (eventType, event) =>{
    if (event && eventType === 'message'){
        if (event.text === '!hi'){
            console.log(event);
            hello(event.channel, event.user);
        }
    }
});

function hello (channelId, userID){
    send_message(channelId, `Heya <@${userID}>!`);
}

async function send_message(channel, message){
    await web.chat.postMessage({
        channel: channel,
        text: message,
    });
}

