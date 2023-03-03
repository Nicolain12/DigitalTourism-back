window.onload = function () {
    const loggin = document.getElementById('form-login')
    const formRegister = document.getElementById('form-register')

    if (loggin) {
        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')
        const button = document.querySelector('#button-loggin')
        const emailAlert = document.querySelector('#errors-email-loggin')
        const passwordAlert = document.querySelector('#errors-password-loggin')
        const rememberInput = document.querySelector('#remember')

        button.addEventListener('click', async (e) => {
            e.preventDefault()
            const email = emailInput.value
            const password = passwordInput.value
            const remember = rememberInput.checked;
            const inputValues = [email, password]

            if (inputValues[0] == '' && inputValues[1] == '') {
                emailAlert.textContent = 'Tienes que ingresar la informacion'
                passwordAlert.textContent = ''
            }
            else if (inputValues[0] == '' && inputValues[1].length >= 6) {
                emailAlert.textContent = 'Tienes que ingresar la informacion'
                passwordAlert.textContent = ''
            }
            else if (inputValues[0].length >= 6 && inputValues[1] == '') {
                emailAlert.textContent = ''
                passwordAlert.textContent = 'Tienes que ingresar una contraseña'
            }
            else if (inputValues[0] == '' && inputValues[1].length < 6) {
                emailAlert.textContent = 'Tienes que ingresar la informacion'
                passwordAlert.textContent = 'Tienes que ingresar una contraseña valida'
            }
            else if (inputValues[0].length < 6 && inputValues[1] == '') {
                emailAlert.textContent = 'Tienes que ingresar un Email valido'
                passwordAlert.textContent = 'Tienes que ingresar una contraseña'
            }
            else if ((inputValues[0].length < 6 && inputValues[1].length < 6) && (inputValues[0].length > 1 && inputValues[1].length > 1)) {
                emailAlert.textContent = 'Tienes que ingresar un Email valido'
                passwordAlert.textContent = 'Tienes que ingresar una contraseña valida'
            }
            else if (inputValues[0].length < 6 && inputValues[1].length >= 6) {
                emailAlert.textContent = 'Tienes que ingresar un Email valido'
                passwordAlert.textContent = ''
            }
            else if (inputValues[0].length >= 6 && inputValues[1].length < 6) {
                emailAlert.textContent = ''
                passwordAlert.textContent = 'Tienes que ingresar una contraseña valida'
            } else {
                const apiFetch = await fetch("/api/users/loggin", {
                    method: "POST",
                    body: JSON.stringify({ email, password, remember }),
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json"
                    },
                })
                const resApi = await apiFetch.json()
                if (resApi.info.status == 200) {
                    delete resApi.data.password
                    sessionStorage.setItem('userLogged', resApi.data)
                    window.location.href = '/'
                }
                if (resApi.info.status == 400) {
                    if (resApi.info.msg == 'Contraseña invalida' || resApi.info.msg == 'Informacion invalida') {
                        return emailAlert.textContent = resApi.info.msg
                    } else {
                        return emailAlert.textContent = 'Informacion invalida'
                    }
                }
            }
        });
    }

    if (formRegister) {
        const userImgInput = document.querySelector('#userImg-register')
        const nameInput = document.querySelector('#name-register')
        const surnameInput = document.querySelector('#surname-register')
        const emailInput = document.querySelector('#email-register')
        const ageInput = document.querySelector('#age-register')
        const isAdminInput = document.querySelector('#admin')
        const passwordInput = document.querySelector('#password-register')
        const passwordConfirmInput = document.querySelector('#passwordConfirm-register')
        // ERRORS
        // password
        const passwordSet = document.querySelector('.password-set-register')
        const passwordLet = document.querySelector('.password-let-register')
        const passwordNum = document.querySelector('.password-num-register')
        const passwordCap = document.querySelector('.password-cap-register')
        // name
        const nameErrorRegister = document.querySelector('#name-set-register')
        // surname
        const surnameErrorRegister = document.querySelector('#surname-set-register')
        // email
        const emailErrorRegister = document.querySelector('#email-set-register')
        const emailErrorAlertRegister = document.querySelector('#email-set-alert-register')
        // passwordConfirm
        const passconfirmErrorRegister = document.querySelector('#passConfirm-set-register')
        // age
        const ageErrorRegister = document.querySelector('#age-set-register')
        // admin
        const adminErrorRegister = document.querySelector('#admin-set-register')
        // main
        const mainErrorRegister = document.querySelector('#main-error-register')
        // BUTTON
        const buttonRegister = document.querySelector('.botons-register')

        const userImgs = userImgInput.files
        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const age = ageInput.value
        const isAdmin = isAdminInput.value
        const password = passwordInput.value
        const passwordConfirm = passwordConfirmInput.value

        const registerErrors = {}
        const registerData = {}



        const file = userImgInput.files[0];

        // userImgInput.addEventListener('change', (e) => )

        // if (!file) {
        // ERROR
        // }

        // if (!file.type.startsWith('image/')) {
          // ERROR
        // }
        // ***************************************************************************

        passwordInput.addEventListener('keyup', (event) => {
            const inputValue = event.target.value
            function validatePassword(password) {
                const hasLetter = /[^a-zA-Z0-9]/.test(password)
                const hasNumber = /\d/.test(password)
                const hasCapitalLetter = /[A-Z]/.test(password)

                let errors = ''
                if (!hasLetter) {
                    errors += 'let, '
                }
                if (!hasNumber) {
                    errors += 'num, '
                }
                if (!hasCapitalLetter) {
                    errors += 'cap'
                }
                return errors
            }
            const errorsPassword = validatePassword(inputValue)
            if (inputValue.length < 1) {
                passwordSet.style.color = 'red'
                passwordSet.textContent = `Caracteres: ${inputValue.length}/6`
                passwordLet.style.color = 'red'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'red'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'red'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            if (inputValue.length < 6 && inputValue.length >= 1) {
                passwordSet.style.color = 'red'
                passwordSet.textContent = `Caracteres: ${inputValue.length}/6`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            if (inputValue.length >= 6 && errorsPassword) {
                passwordSet.style.color = 'green'
                passwordSet.textContent = `Caracteres: ${inputValue.length}/6`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            if (!errorsPassword && inputValue.length < 6) {
                passwordLet.style.color = 'green'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'green'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'green'
                passwordCap.textContent = 'Debe contener una letra mayuscula'
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'let, num, cap') {
                passwordLet.style.color = 'red'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'red'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'red'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'let, cap') {
                passwordLet.style.color = 'red'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'green'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'red'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'let, num, ') {
                passwordLet.style.color = 'red'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'red'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'green'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'num, cap') {
                passwordLet.style.color = 'green'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'red'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'red'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'cap') {
                passwordLet.style.color = 'green'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'green'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'red'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'num, ') {
                passwordLet.style.color = 'green'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'red'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'green'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            else if (errorsPassword === 'let, ') {
                passwordLet.style.color = 'red'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'green'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'green'
                passwordCap.textContent = `Debe contener una letra mayuscula`
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'error'
                }
            }
            if (!errorsPassword && inputValue.length >= 6) {
                passwordSet.style.color = 'green'
                passwordSet.textContent = `Caracteres: ${inputValue.length}/6`
                passwordLet.style.color = 'green'
                passwordLet.textContent = 'Debe contener un caracterer especial'
                passwordNum.style.color = 'green'
                passwordNum.textContent = `Debe contener un numero`
                passwordCap.style.color = 'green'
                passwordCap.textContent = 'Debe contener una letra mayuscula'
                if (!registerErrors.hasOwnProperty("password")) {
                    Object.defineProperty(registerErrors, "password", {
                        value: "correct",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                    if (!registerErrors.hasOwnProperty("passwordCompareValue")) {
                        Object.defineProperty(registerErrors, "passwordCompareValue", {
                            value: inputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        });
                        //*****************************************************
                        if (!registerData.hasOwnProperty('password')) {
                            Object.defineProperty(registerData, 'password', {
                                value: inputValue,
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            })
                        }
                        if (registerData.hasOwnProperty('password')) {
                            registerData.password = inputValue
                        }
                        //*****************************************************
                    }
                    if (registerErrors.hasOwnProperty("passwordCompareValue")) {
                        registerErrors.passwordCompareValue = inputValue
                        //*****************************************************
                        if (!registerData.hasOwnProperty('password')) {
                            Object.defineProperty(registerData, 'password', {
                                value: inputValue,
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            })
                        }
                        if (registerData.hasOwnProperty('password')) {
                            registerData.password = inputValue
                        }
                        //*****************************************************
                    }
                }
                if (registerErrors.hasOwnProperty("password")) {
                    registerErrors.password = 'correct'
                    if (!registerErrors.hasOwnProperty("passwordCompareValue")) {
                        Object.defineProperty(registerErrors, "passwordCompareValue", {
                            value: inputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        });
                        //*****************************************************
                        if (!registerData.hasOwnProperty('password')) {
                            Object.defineProperty(registerData, 'password', {
                                value: inputValue,
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            })
                        }
                        if (registerData.hasOwnProperty('password')) {
                            registerData.password = inputValue
                        }
                        //*****************************************************
                    }
                    if (registerErrors.hasOwnProperty("passwordCompareValue")) {
                        registerErrors.passwordCompareValue = inputValue
                        //*****************************************************
                        if (!registerData.hasOwnProperty('password')) {
                            Object.defineProperty(registerData, 'password', {
                                value: inputValue,
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            })
                        }
                        if (registerData.hasOwnProperty('password')) {
                            registerData.password = inputValue
                        }
                        //*****************************************************
                    }
                }
            }
        })
        passwordInput.addEventListener('blur', (e) => {
            passwordSet.textContent = ''
            passwordLet.textContent = ''
            passwordNum.textContent = ''
            passwordCap.textContent = ''
            passwordInput.style.margin = '0%'
            if (registerErrors.password == 'error') {
                passwordInput.style.border = "1px solid red";
            }
            if (registerErrors.password == 'correct') {
                passwordInput.style.border = "1px solid green";
            }
        })

        // ***************************************************************************
        nameInput.addEventListener('keyup', (event) => {
            const nameinputValue = event.target.value
            if (nameinputValue.length < 1) {
                nameErrorRegister.style.color = 'red'
                nameErrorRegister.textContent = `Caracteres: ${nameinputValue.length}/3`
                if (!registerErrors.hasOwnProperty("name")) {
                    Object.defineProperty(registerErrors, "name", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("name")) {
                    registerErrors.name = 'error'
                }
            }
            if (nameinputValue.length < 3 && nameinputValue.length >= 1) {
                nameErrorRegister.style.color = 'red'
                nameErrorRegister.textContent = `Caracteres: ${nameinputValue.length}/3`
                if (!registerErrors.hasOwnProperty("name")) {
                    Object.defineProperty(registerErrors, "name", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("name")) {
                    registerErrors.name = 'error'
                }
            }
            if (nameinputValue.length >= 3) {
                nameErrorRegister.style.color = 'green'
                nameErrorRegister.textContent = `Caracteres: 3/3`
                if (!registerErrors.hasOwnProperty("name")) {
                    Object.defineProperty(registerErrors, "name", {
                        value: "correct",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });

                    // *************
                    if (!registerData.hasOwnProperty('name')) {
                        Object.defineProperty(registerData, 'name', {
                            value: nameinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('name')) {
                        registerData.name = nameinputValue
                    }
                    // *************
                }
                if (registerErrors.hasOwnProperty("name")) {
                    registerErrors.name = 'correct'
                    // *************
                    if (!registerData.hasOwnProperty('name')) {
                        Object.defineProperty(registerData, 'name', {
                            value: nameinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('name')) {
                        registerData.name = nameinputValue
                    }
                    // *************
                }
            }
        })
        nameInput.addEventListener('blur', (e) => {
            nameErrorRegister.textContent = ''
            nameInput.style.margin = '1%'
            if (registerErrors.name == 'error') {
                nameInput.style.border = "1px solid red";
            }
            if (registerErrors.name == 'correct') {
                nameInput.style.border = "1px solid green";
            }
        })

        // ***************************************************************************
        surnameInput.addEventListener('keyup', (event) => {
            const surnameinputValue = event.target.value
            if (surnameinputValue.length < 1) {
                surnameErrorRegister.style.color = 'red'
                surnameErrorRegister.textContent = `Caracteres: ${surnameinputValue.length}/3`
                if (!registerErrors.hasOwnProperty("surname")) {
                    Object.defineProperty(registerErrors, "surname", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("surname")) {
                    registerErrors.surname = 'error'
                }
            }
            if (surnameinputValue.length < 3 && surnameinputValue.length >= 1) {
                surnameErrorRegister.style.color = 'red'
                surnameErrorRegister.textContent = `Caracteres: ${surnameinputValue.length}/3`
                if (!registerErrors.hasOwnProperty("surname")) {
                    Object.defineProperty(registerErrors, "surname", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("surname")) {
                    registerErrors.surname = 'error'
                }
            }
            if (surnameinputValue.length >= 3) {
                surnameErrorRegister.style.color = 'green'
                surnameErrorRegister.textContent = `Caracteres: 3/3`
                if (!registerErrors.hasOwnProperty("surname")) {
                    Object.defineProperty(registerErrors, "surname", {
                        value: "correct",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                    //*****************************************************
                    if (!registerData.hasOwnProperty('surname')) {
                        Object.defineProperty(registerData, 'surname', {
                            value: surnameinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('surname')) {
                        registerData.surname = surnameinputValue
                    }
                    //*****************************************************
                }
                if (registerErrors.hasOwnProperty("surname")) {
                    registerErrors.surname = 'correct'
                    //*****************************************************
                    if (!registerData.hasOwnProperty('surname')) {
                        Object.defineProperty(registerData, 'surname', {
                            value: surnameinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('surname')) {
                        registerData.surname = surnameinputValue
                    }
                    //*****************************************************
                }
            }
        })
        surnameInput.addEventListener('blur', (e) => {
            surnameErrorRegister.textContent = ''
            surnameErrorRegister.style.margin = '0%'
            if (registerErrors.surname == 'error') {
                surnameInput.style.border = "1px solid red";
            }
            if (registerErrors.surname == 'correct') {
                surnameInput.style.border = "1px solid green";
            }
        })

        // ***************************************************************************
        emailInput.addEventListener('keyup', (event) => {
            const emailinputValue = event.target.value
            const isEmail = /\S+@\S+\.\S+/.test(emailinputValue)
            if (emailinputValue.length < 1) {
                emailErrorRegister.style.color = 'red'
                emailErrorRegister.textContent = `Caracteres: ${emailinputValue.length}/15`
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'error'
                }
            }
            if (emailinputValue.length >= 15 && !isEmail) {
                emailErrorRegister.textContent = ``
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'error'
                }
            }
            if (emailinputValue.length < 15 && emailinputValue.length >= 1) {
                emailErrorRegister.style.color = 'red'
                emailErrorRegister.textContent = `Caracteres: ${emailinputValue.length}/15`
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'error'
                }
            }
            if (!isEmail) {
                emailErrorAlertRegister.textContent = 'El email debe ser valido'
                emailErrorAlertRegister.style.color = 'red'
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'error'
                }
            }
            if (isEmail) {
                emailErrorAlertRegister.textContent = 'El email debe ser valido'
                emailErrorAlertRegister.style.color = 'green'
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: "default",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'default'
                }
            }
            if (isEmail && emailinputValue.length >= 15) {
                emailErrorAlertRegister.textContent = 'El email es valido'
                emailErrorAlertRegister.style.color = 'green'
                emailErrorRegister.textContent = ``
                if (!registerErrors.hasOwnProperty("email")) {
                    Object.defineProperty(registerErrors, "email", {
                        value: "correct",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                    //*****************************************************
                    if (!registerData.hasOwnProperty('email')) {
                        Object.defineProperty(registerData, 'email', {
                            value: emailinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('email')) {
                        registerData.email = emailinputValue
                    }
                    //*****************************************************
                }
                if (registerErrors.hasOwnProperty("email")) {
                    registerErrors.email = 'correct'
                    //*****************************************************
                    if (!registerData.hasOwnProperty('email')) {
                        Object.defineProperty(registerData, 'email', {
                            value: emailinputValue,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('email')) {
                        registerData.email = emailinputValue
                    }
                    //*****************************************************
                }
            }
        })
        emailInput.addEventListener('blur', (e) => {
            emailErrorRegister.textContent = ''
            emailErrorAlertRegister.textContent = ''
            emailErrorRegister.style.margin = '0%'
            emailErrorAlertRegister.style.margin = '0%'
            if (registerErrors.email == 'error') {
                emailInput.style.border = "1px solid red";
            }
            if (registerErrors.email == 'correct') {
                emailInput.style.border = "1px solid green";
            }
        })
        // ***************************************************************************
        passwordConfirmInput.addEventListener('keyup', (event) => {
            const passConfirminputValue = event.target.value
            const passwordCompare = registerErrors.passwordCompareValue
            if (!registerErrors.password) {
                passconfirmErrorRegister.style.color = 'red'
                passconfirmErrorRegister.textContent = `Primero debes crear una contraseña`
                if (!registerErrors.hasOwnProperty("passconfirm")) {
                    Object.defineProperty(registerErrors, "passconfirm", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("passconfirm")) {
                    registerErrors.passconfirm = 'error'
                }
            }
            if (registerErrors.password == 'error') {
                passconfirmErrorRegister.style.color = 'red'
                passconfirmErrorRegister.textContent = `Debes crear una contraseña valida`
                if (!registerErrors.hasOwnProperty("passconfirm")) {
                    Object.defineProperty(registerErrors, "passconfirm", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("passconfirm")) {
                    registerErrors.passconfirm = 'error'
                }
            }
            if (passConfirminputValue != passwordCompare && registerErrors.password == 'correct') {
                passconfirmErrorRegister.style.color = 'red'
                passconfirmErrorRegister.textContent = `Las contraseñas no coinciden`
                if (!registerErrors.hasOwnProperty("passconfirm")) {
                    Object.defineProperty(registerErrors, "passconfirm", {
                        value: "error",
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    });
                }
                if (registerErrors.hasOwnProperty("passconfirm")) {
                    registerErrors.passconfirm = 'error'
                }
            }
            if (passConfirminputValue == passwordCompare && registerErrors.password == 'correct') {
                passconfirmErrorRegister.style.color = 'green'
                passconfirmErrorRegister.textContent = `Las contraseñas coinciden`
                if (!registerErrors.hasOwnProperty("passconfirm")) {
                    Object.defineProperty(registerErrors, "passconfirm", {
                        value: 'correct',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("passconfirm")) {
                    registerErrors.passconfirm = 'correct'
                }
            }

        })
        passwordConfirmInput.addEventListener('blur', (e) => {
            passconfirmErrorRegister.textContent = ''
            passconfirmErrorRegister.style.margin = '0%'
            if (registerErrors.passconfirm == 'error') {
                passwordConfirmInput.style.border = "1px solid red";
            }
            if (registerErrors.passconfirm == 'correct') {
                passwordConfirmInput.style.border = "1px solid green";
            }
        })
        // ***************************************************************************
        ageInput.addEventListener('keyup', (event) => {
            const birthdate = new Date(ageInput.value);
            const ageCal = (new Date() - birthdate) / (365 * 24 * 60 * 60 * 1000);
            const cleanNum = Math.floor(ageCal)
            if (ageCal >= 21) {
                ageErrorRegister.textContent = 'Edad permitida'
                ageErrorRegister.style.color = 'green'
                if (!registerErrors.hasOwnProperty("age")) {
                    Object.defineProperty(registerErrors, "age", {
                        value: 'correct',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                    //*****************************************************
                    if (!registerData.hasOwnProperty('age')) {
                        Object.defineProperty(registerData, 'age', {
                            value: cleanNum,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('age')) {
                        registerData.age = ageCal
                    }
                    //*****************************************************
                }
                if (registerErrors.hasOwnProperty("age")) {
                    registerErrors.age = 'correct'
                    //*****************************************************
                    if (!registerData.hasOwnProperty('age')) {
                        Object.defineProperty(registerData, 'age', {
                            value: cleanNum,
                            enumerable: true,
                            writable: true,
                            configurable: true,
                        })
                    }
                    if (registerData.hasOwnProperty('age')) {
                        registerData.age = ageCal
                    }
                    //*****************************************************
                }
            }
            if (ageCal < 21) {
                ageErrorRegister.textContent = 'No estas permitido'
                ageErrorRegister.style.color = 'red'
                if (!registerErrors.hasOwnProperty("age")) {
                    Object.defineProperty(registerErrors, "age", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("age")) {
                    registerErrors.age = 'error'
                }
            }
            if (!ageCal) {
                ageErrorRegister.textContent = 'Debes ingresar una edad valida'
                ageErrorRegister.style.color = 'red'
                if (!registerErrors.hasOwnProperty("age")) {
                    Object.defineProperty(registerErrors, "age", {
                        value: 'error',
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
                if (registerErrors.hasOwnProperty("age")) {
                    registerErrors.age = 'error'
                }
            }
        })
        ageInput.addEventListener('blur', (e) => {
            ageErrorRegister.textContent = ''
            ageErrorRegister.style.margin = '0%'
            if (registerErrors.age == 'error') {
                ageInput.style.border = "1px solid red";
            }
            if (registerErrors.age == 'correct') {
                ageInput.style.border = "1px solid green";
            }
        })
        // ***************************************************************************
        isAdminInput.addEventListener('blur', (e) => {
            const selectedValue = e.target.value;
            isAdminInput.style.border = "1px solid green";
            if (!registerData.hasOwnProperty('admin')) {
                Object.defineProperty(registerData, 'admin', {
                    value: selectedValue,
                    enumerable: true,
                    writable: true,
                    configurable: true,
                })
            }
            if (registerData.hasOwnProperty('admin')) {
                registerData.admin = selectedValue
            }
        })
        // ***************************************************************************
        // ***************************************************************************
        buttonRegister.addEventListener('click', async (e) => {
            e.preventDefault()
            const errorsArray = Object.entries(registerErrors)
            const registerDataArray = Object.entries(registerData)
            const verificationCheck = {}

            errorsArray.forEach((element, index) => {
                console.log(`error ${index} : ${element[0]} - ${element[1]}`);
                if (element[1] != 'correct') {
                    verificationCheck.errors.element[0] = 'error'
                }
            })

            if (verificationCheck.errors) {
                // ERROR HERE
            } else {
                // *************FINISH*********************** 
                const apiFetch = await fetch("/api/users/register", {
                    method: "POST",
                    body: JSON.stringify(registerData),
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json"
                    },
                })
                const resApi = await apiFetch.json()
                if (resApi.info.status == 200) {
                    delete resApi.data.password
                    sessionStorage.setItem('userLogged', resApi.data)
                    window.location.href = '/'
                }
                if (resApi.info.status == 400) {
                    if (resApi.info.msg == 'The user is already on the database') {
                        return mainErrorRegister.textContent = resApi.info.msg
                    } else {
                        return emailAlert.textContent = 'Informacion invalida'
                    }
                }
                // *****************************************
            }

        })


    }

};