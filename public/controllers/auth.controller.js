export function init() {
    console.log("auth controller loaded");

    const btnRegister = document.getElementById("btn-register");
    const btnLogin = document.getElementById("btn-login");
    
    const loginUsernameInput = document.getElementById("login-username-input");
    const loginPasswordInput = document.getElementById("login-password-input");

    const registerUsernameInput = document.getElementById("register-username-input");
    const registerEmailInput = document.getElementById("register-email-input");
    const registerPasswordInput = document.getElementById("register-password-input");
    const registerPasswordConfirmInput = document.getElementById("register-password-confirm-input");

    const registerInputList = [
        registerUsernameInput,
        registerEmailInput,
        registerPasswordInput,
        registerPasswordConfirmInput
    ];
    
    const loginInputList = [
        loginUsernameInput,
        loginPasswordInput
    ];

    const usernameRegex =  /^[a-zA-Z0-9_-]{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    
     function addLoader (color = '#FFF')
        {return ` <style>.loader-container{ display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;} .loader{ width: 30px; height: 30px; animation: rotate 1s linear infinite;} .loader circle{ stroke: ${color}; stroke-width: 4; fill: none; stroke-dasharray: 100; stroke-dashoffset: 0; animation: dash 1.5s ease-in-out infinite;} @keyframes rotate{ 0%{ transform: rotate(0deg);} 100%{ transform: rotate(360deg);}} @keyframes dash{ 0%{ stroke-dashoffset: 100;} 50%{ stroke-dashoffset: 50;} 100%{ stroke-dashoffset: 100;}} </style><div class="loader-container"><svg class="loader" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="${color}" stroke-width="4" fill="none"></circle></svg></div>`;}
    
    
    function isFormValid (inputList,classToCheck){
        let isValid = true;
        inputList.forEach((input)=>{
            if(input.closest("fieldset").classList.contains(classToCheck)){
                isValid = false;
            }
        });
        return isValid;
    };

    function animate(element,animationClass){
        element.classList?.remove(animationClass);
        void element.offsetWidth; // Force reflow
        element.classList.add(animationClass);
    }
    function validate(input,regex,className){
        (input.value.trim() == "" || !(regex).test(input.value)) ?
        animate(input.closest("fieldset"),className):
        input.closest("fieldset").classList.remove(className);
    }
    function cleanInput(inputList){
        inputList.forEach((input)=>{
            input.value="";
        })
    }

    function handler(flag="") {
        if(flag=="login"){
            let loginUsername = loginUsernameInput?.value.trim();
            let loginPassword = loginPasswordInput?.value.trim();

            let userData = {
                flag : "login",
                username : loginUsername,
                password : loginPassword
            };

            //login form client side validation
            loginInputList.forEach((input)=>{
                switch(input.id){
                    case "login-username-input":
                        validate(input ,usernameRegex , 'not-ok');
                        break;
                    case "login-password-input" :
                        validate(input , passwordRegex , 'not-ok');
                    break;
                }
            });
            let loginFormValid = (isFormValid(loginInputList,'not-ok'));
            
            //submitting data if form is valid
            if(loginFormValid){
                console.log(userData);
                // btnLogin.innerHTML= addLoader();
                cleanInput(loginInputList);
            }
        }
        if(flag=="register"){
            let registerUsername = registerUsernameInput?.value.trim();
            let registerEmail = registerEmailInput?.value.trim();
            let registerPassword = registerPasswordInput?.value.trim();
            let registerConfirm = registerPasswordConfirmInput?.value.trim();

            let userData = {
                flag : "register",
                username : registerUsername,
                email : registerEmail,
                password : registerPassword,
                confirmPassword : registerConfirm,
            };

            //register form client side validation
            registerInputList.forEach((input)=>{
                switch(input.id){
                    case "register-username-input":
                        validate(input ,usernameRegex , 'not-ok');
                    break;
                    case "register-email-input":
                        validate(input, emailRegex , 'not-ok');
                    break;
                    case "register-password-input" :
                        validate(input , passwordRegex , 'not-ok');
                    break;
                    case "register-password-confirm-input":
                        validate(input , passwordRegex , 'not-ok');
                    break;
                }
            });

            if(registerConfirm!="" && registerPassword!=""){
                if(registerPassword != registerConfirm){
                    const fieldsetElement1 = registerPasswordInput.closest("fieldset");
                    animate(fieldsetElement1,'not-ok');
                    const fieldsetElement2 = registerPasswordConfirmInput.closest("fieldset");
                    animate(fieldsetElement2,'not-ok');
                }else{
                    registerPasswordInput.closest("fieldset").classList.remove('not-ok');
                    registerPasswordConfirmInput.closest("fieldset").classList.remove('not-ok');
                }
            }

            let registerFormValid = (isFormValid(registerInputList,'not-ok'));
            
            //submitting data if form is valid
            if(registerFormValid){
                console.log(userData);
                cleanInput(registerInputList);
            }
        }
    }
    
    const onRegisterClick = () => handler("register");
    const onLoginClick = () => handler("login");

    btnRegister?.addEventListener("click", onRegisterClick);
    btnLogin?.addEventListener("click",onLoginClick);

    return () => {
        btnLogin?.removeEventListener("click", onLoginClick);
        btnRegister?.removeEventListener("click",onRegisterClick);
        console.log("auth controller unloaded");
    };
}
