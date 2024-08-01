import fetch from 'node-fetch';
import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

const indexGames = async () => {
  const apiKey = process.env.RAWG_API_KEY;
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=100`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const bulkOps = data.results.flatMap(game => [
      { index: { _index: 'games', _id: game.id } },
      {
        name: game.name,
        released: game.released,
        background_image: game.background_image,
      },
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body: bulkOps });

    if (bulkResponse.errors) {
      const erroredDocuments = bulkResponse.items.filter(item => item.index && item.index.error);
      console.log(erroredDocuments);
    } else {
      console.log('Data indexed successfully');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

indexGames();
