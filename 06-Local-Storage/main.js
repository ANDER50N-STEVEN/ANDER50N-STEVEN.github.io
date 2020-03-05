
 function sName() {
              const first = document.getElementById("sfirst").value;
              const last = document.getElementById("slast").value;
              localStorage.setItem("first", first);
              localStorage.setItem("last", last);
              var output = "Welcome " + localStorage.first + " " + localStorage.last + "!";
              if(localStorage.first === '' && localStorage.last === '')
                output = "Welcome, but please enter your name";
              document.getElementById("simple-execute").innerHTML = output;
          }

  function Name() {
              var fullName = {};
              fullName['first'] = document.getElementById("first").value;
              fullName['last'] = document.getElementById("last").value;
              localStorage.setItem("fullName", JSON.stringify(fullName));
              var obj = JSON.parse(localStorage.fullName);
              var output = "Welcome " + obj['first'] + " " + obj['last'] + "!";
              if(obj['first'] === '' && obj['last'] === '')
                output = "Welcome, but please enter your name";
              document.getElementById("local-execute").innerHTML = output;
          }