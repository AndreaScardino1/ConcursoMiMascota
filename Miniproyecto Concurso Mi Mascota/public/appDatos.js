(function() {

//Inicializar Firebase
  var config = {
          apiKey: "AIzaSyBYwC7jc_dge33ZfDWW3WnZfSbVSFwT4e4",
          authDomain: "concurso-mi-mascota-7ca59.firebaseapp.com",
          databaseURL: "https://concurso-mi-mascota-7ca59.firebaseio.com",
          storageBucket: "concurso-mi-mascota-7ca59.appspot.com",
          messagingSenderId: "100149971415"
    };
    firebase.initializeApp(config);

   //Obtener elementos
  const preObject = document.getElementById('entrada');
  const cedula = document.getElementById('cedula');
  const btnAprobar = document.getElementById('btnAprobar');
  const btnRechazar = document.getElementById('btnRechazar');
  const btnEliminar = document.getElementById('btnEliminar');
  const dbRefObject = firebase.database().ref().child('entrada');
  const dbRefList = dbRefObject.child('Mascota');

  //Cambia el estado a aprobado
   btnAprobar.addEventListener('click', e => {
       var ref = firebase.database().ref().child("entrada/"+ cedula.value);
        console.log(cedula.value);
        var ref = firebase.database().ref().child("entrada/"+ cedula.value);
        ref.update({
          "/Estatus" :"Aprobado",
        });

    });

//Cambia el estado a rechazado
   btnRechazar.addEventListener('click', e => {
       console.log('No'+ cedula.value);
        var ref = firebase.database().ref().child("entrada/"+ cedula.value);
        ref.update({
          "/Estatus" :"Rechazado",
        });
    });

//Eliminar fotos
     btnEliminar.addEventListener('click', e => {
       console.log('Eliminar'+ cedula.value);
        var ref = firebase.database().ref().child("entrada/"+ cedula.value);
        ref.update({
          "/Mascota/foto1" :"Sin foto",
          "/Mascota/foto2" :"Sin foto",
          "/Mascota/foto3" :"Sin foto",
        });
    });

      
  const cuadro = document.getElementById('query');
  const tabla = document.getElementById('tabla');
  ref = firebase.database().ref().child('entrada');
  ref2 = ref.child('Mascota');

  ref.orderByKey().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var fila = document.createElement('tr');
       var cedula = document.createElement('td');
       cedula.id= data.key;
       var nombre = document.createElement('td');
       var apellido = document.createElement('td');
       var email = document.createElement('td');
       var estatus= document.createElement('td');
       var nombreMascota = document.createElement('td');
       var edad = document.createElement('td');
       var adoptado = document.createElement('td');
       var donde = document.createElement('td');
       var historia = document.createElement('td');
       var foto1 = document.createElement('td');
       var foto2 = document.createElement('td');
       var foto3 = document.createElement('td');

        cedula.innerText=data.key;

        ref2=firebase.database().ref().child('entrada/'+data.key+'/Mascota');
        ref2.orderByKey().on("value", function(snap) {
            nombreMascota.innerText =snap.val().Nombre;
            edad.innerText= snap.val().EdadM;
            adoptado.innerText=snap.val().Adoptada;
            donde.innerText=snap.val().Donde;
            historia.innerText=snap.val().Historia;
            foto1.innerText=snap.val().foto1;
            foto2.innerText=snap.val().foto2;
            foto3.innerText=snap.val().foto3;
        });

       nombre.innerText=data.val().Nombre;
       apellido.innerText=data.val().Apellido;
       email.innerText=data.val().Correo;
       estatus.innerText= data.val().Estatus;
       fila.appendChild(cedula);
       fila.appendChild(nombre);
       fila.appendChild(apellido);
       fila.appendChild(email);
       fila.appendChild(estatus);
       fila.appendChild(nombreMascota);
       fila.appendChild(edad);
       fila.appendChild(adoptado);
       fila.appendChild(donde);
       fila.appendChild(historia);
       fila.appendChild(foto1);
       fila.appendChild(foto2);
       fila.appendChild(foto3);
       tabla.appendChild(fila);
    console.log("EL usuario de cedula" + data.key + " tiene esta info " + data.val().Nombre);
    });

  });


} ());