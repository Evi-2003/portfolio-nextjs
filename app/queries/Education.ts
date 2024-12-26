import { gql } from 'urql';

export const EDUCATION_QUERY = gql`
  query Education {
    allEducations {
      id
      position
      school
      startdatum
      study
      einddatum
    }
  }
`;
