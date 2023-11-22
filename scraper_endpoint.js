import { JSONtoDB } from "./database.js";
import {getBookByISBNMultiple} from "./database.js";

//check for duplicates
async function checkDuplicates(reqBody){
    let isbnArray = reqBody.reduce((acc,current) => {
        acc.push(current.isbn13);
        return acc;
    }, []);
    console.log(await getBookByISBNMultiple(isbnArray));
}

export function inputValidation(scraperRequest){
    //reqBody request is an array of objects
    let reqBody = JSON.parse(scraperRequest);
    let numberOfBooks = Object.keys(reqBody).length;

    //check if object has all six values
    reqBody.forEach(x => {
        if ((Object.keys(x).length) != 6){
            console.log(x, "has an invalid number of entries");
        } ;
    });
    //"naive" validation (stupid)
    //is every element in every object a string
    reqBody.forEach(x => {
        if (typeof x.title !== 'string'){
            console.log(x.title, "is not a string");
        }
        if (typeof x.subtitle !== 'string'){
            console.log(x.subtitle, "is not a string");
        }
        if (typeof x.isbn13 !== 'string'){
            console.log(x.isbn13, "is not a string");
        }
        if (typeof x.price !== 'string'){
            console.log(x.price, "is not a string");
        }
        if (typeof x.image !== 'string'){
            console.log(x.image, "is not a string");
        }
        if (typeof x.url !== 'string'){
            console.log(x.url, "is not a string");
        }
    });
    checkDuplicates(reqBody);
}