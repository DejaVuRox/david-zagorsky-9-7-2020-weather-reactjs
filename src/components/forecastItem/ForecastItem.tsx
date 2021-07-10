import React, {FC} from 'react';
import {Card, Row, Tag} from '../antd/antd'
import Lottie from 'react-lottie';
import sunny from '../../assets/lottie/weather-day-clear-sky.json'
import cloudy from '../../assets/lottie/weather-day-scattered-clouds.json'
import rain from '../../assets/lottie/weather-day-rain.json'
import arrows from '../../assets/lottie/arrow-animation.json'
import './ForecastItem.css'


interface IProps {
    key: string
    date: string
    temperatureMaxValue: number
    temperatureMaxUnits: string
    temperatureMinValue: number
    temperatureMinUnits: string
    iconPhrase: string
}

const ForecastItem: FC<IProps> = ({
                                      date,
                                      temperatureMaxValue,
                                      temperatureMaxUnits,
                                      temperatureMinValue,
                                      temperatureMinUnits,
                                      iconPhrase
                                  }) => {

    const day = new Date(date).toLocaleDateString('en-US', {weekday: 'long'})

    const handleIcon = () => {
        let defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: sunny,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        if (iconPhrase.includes('Showers')) {
            // @ts-ignore
            defaultOptions.animationData = rain
        }

        if (iconPhrase.includes('Cloud')) {
            // @ts-ignore
            defaultOptions.animationData = cloudy
        }

        if (iconPhrase.includes('sunny')) {
            defaultOptions.animationData = sunny
        }


        return defaultOptions
    }

    return (
        <div className={'item'}>
            <Card>
                <span>{day}</span>
                <Lottie isClickToPauseDisabled={true} options={handleIcon()}/>
                <Row>

                    <Tag color={'red'}>{temperatureMaxValue + temperatureMaxUnits}</Tag>
                    <Lottie width={75} isClickToPauseDisabled={true} options={{animationData: arrows}}/>
                    <Tag color={'blue'}>{temperatureMinValue + temperatureMinUnits}</Tag>
                </Row>
            </Card>
        </div>
    )
}

export default ForecastItem
