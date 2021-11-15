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
          placeholder={'Respond with a rhyme of the same number of words'}
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
              Same length:{' '}
              <em>{initialWordCount === responseWordCount ? 'yes' : 'no'}</em>
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
              {'Rhyme: '}
              <em>
                {initialPhraseFinalWordRhyme === responsePhraseFinalWordRhyme
                  ? 'yes'
                  : 'no'}
              </em>
            </li>
          </ul>
        </ul>
      </section>
    </>
  );
}
