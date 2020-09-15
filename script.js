let base_url = "http://localhost/cl/handler.php";
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function fillIt() {
    var url = base_url + "?req=retrieve";
    var tab = document.getElementById('regData');
    var table = document.getElementById('regData').getElementsByTagName('tbody')[0];
    var sh = document.getElementById('memberS');

    $.get(url, function(arr, success) {
        if (arr.length == 0) {
            sh.style.display = "block";
            tab.style.display = "none";
        } else {
            sh.style.display = "none";
            tab.style.display = "block";
            table.innerHTML = "";
            var flag = true;
            for (i = 0; i < arr.length; i++) {
                flag = false;
                var row = table.insertRow();
                var c1 = row.insertCell(0);
                var c2 = row.insertCell(1);
                var c3 = row.insertCell(2);
                var c4 = row.insertCell(3);
                c1.innerHTML = arr[i].firstn + " " + arr[i].lastn;
                c2.innerHTML = arr[i].email;
                c3.innerHTML = arr[i].gender;
                c4.innerHTML = arr[i].mobile;
            }
            if (flag) {
                sh.style.display = "block";
                tab.style.display = "none";
            }
        }
    });
};

$(document).on('submit', '.regForm', function(e) {
    e.preventDefault();

    var fname = document.getElementById('fname');
    var lname = document.getElementById('lname');
    var email = document.getElementById('email');
    var gender = document.getElementById('gender');
    var mobile = document.getElementById('mobile');
    var terms = document.getElementById('terms');

    if (mailformat.test(email.value) == false || fname.value.length <= 3 || lname.value.length <= 3 || mobile.value.length != 10 || terms.checked == false) {
        alert("Form was not properly Filled");
    } else {
        var obj = JSON.stringify({ firstn: fname.value, lastn: lname.value, email: email.value, gender: gender.value, mobile: mobile.value });
        var url = base_url + "?req=add&object=" + obj;
        $.get(url, function(data, success) {
            if (data == "Form successfully submitted") {
                alert("Form Submitted Successfully!!!");
            } else {
                alert("Failed to Submit form.. try again!!!")
            }
        })

        var show = document.getElementById('showon');
        show.style.display = "block";
        fillIt();
        document.querySelector('.regForm').reset();
    }
});

$(document).on('click', '#update', fillIt);