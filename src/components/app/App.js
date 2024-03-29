// здесь мы используем as что бы переименовать имя функции по-умолчанию
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
// прием который используется для того что бы компоновать множество страниц компонентов в одном файле, в папке pages мы создаем файлы со всеми страницами и главный файл index, и вноге инпортируем все страницы и за него ввиде обьекта экспортируем их, при ипорте в другой компонент в таком случае в пути можно прописать только название папки и не дописывать index
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages";

const App = () => {
    return (
        // компонент Reouter нужен для того что бы работали все ссылки и все страницы на которые будут ссылаться эти ссылки внутри одного компонента
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        {/* route будет грузится если в url адрессе появится соответствующая ему ссылка */}
                        {/* пути по которым будут грузится компоненты */}
                        <Route path="/comics" element={<ComicsPage />} />
                        {/* артибут exact нужен для того что бы правильно загружались страницы, он говорит компоненту, что нужно сразвнивать url полностью, а не по частям как это сделанно по-умолчанию */}
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        {/* Данная конструкция path="*" используется в том случае когда в url пути у нас находится неизвестный адресс */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;