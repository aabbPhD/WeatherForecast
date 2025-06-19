import '../styles/sidebar.scss';
import { useSelector } from 'react-redux';
import { translations } from '../config/translations';


export default function TimezoneSelect({timezone, setTimezone, isDataStillLoading}) {
    const language = useSelector(state => state.language.language);

    function selectTimezone(e) {
        if (isDataStillLoading()) return;//прошлые данные еще не загрузились, пока не реагируем
        setTimezone(e.target.value);
    }

    return (
        <div className='select-wrapper'>
            <label htmlFor="timezone-select">{translations[language].timezoneSelect_label}</label>
            <select id="timezone-select"
                    value={timezone}
                    onChange={selectTimezone}>
                <option value="" disabled>{translations[language].timezoneSelect_chooseTimezone}</option>
                <option value="America/Anchorage">AST {translations[language].timezoneSelect_option_AST}</option>
                <option value="America/Los_Angeles">PST {translations[language].timezoneSelect_option_PST}</option>
                <option value="America/Denver">MST {translations[language].timezoneSelect_option_MST}</option>
                <option value="America/Chicago">CST {translations[language].timezoneSelect_option_CST}</option>
                <option value="America/New_York">EST {translations[language].timezoneSelect_option_EST}</option>
                <option value="America/Sao_Paulo">BRT {translations[language].timezoneSelect_option_BRT}</option>
                <option value="UTC">UTC (+0)</option>
                <option value="Europe/London">GMT {translations[language].timezoneSelect_option_GMT}</option>
                <option value="Europe/Berlin">CET {translations[language].timezoneSelect_option_CET}</option>
                <option value="Europe/Moscow">MSK {translations[language].timezoneSelect_option_MSK}</option>
                <option value="Africa/Cairo">EET {translations[language].timezoneSelect_option_EET}</option>
                <option value="Asia/Bangkok">ICT {translations[language].timezoneSelect_option_ICT}</option>
                <option value="Asia/Singapore">SGT {translations[language].timezoneSelect_option_SGT}</option>
                <option value="Asia/Tokyo">JST {translations[language].timezoneSelect_option_JST}</option>
                <option value="Australia/Sydney">AEST {translations[language].timezoneSelect_option_AEST}</option>
                <option value="Pacific/Auckland">NZST {translations[language].timezoneSelect_option_NZST}</option>
            </select>
        </div>
    )
}

//<option value="auto">Автоопределение</option>