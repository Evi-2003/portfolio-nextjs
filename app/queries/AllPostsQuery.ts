import { graphql } from 'gql.tada';

export const ALL_POSTS_QUERY = graphql(`
  query getAllBlogs {
    allBlogs {
      title
      slug
      id
      content(markdown: false)
      _publishedAt
    }
  }
`);
