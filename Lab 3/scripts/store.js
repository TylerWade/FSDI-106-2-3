var serverURL = "http://restclass.azurewebsites.net";

// the items catalog to display on the store
// populate the array with the info from the server
var items = [];
var categories = [];
console.log(categories);
var cart = [];
    total:
    items: []


function displayCatalog() {
    // travel the array, and display each item on the page

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        displayProduct(item);
    }
}



function displayProduct(item) {
    var divContainer = $("#catalog");
    var syntax =
        `<div class='item'>  
            <img src="${ item.image}">
            <h5>${ item.title}</h5>
            <label>${ item.description}</label>
            <br>
            <h6>$ ${ item.price}</h6>
            <button onclick="addToCart(${item.id})" class="btn btn-sm btn-info btn-add"> Add to Cart</button>
        </div>`;

    divContainer.append(syntax);
}

function addToCart(id) {
    console.log("add to cart", id);
    // find the item on the items array
    var theItem;

    for (var i = 0; i < items.length; i++) {
        var anItem = items[i];

        if (anItem.id == id) {
            theItem = anItem;
        }
    }
    console.log(theItem);

    // addin theItem to the cart.items
    // updating the total on the cart
    // updating info on the txt
}

function search() {
    var text = $("#txtSearch").val();
    console.log("Searching for: " + text);

    // clear previous results
    $("#catalog").html("");

    // check on each product
    // if the title or the description
    // contains the search text 

    // or = ||

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        /* if the title of the item contains the search text or the description of the item contains the search text display the product*/


        var lowerTitle = item.title.toLowerCase();
        var lowerSearch = text.toLowerCase();
        var lowerDesc = item.description.toLowerCase();


        if (lowerTitle.indexOf(lowerSearch) >= 0 || lowerDesc.indexOf(lowerSearch) > 0) {
            // text its on the title
            displayProduct(item);
        }
    }
}

function displayCatergories() {

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var cat = item.category;


        if (categories.indexOf(cat) == -1) {
            categories.push(cat);
        }
    }
    console.log(categories);
    var ul = $("#catList");
    for (j = 0; j < categories.length; j++) {
        var cat = categories[j];
        var li = `<li class="list-group-item">${cat}</li>`;
        ul.append(li);
    }
}


function importCatalog() {
    // perfor a GET request to /API/points
    $.ajax({
        url: serverURL + "/API/points",
        type: "GET",
        success: function (res) {

            // items = res; // Put data on the array,so it can be shown


            /* for each product on the response
            check if the product user is equal to your name if yes, push the product on the items array */

            // add only my product
            for (var i = 0; i < res.length; i++) {
                var p = res[i]; // <-this its each product
                if (p.user == "Tyler") {
                    items.push(p);
                }
            }
            displayCatalog();
        },
        error: function (error) {
            console.log("**ERROR ", error);
        }
    });

}

function homeWork() {
    console.log("start home work :(");
    var data = [{
            name: "Sergio",
            age: 97,
            color: "black"
        },
        {
            name: "Carl",
            age: 17,
            color: "pink"
        },
        {
            name: "Joseph",
            age: 23,
            color: "red"
        },
        {
            name: "Joan",
            age: 34,
            color: "blue"
        },
        {
            name: "Terese",
            age: 29,
            color: "pink"
        },
        {
            name: "Paul",
            age: 47,
            color: "black"
        },
        {
            name: "Tyler",
            age: 36,
            color: "red"
        },
        {
            name: "Marian",
            age: 31,
            color: "orange"
        },
        {
            name: "Michael",
            age: 35,
            color: "green"
        },
        {
            name: "Jay",
            age: 51,
            color: "pink"
        }
    ];
    // 1 - the name of the older user
    console.log("oldest", )
    // 2 - the name of the youngest
    // 3 - the list of different colors
    // 4 - which color shows up most
}


function init() {

    homeWork();

    // click event to search button
    $("#btnSearch").click(search);
    // even on the enter key on the field
    $("#txtSearch").keypress(function (arg) {
        if (arg.key == "Enter") {
            search();
        }
    })

    importCatalog(); // get data from server
}




window.onload = init;