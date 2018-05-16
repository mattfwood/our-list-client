import React, { Component, Fragment } from 'react';
import Post from '../components/Post';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            );
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            );
          }

          console.log(data);

          return (
            <Fragment>
              <h1>Feed</h1>
              {data.listFeed &&
                data.listFeed.map(list => (
                  <Fragment>
                    <div>{list.title}</div>
                    {list.items.map(item => <div>{item.text}</div>)}
                  </Fragment>
                ))}
              {this.props.children}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

// export const FEED_QUERY = gql`
//   query FeedQuery {
//     feed {
//       id
//       text
//       title
//       isPublished
//     }
//   }
// `

export const FEED_QUERY = gql`
  query FeedQuery {
    listFeed {
      title
      items {
        text
      }
    }
  }
`;
