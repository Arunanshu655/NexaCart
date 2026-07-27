import { gql } from "@apollo/client";

export const GET_ME = gql`
  query q9{
    me {
      id,
      name,
      email,
      role
    }
  }
`;