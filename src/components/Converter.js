import styles from '../App.css';

import { useState } from 'react';

const Converter = () => {
    const [backColor, setBackColor] = useState('rgb(25, 75, 141)');
    const [computedValue, setcomputedValue] = useState('');

    // обработчик проверки валидности аргумента и преобразования в нужный формат системы счисления
    const transformationToInt = (value) => {
        if (!isNaN(parseInt(value, 16))) {
            return parseInt(value, 16);
        }
        return null;
    };

    const computedColor = (list) => {
        for (const symbol of list) {
            if (transformationToInt(symbol) === null) {
                return null;
            }
        }
        return `rgb(${transformationToInt(list[0])}, ${transformationToInt(
            list[1]
        )}, ${transformationToInt(list[2])})`;
    };

    // обработчик данных из input
    const handlerConvert = (value) => {
        try {
            setBackColor('rgb(25, 75, 141)');
            setcomputedValue('');

            if (value.length === 7 && value[0] === '#') {
                const allHexList = value.split('');
                const validHexList = allHexList.filter((element) => element !== '#');
                const resultColor = computedColor(
                    validHexList.join('').match(/.{1,2}/g)
                );
                if (resultColor !== null) {
                    setBackColor(resultColor);
                    setcomputedValue(resultColor);
                    return;
                }
                setBackColor('red');
                setcomputedValue('Ошибка!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className='container'
            style={{
                backgroundColor: backColor,
            }}
        >
            <input
                type="text"
                placeholder="Введите цвет в формате HEX"
                className={styles.input}
                maxLength="7"
                onChange={(event) => handlerConvert(event.target.value)}
            />
            <div className={styles.output}>{computedValue}</div>
        </div>
    );
};

export default Converter;