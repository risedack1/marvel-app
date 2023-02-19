import './charList.scss';

import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.marvelServices
            .getAllCharacters()
            .then(this.getListChar)
            .catch(error => {
                console.log(error);
                this.onError();
            })
    }

    marvelServices = new MarvelServices();

    getListChar = (chars) => {
        this.setState({
            chars,
            loading: false,
        });
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
        const { chars, error, loading } = this.state;

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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;