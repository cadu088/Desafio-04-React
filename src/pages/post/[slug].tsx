import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return <h1>post</h1>;
}

// export const getStaticPaths = async () => {
//   // const prismic = getPrismicClient();
//   // const posts = await prismic.query(TODO);
//   // // TODO
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const { slug } = params;
  const response = await prismic.getByUID('', String(slug), {});
  console.log(response);
  const post = {
    first_publication_date: response.data.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner,
      },
      author: response.data.author,
      content: {
        heading: response.data.content.heading,
        body: {
          text: response.data.content.body,
        },
      },
    },
  };
  console.log(post);
  // const post = {

  // }
  return {
    props: {
      post,
    },
  };
};
