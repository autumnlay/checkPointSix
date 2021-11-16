import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { postsService } from "./PostsService"



class ProfilesService{
  async getProfile(id){
    const res = await api.get('api/profiles/'+ id)
    logger.log('profile ', res.data)
    AppState.profile = res.data
  }
  
  async getAllProfiles(pQuery = ""){
      const res = await api.get('api/cars' + pQuery)
      AppState.profile = res.data
    }

    async editProfile(profile) {
        const res = await api.put('api/profile/' + profile.id, profile)
        logger.log(res.data)
        AppState.activePost = res.data
        const index = AppState.profile.findIndex(p => p.id ===profile.id)
        if (index === -1) {
            AppState.profile.push(res.data)
            return
        }
        AppState.profile.splice(index, 1, res.data)
    }

}
    
export const profilesService = new ProfilesService()
