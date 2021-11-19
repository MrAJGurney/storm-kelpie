import { dictionary } from 'https://unpkg.com/cmu-pronouncing-dictionary@3.0.0/index.js';

const SYMBOLS = {
  TICK: '✔',
  CROSS: '✘',
};

const getSanitisedLine = (line) =>
  line
    .replace(/[^a-z ]/gi, '')
    .replace(/\s\s+/g, ' ')
    .trim();

const getWordCount = (line) => (line === '' ? 0 : line.split(' ').length);

const getFinalWord = (line) => line.split(' ').slice(-1)[0];

const getRhymeSymbols = (word) =>
  dictionary[word] && dictionary[word].split(' ').slice(-2).join(' ');

const getDuplicateWords = (sanitisedCall, sanitisedResponse) =>
  sanitisedResponse
    .split(' ')
    .reduce((duplicateWords, wordToCheck) => {
      const totalOccurrences = [
        ...sanitisedCall.split(' '),
        ...sanitisedResponse.split(' '),
      ].reduce(
        (occurrences, word) =>
          word === wordToCheck ? occurrences + 1 : occurrences,
        0
      );
      if (totalOccurrences > 1) {
        duplicateWords.push(wordToCheck);
      }
      return duplicateWords;
    }, [])
    .sort()
    .reduce((uniqueWords, word) => {
      if (!uniqueWords.includes(word)) {
        uniqueWords.push(word);
      }
      return uniqueWords;
    }, []);

const updateCall = ({ call }) =>
  (document.getElementById('call-output').innerText = call);

const updatePage = ({ call, response }) => {
  updateCall({ call });

  // Sanitise poetry lines
  const sanitisedCall = getSanitisedLine(call);
  const sanitisedResponse = getSanitisedLine(response);

  // Does the response have the same word count
  const callWordCount = getWordCount(sanitisedCall);
  const responseWordCount = getWordCount(sanitisedResponse);
  const responseIsSameLength = callWordCount === responseWordCount;
  document.getElementById('word-count-comparison').innerText =
    responseIsSameLength ? SYMBOLS.TICK : SYMBOLS.CROSS;

  // Does the response duplicate any words
  const duplicateWordsInResponse = getDuplicateWords(
    sanitisedCall,
    sanitisedResponse
  );
  const responseHasOnlyUniqueWords = duplicateWordsInResponse.length === 0;
  document.getElementById('response-uniqeness-check').innerText =
    responseHasOnlyUniqueWords ? SYMBOLS.TICK : SYMBOLS.CROSS;

  // Does the response rhyme with the call
  const callFinalWord = getFinalWord(sanitisedCall);
  const responseFinalWord = getFinalWord(sanitisedResponse);
  const callRhymeSymbols = getRhymeSymbols(callFinalWord);
  const responseRhymeSymbols = getRhymeSymbols(responseFinalWord);
  const responseIsRhyme = callRhymeSymbols === responseRhymeSymbols;
  document.getElementById('final-word-rhyme-comparison').innerText =
    responseIsRhyme ? SYMBOLS.TICK : SYMBOLS.CROSS;

  document.getElementById('victory').innerText =
    responseIsSameLength && responseHasOnlyUniqueWords && responseIsRhyme
      ? '🚣 success 🚣'
      : '💀 sunk 💀';
};

const main = () => {
  let call = txtgen.sentence();
  let response = '';

  // Update page when response is altered
  const responseInputTextArea = document.getElementById('response-input');
  responseInputTextArea.addEventListener('input', (event) => {
    response = event.target.value;
    updatePage({ call, response });
  });

  // Update page when new phrase is generated
  const generateNewPhraseButton = document.getElementById(
    'generate-new-phrase'
  );
  generateNewPhraseButton.addEventListener('click', () => {
    call = txtgen.sentence();
    responseInputTextArea.value = '';
    updatePage({ call, response });
  });

  // Update page after values have been initialised
  updatePage({ call, response });

  // Unhide page (previously hidden by "display: none;")
  document.body.style.display = 'flex';
};

window.addEventListener('load', main);
