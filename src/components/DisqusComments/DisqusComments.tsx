import { DiscussionEmbed } from 'disqus-react'

import styles from './styles.module.scss'

interface DisqusCommentsProps {
  article: {
    slug: string
    title: string
  }
}

export function DisqusComments({ article }: DisqusCommentsProps) {
  const disqusShortname = 'hotcoffee-1'

  const disqusConfig = {
    // url: 'https://your-site-url/post-slug',
    url: `http://localhost:3000/articles/${article.slug}`,
    identifier: article.slug, // Single post id
    title: article.title // Single post title
  }

  return (
    <div className={styles.disqusContainer}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
