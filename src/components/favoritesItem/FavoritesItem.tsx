import React, {FC} from 'react';
import {connect} from "react-redux";
import {Button, Card, Row} from '../antd/antd'
import {searchCity} from "../../store/actions/weatherActions";
import {NavLink} from 'react-router-dom';
import {removeFromFavorites} from "../../store/actions/userActions";


interface IProps {
    searchCity: (input: string) => void
    removeFromFavorites: (cityName: string, saved: boolean) => void
}

const FavoriteItem: FC<IFavorite & IProps> = ({
                                                  cityName,
                                                  temperature,
                                                  weatherDescription,
                                                  searchCity,
                                                  removeFromFavorites
                                              }) => {

    const handleSelectedFavorite = () => {
        if (cityName.length > 0) {
            searchCity(cityName)
        }
    }

    const handleRemoveFavorite = () => {
        if (cityName.length > 0) {
            removeFromFavorites(cityName, false)
        }
    }

    return (
        <div className={'favoriteItem'}>
            <Card title={cityName} headStyle={{textAlign: 'center'}} bodyStyle={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <span>{weatherDescription}</span>
                <span>{temperature}</span>
                <Row>
                    <NavLink to={'/'}>
                        <Button
                            style={{marginRight: 10}}
                            type={'primary'}
                            onClick={handleSelectedFavorite}>
                            Forecast
                        </Button>
                    </NavLink>
                    <Button onClick={handleRemoveFavorite}>Remove</Button>
                </Row>
            </Card>
        </div>
    )
}

export default connect(null, {searchCity, removeFromFavorites})(FavoriteItem)
