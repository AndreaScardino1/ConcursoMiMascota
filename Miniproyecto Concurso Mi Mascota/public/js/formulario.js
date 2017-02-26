// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
(function(){

        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyBYwC7jc_dge33ZfDWW3WnZfSbVSFwT4e4",
          authDomain: "concurso-mi-mascota-7ca59.firebaseapp.com",
          databaseURL: "https://concurso-mi-mascota-7ca59.firebaseio.com",
          storageBucket: "concurso-mi-mascota-7ca59.appspot.com",
          messagingSenderId: "100149971415"
        };
        firebase.initializeApp(config);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



var formulario = document.formulario_registro,
	elementos = formulario.elements;
	var url1='1';
	var url2='1';
	var url3='1';


const btnsubmit = document.getElementById('btn-submit');
       // Obtener Elementos
            var uploader1 = document.getElementById('uploader1');
            var uploader2 = document.getElementById('uploader2');
            var uploader3 = document.getElementById('uploader3');
            var fileButton = document.getElementById('fileButton');
            // Vigilar selección archivo
            fileButton1.addEventListener('change', function(e) {
              //Obtener archivo
              var file1 = e.target.files[0];
              // Crear un storage ref
              var storageRef1 = firebase.storage().ref('fotosMascotas/' + file1.name);
              // Subir archivo
              console.log(storageRef1);
              var task1 = storageRef1.put(file1);
              task1.on('state_changed',
                function progress(snapshot) {
                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  uploader1.value = percentage;
                },
                function error(err) {
                },
                function complete() {
                  console.log(task1.snapshot.downloadURL);
                  url1 = task1.snapshot.downloadURL;
                  console.log(url1);
                }
                )
            });

            fileButton2.addEventListener('change', function(e) {
              //Obtener archivo
              var file2 = e.target.files[0];
              // Crear un storage ref
              var storageRef2 = firebase.storage().ref('fotosMascotas/' + file2.name);
              // Subir archivo
              var task2 = storageRef2.put(file2);
              task2.on('state_changed',
                function progress(snapshot) {
                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  uploader2.value = percentage;
                },
                function error(err) {
                },
                function complete() {
                	url2=task2.snapshot.downloadURL;
                }
                )
            });

            fileButton3.addEventListener('change', function(e) {
              //Obtener archivo
              var file3 = e.target.files[0];
              // Crear un storage ref
              var storageRef3 = firebase.storage().ref('fotosMascotas/' + file3.name);
              // Subir archivo
              console.log(storageRef3);
              var task3 = storageRef3.put(file3);
              task3.on('state_changed',
                function progress(snapshot) {
                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  uploader3.value = percentage;
                },
                function error(err) {
                },
                function complete() {
                	url3=task3.snapshot.downloadURL;
                }
                )
            });

// Funcion que se ejecuta cuando el evento click es activado

var validarInputs = function(){
	for (var i = 0; i < elementos.length; i++) {
		// Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
		if (elementos[i].type == "text" || elementos[i].type == "email" ) {
			// Si es tipo texto, email o password vamos a comprobar que esten completados los input
			if (elementos[i].value.length == 0 && i!=9) {
				console.log('El campo ' + elementos[i].name + ' esta incompleto');
				elementos[i].className = elementos[i].className + " error";
				return false;
			} else {
				elementos[i].className = elementos[i].className.replace(" error", "");
			}
		}
	}

	return true;
};

var validarRadios = function(){
	var opciones = document.getElementsByName('masAdop'),
		resultado = false;

	for (var i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "radio" && elementos[i].name == "masAdop"){
			// Recorremos los radio button
			for (var o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				console.log('El campo adopcion esta incompleto');
				return false;
			} else {
				// Eliminamos la clase Error del radio button
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};


var enviar = function(e){
	if (!validarInputs()) {
		console.log('Falto validar los Input');
		e.preventDefault();
	} else if (!validarRadios()) {
		console.log('Falto validar los Radio Button');
		e.preventDefault();
	} else {
		console.log('Envia');
		e.preventDefault();
	}
};

var focusInput = function(){
	this.parentElement.children[1].className = "label active";
	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
};

var blurInput = function(){
	if (this.value <= 0) {
		this.parentElement.children[1].className = "label";
		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
	}
};


// --- Eventos ---
formulario.addEventListener("submit", enviar);

for (var i = 0; i < elementos.length; i++) {
	if (elementos[i].type == "text" || elementos[i].type == "email" ) {
		elementos[i].addEventListener("focus", focusInput);
		elementos[i].addEventListener("blur", blurInput);
	}
}


			btnsubmit.addEventListener('click', e=>{

		  	const ced=cedula.value;
		  	var adopcion = "no";

		  	if(document.formulario_registro.masAdop[0].checked){
		  		adopcion= "si";
		  	}else{
		  		adopcion="no";
		  	}


			if(nombre.value==null || nombre.value==""){
	  			console.log("ponga el campo de nombre de participante");
	  		} else if(apellido.value==null || apellido.value==""){
	  			console.log("ponga el apellido");
	  		}else if(correo.value==null || correo.value==""){
	  			console.log("ponga el correo");
	  		}else if(telefono.value==null || telefono.value==""){
	  			console.log("ponga el telefono");
	  		}else if(nombreMascota.value==null || nombreMascota.value==""){
	  			console.log("ponga el nombre de la mascota");
	  		}else if(edadMascota.value==null || edadMascota.value==""){
	  			console.log("ponga la edad en años");
	  		}else if(historia.value==null || historia.value==""){
	  			console.log("ponga la historia graciosa");
	  		}else if(cedula.value==null || cedula.value==""){
	  			console.log("ponga la cedula");
	  		}else if(document.formulario_registro.masAdop[0].checked && lugarAdopcion.value ==""){
	  			console.log("ponga donde lo adopto");
	  		}else if(url1=='1' || url2=='1' || url3=='1'){
	  			console.log("No se han cargado todas las imagenes");
	  			
	  		}else{
		  		var entrada={
						'Apellido':apellido.value,
						'Correo':correo.value,
						'Estatus':'Pendiente',
						'Mascota':{
							'Adoptada':adopcion,
							'Donde': lugarAdopcion.value,
							'EdadM':edadMascota.value,
							'Historia':historia.value,
							'Nombre':nombreMascota.value,
							'foto1':url1,
							'foto2':url2,
							'foto3':url3
						},
							
			  			'Nombre':nombre.value,
			  			'Telefono':telefono.value
		  			};
		  		console.log(entrada);
		  		firebase.database().ref('entrada/'+ced).set(entrada);
		  		sleep(1000);
		 		window.open ("https://concurso-mi-mascota-7ca59.firebaseapp.com/inscripcion.html");

		  	}

		  });



}())