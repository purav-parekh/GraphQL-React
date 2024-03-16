import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";

const SongList = (props) => {
  const songs = props.data.songs;

  const getSongs = (songs) => {
    return songs.map((song) => (
      <li className="collection-item" key={song.id}>
        {song.title}
      </li>
    ));
  };

  return props.data.loading ? (
    <div>SongList</div>
  ) : (
    <div>
      <h1>SongList</h1>
      <ul className="collection">{getSongs(songs)}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default graphql(query)(SongList);
