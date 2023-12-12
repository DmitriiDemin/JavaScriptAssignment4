const makeName = document.querySelector(".searchInput");
const submitBtn = document.querySelector("#searchButton");
const tableBody = document.querySelector("#tableBody");
const errorP = document.querySelector("#Error");
const studentId = document.querySelector("#myStudentId");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '17a33537e1msh280ccef6ad35bf8p1f9346jsn5aac86225df5',
        'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
    }
};
//function to fetch data and discplay student id 

function fetchDataFromApi() {
    let makeInfo = makeName.value;
    fetch(`https://car-api2.p.rapidapi.com/api/models?make=${makeInfo}&sort=id&direction=asc&year=2020&verbose=yes`, options)
        .then(response => response.json())
        .then(json => displayModel(json))
    
    console.log(makeInfo)
    studentId.textContent = "Dmitrii Demin ID: 200464709";

        
}

function displayModel(json) {
    console.log(json)
    // clear previous table content
    tableBody.innerHTML = "";
    //check if there is data in api response if empty display error
    if (json.data.length === 0) {
        errorP.textContent("Not Found");
    }
    //go through data and insert it in to the table
    for (let i = 0; i < json.data.length; i++) {
        const model = json.data[i];
        const row = tableBody.insertRow();

        // create td elements
        const idTD = document.createElement("td");
        const nameTD = document.createElement("td");

        // set info from api to text variables
        idTD.textContent = model.id;
        nameTD.textContent = model.name;

        // append td elements 
        row.appendChild(idTD);
        row.appendChild(nameTD);
    }
    
}
//add event listner
submitBtn.addEventListener("click", fetchDataFromApi);
