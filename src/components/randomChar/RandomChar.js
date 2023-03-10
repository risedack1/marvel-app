import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.getRandomChar();
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false,
        });
    }

    onCharLoading = () => {
        this.setState({
            error: false,
            loading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    marvelServices = new MarvelServices();

    getRandomChar = () => {
        const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011100)

        this.onCharLoading();
        this.marvelServices
            .getCharacter(randomId)
            .then(this.onCharLoaded)
            .catch(error => {
                this.onError();
                console.log(error);
            })
    }

    render() {
        let { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.getRandomChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = (props) => {
    let { name, description, thumbnail, homepage, wiki } = props.char;

    let styleImage = { objectFit: 'cover' };

    if (thumbnail.slice(-23, -4) === 'image_not_available') {
        styleImage = { objectFit: 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={styleImage} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;