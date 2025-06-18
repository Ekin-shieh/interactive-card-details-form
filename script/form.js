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
        cardNum: '',
        expMonth:'',
        expYear:'',
        cvcNum:''
    };

    userName.addEventListener('input', function () {
        let raw = userName.value.replace(/[^\p{L} ]/gu, '');
        if (raw.length > 50) {raw = raw.slice(0, 16);}
        const formatted = raw.trim();
        userName.value = formatted;
        formData.userName = formatted;
    });

    userName.addEventListener('blur', function () {
        if (formData.userName === '') {
            userNameValue = 'JANE APPLESEED';
        } else {
            userNameValue = formData.userName;
        }
        userNameDisplay.textContent = userNameValue;
    });

    cardNum.addEventListener('input', function () {
        let raw = cardNum.value.toUpperCase().replace(/\s+/g, '');
        raw = raw.replace(/[^A-Z0-9]/g, '');
        if (raw.length > 16) {raw = raw.slice(0, 16);}
        const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
        cardNum.value = formatted;
        formData.cardNum = formatted;
    });

    cardNum.addEventListener('blur', function () {
        if (formData.cardNum === '') {
            cardNumValue = '0000 0000 0000 0000';
        } else {
            cardNumValue = formData.cardNum;
        }
        cardNumDisplay.textContent = cardNumValue;
    });

    expMonth.addEventListener('input', function () {
        let raw = expMonth.value.replace(/[^0-9]/g, '');
        if (raw.length > 2) {raw = raw.slice(0, 2);}
        const formatted = raw.trim();
        expMonth.value = formatted;
        formData.expMonth = formatted;
    });

    expMonth.addEventListener('blur', function () {
        if (formData.expMonth === '') {
            month = '00';
        } else {
            month = formData.expMonth;
        }
        expDisplay.textContent = month + cap + year;
    });

    expYear.addEventListener('input', function () {
        let raw = expYear.value.replace(/[^0-9]/g, '');
        if (raw.length > 2) {raw = raw.slice(0, 2);}
        const formatted = raw.trim();
        expYear.value = formatted;
        formData.expYear = formatted;
    });

    expYear.addEventListener('blur', function () {
        if (formData.expYear === '') {
            year = '00';
        } else {
            year = formData.expYear;
        }
        expDisplay.textContent = month + cap + year;
    });

    cvcNum.addEventListener('input', function () {
        let raw = cvcNum.value.replace(/[^0-9]/g, '');
        if (raw.length > 3) {raw = raw.slice(0, 3);}
        const formatted = raw.trim();
        cvcNum.value = formatted;
        formData.cvcNum = formatted;
    });

    cvcNum.addEventListener('blur', function () {
        formData.cvcNum = cvcNum.value.trim();
        if (formData.cvcNum === '') {
            cvcNumValue = '000';
        } else {
            cvcNumValue = formData.cvcNum;
        }
        cvcNumDisplay.textContent = cvcNumValue;
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        formData.userName = userName.value.trim();
        formData.cardNum = cardNum.value.trim();
        formData.expMonth = expMonth.value.trim();
        formData.expYear = expYear.value.trim();
        formData.cvcNum = cvcNum.value.trim();

        userName.value = '';
        cardNum.value = '';
        expMonth.value = '';
        expYear.value = '';
        cvcNum.value = '';
        userNameDisplay.textContent = 'JANE APPLESEED';
        cardNumDisplay.textContent = '0000 0000 0000 0000';
        expDisplay.textContent = '00/00';
        cvcNumDisplay.textContent = '000';
        formData.userName = '';
        formData.cardNum = '';
        formData.expMonth = '';
        formData.expYear = '';
        formData.cvcNum = '';
    });
});
