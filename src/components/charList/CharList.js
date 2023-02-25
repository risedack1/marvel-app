import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';
import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        offset: 210,
        newCharsLoading: false,
        charsListEnd: false,
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.onRequest();

        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onRequest = (offset) => {
        this.onLoadingNewItems();
        this.marvelServices
            .getAllCharacters(offset)
            .then(this.getListChar)
            .catch(error => {
                console.log(error);
                this.onError();
            })
    }

    onScroll = () => {
        const documentHeight = document.documentElement.scrollHeight;
        const scrollHeight = window.pageYOffset + document.documentElement.clientHeight;

        if (this.state.offset < 219) return;
        if (this.state.newCharsLoading) return;
        if (this.state.charsListEnd) {
            window.removeEventListener('scroll', this.onScroll);
        }

        if (documentHeight === scrollHeight) {
            this.onRequest(this.state.offset);
        }
    }

    getListChar = (newChars) => {
        let ended = false;

        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({ chars, offset }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newCharsLoading: false,
            offset: offset + 9,
            charsListEnd: ended,
        }));
    }

    onLoadingNewItems = () => {
        this.setState({
            newCharsLoading: true,
        })
    }

    renderItems = (arr) => {
        return arr.map(char => {
            const { id, name, thumbnail } = char;
            const { onSelectedChar } = this.props;

            let styleImage = { objectFit: 'cover' };

            if (thumbnail.slice(-23, -4) === 'image_not_available') {
                styleImage = { objectFit: 'contain' };
            }

            return (
                <li className="char__item" key={id} onClick={() => onSelectedChar(id)}>
                    <img src={thumbnail} style={styleImage} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            )
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    render() {
        const { chars, error, loading, offset, newCharsLoading, charsListEnd } = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        let charGridStyles = { gridTemplateColumns: 'repeat(3, 200px)' }

        if (spinner) {
            charGridStyles = { gridTemplateColumns: '1fr' }
        }

        return (
            <div className="char__list">
                <ul className="char__grid" style={charGridStyles}>
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newCharsLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charsListEnd ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;