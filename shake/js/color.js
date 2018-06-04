let setDocStyleProperty = (prop, value) => {
    document.documentElement.style.setProperty(prop, value);
}

let getFirstClass = (className) => {
    return document.getElementsByClassName(className)[0];
}

let getNewColor = () => {
    return '#' + (Math.random().toString(16)+'000000').slice(2, 8);
}


// Calculates the brightness of a color; By: http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
let brightness = (colorHex) => {
    let red = parseInt(colorHex.substring(1,3), 16);
    let green = parseInt(colorHex.substring(3,5), 16);
    let blue = parseInt(colorHex.substring(5,7), 16);
    return Math.sqrt(
        red * red * 0.241 +
        green * green * 0.691 +
        blue * blue * 0.068
    );
}

let shake = () => {
    let newColor = getNewColor(); // TODO here new color func //demo color: #F5309C
    setDocStyleProperty('--color-main', newColor);

    let varColorText = brightness(newColor) < 130 ? '--color-white' : '--color-black';
    let colorText = window.getComputedStyle(document.body).getPropertyValue(varColorText);

    setDocStyleProperty('--color-shake', colorText);
    setDocStyleProperty('--color-for', colorText);
    setDocStyleProperty('--color-color-arrow', colorText);
    setDocStyleProperty('--color-footer', colorText);
    setDocStyleProperty('--color-color-back', colorText);
    
    let animationTime = window.getComputedStyle(document.body).getPropertyValue('--anim-shake').slice(0, -1);
    getFirstClass('main-text__color').style.animation = `shake-color ${animationTime}s ease-in-out`;
    
    setTimeout(() => {
        getFirstClass('main-text__color').innerHTML = newColor;
        setDocStyleProperty('--color-color', newColor);
    }, animationTime / 2 * 1000 + 50);

    let shakeAnim = getFirstClass('main-text__color');
    shakeAnim.addEventListener('animationend', () => {
        getFirstClass('main-text__color').classList.add('main-text__color--new-color');
        getFirstClass('main-text__color').style.animation = `none`;
    }, false);

    getFirstClass('main-text__for').style.opacity = 0;
}