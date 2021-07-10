import {Dispatch} from "redux";
import {errorNotification} from "../../utils/notification";

const API_KEY = 'GbIbOZeumYdlRO2UAhzLwF7kV4Yy7BcG'
export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER'
export const GET_FORECAST = 'GET_FORECAST'
export const GET_AUTO_COMPLETE = 'GET_AUTO_COMPLETE'
export const SEARCH_CITY = 'SEARCH_CITY'
export const SET_TEMP_UNIT = 'SET_TEMP_UNIT'

export const getCurrentDefaultCity = async (): Promise<ICurrentCityData | null> => {
    //Tel-Aviv default
    let latitude = '32.109333';
    let longitude = '34.855499';

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude.toString()
            longitude = position.coords.longitude.toString()
        });
    }

    try {
        const locationData = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${latitude},${longitude}&apikey=${API_KEY}`)

        if (!locationData.ok) {
            throw new Error(await locationData.json())
        }

        const resData = await locationData.json()
        return {
            locationKey: resData.Key.toString(),
            cityName: resData.AdministrativeArea.EnglishName.toString(),
        }

    } catch (e) {
        errorNotification(e.message)
        return null
    }
}

export const getCurrentCityWeather = () => async (dispatch: Dispatch, getState: any) => {
    const currentCityData = getState().weather.currentCity
    try {
        const currentCity = currentCityData ? currentCityData : await getCurrentDefaultCity()
        const weatherData = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${currentCity?.locationKey}?apikey=${API_KEY}`)

        if (!weatherData.ok) {
            throw new Error(await weatherData.json())
        }

        const resData = await weatherData.json()

        dispatch({
            type: GET_CURRENT_WEATHER,
            payload: {weatherData: resData, currentCity}
        })
    } catch (e) {
        errorNotification(e.message)
    }
}

export const getCurrentCityWeatherForecast = (isMetric: boolean) => async (dispatch: Dispatch, getState: any) => {
    const currentCityData = getState().weather.currentCity
    try {
        const currentCity = currentCityData ? currentCityData : await getCurrentDefaultCity()
        const weatherData = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity?.locationKey}?apikey=${API_KEY}&metric=${isMetric}`)

        if (!weatherData.ok) {
            throw new Error(await weatherData.json())
        }

        const resData = await weatherData.json()

        dispatch({
            type: GET_FORECAST,
            payload: {forecasts: resData, isMetric}
        })
    } catch (e) {
        errorNotification(e.message)
    }
}

export const getAutoComplete = (input: string) => async (dispatch: Dispatch) => {

    //at least 3 chars
    if (input.length < 3) {
        return
    }

    try {
        const getAutoComplete = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${input}`)
        if (!getAutoComplete.ok) {
            throw new Error(await getAutoComplete.json())
        }

        const resData = await getAutoComplete.json()

        dispatch({
            type: GET_AUTO_COMPLETE,
            payload: {autoComplete: resData, searchValue: input}
        })

    } catch (e) {
        errorNotification(e.message)
    }
}

export const searchCity = (input: string) => async (dispatch: Dispatch) => {
    try {
        const cityData = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?q=${input}&apikey=${API_KEY}`)

        if (!cityData.ok) {
            throw new Error(await cityData.json())
        }

        const resData = await cityData.json()

        const currentCity: ICurrentCityData = {
            locationKey: resData[0].Key.toString(),
            cityName: resData[0].EnglishName.toString(),
        }

        dispatch({
            type: SEARCH_CITY,
            payload: {currentCity, searchValue: input}
        })
    } catch (e) {
        errorNotification(e.message)
    }
}

export const setTempUnit = (isMetric: boolean) => ({
    type: SET_TEMP_UNIT,
    payload: isMetric
})
