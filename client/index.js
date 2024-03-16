import React from "react";
import ReactDOM from "react-dom";

import { IndexRoute, Route, Router, hashHistory } from "react-router";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

import AddSongForm from "./components/AddSongForm";
import App from "./components/App";
import SongList from "./components/SongList";

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={AddSongForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
