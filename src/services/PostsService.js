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

    async getById(id) {
        const res = await api.get('api/posts/' + id)
        logger.log(res.data)
        AppState.activePost = res.data
    }

    async create(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('Post data', res.data.posts)
        AppState.posts.unshift(res.data.posts)
    }

    async remove(post) {
        //debugger
        const res = await api.delete('api/posts/' + AppState.posts.id)
        AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
        //AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
        AppState.posts = res.data.posts
        //AppState.activePost.splice(res.data.id)
        //AppState.activePost.posts =  AppState.activePost.posts.filter(p => p.id !== post.id)
    }

    setActive(post) {
        AppState.activePost = post
    }
    
    async getAllLikes() {
        const res = await api.get('api/posts' + query);
        AppState.posts.likeIds = AppState.posts.likeIds.filter(p => p.id)
        // AppState.posts.likeIds.forEach(AppState.posts.likeIds{
        //     AppState.posts.likeIds++
        // })
        //math here to count all the numbers in the array of likes
        //arr.length
        
    }
}

export const postsService = new PostsService()