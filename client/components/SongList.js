import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";

const SongList = (props) => {
  const songs = props.data.songs;

  const onSongDelete = (id) => {
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
  };

  const getSongs = (songs) => {
    return songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons delete" onClick={() => onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  };

  return props.data.loading ? (
    <div>SongList</div>
  ) : (
    <div>
      <h1>SongList</h1>
      <ul className="collection">{getSongs(songs)}</ul>
      <Link to="/songs/new" className="btn-floating btn-large green right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
export default graphql(mutation)(graphql(query)(SongList));
