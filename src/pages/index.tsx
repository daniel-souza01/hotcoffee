import { GetStaticProps } from 'next'
import * as prismic from '@prismicio/client'
import { client } from '../services/prismic'
import { useRouter } from 'next/router'

import Head from 'next/head'

import styles from './home.module.scss'
import Link from 'next/link'

type Article = {
  slug: string
  banner: {
    url: string
  }
  title: string
  subtitle: string
  publicatedAt: string
}

interface HomeProps {
  latestArticle: Article
  panelArticles: Article[]
  highlightArticle: Article
}

export default function Home({
  latestArticle,
  panelArticles,
  highlightArticle
}: HomeProps) {
  const { push } = useRouter()

  function redirectToArticles() {
    push('/articles')
    return
  }

  return (
    <>
      <Head>
        <title>Home | Coffee</title>
      </Head>

      <main>
        <section className={styles.headSection}>
          <div className={styles.headSectionContent}>
            <div>
              <h1>
                Make better coffee{' '}
                <img src="/icon-coffee.svg" alt="icon coffee" />
              </h1>
              <p>why learn how to blog?</p>
            </div>

            <img src="/head-ilustration.svg" alt="ilustration" />
          </div>
        </section>

        <section>
          <div className={styles.cardsSectionContent}>
            <Link href={`/articles/${latestArticle.slug}`}>
              <a className={styles.cardLatest}>
                <div className={styles.cardLatestTexts}>
                  <h2>{latestArticle.title}</h2>
                  <p>{latestArticle.subtitle}</p>
                  <div>
                    <time>{latestArticle.publicatedAt}</time>
                  </div>
                </div>

                <img
                  src={latestArticle.banner.url}
                  className={styles.cardLatestImage}
                />
              </a>
            </Link>

            <div className={styles.articlesPanel}>
              {panelArticles.map(article => (
                <Link key={article.slug} href={`/articles/${article.slug}`}>
                  <a className={styles.articleCard}>
                    <img
                      src={article.banner.url}
                      className={styles.articleCardImage}
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
            </div>

            <Link href={`/articles/${highlightArticle.slug}`}>
              <a className={styles.cardHighlight}>
                <div className={styles.cardHighlightTexts}>
                  <h2>{highlightArticle.title}</h2>
                  <p>{highlightArticle.subtitle}</p>
                  <div>
                    <time>{highlightArticle.publicatedAt}</time>
                  </div>
                </div>

                <img
                  src={highlightArticle.banner.url}
                  className={styles.cardHighlightImage}
                />
              </a>
            </Link>

            <div className={styles.btnContainer}>
              <button type="button" onClick={() => redirectToArticles()}>
                See more
                <img src="/arrow-button.svg" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const responseArticles = await client.get({
    predicates: prismic.predicate.at('document.type', 'article'),
    fetch: ['article.title', 'article.subtitle', 'article.banner']
  })

  const formattedArticles = responseArticles.results.map(article => {
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

  const latestArticle = formattedArticles[formattedArticles.length - 1]
  const panelArticles = formattedArticles.slice(0, 3)
  const highlightArticle = formattedArticles[3]

  return {
    props: { latestArticle, panelArticles, highlightArticle }
  }
}
