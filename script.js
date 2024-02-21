//debugger;

/*
 #000 - TABLE OF CONTENTS
 ------------------
 To jump to a section use CTRL-F and type # followed by the section number.
 For example, #000 will bring you to the Table of Contents
 ------------------
 001 - Assignment Code
 002 - Global Variables
 003 - Functions
    F01 - Generate Password
    F02 - Set Length
    F03 - Load Array
    F04 - Validation Passed
    F05 - Array to String
*/


// #001 - Assignment Code
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


//----------------------------------------
// STUDENT CODE BELOW THIS LINE
//----------------------------------------

// #002 - GLOBAL VARIABLES
//----------------------------------------
// This global variable contains arrays containing the characters that are allowed to exist in the password
// This was made global because these are used across multiple functions and can be called without having to pass them back and forth

const approvedChars = {
  letters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"], //only one set of letters is needed and the toUpperCase() function can be used 
  numbers: ["0","1","2","3","4","5","6","7","8","9"],
  specials: ["!","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~",'"','\\']
};


// #003 - FUNCTIONS
//----------------------------------------
//
// #F01 - Generate Password
//----------------------------------------
// This is the main function called by the Assignment code above.
// It calls all functions neccesary to create the password and returns the completed string 

function generatePassword(){
  var passwordData = { //The main variable storing all information about the password
    passwordLength: 0,
    upperApproved: false,
    lowerApproved: false,
    numbersApproved: false,
    specialsApproved: false,
    passwordArray: []
  }
  
  passwordData.passwordLength = setLength();
  
  if(passwordData.passwordLength === undefined){ //This allows for a client to cancel generating a password
    return;
  }

  do{
    passwordData.upperApproved = confirm("Would you like to include uppercase letters?");
    passwordData.lowerApproved = confirm("Would you like to include lowercase letters?");
    passwordData.numbersApproved = confirm("Would you like to include numbers?");
    passwordData.specialsApproved = confirm("Would you like to include special characters?\n( !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)");
    if(!passwordData.lowerApproved && !passwordData.upperApproved && !passwordData.numbersApproved && !passwordData.specialsApproved){ //This check makes sure at least one criteria has been selected
      alert("At least one criteria must be chosen.");
    }
  }while(!passwordData.lowerApproved && !passwordData.upperApproved && !passwordData.numbersApproved && !passwordData.specialsApproved);

  loadArray(passwordData);
  
  return arrayToString(passwordData);
}

// #F02 - Set Length
//----------------------------------------
// This function sets the length the password should be based on the user input. 

function setLength(){
  var entry;
  var cancelCheck = null; //This allows a client to decided to not make a password
  var isValid = false;

  do{
    entry = prompt("How long would you like your password to be?"+
      "\n(password must be between 8 and 128 characters long)"
    );

    if(entry === cancelCheck){
      isValid = confirm("Do you wish to cancel?");  
    }else{
      var n = Number(entry);
    
      if(isNaN(n) || !(n>=8 && n<=128)){        //Ensures input doesn't violate set parameters
        alert("Your entry was invalid. Please try again.");
      }else{
        isValid = true;
      }
    }

  }while(!isValid);
  return n;
}

// #F03 - Load Array
//----------------------------------------
// This function actually builds the password, randomly, character by character and stores it into an array

function loadArray(passedData){
  passedData.passwordArray.length = passedData.passwordLength; //Sets the length of the array to be made
   
  do{
    for(var i = 0 ; i<passedData.passwordLength; i++){
      do{                                                                   //This loop ensures that the selected array slot is empty
        var n = Math.floor(Math.random()*passedData.passwordLength);
      }while(passedData.passwordArray[n] !== undefined);

      while(passedData.passwordArray[n] === undefined){   //This loop inserts a random approved character into the array slot
        var p =Math.floor(Math.random()*4);
        switch(p){
          case 0:
            if(passedData.upperApproved){   //This ensures that only the approved criteria are entered into the array
              passedData.passwordArray[n] = approvedChars.letters[Math.floor(Math.random()*approvedChars.letters.length)].toUpperCase();  
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
    
    /*
    // for(var x= 0; x<passedData.passwordArray.length; x++){ //The following code exist for error checking purposes and doesn't effect function
    //   console.log(passedData.passwordArray[x]);
    // }  
    */

  }while(!validationPassed(passedData)); //This loop continues until a valid password is created
}

// #F04 - Validation Passed
//----------------------------------------
// This function checks the completed password array to ensure there are no null characters and that all the requested criteria are met

function validationPassed(passedData){
  var isPresent;
  var allPassed = true;

  // This loop checks for blank spaces in the array
  for(var i = 0; i < passedData.passwordArray.length; i++){  
    if(passedData.passwordArray[i]===undefined){
      allPassed =false;
    }
  }

  // This loop checks if uppercase letters are required and will only run if the validation has not already failed at an earlier step
  // If the criteria is met, it makes sure that at least one instance of the required character exists
  if(passedData.upperApproved && allPassed){  
    isPresent = false;
    for(var x= 0; x<approvedChars.letters.length; x++){
       isPresent = passedData.passwordArray.includes(approvedChars.letters[x].toUpperCase());
       if(isPresent){
        break;
       }
    }
    allPassed = isPresent;
  }

  // This loop checks if lowercase letters are required and will only run if the validation has not already failed at an earlier step
  // If the criteria is met, it makes sure that at least one instance of the required character exists
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

  // This loop checks if numbers are required and will only run if the validation has not already failed at an earlier step
  // If the criteria is met, it makes sure that at least one instance of the required character exists
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

  // This loop checks if special characters are required and will only run if the validation has not already failed at an earlier step
  // If the criteria is met, it makes sure that at least one instance of the required character exists
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

// #F05 - Array to String
//----------------------------------------
// This function converts the completed array into a string for output

function arrayToString(passedData){
  var finalString = "";

  for(var x= 0; x<passedData.passwordArray.length; x++){
    finalString = finalString + passedData.passwordArray[x];
  } 

  //console.log(finalString);  //This line exist for error checking

  return finalString;
}