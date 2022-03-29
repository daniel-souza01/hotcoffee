import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../services/api'

type Article = {
  uid: string
  first_publication_date: string
  data: {
    title: string
    subtitle: string
    banner: {
      url: string
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const { nextPagesUrl } = req.query

    return await api
      .get(`${nextPagesUrl}`, {
        params: {
          access_token: process.env.PRISMIC_ACCESS_TOKEN
        }
      })
      .then(response => {
        const next_page = response.data.next_page
        const formattedData = response.data.results.map((article: Article) => {
          return {
            slug: article.uid,
            banner: article.data.banner,
            title: article.data.title,
            subtitle: article.data.subtitle,
            publicatedAt: new Date(
              article.first_publication_date
            ).toLocaleDateString('pt-br', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })
          }
        })

        return res.json({
          formattedData,
          next_page
        })
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}
