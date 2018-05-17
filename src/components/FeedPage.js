import React, { Component, Fragment } from 'react';
import Post from '../components/Post';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import CreatePage from './CreatePage';
import ListPreview from './ListPreview';
import { Grid, Row, Col } from 'react-flexbox-grid';
import posed from 'react-pose';

const sidebarProps = {
  open: {
    // x: '0%',
    // delayChildren: 300,
    staggerChildren: 50,
    // delay: 300,
    opacity: 1,
  },
  closed: {
    // delay: 500,
    staggerChildren: 20,
    // x: '-100%',
    opacity: 0,
  },
};

const itemProps = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 20 },
};

const ListWrapper = posed.div(sidebarProps);
const PosedListPreview = posed(ListPreview)(itemProps);

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ data, loading, error, refetch }) => {
          // if (loading) {
          //   return (
          //     <div className="flex w-100 h-100 items-center justify-center pt7">
          //       <div>Loading ...</div>
          //     </div>
          //   );
          // }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occurred.</div>
              </div>
            );
          }

          const lists = data.listFeed ? data.listFeed : [];

          return (
            <Grid>
              <Row>
                <Col md={8} mdOffset={2} xs={12}>
                  {/* <h1>Lists</h1> */}
                  <CreatePage />
                  <ListWrapper
                    className="row"
                    pose={!loading ? 'open' : 'closed'}
                  >
                    {lists.map((list, index) => (
                      <PosedListPreview list={list} index={index} />
                      // <ListPreview list={list} index={index} />
                    ))}
                  </ListWrapper>
                </Col>
              </Row>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
    listFeed {
      id
      title
      createdAt
      items {
        text
      }
    }
  }
`;
