import express, { response } from 'express';
import { config } from 'dotenv';
import http from 'http';
import { Ollama } from 'ollama'

config();
const app = express();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000');


const ollama = new Ollama({ host: process.env.OLLAMA_URL });
ollama.pull({
  model: 'llama3.1',
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


app.post('/sendPrompt', async(req, res) => {
  const prompt = req.body.prompt;
  const response = await ollama.chat({
    model: 'llama3.1',
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  })

  res.json({ response: response });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});