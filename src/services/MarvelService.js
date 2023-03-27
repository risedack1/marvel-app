import { useHttp } from '../hooks/https.hook';

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _apiBase = process.env.REACT_APP_API_BASE;
    const _apiKey = process.env.REACT_APP_API_KEY;
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(char => _transformResponse(char));
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(comics => _transformComicsResponse(comics));
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformResponse(res.data.results[0]);
    }

    const _transformComicsResponse = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'not available',
        }
    }

    const _transformResponse = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 215)}...` : 'Sorry, we don\'t have any data for this character.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics }
}

export default useMarvelService;