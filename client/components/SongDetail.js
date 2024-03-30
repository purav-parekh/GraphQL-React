import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSong from "../queries/fetchSong";
import CreateLyrics from "./CreateLyrics";
import LyricsList from "./LyricsList";

function SongDetail(props) {
  const { song } = props.data;
  if (!song) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <h5>Lyrics</h5>
        <LyricsList song={song} />
      </div>
      <CreateLyrics songId={props.params.id} />
      <br />
    </div>
  );
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
