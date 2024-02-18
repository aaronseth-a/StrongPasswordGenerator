//debugger;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if(password === undefined){
    return;
  }
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);





var approvedChars = {
  letters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  numbers: ["0","1","2","3","4","5","6","7","8","9"],
  specials: ["!","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~",'"','\\']
};

function generatePassword(){
  var createdPassword = "";
  var passwordData = {
    passwordLength: 0,
    upperApproved: false,
    lowerApproved: false,
    numbersApproved: false,
    specialsApproved: false,
    passwordArray: []
  }
  passwordData.passwordLength = setLength();
  if(passwordData.passwordLength === undefined){
    return;
  }
  do{
    passwordData.upperApproved = confirm("Would you like to include uppercase letters?");
    passwordData.lowerApproved = confirm("Would you like to include lowercase letters?");
    passwordData.numbersApproved = confirm("Would you like to include numbers?");
    passwordData.specialsApproved = confirm("Would you like to include special characters?\n( !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)");
    if(!passwordData.lowerApproved && !passwordData.upperApproved && !passwordData.numbersApproved && !passwordData.specialsApproved){
      alert("At least one criteria must be chosen.");
    }
  }while(!passwordData.lowerApproved && !passwordData.upperApproved && !passwordData.numbersApproved && !passwordData.specialsApproved);

  loadArray(passwordData);

  createdPassword = arrayToString(passwordData);  

  return createdPassword;
}

function setLength(){
  var entry;
  var cancelCheck = null;
  var isValid = false;

  do{
    entry = prompt("How long would you like your password to be?"+
      "\n(password must be between 8 and 128 characters long)"
    );

    if(entry === cancelCheck){
      isValid = confirm("Do you wish to cancel?");  
    }else{
      var n = Number(entry);
    
    
      if(isNaN(n) || !(n>=8 && n<=128)){
        alert("Your entry was invalid. Please try again.");
      }else{
        isValid = true;
      }
    }

  }while(!isValid);
  return n;
}

function loadArray(passedData){
  passedData.passwordArray.length = passedData.passwordLength;
  
 
 
  do{
 
 
    for(var i = 0 ; i<passedData.passwordLength; i++){
      do{
        var n = Math.floor(Math.random()*passedData.passwordLength);
      }while(passedData.passwordArray[n] !== undefined);

      while(passedData.passwordArray[n] === undefined){
        var p =Math.floor(Math.random()*4);
        switch(p){
          case 0:
            if(passedData.upperApproved){
              var l =approvedChars.letters[Math.floor(Math.random()*approvedChars.letters.length)].toUpperCase();
              passedData.passwordArray[n] =  l;  
            }
            break;
          case 1:
            if(passedData.lowerApproved){
              passedData.passwordArray[n] = approvedChars.letters[Math.floor(Math.random()*approvedChars.letters.length)];
            } 
            break;
          case 2: 
            if(passedData.numbersApproved){
              passedData.passwordArray[n] = approvedChars.numbers[Math.floor(Math.random()*approvedChars.numbers.length)];
            }
            break;
          case 3: 
            if(passedData.specialsApproved){
              passedData.passwordArray[n] = approvedChars.specials[Math.floor(Math.random()*approvedChars.specials.length)];
            }
            break;
        }
      }  

    }

    
    for(var x= 0; x<passedData.passwordArray.length; x++){
      console.log(passedData.passwordArray[x]);
    }  
  


  }while(!validatePassed(passedData));

}

function validatePassed(passedData){
  var isPresent;
  var allPassed = true;

  for(var i = 0; i < passedData.passwordArray.length; i++){
    if(passedData.passwordArray[i]===undefined){
      allPassed =false;
    }
  }
  if(passedData.upperApproved && allPassed){
    isPresent = false;
    for(var x= 0; x<approvedChars.letters.length; x++){
       var l = approvedChars.letters[x].toUpperCase(); 
       var test = passedData.passwordArray.includes(l);
       isPresent = test;
       if(isPresent){
        break;
       }
    }
    allPassed = isPresent;
  }
  if(passedData.lowerApproved && allPassed){
    isPresent = false;
    for(var x= 0; x<approvedChars.letters.length; x++){
       isPresent = passedData.passwordArray.includes(approvedChars.letters[x]);
       if(isPresent){
        break;
       }
    }
    allPassed = isPresent;
  }
  if(passedData.numbersApproved && allPassed){
    isPresent = false;
    for(var x= 0; x<approvedChars.letters.length; x++){
       isPresent = passedData.passwordArray.includes(approvedChars.numbers[x]);
       if(isPresent){
        break;
       }
    }
    allPassed = isPresent;
  }
  if(passedData.specialsApproved && allPassed){
    isPresent = false;
    for(var x= 0; x<approvedChars.letters.length; x++){
       isPresent = passedData.passwordArray.includes(approvedChars.specials[x]);
       if(isPresent){
        break;
       }
    }
    allPassed = isPresent;
  }

  return allPassed;
}

function arrayToString(passedData){
  var finalString = "";
  for(var x= 0; x<passedData.passwordArray.length; x++){
    finalString = finalString + passedData.passwordArray[x];
  } 
  console.log(finalString);
  return finalString;
}