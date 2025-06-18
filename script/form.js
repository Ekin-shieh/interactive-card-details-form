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
    let expValue = '00/00';
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

    userName.addEventListener('blur', function () {
        formData.userName = userName.value.trim();
        if (formData.userName === '') {
            userNameValue = 'JANE APPLESEED';
        } else {
            userNameValue = formData.userName;
        }
        userNameDisplay.textContent = userNameValue;
    });

    cardNum.addEventListener('blur', function () {
        formData.cardNum = cardNum.value.trim();
        if (formData.cardNum === '') {
            cardNumValue = '0000 0000 0000 0000';
        } else {
            cardNumValue = formData.cardNum;
        }
        cardNumDisplay.textContent = cardNumValue;
    });

    expMonth.addEventListener('blur', function () {
        formData.expMonth = expMonth.value.trim();
        if (formData.expMonth === '') {
            month = '00';
        } else {
            month = formData.expMonth;
        }
        expDisplay.textContent = month + cap + year;
    });

    expYear.addEventListener('blur', function () {
        formData.expYear = expYear.value.trim();
        if (formData.expYear === '') {
            year = '00';
        } else {
            year = formData.expYear;
        }
        expDisplay.textContent = month + cap + year;
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
        cardNumDisplay.textContent = '0000 0000 0000';
        expDisplay.textContent = '00/00';
        cvcNumDisplay.textContent = '000';
        formData.userName = '';
        formData.cardNum = '';
        formData.expMonth = '';
        formData.expYear = '';
        formData.cvcNum = '';
    });
});
