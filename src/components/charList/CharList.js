import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [charsListEnd, setCharsListEnd] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);

        getAllCharacters(offset)
            .then(getListChar)
    }

    const getListChar = (newChars) => {
        let ended = false;

        if (newChars.length < 9) {
            ended = true;
        }

        setNewCharsLoading(false);
        setOffset(offset => offset + 9);
        setCharsListEnd(ended);
        setChars(chars => [...chars, ...newChars]);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [chars])

    const onScroll = () => {
        const documentHeight = document.documentElement.scrollHeight;
        const scrollHeight = window.pageYOffset + document.documentElement.clientHeight;

        if (offset < 219) return;
        if (newCharsLoading) return;
        if (charsListEnd) {
            window.removeEventListener('scroll', onScroll);
        }

        if (documentHeight === scrollHeight) {
            onRequest(offset, false);
        }
    }

    const refItems = useRef([]);



    const setActiveItem = (id) => {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[id].classList.add('char__item_selected');
    }



    const renderItems = (arr) => {
        return arr.map((char, i) => {
            const { id, name, thumbnail } = char;
            const { onSelectedChar } = props;

            let styleImage = { objectFit: 'cover' };

            if (thumbnail.slice(-23, -4) === 'image_not_available') {
                styleImage = { objectFit: 'contain' };
            }

            return (
                <li className="char__item"
                    key={id} tabIndex="0"
                    ref={el => refItems.current[i] = el}
                    onClick={() => {
                        onSelectedChar(id);
                        setActiveItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            onSelectedChar(id);
                            setActiveItem(i);
                        }
                    }}
                >
                    <img src={thumbnail} style={styleImage} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            )
        });
    }

    const items = renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newCharsLoading ? <Spinner /> : null;

    let charGridStyles = { gridTemplateColumns: 'repeat(3, 200px)' }

    if (spinner) {
        charGridStyles = { gridTemplateColumns: '1fr' }
    }

    return (
        <div className="char__list">
            <ul className="char__grid" style={charGridStyles}>
                {errorMessage}
                {spinner}
                {items}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newCharsLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charsListEnd ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;