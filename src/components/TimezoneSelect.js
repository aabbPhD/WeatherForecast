import '../styles/sidebar.scss';



export default function TimezoneSelect({timezone, setTimezone, isDataStillLoading}) {
    function selectTimezone(e) {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        setTimezone(e.target.value);
    }

    return (
        <div className='select-wrapper'>
            <label htmlFor="timezone-select">Часовой пояс: </label>
            <select id="timezone-select"
                    value={timezone}
                    onChange={selectTimezone}>
                <option value="" disabled>Выберите часовой пояс</option>
                <option value="America/Anchorage">AST (Америка/Анкоридж)</option>
                <option value="America/Los_Angeles">PST (Америка/Лос Анджелес)</option>
                <option value="America/Denver">MST (Америка/Денвер)</option>
                <option value="America/Chicago">CST (Америка/Чикаго)</option>
                <option value="America/New_York">EST (Америка/Нью-Йорк)</option>
                <option value="America/Sao_Paulo">BRT (Америка/Сан-Паулу)</option>
                <option value="UTC">UTC (+0)</option>
                <option value="Europe/London">GMT (Европа/Лондон)</option>
                <option value="Europe/Berlin">CET (Европа/Берлин)</option>
                <option value="Europe/Moscow">MSK (Европа/Москва)</option>
                <option value="Africa/Cairo">EET (Африка/Каир)</option>
                <option value="Asia/Bangkok">ICT (Азия/Бангкок)</option>
                <option value="Asia/Singapore">SGT (Азия/Сингапур)</option>
                <option value="Asia/Tokyo">JST (Азия/Токио)</option>
                <option value="Australia/Sydney">AEST (Австралия/Сидней)</option>
                <option value="Pacific/Auckland">NZST (Тихий океан/Окленд)</option>
            </select>
        </div>
    )
}

//<option value="auto">Автоопределение</option>