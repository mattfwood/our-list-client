import React, { Component, Fragment } from 'react';
import Post from '../components/Post';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import CreatePage from './CreatePage';
import ListPreview from './ListPreview';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
            <Grid>
              <Row>
                <Col md={8} mdOffset={2} xs={12}>
                  {/* <h1>Lists</h1> */}
                  <CreatePage />
                  <Row>
                    {data.listFeed &&
                      data.listFeed.map((list, index) => (
                        <Col className="box" lg={4} md={6} xs={12}>
                          <ListPreview list={list} index={index} />
                        </Col>
                      ))}
                    {this.props.children}
                  </Row>
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
