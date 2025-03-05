import express from 'express';
import { config } from 'dotenv';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';

config();
const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000');

const queue = new Queue('queue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
})

app.use(express.json());
app.use((req, res, next) => {
  if (req.path.includes(".")) {
    res.redirect(process.env.ASSET_URL + req.path);
    return;
  }
  next();
});

const template = `
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="${process.env.ASSET_URL}/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React-Express Starter App</title>
        <script type="module">
          import RefreshRuntime from '${process.env.ASSET_URL}/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <script type="module" src="${process.env.ASSET_URL}/@vite/client"></script>
      </head>
        <body>
        <div id="root"></div>
        <script type="module" src="${process.env.ASSET_URL}/src/main.tsx"></script>
      </body>
    </html>
`

app.get('/', (req, res) => {
  res.send(template);
});

app.get('/all-summaries', (req, res) => {
  res.send(template);
});

app.get('/summary', (req, res) => {
  res.send(template);
});

// gets the link and adds it to the redis queue
app.post('/api/send', async(req, res) => {
  queue.add('queue', { link : req.body.link })
  res.json("Job added to queue")
});

// get summary by id
app.post('/api/getSummary', async (req, res) => {
  const id = req.body.id;

  const summary = await prisma.summary.findUnique({
    where: { id: parseInt(id) }
  });

  if (summary) {
    res.json(summary);
  } else {
    res.status(404).json({ error: 'Summary not found' });
  }
});

// deletes a summary in the database
app.post('/api/deleteSummary', async(req, res) => {
  const id = req.body.id
  try {
    const deletedSummary = await prisma.summary.delete({
      where: { id: parseInt(id) }
    });

    res.json(deletedSummary);
  } catch (error) {
    res.status(500).json({ error: `Failed to delete summary: ${error}` });
  }
})

// gets all summaries in the database
app.get('/api/getSummaries', async(req, res) => {
  const summaries = await prisma.summary.findMany();
  res.json(summaries);
});

server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

