import React from "react";
import "./Main.css"

const Main = (props) => {
    return <main className="main">
        <h3>ЗАМОВИТИ РЕДАГУВАННЯ</h3>
        <span> Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі місця,
            але сильно текст не переписуватимемо. Зайвих виправлень не буде.
            <a href="#">Детальніше про редагування</a>
        </span><br/>
        <label><input type="text" placeholder="Ваша ел. почта"/><br/></label>
        <input type="text" placeholder="Ваше имя"/><br/>
        <textarea placeholder="Уведіть текст" value={props.text}
                  onChange={(e) => props.updateText(e.target.value)}></textarea>
        <span className="lettersCounter">{props.text.length}</span>
        <h3>МОВА</h3>
        <label name="lang" onChange={(e) => props.setLang(e.target.value)}>
            <input className="langRadio" id="ua" checked={props.lang === 'ua'} type="radio" name="lang" value="ua" onChange={()=>true}/>
            <label className="langRadioLabel" htmlFor="ua">Українська</label><br/>
            <input className="langRadio" id="ru" checked={props.lang === 'ru'} type="radio" name="lang" value="ru" onChange={()=>true}/>
            <label className="langRadioLabel" htmlFor="ru">Російська</label><br/>
            <input className="langRadio" id="en" checked={props.lang === 'en'} type="radio" name="lang" value="en"  onChange={()=>true}/>
            <label className="langRadioLabel" htmlFor="en">Англійська</label>
        </label>
        <input type="text" placeholder="Стислий коментар або покликання"/>
        <h4>Завантажити файл</h4>
        <select name="file" value={props.file} onChange={(e) => props.setFile(e.target.value)}>
            <option value="text">Текстовый ввод</option>
            <option value="valid">Валидный файл</option>
            <option value="invalid">Невалидный файл</option>
        </select>
    </main>
}
export default Main;