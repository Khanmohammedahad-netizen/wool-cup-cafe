const fs = require('fs');
const path = require('path');
const https = require('https');

const images = {
  'interior-01.jpg': 'https://lh3.googleusercontent.com/69c8sFJh_gGRo5nY-LKXHmWV0bBHPMF4iaeINb3H355nabQKNP5pZ7mPUgeu1Qrya4oWk9HTpfJW4SSQbm-AdA_qtI-7CmHWVxzRCElA=s0-rw',
  'interior-02.jpg': 'https://lh3.googleusercontent.com/izP-sO77S1KeVwUuTMcQZ_dw17oPaeA0q_hcQO8yH6fOtXGnpOjIpnLPv2vqGVGdS27yDXeEcZUYpw2wvElhXNiHrhT7ek6qf5JKOd8=s0-rw',
  'interior-03.jpg': 'https://lh3.googleusercontent.com/Pd1gKrMJ9XmLS6JBSCIfBxZ5SNFZkjpM42bQ52QNr6jAYrHnl1mhNydUkfwaEPBYyJw2N84w-MyOsj1qFg1-8fjSg7Kktx5L4LmR2GOf=s0-rw',
  'interior-04.jpg': 'https://lh3.googleusercontent.com/B7L9oSbJBdAbN7XD2XS665nXqzCrZudx-q1IBtxNqFy_OSYdIydoMPltZqR3L-rZdHvLnYMfkqYimygZ-iW5xQXy94NBj6S2LuXAQBpA=s0-rw',
  'interior-05.jpg': 'https://lh3.googleusercontent.com/IVwnT9-YLzwMy-92kwMaZAuAg4c7_4G19WxDPJRxftWAQJsLIatSKHxf4MUnneClmMTLZz5gMVqfv6IY-2uR0aNnT4pwcpzn22Fydzi7=s0-rw',
  'interior-06.jpg': 'https://lh3.googleusercontent.com/H1ClHqjieyy8s4oZALRwnBhDZDOjAaR2gTuuBOUmLR7nVyHOYTDKXYg79Cv446H7HAnPBMDhUwhXG-EIUAnXyxx7FPAogkgmyE7xOtWn=s0-rw',
  'interior-07.jpg': 'https://lh3.googleusercontent.com/OhG_fGBKn8Ve8aCWtIPlYcw17EZcNaPdnmgA1nMKwHgZInygq2e4s3JNc-nPDqjPfRoToJ27C91t7ZD4aKCND4Mb69GZ5iSO0OGnrxFTxw=s0-rw',
  'interior-08.jpg': 'https://lh3.googleusercontent.com/-IHyZhInGc5ie6vzcFUu92H916zD69rEakmDBRnjGyklF1czlV-0p-Rross9KnJm2k5pUhwpgjZAPDXWwguPMTETrX_jPsjRx7nwULVzug=s0-rw',
  'interior-09.jpg': 'https://lh3.googleusercontent.com/sBa-eHIWwkAtbH-1AwQ8CVW35IorEaxhSiG29hv5s9ZjD-FMNld7vlZswVSuh8ENagQZC6SNwdxy2D6H_7UBxOd4TlNDS-IBf_2xMSuC=s0-rw',
  'interior-10.jpg': 'https://lh3.googleusercontent.com/TyCAJNCTVax2X55dUdMjNNZGYiZ7Wvdom-8_y-AgbMb1Rnwyoifp8dRHV8_MAa3fpBgQ8x9iqM5DdurV5AOoNPN5mamfQPh1fq3uW7o=s0-rw',
  'food-01.jpg': 'https://lh3.googleusercontent.com/lgtJ7Pt1-6t7zPaI4IPbLI02Ct282dkwTfscJrUJQTYalTWryK-Fll_bVeFWm8XtRi0aq8Hwn3v0K9xBtSTrcUmjEveLy93u8SBSbkdobQ=s0-rw',
  'food-02.jpg': 'https://lh3.googleusercontent.com/MrpFnL8LY6TRQja0ovNU1wYp9bBY88Z2ogf8jw2ZaKRCujQOFUNf3awVitNmeKzKaBxTv1mjEP3fZTDyNrwlUtxf5NqeDeN0EcEe6-q1GQ=s0-rw',
  'food-03.jpg': 'https://lh3.googleusercontent.com/FJ5ak5AFecC24EeKaTeQ3QTGWF_iQ1oPshzy5aDtJfWcfMsnL8CeFoPZfYFtT15-i-gWbyEVv7lZV_lYGjyjeJhv_n9Hk6AB8HLgisw=s0-rw',
  'food-04.jpg': 'https://lh3.googleusercontent.com/WJ_yc7beEWsur-IcZ_9WLaP4DaZmUblMCikxZeZc8PktWsGK1d6n2uc-tjcFY3EOIekOIaiPsYcKWHmYHSpUYvdHGuhwFIIysQtTFIH4xg=s0-rw',
  'food-05.jpg': 'https://lh3.googleusercontent.com/1C_QEGR9sZnSBWbyoyNIVhMhmDXaNqKrj6kuBof_SibU74y1TmcyeRv0JL4P6b_k4Sp0iJhV84jZaKTpIX-e36BE=s0-rw',
  'misc-01.jpg': 'https://lh3.googleusercontent.com/PV3nTkKyGN91O1EyLyCSu94xubXAYI0lRnjsjgBY2yu1kd1-3DYHlSDMCx6xB8V-6-2X9xTBO6NHpUVqNkQHnPWpQt2yfN1ZypUQURw=s0-rw',
  'misc-02.jpg': 'https://lh3.googleusercontent.com/X2pVsoSfRadLBa3svfrrAlHCH1p1klDUt0NcZfrNqeNUyL4xozDo0ZVF9MsQUxvkjrNc7nDg0f3bTl0Crsl_ERmMsxsIeImBGQ7y59Dh=s0-rw',
  'misc-03.jpg': 'https://lh3.googleusercontent.com/BDjg8tQFL_KNhs1Pp65PRM7sw4QK0_xGFsrEzzMXT4r9h41b2hypVEytORQIEich_STY8TJxTDyhtvtg-R7UDJcEYPQvPc7bKLWDToQ=s0-rw',
};

const outputDir = path.join(__dirname, '..', 'public', 'images', 'woolcup');

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(path.join(outputDir, filename));
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting downloads...');
  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(url, filename);
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('Finished downloads.');
}

main();
