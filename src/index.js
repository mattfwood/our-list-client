import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import { createHttpLink } from 'apollo-link-http';
// import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';

import FeedPage from './components/FeedPage';
import DraftsPage from './components/DraftsPage';
import CreatePage from './components/CreatePage';
import ListPage from './components/ListPage';

import 'tachyons';
import './index.css';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';

const uri = window.location.href.includes('localhost')
  ? 'http://localhost:4000'
  : 'https://our-list-server.herokuapp.com/';

const httpLink = createHttpLink({ uri });

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  });
  return forward(operation);
});

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink);

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//     },
//   },
// });

// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLinkAuth
// );

// apollo client setup
const client = new ApolloClient({
  link: httpLinkAuth,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// const client = new ApolloClient({
//   uri,
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav className="pa3">
          <Link
            className="link dim black b f6 f5-ns dib mr3"
            to="/"
            title="Feed"
          >
            Our List
          </Link>
          {/* <Link
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link> */}
        </nav>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            {/* <Route path="/drafts" component={DraftsPage} /> */}
            <Route path="/create" component={CreatePage} />
            <Route path="/list/:id" component={ListPage} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
