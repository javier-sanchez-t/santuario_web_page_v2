// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

// Install input filters.
setInputFilter(document.getElementById("cantidad"), function (value) {
    return /^-?\d*$/.test(value);
});

function clearModalFacturacion() {
    document.getElementById("noReservacion").value = '';
    document.getElementById("fechaReservacion").value = '';
    document.getElementById("cantidad").value = '';
    document.getElementById("rfc").value = '';
    document.getElementById("extranjero").checked = false;
}

function sendFacturasForm() {
    var noReservacion = document.getElementById("noReservacion").value;
    var fechaViaje = document.getElementById("fechaReservacion").value;
    var cantidad = document.getElementById("cantidad").value;
    var RFC = document.getElementById("rfc").value;
    var extranjero = document.getElementById("extranjero").checked;

    /*if (noReservacion != null && noReservacion != undefined && noReservacion != ""
        && fechaViaje != null && fechaViaje != undefined && fechaViaje != ""
        && cantidad != null && cantidad != undefined && cantidad != "") {

        return;
    }*/

    var bodyEmail = "<strong>No. Reservación:</strong> " + noReservacion + "<br/>" +
        "<strong>Fecha de viaje:</strong> " + fechaViaje + "<br/>" +
        "<strong>Cantidad:</strong> $" + cantidad;

    if (RFC != null && RFC != undefined && RFC != "") {
        bodyEmail += "<br/><strong>RFC:</strong> " + RFC;
    }

    if (extranjero) {
        bodyEmail += "<br/><strong>Extranjero: </strong> Sí";
    } else {
        bodyEmail += "<br/><strong>Extranjero: </strong> No";
    }

    Email.send({
        Host: "smtp.gmail.com",
        Username: "bosquemagicodev@gmail.com",
        Password: "#developer5432",
        To: 'facturas@bosquemagico.com.mx',
        From: "bosquemagicodev@gmail.com",
        Subject: "Solicitud de facturación",
        Body: bodyEmail
    }).then(
        message => {
            $('#facturaModal').modal('hide')

            if (message == 'OK') {
                alert("Sus datos han sido enviados, en breve atenderemos su solicitud. \n\n ¡Gracias!");
            } else {
                alert("Ocurrió un error con su solicitud, inténtelo más tarde.");
            }
        }
    );
}


/*function sendMailFacturacion() {
    var noReservacion = document.getElementById("noReservacion").value;
    var fechaViaje = document.getElementById("fechaReservacion").value;
    var cantidad = document.getElementById("cantidad").value;
    var RFC = document.getElementById("rfc").value;

    var bodyEmail = "No. Reservación: " + noReservacion + "<br/>" +
        "Fecha de viaje: " + fechaViaje + "\n" +
        "Cantidad: " + cantidad + "\n";

    var link = "mailto:jefe10jav@gmail.com"
        + "?subject=Solicitud de facturación"
        + "&body=" + bodyEmail;
    ;

    window.location.href = link;
}*/
