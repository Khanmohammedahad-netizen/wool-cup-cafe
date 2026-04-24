const https = require('https');
const fs = require('fs');

const url = 'https://magicpin.in/Hyderabad/Film-Nagar/Restaurant/Wool-Cup---Urban-Cafe-and-Bistro/store/1655907/photos/';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/[^"']+\.(jpg|jpeg|png|webp)/gi);
    if (matches) {
      const unique = [...new Set(matches)].filter(url => 
        (url.includes('lh3.googleusercontent.com') || url.includes('magicpin')) &&
        !url.includes('logo') && !url.includes('icon')
      );
      console.log(JSON.stringify(unique.slice(0, 20), null, 2));
    } else {
      console.log('No matches');
    }
  });
});
