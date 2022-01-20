import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';
import Header from '../components/Header';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>{' '}
      </Head>
      <main>
        <Header />

        <div>
          {postsPagination.results.map((p, index) => (
            <div key={p.uid}>
              <h1>{p.data}</h1>
              <h1>{p.data}</h1>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('Publication', { pageSize: 2 });

  console.log(postsResponse);

  return {
    props: {},
  };
};
