// pages/api/checkLinks.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  
  try {
    const response = await axios.get(url);
    const links = extractLinks(response.data);

    const results = await Promise.all(links.map(checkLink));
    const brokenLinks = results.filter((result) => result.status === 404);

    res.status(200).json({ brokenLinks });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function extractLinks(html) {
  const $ = cheerio.load(html);
  const links = [];

  $('a').each((index, element) => {
    const href = $(element).attr('href');
    if (href) {
      links.push(href);
    }
  });

  return links;
}

async function checkLink(link) {
  try {
    const response = await axios.head(link);
    return { link, status: response.status };
  } catch (error) {
    return { link, status: 404 };
  }
}
