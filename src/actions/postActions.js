import axios from 'axios';

export const FETCH_POST_STARTED = "FETCH_POST_STARTED";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILED = "FETCH_POST_FAILED";

//const UNSPLASH_API = "https://api.unsplash.com/";
const HAIRCARE_API = "https://haircare.herokuapp.com/api/";

export const fetchPosts = () => dispatch => {
    dispatch({ type: FETCH_POST_STARTED });

    axios
        .get(
            // `${UNSPLASH_API}photos/random/?query=hair&&count=100&&client_id=${
            //     process.env.REACT_APP_UNSPLASH_ACCESS_KEY
            //     }`
            `${HAIRCARE_API}posts`
        )
        .then(res => {
            console.table(res.data);

            const postData = res.data.map(post => {
                return {
                    id: post.id,
                    //username: post.user.username,
                    imageUrl: post.image,
                    //likes: post.likes,
                    description: post.description
                }
            });
            dispatch({
                type: FETCH_POST_SUCCESS,
                payload: postData
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_POST_FAILED,
                payload: err
            })
            console.log(err);
        });

}
