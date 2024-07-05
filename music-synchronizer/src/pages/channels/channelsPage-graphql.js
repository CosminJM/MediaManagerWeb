import gql from "graphql-tag";
export const PaginatedChannelsQuery = gql`
  query PaginatedChannels($first: Int!, $after: String, $before: String) {
    paginatedChannels(first: $first, after: $after, before: $before) {
      edges {
        cursor
        node {
          channelId
          channelIdentificator
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const AddChannelMutation = gql`
  mutation AddChannel($channelForCreationDto: ChannelForCreationDtoInput!) {
    addChannel(channelForCreationDto: $channelForCreationDto) {
      data {
        channelIdentificator
        name
        channelId
      }
      error
    }
  }
`;

export const DeleteChannelMutation = gql`
  mutation DeleteChannel($channelId: String!) {
    deleteChannel(channelId: $channelId) {
      error
    }
  }
`;

export const UpdateChannelMutation = gql`
  mutation UpdateChannel($channelForUpdateDto: ChannelForUpdateDtoInput!) {
    updateChannel(channelForUpdateDto: $channelForUpdateDto) {
      error
      data {
        channelId
        channelIdentificator
        name
      }
    }
  }
`;
