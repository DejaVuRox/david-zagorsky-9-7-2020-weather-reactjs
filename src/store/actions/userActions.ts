export const SAVE_TO_FAVORITES = 'SAVE_TO_FAVORITES'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'
export const RESET_CHECKBOX = 'RESET_CHECKBOX'

export const saveToFavorites = (favorite: IFavorite, saved: boolean) => {
    return {
        type: SAVE_TO_FAVORITES,
        payload: {favorite, saved}
    }
}

export const removeFromFavorites = (cityName: string, saved: boolean) => {
    return {
        type: REMOVE_FROM_FAVORITES,
        payload: {cityName, saved}
    }
}

export const resetCheckbox = () => ({
    type: RESET_CHECKBOX,
})


