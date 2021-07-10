import React, {FC} from 'react';
import Search from "../../components/search/Search";
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import {
    getCurrentCityWeather,
    getCurrentCityWeatherForecast,
} from "../../store/actions/weatherActions";
import ForecastList from "../../components/forecastList/ForecastList";
import CurrentCity from "../../components/currentCity/CurrentCity";
import {Button} from "../../components/antd/antd";
import './Home.css'

interface IProps {
    getCurrentCityWeather: () => void
    getCurrentCityWeatherForecast: (isMetric: boolean) => void
    isMetric: boolean
    currentCityData: ICurrentCityData
}

const Home: FC<IProps> = ({getCurrentCityWeather, getCurrentCityWeatherForecast, isMetric, currentCityData}) => {

    // useEffect(() => {
    //     getCurrentCityWeather()
    //     getCurrentCityWeatherForecast(isMetric)
    // }, [currentCityData?.cityName, isMetric]);

    return (
        <div className={'homeContainer'}>
            <div className={'controlContainer'}>
                <Search/>
                <NavLink to={'/favorites'}>
                    <Button size={'large'} style={{marginBottom: 33}}>
                        Favorites
                    </Button>
                </NavLink>
            </div>
            <div>
                <CurrentCity/>
                <ForecastList/>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    isMetric: state.weather.isMetric,
    currentCityData: state.weather.currentCity
})


export default connect(mapStateToProps, {getCurrentCityWeather, getCurrentCityWeatherForecast})(Home)
