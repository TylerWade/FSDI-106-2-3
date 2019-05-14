var serverURL = "http://restclass.azurewebsites.net";

// Object Constructor
function Item(title, description, price, category, image) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.user = "Tyler";
}

function register() {
    console.log("creating new product");

    var title = $("#txtTitle").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var category = $("#txtCategory").val();
    var image = $("#txtImage").val();

    // create 
    var anItem = new Item(title, desc, price, category, image);
    console.log(anItem);

    // send the object to the server
    /* Async Javascript XML/JSON communication = AJAX
     */
    $.ajax({
        url: serverURL + "/API/points", // location
        type: "post", // action
        contentType: "application/json", // encoding (language)
        data: JSON.stringify(anItem),
        success: function (res) {
            console.log("server says: ", res);
        },
        error: function (error) {
            console.log("**ERROR: ", error);
        }
    });
}

function readTest() {
    $.ajax({
        url: serverURL + "/API/test",
        type: "GET",
        success: function (res) {
            // OK
            console.log(res);
        },
        error: function (error) {
            // not ok :(
            console.error(error);
        }
    });
}

function init() {
    console.log("admin page loaded");

    // catch the click event on the button
    $('#btnSave').click(register);
}

window.onload = init;