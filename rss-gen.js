require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const getAllPagesXmlData = async () => {
  const query = `
    query allPages {
      pages {
        edges {
          node {
            guid
            date
            isFrontPage
            content(format: RENDERED)
            title
            slug
            featuredImage {
              node {
                sourceUrl
                id
              }
            }
          }
        }
      }
    }
    `;
  const headers = { 'Content-Type': 'application/json' };
  const allPages = await axios({
    method: 'post',
    url: process.env.WP_API_URL,
    headers,
    data: JSON.stringify({ query })
  });

  return allPages.data.data.pages.edges;
};

const allPagesRssXml = allPages => {
  let latestPostDate = '';
  let rssItemsXml = '';
  allPages.forEach(({ node }) => {
    const page = node;
    const pageDate = Date.parse(page.date);

    // Remember to change this URL to your own!
    const pageHref = `https://myamazingwebsite.com/blog/${page.slug}`;

    if (!latestPostDate || pageDate > Date.parse(latestPostDate)) {
      latestPostDate = page.date;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${page.title}]]></title>
        <link>${pageHref}</link>
        <pubDate>${page.date}</pubDate>
        <guid isPermaLink="false">${pageHref}</guid>
        <description>
        <![CDATA[${page.slug}]]>
        </description>
        <content:encoded>
          <![CDATA[${page.content}]]>
        </content:encoded>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate
  };
};

const getRssXml = allPages => {
  const { rssItemsXml, latestPostDate } = allPagesRssXml(allPages);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[Home Service Industry Websites By Big West Marketing]]></title>
        <link>https://myamazingwebsite.com</link>
        <description>
          <![CDATA[Totally tubular SEO and Websites from Missoula, MT]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

async function generateRSS() {
  const allPagesData = await getAllPagesXmlData();
  const processedXml = getRssXml(allPagesData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();