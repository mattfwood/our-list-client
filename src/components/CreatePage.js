import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { FEED_QUERY } from './FeedPage';

class CreatePage extends Component {
  state = {
    title: '',
    text: '',
  };

  createList = async (e, createList) => {
    e.preventDefault();
    // get title and text from form
    const { title } = this.state;
    // run createList mutation
    await createList({
      variables: { title },
    });
    // redirect to homepage
    // window.location.reload();
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_LIST_MUTATION}
        update={(cache, { data }) => {
          console.log(cache, data);
          // get most recent items from cache
          const { listFeed } = cache.readQuery({ query: FEED_QUERY });
          // update cache and append newest list
          console.log(listFeed, data.createList);
          cache.writeQuery({
            query: FEED_QUERY,
            data: {
              listFeed: [...listFeed, data.createList],
            },
          });
        }}
      >
        {(createList, { data, loading, error }) => {
          return (
            <div className="">
              <form onSubmit={e => this.createList(e, createList)}>
                <h4>Add List</h4>
                <input
                  autoFocus
                  className="pa2 ma2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ title: e.target.value })}
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                />
                <input
                  className={`bn add-list-button ${this.state.title &&
                    'dim pointer'}`}
                  disabled={!this.state.title}
                  type="submit"
                  value="Add"
                />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const CREATE_LIST_MUTATION = gql`
  mutation CreateListMutation($title: String!) {
    createList(title: $title) {
      id
      title
      items {
        id
        text
      }
    }
  }
`;

export default withRouter(CreatePage);
