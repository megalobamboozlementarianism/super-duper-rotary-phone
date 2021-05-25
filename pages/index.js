import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import blogStyles from '../styles/Blog.module.css';

import { getAllPages } from '../lib/api';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//       <h1 className={styles.title}>Welcome to our demo blog!</h1>
//       <p>
//         You can find more articles on the{' '}
//         <Link href='/blog'>
//         <a>blog articles page</a>
//         </Link>
//       </p>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }

const Home = ({ allPages: { edges } }) => (
  <div className={styles.container}>
    <Head>
      <title>The Ultimatic</title>
      <link rel='icon' href='./favicon.ico' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Cleaning Services In Missoula, MT</h1>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            <div className={blogStyles.listitem__content}>
              
              <Link href={`/blog/${node.slug}`}>
                <a><h2>{node.title}</h2></a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  </div>
);


export async function getStaticProps() {
  // const allPosts = await getAllPosts();
  const allPages = await getAllPages();
  return {
    props: {
      // allPosts,
      allPages
    }
  };
};

export default Home;
