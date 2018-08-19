let nameInput = document.getElementById('nameInput');
let searchResultsBox = document.getElementById('searchResultsBox');
let confirmNameBtn = document.getElementById('confirmNameBtn');
let firstTenLoaded = false;
let searchResultsActive = false;
var typingTimer;                //timer identifier
var doneTypingInterval = 400;
let selectedName;
let nameData = [];
let searchNames = [];

//Fetch the JSON file with all the details
fetch('./names.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  
  
  for(let i = 0; i < myJson.people.length; i++){
    nameData.push(myJson.people[i]);
    nameData.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
  })

    if(i == (myJson.people.length - 1)){
      nameInput.style.display = "block";
      TweenMax.to(nameInput, 1.5, {opacity: 1})

      console.log(nameData);
    }
    
  }
    
  
});

nameInput.addEventListener("focus", showFirstNames);
nameInput.addEventListener("keyup", keyUp);
nameInput.addEventListener("keyDown", keyDown);
// document.body.addEventListener("click", HideSearchResults);

function showFirstNames(){

  let firstTenPeople = nameData.slice(0, 10);

  searchResultsBox.style.display = "block";
  confirmNameBtn.style.display = "none";

  searchResultsActive = true;
  

  if(!firstTenLoaded){
    for(let i = 0; i < firstTenPeople.length; i++){
      let searchResultBar = document.createElement("div");
      let textHolder = document.createElement("p");
      let delay = i * 0.1;
     
      searchResultBar.classList = "searchResultBar";
      searchResultBar.addEventListener("click", getSelectedName);
      textHolder.classList = "searchResultText";
  
      textHolder.innerHTML = `${firstTenPeople[i].name} - ${firstTenPeople[i].department}`
      searchResultBar.appendChild(textHolder);
      searchResultsBox.appendChild(searchResultBar);
  
      TweenMax.from(searchResultBar, 1, {delay: delay, opacity: 0, marginTop: "-3rem", zIndex: "-1"})

      if(i == (firstTenPeople.length - 1)){
        firstTenLoaded = true;
      }
  
  
    }

  }else{
    let searchResultBars = document.querySelectorAll('.searchResultBar');

    for(let i = 0; i < searchResultBars.length; i++){
      let searchResultBar = searchResultBars[i];
      let delay = (i * 0.05) - (i * 0.001) ;
      searchResultBar.style.display = "block";
      TweenMax.from(searchResultBar, 0.3, {delay: delay, opacity: 0, marginTop: "-3rem", zIndex: "-1"})
  
    }

  }


  
}

// function HideSearchResults(){
//   if(searchResultsActive){
//     searchResultsBox.style.display = 'none';
//     searchResultsActive = false;
//   }
  
  
// }

function keyUp(e){
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
function keyDown(e){
  clearTimeout(typingTimer);
}

function doneTyping (e) {
  showFirstNames();
  let nameToCompare = nameInput.value.toUpperCase();

  let searchResultBars = document.querySelectorAll('.searchResultBar');

    for(let i = 0; i < searchResultBars.length; i++){
      let searchResultBar = searchResultBars[i];
      searchResultBar.remove();
      console.log(searchNames)
      searchNames = [];
    
    }

    for (let i = 0; i < nameData.length; i++){

      if (nameData[i].name.toUpperCase().includes(nameToCompare.toUpperCase())){
        searchNames.push(nameData[i]);
        
      }

      if(i == (nameData.length - 1)){
        console.log(123)
        for(let i = 0; i < searchNames.length; i++){
          let searchResultBar = document.createElement("div");
          let textHolder = document.createElement("p");
          let delay = i * 0.1;
         
          searchResultBar.classList = "searchResultBar";
          searchResultBar.addEventListener("click", getSelectedName);
          textHolder.classList = "searchResultText";
      
          textHolder.innerHTML = `${searchNames[i].name} - ${searchNames[i].department}`
          searchResultBar.appendChild(textHolder);
          searchResultsBox.appendChild(searchResultBar);
      
          TweenMax.from(searchResultBar, 1, {delay: delay, opacity: 0, marginTop: "-3rem", zIndex: "-1"});
      
      
        }
    

      }
    }
  //do something
}

function getSelectedName(e){
  let clickedName = e.target.firstChild.innerHTML
  nameInput.value = clickedName;

  searchResultsBox.style.display = 'none';
//     searchResultsActive = false;
  confirmNameBtn.style.display = "block";

  selectedName = clickedName.split(' ')[0] + " " + clickedName.split(' ')[1];
  
  

  console.log(selectedName);
  
}