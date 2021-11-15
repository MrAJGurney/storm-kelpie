import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { sentence } from 'txtgen';
import { useState } from 'react';

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
            <li>Initial word count: {initialWordCount}</li>
            <li>Response word count: {responseWordCount}</li>
            <li>
              Same length:{' '}
              {initialWordCount === responseWordCount ? 'yes' : 'no'}
            </li>
          </ul>
        </ul>
      </section>
    </>
  );
}
