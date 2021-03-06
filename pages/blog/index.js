import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPosts } from '../../lib/api';
import { getAllPages } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

// const Blog = ({ allPosts: { edges }, allPages: { edges } }) => (
//   <div className={styles.container}>
//     <Head>
//       <title>Blog articles page</title>
//       <link rel='icon' href='./favicon.ico' />
//     </Head>

//     <main className={styles.main}>
//       <h1 className={styles.title}>Latest blog articles</h1>
//       <hr />
//       <section>
//         {edges.map(({ node }) => (
//           <div className={blogStyles.listitem} key={node.id}>
//             <div className={blogStyles.listitem__thumbnail}>
//               <figure>
//                 <img
//                   src={node.extraPostInfo.thumbImage.mediaItemUrl}
//                   alt={node.title}
//                 />
//               </figure>
//             </div>
//             <div className={blogStyles.listitem__content}>
//               <h2>{node.title}</h2>
//               <p>{node.extraPostInfo.authorExcerpt}</p>
//               <Link href={`/blog/${node.slug}`}>
//                 <a>Read more </a>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </section>
//     </main>
//   </div>
// );

const Blog = ({ allPages: { edges } }) => (
  <div className={styles.container}>
    <Head>
      <title>Here are the pages</title>
      <link rel='icon' href='./favicon.ico' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Latest pages</h1>
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

export default Blog;