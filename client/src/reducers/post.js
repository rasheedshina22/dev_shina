import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        //put the lastest post inside the posts array and copy in the current posts
        posts: [payload, ...state.posts],
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        // return all posts except the one with that id
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    //dont really understand this functunality
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          //this is a conditional return
          //check if the current post you are looping through is equal to the post id passed to the payload
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        //post is an object
        post: { ...state.post, comments: payload },
        loading: false,
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            //return all comments except the one with the payload(commentId)
            (comment) => comment._id !== payload
          ),
        },

        loading: false,
      };

    default:
      return state;
  }
}
