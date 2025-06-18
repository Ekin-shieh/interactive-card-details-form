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
    const buttonDisplay = document.getElementById('submit-button');

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

    function showError(msgId, msg, inputId = msgId === 'name' ? 'username' : msgId) {
        const el = document.getElementById(msgId + '-error');
        const input = document.getElementById(inputId);
        if (el) {
            el.textContent = msg;
            el.style.display = 'block';
        }
        if (input) {
            input.classList.add('error');
        }
    }

    function clearError(msgId, inputId = msgId === 'name' ? 'username' : msgId) {
        const el = document.getElementById(msgId + '-error');
        const input = document.getElementById(inputId);
        if (el) {
            el.textContent = '';
            el.style.display = 'none';
        }
        if (input) {
            input.classList.remove('error');
        }
    }

    userName.addEventListener('input', function () {
        let raw = userName.value.replace(/[^\p{L} ]/gu, '');
        if (raw.length > 50) raw = raw.slice(0, 50);
        const formatted = raw.trim();
        userName.value = formatted;
        formData.userName = formatted;
        clearError('name');
    });

    userName.addEventListener('blur', function () {
        userNameValue = formData.userName === '' ? 'JANE APPLESEED' : formData.userName;
        userNameDisplay.textContent = userNameValue;
    });

    cardNum.addEventListener('input', function () {
        let raw = cardNum.value.toUpperCase().replace(/\s+/g, '');
        raw = raw.replace(/[^0-9]/g, '');
        if (raw.length > 16) raw = raw.slice(0, 16);
        const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
        cardNum.value = formatted;
        formData.cardNumRaw = raw;
        formData.cardNumFormatted = formatted;
        clearError('cardnum');
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
        clearError('date');
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
        clearError('date');
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
        clearError('cvc');
    });

    cvcNum.addEventListener('blur', function () {
        cvcNumValue = formData.cvcNum.length === 3 ? formData.cvcNum : '000';
        cvcNumDisplay.textContent = cvcNumValue;
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const rawCardNum = formData.cardNumRaw;
        const rawCVC = formData.cvcNum;
        let rawMonth = formData.expMonth;
        const rawYear = formData.expYear;
        let valid = true;

        if (!/^\d{16}$/.test(rawCardNum)) {
            showError('cardnum', 'You should enter 16 digits');
            valid = false;
        }

        if (!/^\d{3}$/.test(rawCVC)) {
            showError('cvc', 'CVC must be 3 digits', 'cvc-num');
            valid = false;
        }

        const currentYear = new Date().getFullYear() % 100;
        const yearNum = parseInt(rawYear, 10);
        if (isNaN(yearNum) || yearNum < currentYear) {
            showError('date', `Year should after ${currentYear}`, 'exp-year');
            valid = false;
        }

        const monthNum = parseInt(rawMonth, 10);
        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            showError('date', 'Invalid Month', 'exp-month');
            valid = false;
        } else {
            rawMonth = monthNum < 10 ? '0' + monthNum : '' + monthNum;
            formData.expMonth = rawMonth;
            expMonth.value = rawMonth;
        }

        const requiredFields = [
        { id: 'name', value: () => formData.userName },
        { id: 'cardnum', value: () => formData.cardNumRaw },
        { id: 'date', value: () => formData.expMonth.trim() && formData.expYear.trim() },
        { id: 'cvc', value: () => formData.cvcNum }
        ];

        for (const field of requiredFields) {
            if (!field.value()) {
                showError(field.id, "Can't be blank");
                valid = false;
            }
        }

        if (!valid) return;

        const element = document.getElementById('success-message');
        const current = window.getComputedStyle(element).display;

        if (current === "none") {
            element.style.display = "flex";
            buttonDisplay.textContent = 'Continue';
            userNameDisplay.textContent = 'JANE APPLESEED';
            cardNumDisplay.textContent = '0000 0000 0000 0000';
            expDisplay.textContent = '00/00';
            cvcNumDisplay.textContent = '000';
        } else {
            element.style.display = "none";
            buttonDisplay.textContent = 'Confirm';
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
            userNameValue = 'JANE APPLESEED';
            cardNumValue = '0000 0000 0000 0000';
            cvcNumValue = '000';
            month = '00';
            year = '00';
        }
    });
});