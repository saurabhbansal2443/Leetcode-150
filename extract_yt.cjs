const https = require('https');
const fs = require('fs');

function fetchPlaylist(id) {
  return new Promise((resolve, reject) => {
    https.get('https://www.youtube.com/playlist?list=' + id, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const match = data.match(/var ytInitialData = (\{.*?\});<\/script>/);
          if (!match) return reject('No ytInitialData found');
          const json = JSON.parse(match[1]);
          const tabs = json.contents.twoColumnBrowseResultsRenderer.tabs;
          const sectionList = tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
          
          const items = sectionList.filter(item => item.playlistVideoRenderer).map(item => {
            const vid = item.playlistVideoRenderer;
            return {
              videoId: vid.videoId,
              title: vid.title.runs ? vid.title.runs[0].text : 'Unknown Title',
              thumbnail: vid.thumbnail.thumbnails[vid.thumbnail.thumbnails.length - 1].url,
            };
          });

          const title = json.metadata.playlistMetadataRenderer.title;

          resolve({
            id,
            title,
            items
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    const list1 = await fetchPlaylist('PLs-JnCrPsdJGFHw1dOoIYoSjqQj3Xj-ga');
    const list2 = await fetchPlaylist('PLM68oyaqFM7S3pW3lcKSIZLw1Qcd73hHF');
    const list3 = await fetchPlaylist('PLs-JnCrPsdJFLUurhEk4AZ69xaqbDw6H4');
    
    fs.writeFileSync('./src/YoutubePlaylists.json', JSON.stringify([list1, list2, list3], null, 2));
    console.log(`Success! Extracted \${list1.items.length}, \${list2.items.length}, and \${list3.items.length} videos.`);
  } catch (e) {
    console.error('Error:', e);
  }
}
main();
