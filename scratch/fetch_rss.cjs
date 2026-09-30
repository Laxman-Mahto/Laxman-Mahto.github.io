const https = require('https');

https.get('https://www.youtube.com/feeds/videos.xml?channel_id=UCgogIv4w00RwDnt9mVM5-cw', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const titleMatch = data.match(/<title>(.*?)<\/title>/g);
    const linkMatch = data.match(/<link rel="alternate" href="(.*?)"\/>/g);
    const pubDateMatch = data.match(/<published>(.*?)<\/published>/g);
    console.log(titleMatch[1]); // [0] is channel title, [1] is first video title
    console.log(linkMatch[1]);
    console.log(pubDateMatch[0]);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
