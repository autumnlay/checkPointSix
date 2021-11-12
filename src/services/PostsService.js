import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
    constructor() {
     
    }
    async getAll(query = '') {
        const res = await api.get('api/posts' + query)
        logger.log('all the posts', res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
        AppState.totalPages = res.data.totalPages
    }

    async create(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('Post data', res.data.posts)
        AppState.posts.unshift(res.data.posts)
    }

    // setActive(post) {
    //     AppState.activePost = post
    // }
}

export const postsService = new PostsService()