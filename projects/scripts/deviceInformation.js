/**
 * Created by HJ-PC on 15/8/21.
 */

function iosSystem() {
        var ios = document.getElementById("ios");

        var iosDiv = document.getElementById("iosDiv_add");


        if (ios.id=="ios") {

            if (ios.checked) {
                iosDiv.style.display="block";

            } else {
                iosDiv.style.display="none";

            }
        }
    }

    function androidSystem() {
        var android = document.getElementById("android");

        var androidDiv = document.getElementById("androidDiv_add");

        if (android.id=="android") {

            if (android.checked) {
                androidDiv.style.display="block";

            } else {
                androidDiv.style.display="none";

            }
        }
}
function iosSystemE() {
    var ios = document.getElementById("ios");

    var iosDiv = document.getElementById("iosDiv");


    if (ios.id=="ios") {

        if (ios.checked) {
            iosDiv.style.display="block";

        } else {
            iosDiv.style.display="none";

        }
    }
}

function androidSystemE() {
    var android = document.getElementById("android");

    var androidDiv = document.getElementById("androidDiv");

    if (android.id=="android") {

        if (android.checked) {
            androidDiv.style.display="block";

        } else {
            androidDiv.style.display="none";

        }
    }
}
