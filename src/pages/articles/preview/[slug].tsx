import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { client } from '../../../services/prismic'
import * as prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import styles from '../article.module.scss'

interface ArticlePreviewProps {
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

export default function ArticlePreview({ article }: ArticlePreviewProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push(`/articles/${article.slug}`)
    }
  }, [session])

  if (status === 'loading') {
    return <h1>Carregando...</h1>
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
            <div className={`${styles.bodyContent} ${styles.previewContent}`}>
              <h2>{article.content[0]?.heading}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(article.content[0]?.body)
                }}
              ></p>
            </div>
          </div>

          <div
            className={styles.continueReading}
            onClick={() => signIn('google')}
          >
            Quer continuar lendo?
            <span>Faça Login </span>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
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
    },
    revalidate: 60 * 30 // 30 minutes
  }
}
