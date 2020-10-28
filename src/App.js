import React, {useState} from 'react';
import './App.css';
import {updatePrice, deadline, updateJobTime} from './logic';
import Main from "./Main";
import OrderBox from "./OrderBox";
function App() {
    const [text, updateText] = useState('');
    const [lang, setLang] = useState('');
    const [file, setFile] = useState('text');
    const price = updatePrice (text.length, lang, file).toFixed(2).toString().replace('.', ',');
    const jobEnd = deadline(updateJobTime(text.length, lang));
    return (
        <div className="App">
            <header className="header">
                <nav className="nav">
                    <a href="#"><img src="https://correctarium.com/img/cr_logo_w.svg" alt="Главная"/></a>
                    <a href="#">Про нас</a>
                    <a href="#">Ціни</a>
                    <a href="#">Редактори</a>
                    <a href="#">Блог</a>
                    <a href="#">Перевірити текст</a>
                </nav>
            </header>
            <Main text={text} updateText={updateText} lang={lang} setLang={setLang} file={file} setFile={setFile} />
            <OrderBox price={price} jobEnd={jobEnd} />
            <footer className="footer">
                <nav className="nav">
                    <a href="#">Facebook</a>
                    <a href="#">manager@correctarium.com</a>
                    <a href="#">Українська</a>
                    <a href="#">Русский</a>
                </nav>
            </footer>
        </div>
    );
}

export default App;