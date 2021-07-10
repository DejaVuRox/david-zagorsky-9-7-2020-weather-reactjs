import React, {FC} from 'react';
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid';
import {Row} from "../antd/antd";
import FavoriteItem from "../favoritesItem/FavoritesItem";
import './FavoritesList.css'

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
                <Row className={'favoriteContainer'}>
                    {renderedFavorites}
                </Row>
            </div>
        )
    }


    return (
        <div>
            <span>no favorites...</span>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    favorites: state.user.favorites,
})

export default connect(mapStateToProps)(FavoriteList)
