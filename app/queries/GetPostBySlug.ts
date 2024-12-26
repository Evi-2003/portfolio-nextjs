import { graphql } from 'gql.tada';

export const GET_POST_BY_SLUG = graphql(`
  query getPostBySlug($slug: String!) {
    blog(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      content
    }
  }
`);
