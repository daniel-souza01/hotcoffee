import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { client } from '../../services/prismic'
import * as prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import styles from './article.module.scss'

interface ArticleProps {
  article: {
    slug: string
    banner: {
      url: string
    }
    title: string
    author: string
    publicatedAt: string
    content: {
      heading: string
      body: {
        text: string
      }[]
    }[]
  }
}

export default function Article({ article }: ArticleProps) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Head>
        <title>{article.title} - HotCoffee</title>
      </Head>

      <main className={styles.articleContainer}>
        <article className={styles.article}>
          <img src={article.banner.url} />
          <h1>{article.title}</h1>
          <div>
            <strong>{article.author}</strong>
            <time>{article.publicatedAt}</time>
            <div className={styles.divider}></div>
          </div>

          <div className={styles.body}>
            {article.content.map(content => (
              <div className={styles.bodyContent}>
                <h2>{content.heading}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body)
                  }}
                ></p>
              </div>
            ))}
          </div>
        </article>

        <img
          src="/to-top.svg"
          alt="back to top button"
          className={styles.backToTopButton}
          onClick={() => scrollToTop()}
        />
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await client.get({
    predicates: prismic.predicate.at('document.type', 'article')
  })

  const paths = articles.results.map(article => {
    return {
      params: { slug: article.uid }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const response = await client.getByUID('article', String(slug), {})

  const article = {
    slug,
    banner: {
      url: response.data.banner.url
    },
    title: response.data.title,
    author: response.data.author,
    publicatedAt: new Date(response.first_publication_date).toLocaleDateString(
      'pt-br',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    ),
    content: response.data.content.map(content => {
      return {
        heading: content.heading,
        body: [...content.body]
      }
    })
  }

  return {
    props: {
      article
    }
  }
}
