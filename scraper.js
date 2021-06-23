const axios = require("axios");
const cheerio = require("cheerio");

const Blogs = require('./models/blogs');

module.exports.getContent = async (url) => {
  await axios.get(url)
  .then(async (response) => {
    const html = response.data;
    const $ = await cheerio.load(html);

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

    //  console.log(heading);
    //  console.log(img[maxIdx].attribs.src);
    //  console.log(`${p[0].children[0].data}`);

    //  var blogContent = {
    //   heading: heading,
    //   img: img[maxIdx].attribs.src != undefined ? img[maxIdx].attribs.src : "",
    //   content: p[0].children[0].data != undefined ? p[0].children[0].data :  "", 
    // };

    // console.log(blogContent);

    // return(blogContent);
    console.log(typeof heading + ' from scraper');
    return heading;


  }).catch((error) => {
    console.log(error);
  });
}

// module.exports.scrapeAll = async () => {
//   var blogs = await Blogs.find({});

//   blogs.forEach((blog) => {
//       await axios.get(url)
//         .then(response => {}) 
//   })
// }
