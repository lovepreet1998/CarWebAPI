let address = '/api/Cars';

function displayAllCars() {
    resetCarForm();
    $("#car_details").show();
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            $("#car_details").empty();
            if (data.length == 0) {
                let html = "<h1>No Car Details Now</h1>";
                $("#car_details").append(html);
            } else {

                $.each(data, function (key, item) {
                    let html = '<div class="col-md-4  mb-3"><div class="card col-md-12">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.modelName + " (" + item.companyName + ')</h5>';
                    html += '<p class="card-text">Feature: ' + item.features + '</p>';
                    html += '</div>';
                    html += '<div class="row mb-2">';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-info btn-block" onclick="getCar(' + item.id + ')">Edit</button>';
                    html += '</div>';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-danger btn-block" onclick="deleteCar(' + item.id + ')">Delete</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div></div>';
                    $("#car_details").append(html);
                });
            }
        }
    });
}

function resetCarForm() {
    $("#car_form").hide();
    $("#title_message").html("Add New Car");
    $("#car_id").val("");
    $("#company_name").val("");
    $("#model_name").val("");
    $("#features").val("");
    $("#result").html("");
}

function showCarForm() {
    resetCarForm();
    $("#car_details").hide();
    $("#car_form").show();
}

function getCar(id) {
    resetCarForm();
    $("#car_details").hide();
    $("#car_form").show();
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (car) {
        $("#title_message").html("Edit Car Details");
        $("#car_id").val(car.id);
        $("#company_name").val(car.companyName);
        $("#model_name").val(car.modelName);
        $("#features").val(car.features);
    });
}

function saveDetails() {
    let company_name = $('#company_name').val();
    let model_name = $('#model_name').val();
    let car_features = $('#features').val();
    let car = {
        companyName: company_name,
        modelName: model_name,
        features: car_features
    };
    if ($("#title_message").text().indexOf("Edit") != -1) {
        let id_value = parseInt($('#car_id').val());
        car["id"] = id_value;
        $.ajax({
            type: "PUT",
            url: address + "/" + id_value,
            data: JSON.stringify(car),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#result").html("<h1>Car Details are Saved</h1>");
        }).fail(function (xhr, status) {
            $("#result").html("<h1>Car Details are not Saved</h1>");
        });        
    } else {
        $.ajax({
            type: "POST",
            url: address,
            data: JSON.stringify(car),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#result").html("<h1>Car Details are Saved</h1>");            
        }).fail(function (xhr, status) {
            $("#result").html("<h1>Car Details are not Saved</h1>");
        });
    }    
}

function deleteCar(id) {
    let result = confirm("Are You Sure to Remove This Car?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            displayAllCars();
        });
    }
}