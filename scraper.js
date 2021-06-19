const axios = require("axios");
const cheerio = require("cheerio");

module.exports.getContent = async (url) => {
  await axios.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const heading = $(`h1`).text();
    const img = $(`img`);
    const p = $('p')

    var maxIdx = -1;
    var maxSize = 0;
    for (var i = 0; i < img.length; i++) {
      if (img[i].attribs.width * img[i].attribs.height >= maxSize) {
        maxSize = img[i].attribs.width * img[i].attribs.height;
        maxIdx = i;
      }
    }

    // console.log(heading);
    // console.log(img[maxIdx].attribs.src);
    // console.log(`${p[0].children[0].data}`);

    return {
      heading: heading,
      img: img[maxIdx].attribs.src,
      content: p[0].children[0].data
    }

  }).catch((error) => {
    console.log(error);
  });
}

