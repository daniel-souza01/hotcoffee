import { GetStaticProps } from 'next'
import * as prismic from '@prismicio/client'
import { client } from '../../services/prismic'
import Head from 'next/head'

import styles from './styles.module.scss'

type Article = {
  slug: string
  banner: {
    url: string
  }
  title: string
  subtitle: string
  publicatedAt: string
}

interface ArticlesProps {
  articles: Article[]
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <>
      <Head>
        <title>Articles - HotCoffee</title>
      </Head>

      <main>
        <div className={styles.feed}>
          {articles.map(article => (
            <a key={article.slug} href="#" className={styles.articleCard}>
              <img
                src={article.banner.url}
                className={styles.articleCardImage}
              ></img>

              <div className={styles.articleCardContent}>
                <div className={styles.articleCardHead}>
                  <h2>{article.title}</h2>
                  <p>{article.subtitle}</p>
                </div>

                <div className={styles.articleCardFooter}>
                  <p>{article.publicatedAt}</p>
                  {/* <strong>Read more</strong> */}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get({
    predicates: prismic.predicate.at('document.type', 'article'),
    fetch: ['article.title', 'article.subtitle', 'article.banner']
    // pageSize: 100
  })

  const articles = response.results.map(article => {
    return {
      slug: article.uid,
      banner: article.data.banner,
      title: article.data.title,
      subtitle: article.data.subtitle,
      publicatedAt: new Date(article.first_publication_date).toLocaleDateString(
        'pt-br',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
  })

  return {
    props: { articles }
  }
}