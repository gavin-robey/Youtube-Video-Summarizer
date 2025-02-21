import express, { response } from 'express';
import { config } from 'dotenv';
import http from 'http';
import { Ollama } from 'ollama'
import { PrismaClient } from '@prisma/client'

config();
const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000');

const ollama = new Ollama({ host: process.env.OLLAMA_URL });
ollama.pull({
  model: 'tinyllama',
})


app.use(express.json());
app.use((req, res, next) => {
  if (req.path.includes(".")) {
    res.redirect(process.env.ASSET_URL + req.path);
    return;
  }
  next();
});

app.get('/', (req, res) => {
  res.send(`
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
    `);
});

// API
app.post('/api/sendPrompt', async(req, res) => {
  const prompt = req.body.prompt;
  const response = await ollama.chat({
    model: 'tinyllama',
    messages: [{ role: 'user', content: prompt }],
  })

  await prisma.message.create({
    data: {
      humanMessage: prompt,
      AIMessage: response.message.content.toString(),
    }
  });

  res.json(response.message);
});

app.get('/api/getMessages', async(req, res) => {
  const messages = await prisma.message.findMany();
  res.json(messages);
});

server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

