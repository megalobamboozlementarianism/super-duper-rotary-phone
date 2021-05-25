import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPostsWithSlug, getPost, getAllPagesWithSlug, getPage } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

// export default function Post({ postData }) {
//   const router = useRouter();

//   if (!router.isFallback && !postData.slug) {
//     return <p>hmm... looks like an error</p>;
//   } 

//   const formatDate = date => {
//     const newDate = new Date(date);

//     return `${newDate.getDate()}/${
//       newDate.getMonth() + 1
//     }/${newDate.getFullYear()}`;
//   };

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>{postData.title}</title>
//         <link rel='icon' href='/favicon.ico' />
//       </Head>

//       <main className={styles.main}>
//         {router.isFallback ? (
//           <h2>Loading...</h2>
//         ) : (
//           <article className={blogStyles.article}>
//             <div className={blogStyles.postmeta}>
//               <h1 className={styles.title}>{postData.title}</h1>
//               <p>{formatDate(postData.date)}</p>
//             </div>
//             <div
//               className='post-content content'
//               dangerouslySetInnerHTML={{ __html: postData.content}}
//             >
//             </div>
//             <p>
//               <Link href='/blog'>
//                 <a>back to articles</a>
//               </Link>
//             </p>
//           </article>
//         )}
//       </main>
//     </div>
//   )
// }

export default function Page({ pageData }) {
  console.log("page data object" + Object.entries(pageData))
  const router = useRouter();

  if (!router.isFallback && !pageData?.slug) {
    return <p>hmm... looks like an error</p>;
  } 

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageData.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <article className={blogStyles.article}>
            <div className={blogStyles.postmeta}>
              <h1 className={styles.title}>{pageData.title}</h1>
            </div>
            {/* <figure>
                 <img
                   src={pageData.featuredImage.node.sourceUrl}
                   alt={pageData.title}
                 />
            </figure> */}
            <div
              className='post-content content'
              dangerouslySetInnerHTML={{ __html: pageData.content}}
            >
            </div>
            <p>
              <Link href='/'>
                <a>back to home</a>
              </Link>
            </p>
          </article>
        )}
      </main>
    </div>
  )
}

// export async function getStaticPaths() {
//   const allPosts = await getAllPostsWithSlug();

//   return {
//     paths: allPosts.edges.map(({ node}) => `/blog/${node.slug}`) || [],
//     fallback: true
//   };
// }

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();

  return {
    paths: allPages.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: false
  };
}

// export async function getStaticProps({ params }) {
//   const data = await getPost(params.slug);

//   return {
//     props: {
//       postData: data.post
//     }
//   };
// }

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug);

  return {
    props: {
      pageData: data.page
    }
  };
}
