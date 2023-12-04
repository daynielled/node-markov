/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i=0; i < this.words.length - 1; i++){
      const word = this.words[i];
      const nextWord = this.words[i+1] || null;

      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
    console.log('Generated chains:', this.chains);
  }


  /** return random text from chains */

  makeText(numWords = 100) {
   const startIdx = Math.floor(Math.random() * (this.words.length - 1));
    let currentWord = this.words[startIdx];
    let result = [currentWord];

    for (let i = 1; i < numWords; i++) {
      const nextWords = this.chains[currentWord];
      if (!nextWords || nextWords.length === 0) {
        break;
      }
      const nextIdx = Math.floor(Math.random() * nextWords.length);
      const nextWord = nextWords[nextIdx];
      result.push(nextWord);
      currentWord = nextWord;
    }

    return result.join(' ');
  }
}


module.exports = {
  MarkovMachine,
};