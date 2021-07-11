import React, {FC} from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {Button, Col, Row} from "../antd/antd";
import FavoriteItem from "../favoritesItem/FavoritesItem";
import './FavoritesList.css'
import Lottie from "react-lottie";
import hearts from '../../assets/lottie/hold-tight-valentines-day-is-coming.json'


interface IProps {
    favorites: IFavorite[]
}

const FavoriteList: FC<IProps> = ({favorites}) => {

    if (favorites.length > 0) {
        const renderedFavorites = favorites.map(favorite =>
            <FavoriteItem
                key={uuidv4()}
                cityName={favorite.cityName}
                temperature={favorite.temperature}
                weatherDescription={favorite.weatherDescription}
            />
        )

        return (
            <div>
                <NavLink to={'/'}>
                    <Button size={'large'} style={{marginBottom: 33}}>
                        Home
                    </Button>
                </NavLink>
                <Row justify={'center'}>

                    <Col>
                        <Row align={'middle'}>

                            <span style={{fontSize: 32}}>Favorites</span>
                            <Lottie width={250} options={{animationData: hearts}}/>
                        </Row>
                    </Col>
                </Row>
                <Row className={'favoriteContainer'}>
                    {renderedFavorites}
                </Row>
            </div>
        )
    }


    return (
        <div>
            <NavLink to={'/'}>
                <Button size={'large'} style={{marginBottom: 33}}>
                    Home
                </Button>
            </NavLink>
            <span style={{marginLeft: 10}}>no favorites...</span>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    favorites: state.user.favorites,
})

export default connect(mapStateToProps)(FavoriteList)
