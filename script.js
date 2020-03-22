// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword (){
  if (passwordLength <8 = passwordLength > 128){
    alert("Enter password length between 8 and 128.");
  }
}

else{
  var
}

var passwordLength = prompt("How long do you want your password?")

var chartypes = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  numbers: "0123456789"
  Symbols: "!@#$%^&*()_+{}[]\:;<,>.?/"
}

if (
  includeLowerCase === false &&
  includeUpperCase === false &&
)