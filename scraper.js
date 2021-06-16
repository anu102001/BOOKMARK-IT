const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://medium.com/slackjaw/a-man-in-his-30s-explains-to-me-whats-wrong-with-women-in-their-30s-313d9b550477")
.then((response) => {
    //handling the success
    const html = response.data;

    //loading response data into a Cheerio instance
    const $ = cheerio.load(html);

    //selecting the elements with the data
//    const scrapedata = $(`h1`).text();
    const img  = $('img').html();
    // const p = $('p')

    //outputting the scraped data
    // console.log(scrapedata);
console.log(img);
    // console.log(p[0].children[0].data);
  })
  //handling error
  .catch((error) => {
    console.log(error);
  });
/**
<ref *1> Node {
  type: 'tag',
  name: 'a',
  namespace: 'http://www.w3.org/1999/xhtml',
  attribs: [Object: null prototype] {
    href: 'https://ella-alderson.medium.com/?source=post_page-----ec3023a30af2--------------------------------',
    rel: 'noopener'
  },
  'x-attribsNamespace': [Object: null prototype] { href: undefined, rel: undefined },
  'x-attribsPrefix': [Object: null prototype] { href: undefined, rel: undefined },
  children: [
    Node {
      type: 'tag',
      name: 'div',
      namespace: 'http://www.w3.org/1999/xhtml',
      attribs: [Object: null prototype],
      'x-attribsNamespace': [Object: null prototype],
      'x-attribsPrefix': [Object: null prototype],
      children: [Array],
      parent: [Circular *1],
      prev: null,
      next: null
    }
  ],
  parent: <ref *2> Node {
    type: 'tag',
    name: 'div',
    namespace: 'http://www.w3.org/1999/xhtml',
    attribs: [Object: null prototype] {},
    'x-attribsNamespace': [Object: null prototype] {},
    'x-attribsPrefix': [Object: null prototype] {},
    children: [ [Circular *1] ],
    parent: Node {
      type: 'tag',
      name: 'div',
      namespace: 'http://www.w3.org/1999/xhtml',
      attribs: [Object: null prototype],
      'x-attribsNamespace': [Object: null prototype],
      'x-attribsPrefix': [Object: null prototype],
      children: [Array],
      parent: [Node],
      prev: null,
      next: [Node]
    },
    prev: null,
    next: Node {
      type: 'tag',
      name: 'div',
      namespace: 'http://www.w3.org/1999/xhtml',
      attribs: [Object: null prototype],
      'x-attribsNamespace': [Object: null prototype],
      'x-attribsPrefix': [Object: null prototype],
      children: [Array],
      parent: [Node],
      prev: [Circular *2],
      next: null
    }
  },
  prev: null,
  next: null
}
 */
