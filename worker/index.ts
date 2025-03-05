import { Worker } from 'bullmq';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { YoutubeTranscript } from 'youtube-transcript';
var youtubeThumbnail = require('youtube-thumbnail');
import { Ollama } from 'ollama';

config();
const prisma = new PrismaClient();
const ollama = new Ollama({ host: process.env.OLLAMA_URL });
ollama.pull({
  model: 'tinyllama',
})

new Worker('queue', async(job) => {
    console.log(job.data.link)
    const link = job.data.link;
    var transcript = "";
    try {
        const loadingSummary = await prisma.summary.create({
            data: {
                link: job.data.link,
                image: "Loading...",
                isComplete: false,
                summary: "Loading..."
            }
        });

        const response = await YoutubeTranscript.fetchTranscript(link);
        response.map((s) => transcript += (s.text + " "));
        const thumbnail = await youtubeThumbnail(link);

        const prompt = `Summarize the following video transcript in a short paragraph: ${transcript}`;
        const llama = await ollama.chat({
            model: 'tinyllama',
            messages: [{ role: 'user', content: prompt }],
        })

        const createdSummary = await prisma.summary.update({
            where: { id: loadingSummary.id },
            data: {
                image: thumbnail.high.url,
                isComplete: true,
                summary: llama.message.content.toString()
            }
        });

        console.log(`Successfully created a summary with id: ${createdSummary.id}`)
    } catch (error) {
        console.log(`Error creating summary: ${error}`)
    } 
}, {
    connection: {
        host: process.env.REDIS_HOST, 
        port: parseInt(process.env.REDIS_PORT || "6379")
    }
})