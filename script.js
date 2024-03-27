const form = document.forms.namedItem('login');
const dialog = document.querySelector('dialog');
const b = dialog.querySelector('b');
const p = dialog.querySelector('p');
const inputs = form.querySelectorAll('input');
const first = document.querySelector('#first');
const second = document.querySelector('#second');
const third = document.querySelector('#third');

const patterns = {
    name: /^[a-z ,.'-]+$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    email: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^998([378]{2}|(9[013-57-9]))\d{7}$/
};

let errorCount = 0;

inputs.forEach((inp) => {
    inp.onkeyup = () => {
        if (!patterns[inp.name].test(inp.value)) {
            inp.classList.add('error');
            errorCount++;
        } else {
            inp.classList.remove('error');
            if (errorCount > 0) {
                errorCount--;
            }
        }
        errorSpan.innerHTML = errorCount;
    };
});

form.onsubmit = (event) => {
    event.preventDefault();
    let fm = new FormData(form);
    let error = false;
    let user = {};
    const errorSpan = document.querySelector('p b');

    fm.forEach((val, key) => {
        user[key] = val;
        if (val === 'Not') error = true;
    });

    inputs.forEach((inp) => {
        if (inp.value.length === 0 || inp.classList.contains('error')) {
            error = true;
        }

        if (inp.name === 'name') {
            if (inp.value.length < 2 || inp.value.length > 10) {
                first.innerHTML = 'Должно быть от 2 до 10 символов';
                first.style.color = 'red';
            } else {
                first.innerHTML = 'Отлично';
                first.style.color = 'green';
            }
        }

        if (inp.name === 'age') {
            if (inp.value < 18) {
                inp.classList.add('error');
                second.innerHTML = 'Возраст должен быть больше 18';
                second.style.color = 'red';
            } else {
                second.innerHTML = 'Отлично';
                second.style.color = 'green';
                inp.classList.remove('error');
            }
        }

        if (inp.name === 'language') {
            if (inp.value === 'Not') {
                third.innerHTML = 'Выбери язык программирования';
                third.style.color = 'red';
                error = true;
            } else {
                third.innerHTML = 'Отлично';
                third.style.color = 'green';
            }
        }
    });

    errorSpan.innerHTML = errorCount;

    if (error) {
        alert("Заполните все поля");
        return;
    }

    b.innerHTML = user.name;
    p.innerHTML = `Через 10 лет вы будете старшим разработчиком на ${user.language}`;
    dialog.showModal();
};

dialog.onclick = () => {
    dialog.close();
};
