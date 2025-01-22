//------------------------------------
// This file contains all of the functions of posts from the server
//------------------------------------

import apiClient,{CanceledError} from "./api-client"; 
import { Post} from '../data/PostsTest';

export {CanceledError} ;

const getAllPosts = async (): Promise<Post[]> => {
    const abortController= new AbortController(); // create an AbortController object to cancel the fetch request
    const request=  apiClient.get<Post[]>("/posts", {signal:abortController.signal}) // send a get request to the server to get the posts
    return {request,abort: ()=>abortController.abort()} // return the request and the abort function
}

export default { getAllPosts }