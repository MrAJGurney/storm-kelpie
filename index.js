import { dictionary } from 'https://unpkg.com/cmu-pronouncing-dictionary@3.0.0/index.js';

const getSanitisedLine = (line) => line.replace(/[^a-z ]/gi, '').trim();

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

const updateWordCount = ({
  callWordCount,
  responseWordCount,
  responseIsSameLength,
}) => {
  document.getElementById('word-count-call').innerText = callWordCount;
  document.getElementById('word-count-response').innerText = responseWordCount;
  document.getElementById('word-count-comparison').innerText =
    responseIsSameLength ? 'yes' : 'no (alter response word count)';
};

const updateWordUniqueness = ({
  duplicateWordsInResponse,
  responseHasOnlyUniqueWords,
}) => {
  document.getElementById('duplicate-words').innerText =
    duplicateWordsInResponse.join(', ');
  document.getElementById('response-uniqeness-check').innerText =
    responseHasOnlyUniqueWords
      ? 'yes'
      : 'no (replace duplicate words from response)';
};

const updateRhymeAccuracy = ({
  callFinalWord,
  responseFinalWord,
  callRhymeSymbols,
  responseRhymeSymbols,
  responseIsRhyme,
}) => {
  document.getElementById('final-word-call').innerText = callFinalWord;
  document.getElementById('final-word-response').innerText = responseFinalWord;
  document.getElementById('final-word-rhyme-call').innerText = callRhymeSymbols;
  document.getElementById('final-word-rhyme-response').innerText =
    responseRhymeSymbols;
  document.getElementById('final-word-rhyme-comparison').innerText =
    responseIsRhyme ? 'yes' : 'no (try a different word)';
};

const updateVictoryCondition = ({
  responseIsSameLength,
  responseHasOnlyUniqueWords,
  responseIsRhyme,
}) =>
  (document.getElementById('victory').innerText =
    responseIsSameLength && responseHasOnlyUniqueWords && responseIsRhyme
      ? '🚣 success 🚣'
      : '💀 sunk 💀');

const updatePage = ({ call, response }) => {
  updateCall({ call });

  // Sanitise poetry lines
  const sanitisedCall = getSanitisedLine(call);
  const sanitisedResponse = getSanitisedLine(response);

  // Does the response have the same word count
  const callWordCount = getWordCount(sanitisedCall);
  const responseWordCount = getWordCount(sanitisedResponse);
  const responseIsSameLength = callWordCount === responseWordCount;

  updateWordCount({ callWordCount, responseWordCount, responseIsSameLength });

  // Does the response duplicate any words
  const duplicateWordsInResponse = getDuplicateWords(
    sanitisedCall,
    sanitisedResponse
  );
  const responseHasOnlyUniqueWords = duplicateWordsInResponse.length === 0;

  updateWordUniqueness({
    duplicateWordsInResponse,
    responseHasOnlyUniqueWords,
  });

  // Does the response rhyme with the call
  const callFinalWord = getFinalWord(sanitisedCall);
  const responseFinalWord = getFinalWord(sanitisedResponse);
  const callRhymeSymbols = getRhymeSymbols(callFinalWord);
  const responseRhymeSymbols = getRhymeSymbols(responseFinalWord);
  const responseIsRhyme = callRhymeSymbols === responseRhymeSymbols;

  updateRhymeAccuracy({
    callFinalWord,
    responseFinalWord,
    callRhymeSymbols,
    responseRhymeSymbols,
    responseIsRhyme,
  });

  updateVictoryCondition({
    responseIsSameLength,
    responseHasOnlyUniqueWords,
    responseIsRhyme,
  });
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
};

window.addEventListener('load', main);
