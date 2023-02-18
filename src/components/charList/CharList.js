import './charList.scss';

import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';

class CharList extends Component {
    state = {
        chars: [],
    }

    componentDidMount() {
        this.loadList();
    }

    marvelServices = new MarvelServices();

    getListChar = (arr) => {
        this.setState({
            chars: arr.map(char => {
                const { id, name, thumbnail } = char;


                return (
                    <li className="char__item" key={id}>
                        <img src={thumbnail} alt={name} />
                        <div className="char__name">{name}</div>
                    </li>
                )
            })
        });
    }

    loadList = () => {
        this.marvelServices.getAllCharacters()
            .then(res => {
                console.log(res);
                this.getListChar(res)
            });
    }

    render() {
        const { chars } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {chars}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;