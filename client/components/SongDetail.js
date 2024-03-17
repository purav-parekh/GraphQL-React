import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import CreateLyrics from "./CreateLyrics";

function SongDetail(props) {
  const { song } = props.data;
  if (!song) {
    return <div>Loading..</div>;
  }

  console.log(song);

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <h5>Lyrics</h5>
        <ul className="collection">
          {song.lyrics.map(({ id, content }) => {
            return (
              <li key={id} className="collection-item">
                {content}
              </li>
            );
          })}
        </ul>
      </div>
      <CreateLyrics songId={props.params.id} />
      <br />
    </div>
  );
}

const query = gql`
  query fetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        content
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
