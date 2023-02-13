class MarvelServices {
    _apiBase = process.env.REACT_APP_API_BASE;
    _apiKey = process.env.REACT_APP_API_KEY;

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    }
}

export default MarvelServices;