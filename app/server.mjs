import express from 'express';
import { Client } from '@elastic/elasticsearch';
import cors from 'cors';

const app = express();
const PORT = 5000;

const client = new Client({ node: 'http://localhost:9200' });

app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.query;

  try {
    const { body } = await client.search({
      index: 'games',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'released'],
          },
        },
      },
    });

    const results = body.hits.hits.map(hit => hit._source);
    res.json({ results });
  } catch (error) {
    console.error('Error searching data:', error);
    res.status(500).json({ error: 'Failed to search data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
