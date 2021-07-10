import React, {FC} from 'react';
import {connect} from 'react-redux'
import {Card, Checkbox} from "../antd/antd";
import {removeFromFavorites, saveToFavorites} from "../../store/actions/userActions";


interface IProps {
    currentWeather: IWeatherData[] | null
    currentCity: ICurrentCityData | null
    isMetric: boolean
    saveToFavorites: (favorite: IFavorite, saved: boolean) => void
    removeFromFavorites: (cityName: string, saved: boolean) => void,
    saved: boolean
}

const CurrentCity: FC<IProps> = ({
                                     currentWeather,
                                     isMetric,
                                     currentCity,
                                     saveToFavorites,
                                     removeFromFavorites,
                                     saved
                                 }) => {
    if (currentWeather) {
        const temp = isMetric ? currentWeather[0]?.Temperature?.Metric.Value : currentWeather[0]?.Temperature?.Imperial.Value
        const tempUnits = isMetric ? currentWeather[0]?.Temperature?.Metric.Unit : currentWeather[0]?.Temperature?.Imperial.Unit


        const handleFavorites = (value: any) => {
            const isChecked = value.target.checked
            const city: IFavorite = {
                cityName: currentCity?.cityName || 'City',
                temperature: temp + tempUnits,
                weatherDescription: currentWeather[0].WeatherText
            }
            if (isChecked) {
                saveToFavorites(city, isChecked)
            } else {
                removeFromFavorites(currentCity?.cityName || 'City', isChecked)
            }
        }

        return (
            <div>
                <Card title={currentCity?.cityName || 'City'} bordered={false} style={{width: 300}}>
                    <div>Conditions: {currentWeather[0].WeatherText}</div>
                    <div>Temperature: {temp}{tempUnits}</div>
                    {currentWeather && <Checkbox style={{float: 'right'}} onChange={handleFavorites} checked={saved}>
                        {saved ? 'Saved!' : 'Save'}
                    </Checkbox>}
                </Card>
            </div>
        )
    }
    return (
        <div>
            <div>no data</div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currentWeather: state.weather.currentWeather,
    currentCity: state.weather.currentCity,
    isMetric: state.weather.isMetric,
    saved: state.user.saved
})

export default connect(mapStateToProps, {saveToFavorites, removeFromFavorites})(CurrentCity)
