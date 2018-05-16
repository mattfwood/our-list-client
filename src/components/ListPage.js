import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { DRAFTS_QUERY } from './DraftsPage';
import { FEED_QUERY } from './FeedPage';

class DetailPage extends Component {
  state = {
    newItemText: '',
  };

  createItem = async (e, createItem) => {
    e.preventDefault();

    const { newItemText } = this.state;
    const listId = this.props.match.params.id;

    console.log(this.props);
    try {
      await createItem({
        variables: {
          listId: listId,
          text: newItemText,
        }
      })
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }

  render() {
    return (
      <Query query={LIST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
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

          const { list } = data;
          const action = this._renderAction(list);
          return (
            <Grid>
              <Row>
                <Col md={6} mdOffset={3} xs={12}>
                  <h1>{list.title}</h1>
                  <div className="list-item-container">
                    {list.items.map(item => (
                      <div className="list-item">{item.text}</div>
                    ))}
                  </div>
                  <Mutation
                    mutation={CREATE_ITEM_MUTATION}
                    update={(cache, { data }) => {
                      console.log(cache, data);

                      // get current list from query
                      const { list } = cache.readQuery({ query: LIST_QUERY });

                      // add current item to items array
                      list.items.push(data.createItem)

                      // write update query to cache
                      cache.writeQuery({
                        query: LIST_QUERY,
                        data: {
                          list
                        }
                      })
                    }}
                  >
                    {(createItem, other) => {
                      console.log(createItem, other);
                      return (
                        <form className="new-list-item" onSubmit={e => this.createItem(e, createItem)}>
                          <input
                            type="text"
                            value={this.state.newItemText}
                            className="pa2 mv2 br2 b--black-20 bw1 w-100"
                            placeholder="Add Item"
                            onChange={input =>
                              this.setState({ newItemText: input.target.value })
                            }
                          />
                          <input className="bn add-list-button " disabled={!this.state.newItemText} type="submit" value="Add" />
                        </form>
                      )
                    }}
                  </Mutation>
                  {action}
                </Col>
              </Row>
            </Grid>
          );
        }}
      </Query>
    );
  }

  _renderAction = ({ id }) => {
    const deleteMutation = (
      <Mutation
        mutation={DELETE_MUTATION}
        update={(cache, { data }) => {
          const { feed } = cache.readQuery({ query: FEED_QUERY });
          cache.writeQuery({
            query: FEED_QUERY,
            data: {
              listFeed: feed.filter(list => list.id !== data.deleteList.id),
            },
          });
        }}
      >
        {(deleteList, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deleteList({
                  variables: { id },
                });
                this.props.history.replace('/');
              }}
            >
              Delete
            </a>
          );
        }}
      </Mutation>
    );
    return deleteMutation;
  };
}

const LIST_QUERY = gql`
  query ListQuery($id: ID!) {
    list(id: $id) {
      id
      title
      items {
        id
        text
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: ID!) {
    deleteList(id: $id) {
      id
    }
  }
`;

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($listId: ID!, $text: String!) {
    createItem(listId: $listId, text: $text) {
      id
      text
    }
  }
`

export default withRouter(DetailPage);
