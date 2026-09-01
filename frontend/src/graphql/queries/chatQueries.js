import { gql } from "@apollo/client";

export const GET_MY_CHATS = gql`
  query MyChats {
    myChats {
      id

      users {
        id
        name
        email
      }

      messages {
        id
        text
        sender {
          id
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_CHAT = gql`
  query Chat($chatId: ID!) {
    chat(chatId: $chatId) {
      id

      users {
        id
        name
        email
      }

      messages {
        id
        text
        sender {
          id
          name
        }
        createdAt
      }
    }
  }
`;