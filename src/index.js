import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
import MarvelServices from './services/MarvelServices';

const marvelServices = new MarvelServices();

marvelServices.getAllCharacters()
  .then(({ data }) => data.results
    .forEach(character => console.log(character.name)));

marvelServices.getCharacter(1011196)
  .then(({ data }) => console.log('Character is ' + data.results[0].name));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

