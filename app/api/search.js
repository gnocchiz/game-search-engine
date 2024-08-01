import client from '../../elasticsearch-client';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const { body } = await client.search({
    index: 'games',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['name^4', 'description', 'genres.name'],
        },
      },
    },
  });

  const results = body.hits.hits.map(hit => hit._source);
  res.status(200).json(results);
}
