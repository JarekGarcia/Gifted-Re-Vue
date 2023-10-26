import { AppState } from "../AppState"
import { Gift } from "../models/Gift"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GiftsService {

    async getGifts() {
        const res = await api.get('api/gifts')

        const gifts = res.data.map(giftPojo => new Gift(giftPojo))
        AppState.gifts = gifts
        logger.log(AppState.gifts)
    }
}

export const giftsService = new GiftsService()