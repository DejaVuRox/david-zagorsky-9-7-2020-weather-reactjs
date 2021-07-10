import React, {FC} from 'react';
import {connect} from 'react-redux'
import ForecastItem from "../forecastItem/ForecastItem";
import {v4 as uuidv4} from 'uuid';
import './ForecastList.css'
import {Row} from "../antd/antd";

interface IProps {
    forecasts: IForecast[] | null
}

const ForecastList: FC<IProps> = ({forecasts}) => {

    if (forecasts) {
        const renderedForecast = forecasts.map(forecast =>
            <ForecastItem
                key={uuidv4()}
                date={forecast.Date}
                iconPhrase={forecast.Day.IconPhrase}
                temperatureMaxUnits={forecast.Temperature?.Maximum?.Unit}
                temperatureMaxValue={forecast.Temperature?.Maximum?.Value}
                temperatureMinUnits={forecast.Temperature?.Minimum?.Unit}
                temperatureMinValue={forecast.Temperature?.Minimum?.Value}
            />
        )

        return (
            <div>
                <Row className={'forecastContainer'}>
                    {renderedForecast}
                </Row>
            </div>
        )
    }


    return (
        <div>
            <span>loading</span>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    forecasts: state.weather.forecastWeather,
})

export default connect(mapStateToProps)(ForecastList)
