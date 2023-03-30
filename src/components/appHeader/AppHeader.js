import { Link, NavLink } from "react-router-dom";
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                {/* компонент Link используем вместо  тега a, вместо href используем атрибут to */}
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* компонент NavLink отличается от Link тем, что ему можно дать активную ссылку */}
                    {/* атрибут exact нужен для того, что бы так же происходило строгое сравнение пути в to, иначе обе ссылки у нас подут подсвечиваться как активные, поскалько пусти у них совпадают */}
                    <li><NavLink exact activeStyle={{ 'color': '#9f0013' }} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{ 'color': '#9f0013' }} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;