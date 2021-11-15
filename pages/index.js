import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { sentence } from 'txtgen';
import { dictionary } from 'cmu-pronouncing-dictionary';

export default function Home() {
  const [initialPhrase, setInitialPhrase] = useState(sentence());
  const [responsePhrase, setResponsePhrase] = useState('');

  const sanitisedInitialPhrase = initialPhrase.replace(/[^a-z ]/gi, '').trim();
  const sanitisedResponsePhrase = responsePhrase
    .replace(/[^a-z ]/gi, '')
    .trim();

  const initialWordCount =
    sanitisedInitialPhrase === ''
      ? 0
      : sanitisedInitialPhrase.split(' ').length;
  const responseWordCount =
    sanitisedResponsePhrase === ''
      ? 0
      : sanitisedResponsePhrase.split(' ').length;

  const initialPhraseEndingWord = sanitisedInitialPhrase
    .split(' ')
    .slice(-1)[0];
  const responsePhraseEndingWord = sanitisedResponsePhrase
    .split(' ')
    .slice(-1)[0];

  const initialPhraseFinalWordPronunciation =
    dictionary[initialPhraseEndingWord];
  const responsePhraseFinalWordPronunciation =
    dictionary[responsePhraseEndingWord];

  const initialPhraseFinalWordRhyme =
    initialPhraseFinalWordPronunciation &&
    initialPhraseFinalWordPronunciation.split(' ').slice(-2).join(' ');
  const responsePhraseFinalWordRhyme =
    responsePhraseFinalWordPronunciation &&
    responsePhraseFinalWordPronunciation.split(' ').slice(-2).join(' ');

  const allWordsUsed = [
    ...sanitisedInitialPhrase.split(' '),
    ...sanitisedResponsePhrase.split(' '),
  ];

  const duplicateWordsInResponse = sanitisedResponsePhrase
    .split(' ')
    .reduce((duplicateWords, wordToCheck) => {
      const totalOccurrences = allWordsUsed.reduce(
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

  return (
    <>
      <Head>
        <title>Storm Kelpie</title>
      </Head>
      <section>
        <h2>Blue Man of the Minch</h2>
        <p>{initialPhrase}</p>
      </section>
      <section>
        <h2>Your Response</h2>
        <textarea
          type="text"
          value={responsePhrase}
          onChange={(event) => setResponsePhrase(event.target.value)}
          placeholder={'complete the rhyme here'}
        />
      </section>
      <section>
        <h2>Score</h2>
        <ul>
          <li>Must have same word count</li>
          <ul>
            <li>
              Initial word count: <em>{initialWordCount}</em>
            </li>
            <li>
              Response word count: <em>{responseWordCount}</em>
            </li>
            <li>
              <b>
                {'Same length: '}
                <em>{initialWordCount === responseWordCount ? 'yes' : 'no'}</em>
              </b>
            </li>
          </ul>
          <li>Must use unique words</li>
          <ul>
            <li>
              Repeated words:{' '}
              <em>
                {duplicateWordsInResponse.length > 0
                  ? duplicateWordsInResponse.join(', ')
                  : 'none'}
              </em>
            </li>
            <li>
              <b>
                {'Unique words: '}
                <em>{false ? 'yes' : 'no'}</em>
              </b>
            </li>
          </ul>
          <li>Must rhyme</li>
          <ul>
            <li>
              {'Final word in initial phrase: '}
              <em>{initialPhraseEndingWord}</em>
            </li>
            <ul>
              <li>
                <a
                  target="_blank"
                  href={'http://www.speech.cs.cmu.edu/cgi-bin/cmudict'}
                >{`CMU pronouncing dictionary ending symbols: `}</a>
                <em>{initialPhraseFinalWordRhyme || 'unknown'}</em>
              </li>
            </ul>
            <li>
              {'Final word in response phrase: '}
              <em>{responsePhraseEndingWord || 'none'}</em>
            </li>
            <ul>
              <li>
                <a
                  target="_blank"
                  href={'http://www.speech.cs.cmu.edu/cgi-bin/cmudict'}
                >{`CMU pronouncing dictionary ending symbols: `}</a>
                <em>{responsePhraseFinalWordRhyme || 'unknown'}</em>
              </li>
            </ul>
            <li>
              <b>
                {'Rhyme: '}
                <em>
                  {initialPhraseFinalWordRhyme === responsePhraseFinalWordRhyme
                    ? 'yes'
                    : 'no'}
                </em>
              </b>
            </li>
          </ul>
        </ul>
      </section>
    </>
  );
}
