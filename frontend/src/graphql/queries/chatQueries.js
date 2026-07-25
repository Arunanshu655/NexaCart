import { gql } from "@apollo/client";

export const GET_CHAT = gql`
query GetChat($chatId: ID!) {

  chat(chatId: $chatId) {

    id

    messages {

      sender {
        id
        name
      }

      text

      createdAt

    }

  }

}
`;