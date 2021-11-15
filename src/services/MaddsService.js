import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class MaddsService{
    constructor() {
        
    }

    async getMadd() {
        const res = await api.get('api/ads')
        logger.log('adds here', res.data)
        AppState.madds = res.data
        //AppState.madds = res.data.banner
    }
}

export const maddsService = new MaddsService()