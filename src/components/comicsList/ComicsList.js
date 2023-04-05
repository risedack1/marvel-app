import './comicsList.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [loadingNewComics, setLoadingNewComics] = useState(false);
    const { loading, error, getAllComics, clearError } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();
        setLoadingNewComics(true);
        getAllComics(offset)
            .then(getComicsList);
    }

    const getComicsList = (newComicsList) => {
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);

        if (newComicsList.length === 8) {
            setLoadingNewComics(false);
        }
    }

    const list = comicsList.map((comics, i) => {
        return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${comics.id}`}>
                    <img src={comics.thumbnail} alt={comics.title} className="comics__item-img" />
                    <div className="comics__item-name">{comics.title}</div>
                    <div className="comics__item-price">{comics.price}</div>
                </Link>

            </li>
        )
    })

    const spinner = loading && !comicsList.length ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    console.log('comics list');

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {list}
            </ul>
            <button onClick={onRequest} className="button button__main button__long" disabled={loadingNewComics}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;