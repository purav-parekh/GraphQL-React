import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

export class CreateLyrics extends Component {
  constructor(props) {
    super(props);

    this.state = { content: "" };
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId },
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <div>
        <h5>Add Lyric</h5>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            placeholder="Add new lyric"
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          ></input>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addLyrics($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(CreateLyrics);
