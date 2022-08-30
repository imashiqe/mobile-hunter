const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
    // console.log(data.data);

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    //display 20 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 5){
        phones = phones.slice(0, 5);
       
        showAll.classList.remove('d-none');

    }
    else{
      showAll.classList.add('d-none');
    }

    //display  no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
       noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    //display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        
        <div class="card p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
             
          </div>
        </div>
      
        
        `;

        phonesContainer.appendChild(phoneDiv);
    });

    //stop spinner or loader
    toggleSpinner(false);
}
// handle  search button click

// search input  field enter key handler
document.getElementById('search-field').addEventListener('keypress' , function(e){
    console.log(e.key);
    if(e.key === 'Enter'){
       processSearch();
    }
})

// function
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const SearchField = document.getElementById('search-field');
    const searchText = SearchField.value; 
    loadPhones (searchText , dataLimit);
}

// search
document.getElementById('btn-search').addEventListener('click' , function(){
    //start loader 
    // toggleSpinner(true);
    // const SearchField = document.getElementById('search-field');
    // const searchText = SearchField.value; 
    // loadPhones(searchText);
    processSearch(10)

})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click' , function(){
    processSearch();
})


// phone detail
  const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }

// loadPhones();