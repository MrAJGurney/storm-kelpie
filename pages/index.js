import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { sentence } from 'txtgen';
import { useState } from 'react';

export default function Home() {
  const [initialPhrase, setInitialPhrase] = useState(sentence());
  const [responsePhrase, setResponsePhrase] = useState('');

  return (
    <>
      <Head>
        <title>'Storm Kelpie'</title>
      </Head>
      <section>
        <h2>{'Blue Man of the Minch Rhyme:'}</h2>
        <p>{initialPhrase}</p>
      </section>
      <section>
        <h2>Your Response</h2>
        <textarea
          type="text"
          value={responsePhrase}
          onChange={(event) => setResponsePhrase(event.target.value)}
        />
      </section>
    </>
  );
}
