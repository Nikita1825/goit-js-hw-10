import './css/styles.css';
import API from "./fetchCountries"
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;



const debounce = require('lodash.debounce');
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const value = e.target.value.trim();
    console.log(e.target.value);
    clear()

    if (value) {
        API.fetchCountrys(value)
            .then(promiseCountry)
            .catch(onError)
    }
}

function promiseCountry(countrys) {
    if (countrys.length === 1) {
         userList(countrys);
        
    } else if (countrys.length >= 2 && countrys.length <= 10) {
        userListOne(countrys);
    }
    else {
         Notiflix.Notify.info(
           'Too many matches found. Please enter a more specific name.'
         );
    }
    return
}
 

function userListOne(countrys) {
    const markupList = countrys
      .map(({ name, flags }) => {
        return `<li class="country-item">
                <img src="${flags.svg}" width="36" height="24" alt="${name}">
                <h2 class="country-item-title">${name.official}</h2>
             </li>`;
      })
      .join('');
    countryList.innerHTML = markupList;
}











function userList(countrys) {
    
    const markup = countrys.map(({
       name, 
      capital,
      population,
      flags,
      languages,
    }) => {
        const languagesList = Object.values(languages).join(', ');
        return `<div class="country-item-wrap">
                  <img src="${flags.svg}" width="36" height="24" alt="${name}">
                  <h2 class="country-item-title">${name.official}</h2>
               </div>
               <p><b>Capital: </b>${capital}</p>
               <p><b>Population: </b>${population}</p>
               <p><b>Languages: </b>${languagesList}</p>`;
    })
    .join("");
    info.innerHTML = markup;
}

function clear() {
    countryList.innerHTML = "";
    info.innerHTML = ""
}
function onError(error) {
 
  Notiflix.Notify.failure('Oops, there is no country with that name');
}