import { GetStaticProps } from 'next'
import * as prismic from '@prismicio/client'
import { client } from '../../services/prismic'

import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.scss'
import { useState } from 'react'
import { api } from '../../services/api'

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
  nextPages: string
}

export default function Articles({ articles, nextPages }: ArticlesProps) {
  const [allArticles, setAllArticles] = useState(articles)
  const [nextPage, setNextPage] = useState(nextPages)

  async function handleLoadNextPages() {
    if (nextPage === null) {
      return
    }

    const responseNextPage = await api.get('/api/nextpages', {
      params: {
        nextPagesUrl: nextPage
      }
    })

    const { formattedData, next_page } = responseNextPage.data

    setNextPage(next_page)
    setAllArticles([...allArticles, ...formattedData])
  }

  return (
    <>
      <Head>
        <title>Articles | HotCoffee</title>
      </Head>

      <main>
        <div className={styles.feed}>
          {allArticles.map(article => (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <a className={styles.articleCard}>
                <img
                  src={article.banner.url}
                  className={styles.articleCardImage}
                  alt=""
                />

                <div className={styles.articleCardContent}>
                  <div className={styles.articleCardHead}>
                    <h2>{article.title}</h2>
                    <p>{article.subtitle}</p>
                  </div>

                  <div className={styles.articleCardFooter}>
                    <time>{article.publicatedAt}</time>
                  </div>
                </div>
              </a>
            </Link>
          ))}

          {nextPage && (
            <button type="button" onClick={handleLoadNextPages}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get({
    predicates: prismic.predicate.at('document.type', 'article'),
    fetch: ['article.title', 'article.subtitle', 'article.banner'],
    pageSize: 6
    // orderings: '[document.last_publication_date desc]'
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

  const nextPages = response.next_page

  return {
    props: { articles, nextPages },
    revalidate: 60 * 30 // 30 minutes
  }
}
