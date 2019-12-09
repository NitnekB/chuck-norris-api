const fetch = require('node-fetch');
const he = require('he/he');

const { WebClient } = require('@slack/web-api');

const PICHUCK_ARRAY = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyv53IdfjWK4i3NeB05NmfsH6JvrZbItOZ7epjG14-d7MWPKa7Hw&s",
  "https://pbs.twimg.com/profile_images/3462594580/6b0e17960466278cc259acd6ed8e868a.jpeg",
  "https://pbs.twimg.com/profile_images/740233420664512512/FtUW78H-_400x400.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GkKaSZcHPJYAz9KTlSscYVVyVCl-e9v1jmW6sg9qLgVjJmFltw&s",
  "https://pbs.twimg.com/profile_images/578198037/chuck_norris_age_49_reasonably_small.jpg",
  "https://d2z1w4aiblvrwu.cloudfront.net/topic/wy/chuck-norris.png",
  "https://files.gamebanana.com/img/ico/sprays/chucknorrisapproved.png",
  "https://pbs.twimg.com/profile_images/378800000153387582/41b3e5fc7dee258896e6c1d14da0fe6a.jpeg",
  "https://pbs.twimg.com/profile_images/2721692801/e4888839740f0c379389ec45be375a77.jpeg"
];

const CHUCK_NICKNAMES = [
  "God",
  "Chucky",
  "Chuck Chuck",
  "Sensei",
  "Chuck",
  "CN",
  "Master",
  "The strongest man ever",
  "Chuck Norris"
]

const randomChannelID = process.env.SLACK_RANDOM_CHANNEL_ID;
// Return ramdom Chuck Norris facts
const chuckApiUrl = 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1';

const slackClient = new WebClient(process.env.SLACK_TOKEN);

const publishRandomFacts = async res => {
  const result = await slackClient.chat.postMessage({
    text: await getData(chuckApiUrl),
    channel: randomChannelID,
    as_user: false,
    icon_url: selectRandom(PICHUCK_ARRAY),
    username: selectRandom(CHUCK_NICKNAMES)
  });

  res.send(`Successfully send message ${result.ts} in conversation ${randomChannelID}`);
};

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    // Handle utf-8 encoding
    return he.decode(json[0].fact);
  } catch (error) {
    console.error(error);
  }
};

const selectRandom = array => {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = publishRandomFacts;
