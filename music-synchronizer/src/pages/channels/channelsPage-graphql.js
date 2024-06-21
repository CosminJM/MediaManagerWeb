import gql from "graphql-tag";
export const ChannelsQuery = gql`
  query {
    channels {
      channelId
      channelIdentificator
      name
    }
  }
`;
