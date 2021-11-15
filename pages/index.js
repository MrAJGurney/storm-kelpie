import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { sentence } from 'txtgen';

export default function Home() {
  const phraseToRhyme = sentence();

  return (
    <>
      <Head>
        <title>'Storm Kelpie'</title>
      </Head>
      <section>
        <h2>{'Blue Man of the Minch Rhyme:'}</h2>
        <p>{phraseToRhyme}</p>
      </section>
    </>
  );
}
