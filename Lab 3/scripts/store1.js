var serverURL = "http://restclass.azurewebsites.net";

var items = [];
var categories = [];

var cart = [];
total:
    items: []

function displayCatalog() {
    console.log("init display catalog");
    //travel array and display item on page

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        displayProduct(item);
    }
}

function displayProduct(item) {
    var divContainer = $("#catalog");
    var syntax =
        `<div class='item'>
        <img src="${item.image}">
        <h5>${item.title}</h5>  
        <label>${item.description}</label>
        <br>
        <h6>${item.price}</h6>
        <button onclick="addToCart(${item.id})" class="btn btn-sm btn-info btn-add">Add to cart</button>
        </div>`;
    divContainer.append(syntax);

}

function addToCart(id) {
    console.log("Add to cart", id);
    for (var i = 0; i < items.length; i++) {
        var anItem = items[i];

        if (anItem.id == id) {
            theItem = anItem;
        }
    }

    console.log(theItem);

    //adding theItem to the cart.items
    //updating the total on the cart
    //updating info on the txt
}

function search() {
    var text = $("#txtSearch").val();
    console.log("Search for: " + text);

    //clear previous results
    $("#catalog").html("");

    // check on each prod
    // if the title or desc
    //contains the search text

    /**
     * or = ||

     */
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var lowerTitle = item.title.toLowerCase();
        var lowerSearch = text.toLowerCase();
        var lowerDesc = item.description.toLowerCase();

        if (lowerTitle.indexOf(lowerSearch) >= 0 || lowerDesc.indexOf(lowerSearch) >= 0) {
            //text is in title
            displayProduct(item);
        }
    }
}

function displayCategories() {
    console.log(items);
    for (var i = 0; i < items.length; i++)
        var item = items[i];
    var cat = item.category;

    if (categories.indexOf(cat) == -1) {
        categories.push(cat);
    }

    console.log(categories);
    var ul = $("#catList");
    for (var j = 0; j < categories.length; j++) {
        var cat = categories[j];
        var li = `<li class="list-group-item">${cat}</li>`;
        ul.append(li);
    }
}



function importCatalog() {
    $.ajax({
        url: serverURL + "/API/points",
        type: "GET",
        success: function (res) {
            for (var i = 0; i < res.length; i++) {
                var p = res[i];
                if (p.user == "Tyler") {
                    items.push(p);
                }
            }

            displayCatalog();
            displayCategories();

        },
        error: function (error) {
            console.error("** ERROR", error);

        }
    });
}

function homeWork() {
    console.log("Starting home work :(");
    var user = [{
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
    console.log(user);
    //sort oldest to youngest
    user.sort(function(a, b){
        return b.age-a.age
    })
    console.table(user);
    // name of oldest user
    
    //name of youngest
    // list of colors
    //which color shows up more 

}

function init() {

    homeWork();

    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (arg) {
        if (arg.key == "Enter") {
            search();
        }
    });

    importCatalog();
}
window.onload = init;