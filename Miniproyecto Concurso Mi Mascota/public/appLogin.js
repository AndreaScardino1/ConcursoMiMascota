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



  // Obtener elementos
  const txtEmail = document.getElementById('correo');
  const txtPassword = document.getElementById('pass');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');



  // Añadir Evento login
  btnLogin.addEventListener('click', e => {
    //Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert(e));   
      // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
       window.location.replace("https://concurso-mi-mascota-7ca59.firebaseapp.com/adminControl.html");
    } else {
      console.log('no logueado');
    }    
  });
   
    
  });

  // Añadir Evento login

  // Añadir evento signup
  btnSignUp.addEventListener('click', e => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => alert("Correo ya registrado/no valido o contraseña no valida"));

   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
       window.location.replace("https://concurso-mi-mascota-7ca59.firebaseapp.com/adminControl.html");
    } else {
      console.log('no logueado');
    }    
  });
    
   
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.replace("https://concurso-mi-mascota-7ca59.firebaseapp.com/admin.html");
  });
  
  // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('no logueado');
    }    
  });
} ());
