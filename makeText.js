/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const process = require('process');
const MarkovMachine = require('./markov');



async function generateText(source) {
    try{
        let text;
        if (source.startsWith('http')) {
            const response = await axios.get(source);
            text = response.data;
        }else {
            text = fs.readFileSync(source, 'utf-8');
        }

        const markovMachine = new MarkovMachine(text);
        const generatedText = markovMachine.makeText();
        console.log(generateText);
    }catch(error) {
        console.error('Error', error.message);
    }
}

const [, , sourceType, source] = process.argv;

if (!sourceType || !source) {
    console.error('Usage: node makeText.js [file|url] [source]');
}else{
    generateText(source);
}



