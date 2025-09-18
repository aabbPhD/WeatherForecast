import React from 'react';
import '../styles/search.scss';


export default function NumberInput({inputValue, setInputValue, min, max, placeholder, inputSuffix, invalidInput, inputWrapperStyle}) {
    
    //при вводе значений в инпут делаем валидацию данных
    function handleChange(e) {
        let value = e.target.value;

        if (value === "" || value === "-") {
            setInputValue(value);
            return;
        }

        value = value.replace(',', '.');     
        //REGEX:
        //необязательный минус в начале строки
        //либо 0, либо ведущие нули отсутствуют
        //только цифры (помимо минуса и точки)
        //необязательная дробная часть до 3-ех знаков после запятой 
        const regex = /^-?(0|[1-9]\d*)(\.\d{0,3})?$/;
        if (!regex.test(value)) return;
      
        const number = parseFloat(value);    
        if (number < min || number > max) return;

        //чтобы удовлетворяли строки по типу "12."" или "12.00"
        if (
            value !== String(number) &&
            value !== String(number) + "." &&
            value !== String(number.toFixed(1)) &&
            value !== String(number.toFixed(2)) &&
            value !== String(number.toFixed(3))
        ) return;

        setInputValue(value);
    }


    return (
        <div className={inputWrapperStyle}>
            <input
                className={`param-input${invalidInput ? ' invalid' : ''}`}
                type="text"
                placeholder={placeholder}
                value={inputValue || ''}
                onChange={(e) => handleChange(e)}
            />
            {inputValue && (<span className='input-text'>{inputSuffix}</span>)}
        </div>
    );
}