

function calc(x, y, z) {
    var a = parseFloat(document.getElementById(y).innerHTML);
    var b = parseFloat(x);
    if(document.getElementById(z).checked === true){
        a += b;
    }       
    else{
        a -= b;
    }
    document.getElementById(y).innerHTML = a.toFixed(2);
    document.getElementById("Total2").innerHTML = a.toFixed(2);
}

function loop(x, y, z) {
    if(x.match(z)){
        document.getElementsByClassName(y)[0].style.visibility = 'hidden';
    }
    else{
        document.getElementsByClassName(y)[0].style.visibility = 'visible';
    }
}

function checkCC(x, y){
    var regex=/^\s*(\d{4}\s?\d{4}\s?\d{4}\s?\d{4})\s*$/;
    loop(x, y, regex);
}

function checkDate(x, y){
    var regex=/(^\s*(0?[1-9]|^1[0-2])\/(201[6-9]|20[2-9][0-9]|2100))\s*$/;
    loop(x, y, regex);
}

function checkNumber(x, y){
    var regex=/^\s*(\d{3}\-?\d{3}\-?\d{4})\s*$/;
    loop(x, y, regex);
    
}

function submit(){
    confirm("Is this information correct?");
}

function reset(){
    alert("Your information has been cleared");
}
var books =    [{
      "name": "The Lord of the Rings",
      "author": "JRR Tolkien",
      "price": "11.87",
      "img": "http://ecx.images-amazon.com/images/I/51Nq%2Bl67AEL._AA160_.jpg",
      "id": "LotR",
      "genres": "Fantasy",
      "rating": "4.5"
    },
    {
      "name": "The Eye of the World",
      "author": "Robert Jordan",
      "price": "7.99",
      "img": "http://ecx.images-amazon.com/images/I/5164%2Bq5eGfL._AA160_.jpg",
      "id": "EoTW",
      "genres": "Fantasy",
      "rating": "4.19"
    },
    {
      "name": "The Way of Kings",
      "author": "Brandon Sanderson",
      "price": "8.99",
      "img": "http://ecx.images-amazon.com/images/I/51bjoG8C%2B4L._AA160_.jpg",
      "id": "WoK",
      "genres": "Fantasy",
      "rating": "4.65"
    },
    {
      "name": "The Crown Tower",
      "author": "Michael J Sullivan",
      "price": "8.89",
      "img": "http://ecx.images-amazon.com/images/I/51jIQA2jq9L._AA160_.jpg",
      "id": "tCT",
      "genres": "Fantasy",
      "rating": "4.33"
    },
    {
      "name": "Belgarath the Sorcerer",
      "author": "David Eddings and Leigh Eddings",
      "price": "7.99",
      "img": "http://ecx.images-amazon.com/images/I/51BmlSQXY5L._AA160_.jpg",
      "id": "BtS",
      "genres": "Fantasy",
      "rating": "4.08"
    },
    {
      "name": "The Name of the Wind",
      "author": "Patrick Rothfuss",
      "price": "7.99",
      "img": "http://ecx.images-amazon.com/images/I/51HGCx5Rh6L._AA160_.jpg",
      "id": "NotW",
      "genres": "Fantasy",
      "rating": "4.54"
    },
    {
      "name": "Wizards First Rule",
      "author": "Terry Goodkind",
      "price": "6.91",
      "img": "http://ecx.images-amazon.com/images/I/51rBfVFsqYL._AA160_.jpg",
      "id": "WFR",
      "genres": "Fantasy, Romance",
      "rating": "4.13"
    },
    {
      "name": "Gardens of the Moon",
      "author": "Steven Erickson",
      "price": "5.44",
      "img": "http://ecx.images-amazon.com/images/I/51f1-OdVfuL._AA160_.jpg",
      "id": "GotM",
      "genres": "Fantasy",
      "rating": "3.88"
    } ];
function populateFantasy(){
        var fanbooks = [];
        for(var i in books){
            if(books[i].genres.includes("Fantasy"))
                fanbooks[i] = books[i];
            
        }
        for(var i in fanbooks){
            if(fanbooks[i].genres.includes("Fantasy"))
                console.log(fanbooks[i].name);
        }
        console.log(fanbooks.length);
        var numbooks = books.length;
        
        if(numbooks>0){
            
 
            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.style.width = '50%';
            table.setAttribute('border', '1');
            table.setAttribute('cellspacing', '0');
            table.setAttribute('cellpadding', '5');
            
            // retrieve column header ('Name', 'Email', and 'Mobile')
 
            var col = []; // define an empty array
            for (var i = 0; i < numbooks; i++) {
                for (var key in books[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            
            // CREATE TABLE HEAD .
            var tHead = document.createElement("thead");    
                
            
            // CREATE ROW FOR TABLE HEAD .
            var hRow = document.createElement("tr");
            
            // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
            for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");
                    th.innerHTML = col[i];
                    hRow.appendChild(th);
            }
            tHead.appendChild(hRow);
            table.appendChild(tHead);
            
            // CREATE TABLE BODY .
            var tBody = document.createElement("tbody");    
            
            // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
            for (var i = 0; i < numbooks; i++) {
            
                    var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
                    
                    
                    for (var j = 0; j < col.length; j++) {
                        var td = document.createElement("td");
                        td.innerHTML = books[i][col[j]];
                        bRow.appendChild(td);
                    }
                    tBody.appendChild(bRow)
 
            }
            table.appendChild(tBody);   
            
            
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("books");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            
        }   
    }