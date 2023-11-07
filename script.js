// First Name Validation
function restrictFirstNameInput() {
    var firstNameInput = document.forms["registrationForm"]["first_name"];
    // var firstNameInput = document.forms.registrationForm.first_name;
    var restrictedFirstName = firstNameInput.value.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
    var firstNameError = document.getElementById("first_name_error");

    // Ensure the first letter is capitalized
    restrictedFirstName = restrictedFirstName.charAt(0).toUpperCase() + restrictedFirstName.slice(1).toLowerCase();

    // Check for the condition where no three letters are repeated at the same time
    var threeRepeatedLettersPattern = /(.)\1\1/g;
    while (threeRepeatedLettersPattern.test(restrictedFirstName)) {
        restrictedFirstName = restrictedFirstName.replace(threeRepeatedLettersPattern, '$1$1');
        alert("3 same letters, Special Characters & Space are not allowed.");
    }

    firstNameInput.value = restrictedFirstName;

    if (firstNameInput.value.trim() === '') {
        firstNameInput.setCustomValidity("First Name is required.");
        firstNameError.innerText = "*Required! First Name must be Alphanumeric.";
    } else if(firstNameInput.value.length === 16){
        firstNameInput.setCustomValidity("16 characters allowed only");
        firstNameError.innerText = "*Maximum 16 Characters allowed.";
    } else{
        firstNameInput.setCustomValidity('');
        firstNameError.innerText = '';
    }
}

// Last Name Validation
function restrictLastNameInput() {
    var lastNameInput = document.forms["registrationForm"]["last_name"];
    var restrictedLastName = lastNameInput.value.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16).toLowerCase();
    var lastNameError = document.getElementById("last_name_error");

    // Ensure the first letter is capitalized
    restrictedLastName = restrictedLastName.charAt(0).toUpperCase() + restrictedLastName.slice(1);

    // Check for the condition where no three letters are repeated at the same time
    var threeRepeatedLettersPattern = /(.)\1\1/g;
    while (threeRepeatedLettersPattern.test(restrictedLastName)) {
        restrictedLastName = restrictedLastName.replace(threeRepeatedLettersPattern, '$1$1');
        alert("3 same letters, Special Characters & Space are not allowed.")
    }

    lastNameInput.value = restrictedLastName;

    if (lastNameInput.value.trim() === '') {
        lastNameInput.setCustomValidity("Last Name is required.");
        lastNameError.innerText = "*Required! Last Name must be Alphanumeric.";
    } else if(lastNameInput.value.length === 16){
        lastNameInput.setCustomValidity("16 characters allowed only");
        lastNameError.innerText = "*Maximum 16 characters allowed."
    } else{
        lastNameInput.setCustomValidity('');
        lastNameError.innerText = '';
    }
}

// Guardian Name Validation
function validateGuardianName() {
    var guardianNameInput = document.forms["registrationForm"]["guardian_name"];
    var guardianNameError = document.getElementById("guardian_name_error");
    var guardianName = guardianNameInput.value;

    // Remove special characters and extra spaces, keep only alphanumeric characters
    guardianName = guardianName.replace(/[^a-zA-Z0-9\s]/g, '');
    // Ensure first letter is capitalized
    guardianName = guardianName.charAt(0).toUpperCase() + guardianName.slice(1);
    // Prevent more than one consecutive space
    guardianName = guardianName.replace(/\s{2,}/g, ' ');
    // Prevent three consecutive letters
    guardianName = guardianName.replace(/(\w)\1\1/g, '$1$1');

    guardianName = guardianName.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });

    var wordCount = guardianName.split(/\s+/).length;

    if (wordCount > 4) {
        guardianName = guardianName.slice(0, 56);
        guardianNameInput.setCustomValidity("Invalid input. Maximum 4 words allowed.");
        guardianNameError.innerText = "*Invalid! Maximum 4 words allowed.";
    } else if(guardianName.length > 56){
        guardianName = guardianName.slice(0, 56);
        guardianNameInput.setCustomValidity("Only 56 characters allowed");
        guardianNameError.innerText = "*Maximum 56 characters allowed.";

    } else{
        guardianNameError.innerText = "";
    }

    var parts = guardianName.split(" ");
    if (parts.length < 2) {
        guardianNameError.innerText = "*Guardian Name must include both First and Last Name.";
        guardianNameInput.setCustomValidity("Invalid Guardian Name");
    }

    guardianNameInput.value = guardianName; // Update the field value

    // Check if the value has changed
    if(guardianName.value.trim() === ''){
        guardianNameError.innerText = "*Required! Alphanumeric only, no 3 repeated letters and max 56 characters.";
        guardianNameInput.setCustomValidity("Invalid input. Required");
    } else if (guardianNameInput.value !== guardianName) {
        guardianNameError.innerText = "*Invalid! Only alphanumeric, no 3 repeated letters and max 56 characters.";
        guardianNameInput.setCustomValidity("Invalid input.");
    } else{
        guardianNameError.innerText = "";
        guardianNameInput.setCustomValidity("");
    }
}

// Email Validation 
function validateEmail() {
    var emailInput = document.forms["registrationForm"]["email"];
    var emailError = document.getElementById("email_error");
    var email = emailInput.value;

    // Convert all letters to lowercase
    email = email.toLowerCase();

    // Use a regular expression to validate the email format
    var emailPattern = /^[a-z0-9]+[a-z0-9.]+[a-z0-9]*@[a-z]+\.[a-z]{2,}$/;

    if (email.match(emailPattern)) {
        // Separate the domain part from the email
        var parts = email.split('@');
        var localPart = parts[0];
        var domain = parts[1];

        // Use a regular expression to block spaces and other special characters in the local part
        var localPartPattern = /^[a-z0-9.]+$/;
         if (!localPart.match(localPartPattern)) {
            emailError.innerText = "Invalid email format. Local part should consist of lowercase letters and numbers only.";
            emailInput.setCustomValidity("Invalid email format");
        } else if (localPart.length < 3) {
            emailError.innerText = "*Invalid email format. Before @ email should have at least 3 characters.";
            emailInput.setCustomValidity("Invalid email format");
        } else {
            // Check if the domain has exactly one dot
            var domainParts = domain.split('.');
            if (domainParts.length === 2) {
                emailError.innerText = "";
                emailInput.setCustomValidity("");
            } else {
                emailError.innerText = "*Invalid email format. The domain should have one dot.";
                emailInput.setCustomValidity("Invalid email format");
            }
        }
    } else {
        emailError.innerText = "*Invalid!. Email must be in abc@abc.com format with no Space and Special Characters.";
        emailInput.setCustomValidity("Invalid email format");
    }
}

// Password Validation
function validatePassword() {
    var passwordInput = document.forms["registrationForm"]["password"];
    var confirmPasswordInput = document.forms["registrationForm"]["confirm_password"];
    var passwordError = document.getElementById("password_error");

    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (passwordInput.value.trim() === '') {
        passwordInput.setCustomValidity("Password is required.");
        passwordError.innerText = "*Password Required";
    } else if (password.length < 6 || password.length > 16 || /\s/.test(password)) {
        passwordInput.setCustomValidity("Password must be between 6 and 16 characters and cannot contain spaces.");
        passwordError.innerText = "*Invalid! Password must be between 6 and 16 characters and cannot contain spaces. It must also have at least 1 number and special character.";
    } else if (!/^[A-Z]/.test(password)) {
        passwordInput.setCustomValidity("Password must start with a capital letter.");
        passwordError.innerText = "*Invalid! Password must start with a capital letter.";
    } else if (!/[!@#\$%^&*0-9]/.test(password)) {
        passwordInput.setCustomValidity("Password must contain at least one special character and one number.");
        passwordError.innerText = "*Invalid! Password must contain at least one special character and one number.";
    } else {
        if (password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
            passwordError.innerText = "*Invalid! Passwords do not match.";
        } else {
            passwordInput.setCustomValidity('');
            confirmPasswordInput.setCustomValidity('');
            passwordError.innerText = '';
        }
    }
}

// DOB 
function dobValidation(){
    var dobInput = document.forms["registrationForm"]["dob"];
    var dobError = document.getElementById("dob_error");

    // dobError.innerText = '';

    if(dobInput.value.trim() === ''){
        dobInput.setCustomValidity("DOB is required.");
        dobError.innerText = "*DOB Required";
    } else{
        dobInput.setCustomValidity('');
        dobError.innerText = '';
    }
}

// Country Validation
function validateCountry() {
    var form = document.forms["registrationForm"];
    var countrySelect = form["country"];
    var mobileNumberInput = form["mobile_number"];
    var pinCodeInput = form["pin_code"];

    if (countrySelect.value === "India" || countrySelect.value === "USA" || countrySelect.value === "China") {
        // Enable the Mobile Number and PIN Code fields
        mobileNumberInput.value = "";
        mobileNumberInput.disabled = false;
        pinCodeInput.disabled = false;
    } else {
        // Disable the Mobile Number and PIN Code fields
        mobileNumberInput.disabled = true;
        pinCodeInput.disabled = true;
        // Clear any existing values in the fields
        mobileNumberInput.value = "";
        pinCodeInput.value = "";
    }
}

// Mobile Number Validation
function validateMobileNumber() {
    var mobileNumberInput = document.forms["registrationForm"]["mobile_number"];
    var mobileNumberError = document.getElementById("mobile_number_error");
    var selectedCountry = document.forms["registrationForm"]["country"].value;

    var mobileNumber = mobileNumberInput.value;

    if (mobileNumberInput.value.trim() === '') {
        mobileNumberInput.setCustomValidity("Required.");
        mobileNumberError.innerText = "*Required";
    } else if (selectedCountry === "India") {
        // var mobileNumberPattern = /^[0-9]{0,10}$/; // 10 digits
        var mobileNumberPattern = /^[6-9][0-9]{9,9}$/; // 10 digits

        if (!mobileNumberPattern.test(mobileNumber)) {
            mobileNumberInput.value = mobileNumber.replace(/[^0-9]/g, '').substring(0, 10);
            mobileNumberInput.setCustomValidity("Mobile number in India must start from 6 to 9 and must be 10-digit number.");
            mobileNumberError.innerText = "*Mobile number in India must start from 6 to 9 and must be 10-digit number.";
        } else {
            mobileNumberInput.setCustomValidity('');
            mobileNumberError.innerText = '';
        }
    } else if (selectedCountry === "USA") {
        var mobileNumberPattern = /^[1-9][0-9]{5,6}$/; // 7 digits

        if (!mobileNumberPattern.test(mobileNumber)) {
            mobileNumberInput.value = mobileNumber.replace(/[^0-9]/g, '').substring(0, 7);
            mobileNumberInput.setCustomValidity("Mobile number in the USA must be a 7-digit number.");
            mobileNumberError.innerText = "*Mobile number in the USA must be a 6 to 7 digit number only.";
        } else {
            mobileNumberInput.setCustomValidity('');
            mobileNumberError.innerText = '';
        }
    } else if (selectedCountry === "China") {
        var mobileNumberPattern = /^[1-9][0-9]{10,12}$/; // 1 to 13 digits

        if (!mobileNumberPattern.test(mobileNumber)) {
            mobileNumberInput.value = mobileNumber.replace(/[^0-9]/g, '').substring(0, 13);
            mobileNumberInput.setCustomValidity("Mobile number in China must be between 11 to 13 digits.");
            mobileNumberError.innerText = "*Mobile number in China must be a 11 to 13 digit number only.";
        } else {
            mobileNumberInput.setCustomValidity('');
            mobileNumberError.innerText = '';
        }
    } else {
        mobileNumberInput.setCustomValidity('');
        mobileNumberError.innerText = '';
    }
}

// Address Validation
function validateAddress() {
    var addressInput = document.forms["registrationForm"]["address"];
    var addressError = document.getElementById("address_error");
    var address = addressInput.value;

    // Remove special characters and extra spaces, keep only alphanumeric characters
    address = address.replace(/[^a-zA-Z0-9\s.,-/&]/g, '').substring(0, 128);
    // Ensure first letter is capitalized
    address = address.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
    // Prevent more than one consecutive space
    address = address.replace(/\s{2,}/g, ' ');
    // Prevent three consecutive letters
    address = address.replace(/(\D)\1\1/g, '$1$1');
    address = address.replace(/(\w)\1\1\1/g, '$1$1');

    // address = address.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);

    addressInput.value = address; // Update the field value

    // Check if the value has changed
    if(address.trim() === ''){
        addressError.innerText = "*Required";
        addressInput.setCustomValidity("*Required");
    } else if (addressInput.value !== address) {
        addressError.innerText = "Invalid input! no 3 repeated characters and max 128 characters.";
        addressInput.setCustomValidity("Invalid input.");
    } else if (address.length < 16 || address.length > 128) {
        addressError.innerText = "Invalid address format. Address must be between 16 and 128 characters.";
        addressInput.setCustomValidity("Invalid address format.");
    } else {
        addressError.innerText = "";
        addressInput.setCustomValidity("");
    }
}

// Pin Code Validation
function validatePinCode() {
    var pinCodeInput = document.forms["registrationForm"]["pin_code"];
    var pinCodeError = document.getElementById("pin_code_error");
    var selectedCountry = document.forms["registrationForm"]["country"].value;
    var pinCode = pinCodeInput.value;

    var pinCodePattern;

    if (selectedCountry === "India" || selectedCountry === "China") {
        pinCodePattern = /^[1-9][0-9]{5,5}$/; // 6 digits for India and China

        if(pinCode.trim() === ''){
            pinCodeInput.setCustomValidity('Required');
            pinCodeError.innerText = '*Required';
        } else if (!pinCodePattern.test(pinCode)) {
            pinCodeInput.value = pinCode.replace(/[^0-9]/g, '').substring(0, 6);
            pinCodeInput.setCustomValidity("ZIP in ${selectedCountry} must be a 6-digit number.");
            pinCodeError.innerText = `*ZIP Code in ${selectedCountry} must be a 6-digit number only.`;
        } else {
            pinCodeInput.setCustomValidity('');
            pinCodeError.innerText = '';
        }
    } else if (selectedCountry === "USA") {
        pinCodePattern = /^[1-9][0-9]{4,4}$/; // 5 digits for USA

        if(pinCode.trim() === ''){
            pinCodeInput.setCustomValidity('Required');
            pinCodeError.innerText = '*Required';
        } else if (!pinCodePattern.test(pinCode)) {
            pinCodeInput.value = pinCode.replace(/[^0-9]/g, '').substring(0, 5);
            pinCodeInput.setCustomValidity("ZIP in ${selectedCountry} must be a 5-digit number.");
            pinCodeError.innerText = `*ZIP Code in ${selectedCountry} must be a 5-digit number only.`;
        } else {
            pinCodeInput.setCustomValidity('');
            pinCodeError.innerText = '';
        }
    } else {
        pinCodeInput.setCustomValidity('');
        pinCodeError.innerText = '';
    }
}

// JavaScript validation to prevent selecting non-image files
function validateImage() {
    var imageInput = document.getElementById("image");
    var imageError = document.getElementById("imageError");

    imageInput.addEventListener("change", function () {
        var selectedFile = imageInput.files[0];
        if (selectedFile) {
            if (!/^image\/(jpg|jpeg|png)$/.test(selectedFile.type)) {
                imageInput.value = '';  // Clear the file input
                imageError.innerText = "*Invalid file format. Only JPG, JPEG and PNG images are allowed.";
            } else {
                imageError.innerText = '';  // Clear any previous error message
            }
        }
    });
}

// JavaScript validation to prevent selecting non-PDF files
function validatePdf() {
    var pdfInput = document.getElementById("pdf");
    var pdfError = document.getElementById("pdfError"); 

    pdfInput.addEventListener("change", function () {
        var selectedFile = pdfInput.files[0];
        if (selectedFile) {
            if (selectedFile.type !== "application/pdf") {
                pdfInput.value = '';  // Clear the file input
                pdfError.innerText = "*Invalid file format. Only PDF files are allowed.";
            } else {
                pdfError.innerText = '';  // Clear any previous error message
            }
        }
    });
}

// Register Button Validation
function validateForm() {
    var form = document.getElementById("registrationForm");
    var elements = form.elements;
    var allFieldsFilled = true;

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        // Skip validation for gender fields
        if (element.name === "gender") {
            continue;
        }

        if (element.required && element.value.trim() === "") {
            // Display error message for empty required fields
            element.nextElementSibling.innerText = `*${element.name} is required.`;
            allFieldsFilled = false;
        } else {
            // Clear any previous error messages
            element.nextElementSibling.innerText = "";
        }
    }
}

function formSubmit() {
    var form = document.forms["registrationForm"];
    var termsCheckbox = form["terms"];

    // Check if the terms checkbox is checked and all fields are valid
    if (termsCheckbox.checked && form.checkValidity()) {
        // Display a confirmation message
        alert("Form submitted successfully!");

        // Reset the form to clear all fields
        form.reset();
    }

    // Prevent form submission
    return false;
}