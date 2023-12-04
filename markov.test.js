const MarkovMachine = require('./markov');

describe('MarkovMachine', () =>{
    test('makeChains creates correct chains', () => {
        const text= 'the cat in the hat';
        const markovMachine = new MarkovMachine(text);

        const expectedChains =  {
            'the': ['cat','hat'],
            'cat': ['in'],
            'in': ['the'],
            'hat':[null],
        };
        expect(markovMachine.chains).toEqual(expectedChains);
        expect(markovMachine.chains['hat'][0]).toBeNull();
    });

    test('makeText generates non-empty text', () => {
        const text = 'the cat in the hat';
        const markovMachine = new MarkovMachine(text);
        const generatedText = markovMachine.makeText();

        expect(generatedText.trim()).not.toEqual('');
    });

    test('makeText generates with specified number of words', () => {
        const text = 'the cat in the hat';
        const markovMachine = new MarkovMachine(text);
        const numWords = 5;
        const generatedText = markovMachine.makeText(numWords);

        const generatedWords = generatedText.trim().split(/\s+/);
        expect(generatedWords.length).toEqual(numWords);

    });

});

   