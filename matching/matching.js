let peopleToChoiseFrom = []; 
confirmNameBtn.addEventListener('click', findSelectedPersonInJSON);

function findSelectedPersonInJSON(){

    for(let i = 0; i < nameData.length; i++){

        //Find the person in the JSON file that was selcted in the input
        if(nameData[i].name.toUpperCase() == selectedName.toUpperCase()){
            getPeopleLeftToMatch(i);
        }

    }

}

function getPeopleLeftToMatch(index){
    let personToMatch = nameData[index];
    peopleToChoiseFrom = []; 
    nameInput.style.display = "none";
    confirmNameBtn.style.display = "none";
    console.log(personToMatch);

    if(personToMatch.assignedTo == ""){
        

        for(let i = 0; i < nameData.length; i++){
            
            if(nameData[i].assignedTo == "" && nameData[i].name.toUpperCase() != selectedName.toUpperCase() &&
               nameData[i].department != personToMatch.department){
                   peopleToChoiseFrom.push(nameData[i]);
                    
               }else if(i == (nameData.length - 1)){
                   matchPeople(personToMatch);

               }
        }

    }else{
        console.log('already assigned');
        text = `Meet: ${personToMatch.assignedTo}`;
        canvasText(); 

        localStorage.setItem('nameData', JSON.stringify(nameData));

    }

}

function matchPeople(person){
    index = parseInt(Math.floor(Math.random() * peopleToChoiseFrom.length));
    match = peopleToChoiseFrom[index];
    for(let i = 0; i < nameData.length; i++){

        //Find the person in the JSON file that was selcted in the input
        if(nameData[i].name.toUpperCase() == match.name.toUpperCase()){
            nameData[i].assignedTo = `${person.name} from ${person.department}`
        }
        
        if(nameData[i].name.toUpperCase() == person.name.toUpperCase()){
            nameData[i].assignedTo = `${match.name} from ${match.department}`
        }

    }
    text = `Meet: ${match.name} from ${match.department}`;
    canvasText(); 

    localStorage.setItem('nameData', JSON.stringify(nameData));
    

}