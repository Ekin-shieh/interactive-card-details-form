document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('card-info');
    const userName = document.getElementById('username');
    const cardNum = document.getElementById('cardnum');
    const expMonth = document.getElementById('exp-month');
    const expYear = document.getElementById('exp-year');
    const cvcNum = document.getElementById('cvc-num');
    const userNameDisplay = document.getElementById('username-display');
    const cardNumDisplay = document.getElementById('cardnum-display');
    const expDisplay = document.getElementById('exp-display');
    const cvcNumDisplay = document.getElementById('cvc-num-display');

    let userNameValue = 'JANE APPLESEED';
    let cardNumValue = '0000 0000 0000 0000';
    let cvcNumValue = '000';
    let month = '00';
    let year = '00';
    let cap = '/';

    const formData = {
        userName: '',
        cardNumRaw: '',
        cardNumFormatted: '',
        expMonth: '',
        expYear: '',
        cvcNum: ''
    };

    userName.addEventListener('input', function () {
        let raw = userName.value.replace(/[^\p{L} ]/gu, '');
        if (raw.length > 50) raw = raw.slice(0, 50);
        const formatted = raw.trim();
        userName.value = formatted;
        formData.userName = formatted;
    });

    userName.addEventListener('blur', function () {
        userNameValue = formData.userName === '' ? 'JANE APPLESEED' : formData.userName;
        userNameDisplay.textContent = userNameValue;
    });

    cardNum.addEventListener('input', function () {
        let raw = cardNum.value.toUpperCase().replace(/\s+/g, '');
        raw = raw.replace(/[^A-Z0-9]/g, '');
        if (raw.length > 16) raw = raw.slice(0, 16);
        const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
        cardNum.value = formatted;
        formData.cardNumRaw = raw;
        formData.cardNumFormatted = formatted;
    });

    cardNum.addEventListener('blur', function () {
        cardNumValue = formData.cardNumRaw.length === 16 ? formData.cardNumFormatted : '0000 0000 0000 0000';
        cardNumDisplay.textContent = cardNumValue;
    });

    expMonth.addEventListener('input', function () {
        let raw = expMonth.value.replace(/[^0-9]/g, '');
        if (raw.length > 2) raw = raw.slice(0, 2);
        expMonth.value = raw;
        formData.expMonth = raw;
    });

    expMonth.addEventListener('blur', function () {
        month = formData.expMonth.length === 2 ? formData.expMonth : '00';
        expDisplay.textContent = month + cap + year;
    });

    expYear.addEventListener('input', function () {
        let raw = expYear.value.replace(/[^0-9]/g, '');
        if (raw.length > 2) raw = raw.slice(0, 2);
        expYear.value = raw;
        formData.expYear = raw;
    });

    expYear.addEventListener('blur', function () {
        year = formData.expYear.length === 2 ? formData.expYear : '00';
        expDisplay.textContent = month + cap + year;
    });

    cvcNum.addEventListener('input', function () {
        let raw = cvcNum.value.replace(/[^0-9]/g, '');
        if (raw.length > 3) raw = raw.slice(0, 3);
        cvcNum.value = raw;
        formData.cvcNum = raw;
    });

    cvcNum.addEventListener('blur', function () {
        cvcNumValue = formData.cvcNum.length === 3 ? formData.cvcNum : '000';
        cvcNumDisplay.textContent = cvcNumValue;
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formData.userName = '';
        formData.cardNumRaw = '';
        formData.cardNumFormatted = '';
        formData.expMonth = '';
        formData.expYear = '';
        formData.cvcNum = '';
        userName.value = '';
        cardNum.value = '';
        expMonth.value = '';
        expYear.value = '';
        cvcNum.value = '';
        userNameDisplay.textContent = 'JANE APPLESEED';
        cardNumDisplay.textContent = '0000 0000 0000 0000';
        expDisplay.textContent = '00/00';
        cvcNumDisplay.textContent = '000';
        userNameValue = 'JANE APPLESEED';
        cardNumValue = '0000 0000 0000 0000';
        cvcNumValue = '000';
        month = '00';
        year = '00';

        const element = document.getElementById('success-message');
        const current = window.getComputedStyle(element).display;

        if (current === "none") {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    });
});