import {getBookByISBNMultiple} from "./database.js";

let reqBody = new Array();

//check for duplicates
async function checkDuplicates(reqBody){
    let isbnArray = reqBody.reduce((acc,current) => {
        acc.push(current.isbn13);
        return acc;
    }, []);
    let duplicates = await getBookByISBNMultiple(isbnArray);
    if (duplicates.length > 0){
        console.log('a book with the same isbn already exists');
        return false;
    }
    else {
        return true; //no duplicates found
    }
}

function checkSixValues(reqBody){
    let returnValue = false;
    reqBody.forEach(x => {
        if ((Object.keys(x).length) != 6){
            console.log(x, "has an invalid number of entries");
            returnValue = false;
        } else {
        returnValue = true;
        }
    });
    return returnValue;
}

function areValidStrings(reqBody){
    let returnValue = false;
 reqBody.forEach((y,objIndex) => {
    Object.values(y).forEach((z,valindex) => {
        //console.log(z);
        if(typeof z !== 'string') {
            console.log(`Object ${objIndex}, ${y} is not a string`)
            returnValue = false;
        }
        else {
            returnValue = true;
        }
    });
 });
 return returnValue; //no duplicates found
}

export async function inputValidation(scraperRequest){
    //reqBody request is an array of objects
    reqBody = JSON.parse(scraperRequest);

    //new architecture, list of flags (true or false)
    const sixValues = checkSixValues(reqBody);
    const valuesAreStrings = areValidStrings(reqBody);
    const noDuplicates = await checkDuplicates(reqBody);
    //undefined doesn't show up as 0 :/
    const numberOfBooks = reqBody.length;

    if (sixValues && valuesAreStrings && noDuplicates){
        console.log("input array is valid");
        return numberOfBooks; //
    }
    else {
        console.log("invalid input array, check console");
        return 0;
    }
}