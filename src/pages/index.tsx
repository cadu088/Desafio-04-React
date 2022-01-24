import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BsCalendarRangeFill } from 'react-icons/bs';
import { MdPeopleAlt } from 'react-icons/md';
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
  function teste() {
    const a = 15;
    window.alert('click');
  }
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main>
        <Header />
        <div className={styles.bodyHome}>
          {postsPagination.results.map((p, index) => (
            <div key={p.uid} className={styles.posts}>
              <a href={`/post/${p.uid}`}>
                <h1>{p.data.title}</h1>
              </a>

              <h3>{p.data.subtitle}</h3>
              <div className={styles.infoPosts}>
                <h6>
                  <BsCalendarRangeFill className={styles.icon} />
                  {p.first_publication_date}
                </h6>
                <h6>
                  <MdPeopleAlt className={styles.icon} />
                  {p.data.author}
                </h6>
              </div>
            </div>
          ))}
          <button type="button" onClick={teste}>
            Carregar mais posts
          </button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('', { pageSize: 3 });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.first_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  console.log(posts);

  return {
    props: {
      postsPagination: {
        next_page: 1,
        results: posts,
      },
    },
  };
};
