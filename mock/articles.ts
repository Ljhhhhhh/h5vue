import faker from 'faker'
import { Response, Request } from 'express'
import { IArticleData } from '../src/api/types'

const articleList: IArticleData[] = []
const articleCount = 30
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const imageUri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
faker.locale = 'zh_CN'

for (let i = 0; i < articleCount; i++) {
  articleList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'deleted']),
    title: faker.name.title(),
    abstractContent: faker.lorem.sentences(2),
    fullContent: mockFullContent,
    sourceURL: faker.internet.url(),
    imageURL: imageUri, // faker.image.imageUrl(),
    timestamp: faker.date.past().getTime(),
    platforms: [faker.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
    disableComment: faker.random.boolean(),
    importance: faker.random.number({ min: 1, max: 3}),
    author: faker.name.lastName(),
    reviewer: faker.name.findName(),
    type: faker.random.arrayElement(['CN', 'US', 'JP', 'EU']),
    pageviews: faker.random.number({ min: 300, max: 500 })
  })
}

export const getArticles = (req: Request, res: Response) => {
  const { page = 1, pageSize = 20, sort } = req.query

  let mockList = articleList

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getArticle = (req: Request, res: Response) => {
  const { id } = req.params
  for (const article of articleList) {
    if (article.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          article
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const createArticle = (req: Request, res: Response) => {
  const { article } = req.body
  return res.json({
    code: 20000,
    data: {
      article
    }
  })
}

export const updateArticle = (req: Request, res: Response) => {
  const { id } = req.params
  const { article } = req.body
  for (const v of articleList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          article
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const deleteArticle = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
}

export const getPageviews = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      pageviews: [
        { key: 'PC', pageviews: 1024 },
        { key: 'Mobile', pageviews: 1024 },
        { key: 'iOS', pageviews: 1024 },
        { key: 'Android', pageviews: 1024 }
      ]
    }
  })
}
