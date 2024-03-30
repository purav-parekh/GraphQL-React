import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";

function LyricsList(props) {
  const song = props.song;

  const onLike = (id, likes) => {
    props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };

  return (
    <ul className="collection">
      {song.lyrics.map(({ id, content, likes }) => {
        return (
          <li key={id} className="collection-item">
            {content}
            <span className="like-box">
              <i className="material-icons" onClick={() => onLike(id, likes)}>
                thumb_up
              </i>
              {likes}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricsList);
