const form = document.forms.namedItem('login')
const dialog = document.querySelector('dialog')
const b = dialog.querySelector('b')
const p = dialog.querySelector('p')
const inputs = form.querySelectorAll('input')
const errorText = document.querySelector('#error')

const patterns = {
    name: /^[a-z ,.'-]+$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    phone: /^998([378]{2}|(9[013-57-9]))\d{7}$/g,
    error: /^([\w\s]{3,10})(?!\n)$/g,
}


inputs.forEach((inp) => {
    inp.onkeyup = () => {
        if (!patterns[inp.name].test(inp.value)) {
            inp.classList.add('error')
        } else {
            inp.classList.remove('error')
        }
    }
})


form.onsubmit = (event) => {
    event.preventDefault()
    let fm = new FormData(form)
    let error = false
    let user = {}

    fm.forEach((val, key) => {
        user[key] = val
        if (val === 'not') error = true
    })

    inputs.forEach((inp) => {
        if (inp.value.length === 0 || inp.classList.contains('error')) {
            error = true
        }
    })

    if (inp.value.length === 2) {
        inp.classList.add('error')
        errorText.innerHTML = 'minimum 2 words'
    } else {
        inp.classList.remove('error')
    }

    if (error) {
        alert("Fill allfields")
        return
    }

    b.innerHTML = user.name
    p.innerHTML = `After 10 years you'll be a seanior ${user.landuage}`
    dialog.showModal()
}

dialog.onclick = () => {
    dialog.close()
}
