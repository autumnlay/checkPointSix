import { AppState } from "../AppState"

class MaddsService{
    constructor() {
        
    }

    async getMadd() {
        const res = await api.get('api/ads')
        logger.log('adds here', res.data)
        AppState.madds = res.data.banner
    }
}

export const maddsService = new MaddsService()