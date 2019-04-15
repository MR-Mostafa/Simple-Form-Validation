(function(){
    // declare variables
    var form, div, input, inpName, inpUserName, inpPassword, inpEmail, inpPhone, btn, elmError, nameReg, userNameReg, passReg, emeilReg, phonReg, errorMsg;

    form = document.getElementById('form');
    div = document.querySelectorAll('#form > div.form-group');
    input = document.querySelectorAll('#form input');
    inpName = div[0].querySelector('input');
    inpUserName = div[1].querySelector('input');
    inpPassword = div[2].querySelector('input');
    showPassword = div[2].querySelector('.far');
    inpEmail = div[3].querySelector('input');
    inpPhone = div[4].querySelector('input');
    btn = document.querySelectorAll('#form button');
    elmError = document.getElementById('error');
    nameReg = /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیءَُِّةأإيئؤكٔa-zA-Z ]+$/;
    userNameReg = /^[a-zA-Z0-9\.\-\_]+$/;
    passReg = /^(?=.*[!@#$%^&*(),.?\-\[\]\\=+":{}|<>].*[!@#$%^&*(),.?\-\[\]\\=+":{}|<>]).+/;
    // The email value shoud not statr with a dot, hyphen or underscore (.-_) Ex: _test@test.com not valid.
    // The character befor at (@) shod not be a dot, hyphen or underscore (.-_) Ex: test-@test.com not valid.
    // domain name at the end of email value must be 2 or more characters. Ex: test@test.c not valid
    emeilReg = /^(((?!\.|\-|_)([a-zA-Z0-9_\-\.]*)([^\.|\-\_]))@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+){2,})$/;
    // The number value can be a mobile number or Telephone number.
    // The Telephone number must be include with provincial Code. ex: 021, 009821, 21.
    // The mobile number must be more than 10 number and Telephone number must be more than 8 number.
    // More information: http://bit.ly/2VzLZeb
    phonReg = /^(0|0098|098|98|\+98|(?!){0,4})(9[0-4|9]{1}[0-9]{1})([0-9]{7})|(0098|098|98|\+98|(?!){0,4})(0{0,1}[1-8]{2})([0-9]{8})$/;

    // The error messages
    errorMsg = {
        notEmpty: ' نباید خالی باشد.',
        lessThan3Characters: ' باید بیشتر از 6 کارکتر باشد.',
        notMore30Characters: ' نباید بیش از 30 کاراکتر باشد',
        invalidWord: ' از حروف غیرمجاز استفاده شده است.',
        passMore8Characters: 'رمز عبور باید بیشتر از 8 کارکتر داشته باشد.',
        specialCharactersInPass: 'در رمز عبور حداقل باید دو کاراکتر ویژه مانند (*.$#@) وجود داشته باشد.',
        emailNotValid: 'نحوه‌ی نگارش پست‌ الکترونیکی صحیح نمی‌باشد.',
        tellMore7Characters: 'شماره تماس وارده باید بیش از 7 عدد باشد.',
        tellNotValid: 'شماره تماس وارد شده صحیح نمی‌باشد.'
    };


function checkValueAfterSubmit(e){
    var textErrorMsg, hasError, node, selectUL;
    textErrorMsg = [];
    hasError = false;

    // remove all the invalid and success classes from the div
    for(var i = 0; i < div.length; i++){
        div[i].classList.remove('invalid', 'success');
    }

    for(var i = 0; i < div.length; i++){
        
        // checking that inputs are not empty
        if (input[i].value.trim().length == '') {
            textErrorMsg.push(input[i].placeholder + errorMsg.notEmpty);
            div[i].classList.add('invalid');
            hasError = true;
        }

        // value of input must be greater than 6 characters
        // i = 2 equal inpPassword
        // i = 3 equal inpEmail
        // i = 4 equal inpPhone
        // [0,1].includes(i) is mean i not 2,3,4 ==> Because the minimum allowed characters in these items should be greater than 6 characters. (Minimum length of 6 characters is not enough)
        if (input[i].value.trim().length < 6 && [0,1].includes(i) && hasError != true) {
            textErrorMsg.push(input[i].placeholder + errorMsg.lessThan3Characters);
            div[i].classList.add('invalid');
            hasError = true;
        }

        // The maximum length of the input must be less than 30 characters
        // i = 2 equal inpPassword
        // i = 3 equal inpEmail
        // i = 4 equal inpPhone
        // [0,1].includes(i) is mean i not 2,3,4 ==> Because the maximum allowed characters in these items can be greater than 30 characters
        if (input[i].value.trim().length >= 30 && [0,1].includes(i)) {
            textErrorMsg.push(input[i].placeholder + errorMsg.notMore30Characters);
            div[i].classList.add('invalid');
            hasError = true;
        }

    } // end for
    
    
    // Checks that the inpName has not been used by invalid characters
    // Allowed characters are: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیءَُِّةأإيئؤكٔa-zA-Z ]+$/
    if(!nameReg.test(inpName.value.trim()) && inpName.value.trim().length > 6){
        textErrorMsg.push('در ' + inpName.placeholder + errorMsg.invalidWord);
        inpName.parentElement.classList.add('invalid');
        hasError = true;
    }

    // Checks that the inpUserName has not been used by invalid characters
    // Allowed characters are: /^[a-zA-Z0-9\.\-\_]+$/
    if(!userNameReg.test(inpUserName.value.trim()) && inpUserName.value.trim().length > 6){
        textErrorMsg.push('در ' + inpUserName.placeholder + errorMsg.invalidWord);
        inpUserName.parentElement.classList.add('invalid');
        hasError = true;
    }

    
    // First IF  : Checked the password and must be more than 8 characters
    // Second IF : Checks the password input that has been used by at least two specific characters
    if (inpPassword.value.length <= 8 ) {
        textErrorMsg.push(errorMsg.passMore8Characters);
        inpPassword.parentElement.classList.add('invalid');
        hasError = true;
    }else if(!passReg.test(inpPassword.value) && inpPassword.value != ''){
        textErrorMsg.push(errorMsg.specialCharactersInPass);
        inpPassword.parentElement.classList.add('invalid');
        hasError = true;
    }

    // Checks the Email that is correct or not?
    if(!emeilReg.test(inpEmail.value) && inpEmail.value != ''){
        textErrorMsg.push(errorMsg.emailNotValid);
        inpEmail.parentElement.classList.add('invalid');
        hasError = true;
    }

    // First IF  : Checked the phone number and must be more than 8 characters
    // Second IF : Checks the phone number that is correct or not? (The number value can be a mobile number or a tellphone number)
    if(inpPhone.value.length < 8 && inpPhone.value != ''){
        textErrorMsg.push(errorMsg.tellMore7Characters);
        inpPhone.parentElement.classList.add('invalid');
        hasError = true;
    }else if(!phonReg.test(inpPhone.value) && inpPhone.value != ''){
        textErrorMsg.push(errorMsg.tellNotValid);
        inpPhone.parentElement.classList.add('invalid');
        hasError = true;
    }

    // Checks that if the div they don't have 'invalid' class, then adds the 'success' class
    for(var i = 0; i < div.length; i++){
        if(div[i].classList.contains('invalid') == false){
            div[i].classList.add('success');
        }
    }

    // if hasError is equal true, then Displays the error message
    if(hasError == true){
        node = document.createElement('ul');
        elmError.appendChild(node);
        node.style.display = 'block';
        selectUL = document.querySelector('#error ul:last-child');
        for(var i = 0; i < textErrorMsg.length; i++){
            selectUL.innerHTML += "<li>" + textErrorMsg[i] + "</li>";
        }
        setTimeout(function(){
            node.style.display = 'none';
        }, 5850);
        e.preventDefault();
    }
    
} // end function checkValueAfterSubmit



// If the showErrorMsg parameter is equal true, it displays error message when the field focus out.
// default value for showErrorMsg parameter is equal false.
function checkValueAfterFocusout(e, showErrorMsg = false){
    var event, textErrorMsg, hasError, node, selectUL;
    event = e.target;
    textErrorMsg = [];
    hasError = false;


    // checking that event are not empty
    if (event.value.trim().length == '') {
        textErrorMsg.push(event.placeholder + errorMsg.notEmpty);
        event.parentElement.classList.add('invalid');
        hasError = true;
    }else{
        // value of event must be greater than 6 characters
        // ['name', 'username'].includes(event.id) This means the Element id should be 'name' and 'username'
        // Because the minimum allowed characters in these items should be greater than 6 characters. (Minimum length of 6 characters is not enough)
        if (event.value.trim().length < 6 && ['name', 'username'].includes(event.id)) {
            textErrorMsg.push(event.placeholder + errorMsg.lessThan3Characters);
            event.parentElement.classList.add('invalid');
            hasError = true;
        }

        // The maximum length of the event must be less than 30 characters
        // ['name', 'username'].includes(event.id) This means the Element id should be 'name' and 'username'
        // Because the maximum allowed characters in these items can be greater than 30 characters
        if (event.value.trim().length >= 30 && ['name', 'username'].includes(event.id)) {
            textErrorMsg.push(event.placeholder + errorMsg.notMore30Characters);
            event.parentElement.classList.add('invalid');
            hasError = true;
        }

        // If Element id was equal to 'name', then Checks this input that has not been used by invalid characters
        // Allowed characters are: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیءَُِّةأإيئؤكٔa-zA-Z ]+$/
        if(event.id == 'name'){
            if(!nameReg.test(inpName.value.trim())){
                textErrorMsg.push('در ' + inpName.placeholder + errorMsg.invalidWord);
                inpName.parentElement.classList.add('invalid');
                hasError = true;
            }
        }

        // If Element id was equal to 'username', then Checks this input that has not been used by invalid characters
        // Allowed characters are: /^[a-zA-Z0-9\.\-\_]+$/
        if(event.id == 'username'){
            if(!userNameReg.test(inpUserName.value.trim()) && inpUserName.value.trim().length > 6){
                textErrorMsg.push('در ' + inpUserName.placeholder + errorMsg.invalidWord);
                inpUserName.parentElement.classList.add('invalid');
                hasError = true;
            }
        }
        

        // First IF  : Checked the password and must be more than 8 characters
        // Second IF : Checks the password input that has been used by at least two specific characters
        if(event.id == 'password'){
            if (inpPassword.value.length <= 8) {
                textErrorMsg.push(errorMsg.passMore8Characters);
                inpPassword.parentElement.classList.add('invalid');
                hasError = true;
            }else if(!passReg.test(inpPassword.value)){
                textErrorMsg.push(errorMsg.specialCharactersInPass);
                inpPassword.parentElement.classList.add('invalid');
                hasError = true;
            }
        }   

        // Checks the Email that is correct or not?
        if(event.id == 'email'){
            if(!emeilReg.test(inpEmail.value) && inpEmail.value != ''){
                textErrorMsg.push(errorMsg.emailNotValid);
                inpEmail.parentElement.classList.add('invalid');
                hasError = true;
            }
        }

        // First IF  : Checked the phone number and must be more than 8 characters
        // Second IF : Checks the phone number that is correct or not? (The number value can be a mobile number or a tellphone number)
        if(event.id == 'phone'){
            if(inpPhone.value.length < 8 && inpPhone.value != ''){
                textErrorMsg.push(errorMsg.tellMore7Characters);
                inpPhone.parentElement.classList.add('invalid');
                hasError = true;
            }else if(!phonReg.test(inpPhone.value) && inpPhone.value != ''){
                textErrorMsg.push(errorMsg.tellNotValid);
                inpPhone.parentElement.classList.add('invalid');
                hasError = true;
            }

        }

    } // end main else



    // Checks that if the hasError equal to false, then adds the 'success' class
    if(hasError == false){
        event.parentElement.classList.remove('invalid');
        event.parentElement.classList.add('success');
    }else{
        event.parentElement.classList.remove('success');
        event.parentElement.classList.add('invalid');
    }

    // if hasError and showErrorMsg are equal true, then Displays the error message
    if(hasError && showErrorMsg == true){
        node = document.createElement('ul');
        elmError.appendChild(node);
        node.style.display = 'block';
        selectUL = document.querySelector('#error ul:last-child');
        for(var i = 0; i < textErrorMsg.length; i++){
            selectUL.innerHTML += "<li>" + textErrorMsg[i] + "</li>";
        }
        setTimeout(function(){
            node.style.display = 'none';
        }, 5850);
    }

} //end function checkValueAfterFocusout



// The parameter is mean the intervals (in milliseconds) on how often to execute the code
// default value for ms parameter is equal 100.
function showPasswordWithAnimation(ms = 100){
    var passValue, passValueLength, counter;
    passValue = inpPassword.value;
    passValueLength = passValue.length;
    counter = passValueLength;
    // The class 'clicked' is added to the element, to disable the re-clicking the element, for when the function is actived.
    showPassword.classList.add('clicked');
    // Add some styles to the element 
    inpPassword.style.outlineColor = '#007bff';
    inpPassword.style.borderColor = 'rgba(0,123,255,0.3)';
    inpPassword.style.backgroundColor = 'rgba(252,218,0,0.15)';
    // When the function is activated, the buttons are disabled to protect the form's submission
    for(var i = 0; i < btn.length; i++){
        btn[i].setAttribute('disabled','disabled');
    }
    // For more beauty, other elements will be disabled and and blurred
    for(var i = 0; i < div.length; i++){
        div[i].querySelector('input').setAttribute('disabled','disabled');
        if( i != 2){
            div[i].querySelector('input').style.opacity = '0.6';
            div[i].querySelector('i').style.opacity = '0.7';
        }
    }
  
    setTimeout(function() {
        removeText = setInterval(function(){
            if(passValueLength != 0){
                counter = --passValueLength;
                inpPassword.value = passValue.substring(0, counter);
            }else{
                if(inpPassword.type == 'password'){
                    showPassword.classList.add('fa-eye');
                    showPassword.classList.remove('fa-eye-slash');
                    inpPassword.type = 'text';
                }else{
                    showPassword.classList.remove('fa-eye');
                    showPassword.classList.add('fa-eye-slash');
                    inpPassword.type = 'password';
                }
                clearInterval(removeText);
                removeText = 0;
            }
        }, ms);
    },10)
     
    setTimeout(function() {
        typeText = setInterval(function() {
            if(counter != passValue.length){
                counter = ++counter;
                inpPassword.value = passValue.substring(0, counter);
            }else{
                for(var i = 0; i < btn.length; i++){
                    btn[i].removeAttribute('disabled');
                }
                for(var i = 0; i < div.length; i++){
                    div[i].querySelector('input').removeAttribute('disabled');
                    div[i].querySelector('input').removeAttribute('style');
                    div[i].querySelector('i').removeAttribute('style');
                }
                showPassword.classList.remove('clicked');
                clearInterval(typeText);
                typeText = 0;
            }
        }, ms+100);
    },ms*passValueLength);

}// end function showPasswordWithAnimation




var tip = document.querySelectorAll('#form .tip');
function changePositionOfTip(){
    var tipPosition = [];
    for(var i = 0; i < tip.length; i++){
        tip[i].classList.remove('bottom');
        tipPosition[i] = tip[i].getBoundingClientRect();
        if(tipPosition[i].top < 30){
            tip[i].classList.add('bottom');
        }
    }
}

function showTip(e){
    var event, hasTip;
    event = e.target;
    hasTip = event.parentElement.querySelector('.tip');
    if(hasTip){
        hasTip.classList.add('show');
    }
}
function hideTip(e){
    var event, hasTip;
    event = e.target;
    hasTip = event.parentElement.querySelector('.tip');
    if(hasTip){
        hasTip.classList.remove('show');
    }
}

// all event listenrs
form.addEventListener('click', function(e){
    checkValueAfterSubmit(e);
}, false);

form.addEventListener('focusout', function(e){
    if(e.target.tagName != 'BUTTON'){
        // If the second argument is equal true, it displays error message when the field focus out.
        checkValueAfterFocusout(e, false);
    }
}, false);

inpPassword.addEventListener('keyup', function(){
    // If the password value is more than one character, the show/hide password button will be displayed.
    if(inpPassword.value.length >= 1){
        showPassword.style.display = 'block';
    }else{
        showPassword.style.display = 'none';
    }
});

form.addEventListener('focusin', function(e){
    showTip(e);
}, false);
form.addEventListener('focusout', function(e){
    hideTip(e);
}, false);

showPassword.addEventListener('click', function(){
    // If the showPassword class is equal to clicked, this function will not be executed
    // To prevent the problem from being clicked again, this conditional is essential
    // The argument is mean the intervals (in milliseconds) on how often to execute the code
    if(showPassword.classList.contains('clicked') == false){
        showPasswordWithAnimation(150);
    }
});


window.addEventListener('load', function(){
    changePositionOfTip();
},false);
window.addEventListener('scroll', function(){
    changePositionOfTip();
},false);





}());