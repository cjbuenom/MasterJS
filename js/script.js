
class login{
    credentials = {
        inputUser: '',
        inputPass: '',
      };
    formlogin;
    formGame;
    loader;
    inputUserNotification;
    inputPassNotification;
    constructor(){
        this.credentials.inputUser = document.getElementById('txtInputUser');
        this.credentials.inputPass = document.getElementById('txtInputPass');
        this.formlogin = document.getElementById('Form-Login')
        this.formGame = document.getElementById('Form-game')
        this.inputUserNotification = document.getElementsByClassName("notificaValidacionUser")[0];
        this.inputPassNotification = document.getElementsByClassName("notificaValidacionPass")[0];     
        this.loader = document.getElementsByClassName("loader")[0]; 
    }

    getValidaUserPassDefault(valorActual, valorActual1){  
        console.log('ValorActual '+valorActual+' pass: '+valorActual1)
        if (this.inputUserNotification.classList.value === 'notificaValidacionUserActiva' || this.inputPassNotification.classList.value === 'notificaValidacionUserActiva') {
            alert('Debes usar el Usuario:Contraseña Default');  
        }else{
            if (this.credentials.inputUser.classList.value === 'success' && this.credentials.inputPass.classList.value === 'success') {
                this.setMostrarSpinner()
                setTimeout( () => {
                    this.setDisplaySection()
                
               }, 4000);
              
                
            }else{
                this.validaVacioUser(valorActual)
                this.validaVacioPass(valorActual)
                alert('Debes Ingresar Todos los campos');  
            }
            
        }   
    }

    setMostrarSpinner(){

       
        document.getElementById("myModalComentarios").style.display = "block"
        this.loader.classList.add('modal-content')
        this.loader.classList.add('loaderActivo')
    
       
    }

    setDisplaySection (){
        
            // alert('Login Exitoso');
            this.formlogin.style.display = 'none';
            this.formGame.style.display = 'flex'
            this.formGame.classList.add('formGame-act');
            this.loader.classList.remove('loaderActivo')            
            this.loader.classList.remove('modal-content')
            document.getElementById("myModalComentarios").style.display = "none"
            this.loader.classList.add('loader')
      
    }

    validaVacioUser(valorActual){
        if (!valorActual ) {
            this.credentials.inputUser.classList.remove('success');            
            this.credentials.inputUser.classList.add('error');
            this.inputUserNotification.innerHTML =  `<a>${'El campo es Requerido <br />'}</a>`
            this.inputUserNotification.setAttribute("class", "notificaValidacionUserActiva");
            console.log('campo user vacio')            
        }else{
            if (valorActual ) {
                this.credentials.inputUser.classList.remove('error');               
                this.inputUserNotification.setAttribute("class", "notificaValidacionUserDesactivada");    
                this.validaUser(valorActual)
            
            }
        } 
    }
    validaVacioPass(valorActual){

        if (!valorActual) {
            this.credentials.inputPass.classList.remove('success');
            this.credentials.inputPass.classList.add('error');
            this.inputPassNotification.innerHTML =  `<a>${'El campo es Requerido <br />'}</a>`
            this.inputPassNotification.setAttribute("class", "notificaValidacionUserActiva");
            console.log('campo pass vacio')      
        }else{
            if (valorActual) {
                this.credentials.inputPass.classList.remove('error');            
                
                this.inputPassNotification.setAttribute("class", "notificaValidacionUserDesactivada");
                this.validaPass(valorActual)
            }
        }
    }

    validaUser(valorActual){
        if (valorActual === 'JavaScript' ) {
            console.log('Usuario Correcto')
            this.credentials.inputUser.classList.remove('error');  
            this.credentials.inputUser.classList.add('success');  
            this.inputUserNotification.setAttribute("class", "notificaValidacionUserDesactivada");       
        }else{
            this.credentials.inputUser.classList.remove('success');
            this.credentials.inputUser.classList.add('error'); 
            this.inputUserNotification.innerHTML =  `<a>${'Ingresa Usuario default <br />'}</a>`
            this.inputUserNotification.setAttribute("class", "notificaValidacionUserActiva");
        }
    }
    validaPass(valorActual){
        if (valorActual === 'Master') {
            console.log('Contraseña Correcta')
            this.credentials.inputPass.classList.remove('error');  
            this.credentials.inputPass.classList.add('success');  
            this.inputPassNotification.setAttribute("class", "notificaValidacionUserDesactivada");       
        }else{
            this.credentials.inputPass.classList.remove('success');
            this.credentials.inputPass.classList.add('error'); 
            this.inputPassNotification.innerHTML =  `<a>${'Ingresa Contraseña default <br />'}</a>`
            this.inputPassNotification.setAttribute("class", "notificaValidacionUserActiva");
        }
    }

}

let loginDefault = new login();
const btn = document.getElementById('btnIngresar')
const txt1 = document.getElementById('txtInputUser')
const txt2 = document.getElementById('txtInputPass')
btn.addEventListener('click', ()=> loginDefault.getValidaUserPassDefault(loginDefault.credentials.inputUser.value, loginDefault.credentials.inputPass.value))
txt1.addEventListener('focusout', ()=> loginDefault.validaVacioUser(loginDefault.credentials.inputUser.value))
txt2.addEventListener('focusout', ()=>  loginDefault.validaVacioPass( loginDefault.credentials.inputPass.value))










//###############################################################################################################
// CLASE GAME
//###############################################################################################################


class game{
    opcPiedra;
    opcPapel;
    opcTijera;
    varAux;
    imgSeleccion;
    imgSeleccionIA;
    IMAGENESLEFT;
    IMAGENESRIGHT;
    totalPuntos;
    nroRondaActual;
    Puntuaciones;
    historicoScoresGame;
    contenedorLineas;
    dataPlayGame = {
        nombrejugador: '',
        numPlayer: 0,
        numRamdom: 0,
        resultRonda: 0,
        cntPuntaje: 0,
        cntRondas: 0,      
    };
    btnComenzar;
    constructor(){
        this.opcPiedra = document.querySelector('.opcion1'); 
        this.opcPapel = document.querySelector('.opcion2'); 
        this.opcTijera = document.querySelector('.opcion3');
        this.btnComenzar = document.getElementById('btnComenzar')    
        this.IMAGENESLEFT = ['./img/left-st.jpg',
                         './img/left-pp.jpg',
                         './img/left-sc.jpg',
                         './img/incognita.png',];  
        this.imgSeleccion= document.querySelector('.img-seleccionada')
        this.IMAGENESRIGHT = ['./img/right-st.jpg',
                         './img/right-pp.jpg',
                         './img/right-sc.jpg',];  
        this.imgSeleccionIA= document.querySelector('.img-seleccionadaIA');
        // this.numRamdom =1000, this.resultRonda = 0, this.numPlayer = 10, this.cntPuntaje = 0, this.cntRondas = 0;
        this.Puntuaciones = [], this.historicoScoresGame = [],
        this.contenedorLineas = document.querySelector('.list-points')
        this.totalPuntos = document.querySelector('.totalPuntos')
        this.nroRondaActual = document.querySelector('.roundCurrent')
    }
    getPiedraActivated=  () =>{
            this.opcPiedra.classList.add('opcActivated');  
            this.opcPapel.classList.remove('opcActivated');   
            this.opcTijera.classList.remove('opcActivated');  
            this.imgSeleccion.setAttribute('src', this.IMAGENESLEFT[0])
            // this.opcPiedra.setAttribute('value','Piedra')
            this.dataPlayGame.numPlayer = 0
            this.dataPlayGame.cntRondas += 1    
            this.opcPiedra.setAttribute('disabled','true')
            this.opcPapel.setAttribute('disabled','true')
            this.opcTijera.setAttribute('disabled','true')
    }
    getPapelActivated =  () =>{
        this.opcPapel.classList.add('opcActivated');   
        this.opcPiedra.classList.remove('opcActivated');   
        this.opcTijera.classList.remove('opcActivated'); 
        this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[1])
        // this.opcPapel.setAttribute('value','Papel')
        this.dataPlayGame.numPlayer = 1
        this.dataPlayGame.cntRondas += 1 
        this.opcPapel.setAttribute('disabled','true')
        this.opcPiedra.setAttribute('disabled','true')
        this.opcTijera.setAttribute('disabled','true')
    }
    getTijeraActivated = () =>{
        this.opcTijera.classList.add('opcActivated');  
        this.opcPapel.classList.remove('opcActivated');   
        this.opcPiedra.classList.remove('opcActivated'); 
        this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[2])
        this.dataPlayGame.numPlayer = 2
        this.dataPlayGame.cntRondas += 1 
        this.opcTijera.setAttribute('disabled','true')
        this.opcPiedra.setAttribute('disabled','true')
        this.opcPapel.setAttribute('disabled','true')
    }
   
    getSeleccionIA  =  ()=> {

        
        document.getElementById("myModalComentarios").style.display = "block"
        document.getElementsByClassName("loader")[0].classList.add('modal-content')
        document.getElementsByClassName("loader")[0].classList.add('loaderActivo')
        this.dataPlayGame.numRamdom  = Math.floor((Math.random() * (0-this.IMAGENESRIGHT.length))+this.IMAGENESRIGHT.length);    
                    console.log('this.dataPlayGame.numRamdom ='+this.dataPlayGame.numRamdom)
                    this.imgSeleccionIA.setAttribute('src', this.IMAGENESRIGHT[this.dataPlayGame.numRamdom])  
                  setTimeout( () => {
                    
                    document.getElementById("myModalComentarios").style.display = "none"
                    document.getElementsByClassName("loader")[0].classList.remove('modal-content')
                    document.getElementsByClassName("loader")[0].classList.remove('loaderActivo')
               
                 }, 500);
                
        
    }


    viewResultRonda =  () =>{
        let mensaje = '';
   
        
        
        // this.numPlayer = 0 'piedra' || this.numPlayer = 1 'papel' || this.numPlayer = 2 'tijera'  === Jugador
        // this.numRamdom = 0 'piedra' || this.numRamdom = 1 'papel' || this.numRamdom = 2 'tijera' === IA

        switch (this.dataPlayGame.numPlayer) {
            case 0:
                if (this.dataPlayGame.numRamdom === 0) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! EMPATE !! no se reparten Puntos.!!'
                    console.log('case 0 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    // this.Puntuaciones.push('0');
                    this.dataPlayGame.resultRonda = 0;
                    alert(mensaje)
                    this.opcPiedra.classList.remove('opcActivated'); 
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3]) 
             
                }else if (this.dataPlayGame.numRamdom === 1) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! Gana IA !! -30 Puntos!!'
                    console.log('case 0 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    this.dataPlayGame.resultRonda = -30;
                    this.opcPiedra.classList.remove('opcActivated'); 
                    // this.Puntuaciones.push('-30');
                    this.dataPlayGame.cntPuntaje += -30;
                    // console.log('this.cntPuntaje'+this.cntPuntaje)
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled')  
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                    
                }else if (this.dataPlayGame.numRamdom === 2) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! Gana Jugador !! +100 Puntos!!'
                    console.log('case 0 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    this.dataPlayGame.resultRonda = +100;
                    this.opcPiedra.classList.remove('opcActivated'); 
                    // this.Puntuaciones.push('+100');
                    this.dataPlayGame.cntPuntaje += 100;
                    // console.log('this.cntPuntaje'+this.cntPuntaje)
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                    
                }
                break;
            case 1:
                if (this.dataPlayGame.numRamdom === 1) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! EMPATE !! no se reparten Puntos.!!'
                    console.log('case 1 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    // this.Puntuaciones.push('0');
                    this.dataPlayGame.resultRonda = 0;
                    this.opcPapel.classList.remove('opcActivated'); 
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                }else if (this.dataPlayGame.numRamdom === 2) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! Gana IA !! -30 Puntos!!'
                    console.log('case 1 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    this.opcPapel.classList.remove('opcActivated'); 
                    this.dataPlayGame.resultRonda = -30;
                    this.dataPlayGame.cntPuntaje += -30;
                    // console.log('this.cntPuntaje'+this.cntPuntaje)
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                }else if (this.dataPlayGame.numRamdom === 0) {
                    mensaje = 'RONDA NRO: '+this.cntRondas+' !! Gana Jugador !! +100 Puntos!!'
                    console.log('case 1 = this.numRamdom === '+this.numRamdom)
                    alert(mensaje)
                    this.opcPapel.classList.remove('opcActivated'); 
                    this.dataPlayGame.cntPuntaje += 100;
                    // this.Puntuaciones.push('+100');
                    this.dataPlayGame.resultRonda = +100;
                    console.log('this.cntPuntaje'+this.cntPuntaje) 
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                   
                }
                break;
            case 2:
                if (this.dataPlayGame.numRamdom === 2) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! EMPATE !! no se reparten Puntos.!!'
                    console.log('case 2 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    // this.Puntuaciones.push('0');
                    this.opcTijera.classList.remove('opcActivated');
                    this.dataPlayGame.resultRonda = 0;
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                }else if (this.dataPlayGame.numRamdom === 0) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! Gana IA !! -30 Puntos!!'
                    console.log('case 2 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    this.opcTijera.classList.remove('opcActivated');
                    this.dataPlayGame.cntPuntaje += -30;
                    // this.Puntuaciones.push('-30');
                    // console.log('this.cntPuntaje'+this.cntPuntaje)
                    this.dataPlayGame.resultRonda = -30;
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                }else if (this.dataPlayGame.numRamdom === 1) {
                    mensaje = 'RONDA NRO: '+this.dataPlayGame.cntRondas+' !! Gana Jugador !! +100 Puntos!!'
                    console.log('case 2 = this.numRamdom === '+this.dataPlayGame.numRamdom)
                    alert(mensaje)
                    this.opcTijera.classList.remove('opcActivated');
                    this.dataPlayGame.cntPuntaje += 100;
                    // this.Puntuaciones.push('+100');
                    // console.log('this.cntPuntaje'+this.cntPuntaje)
                    this.dataPlayGame.resultRonda = +100;
                    this.opcPiedra.removeAttribute('disabled') 
                    this.opcPapel.removeAttribute('disabled') 
                    this.opcTijera.removeAttribute('disabled') 
                    this.imgSeleccion.setAttribute('src',this.IMAGENESLEFT[3])
                    this.imgSeleccionIA.setAttribute('src',this.IMAGENESLEFT[3])
                }
                
                break;
        
            default:
                break;
        }
        // return resultadoRonda;

    }   

    showTableResults  =  (dataGame)=> {
        // "{\"nombrejugador\":\"\",\"numPlayer\":2,\"numRamdom\":0,\"resultRonda\":-30,\"cntPuntaje\":-30,\"cntRondas\":2}"
        let arraAux
        let arraResults = []
        let element
        let varAux, numAux, numAux2    ;
        let i = 0;
        let auxDom = document.querySelectorAll('.fila')    
     
        console.log('dataGame.length: '+dataGame.length)
        console.log('auxDom.length: '+auxDom.length)
        auxDom.forEach(element => { 
            element.innerHTML = "";
            // element.removeAttribute('class', 'fila')
            console.log ('borrando')
        });

        this.totalPuntos.innerHTML = ""

        this.nroRondaActual.innerHTML = "" 

        for (let index = dataGame.length-1; 0 < index+1; index--) {
            element = dataGame[index]
            console.log('element: '+element+' element.length: '+element.length)
            arraAux = element.split(',')
            console.log('resultRonda '+arraAux[3]+' arraAux[3].length: '+arraAux[3].length)
            arraAux =  arraAux[3].split(':')
            console.log('resultRonda '+arraAux[1]+' arraAux[1].length: '+arraAux[1].length)
            varAux = parseInt (arraAux[1])
            console.log('resultRonda === '+varAux)
            arraResults.push(varAux)
            
           
        }
        let cantidadResults = arraResults.length
        console.log ('cantidadResults' +cantidadResults)

            auxDom.forEach(element => {           
                console.log ('arraResults ' +arraResults[cantidadResults-1])
                if (cantidadResults > 0 ){
                    
                        element.innerHTML = 'Ronda '+(++i)+' ='+arraResults[cantidadResults-1];
                        element.setAttribute('class', 'fila')
                        console.log ('agreagndo')
                        cantidadResults--
                } 
                
            });

            arraAux = dataGame[dataGame.length-1].split(',')
            console.log('contpuntaje '+arraAux[4]+' arraAux[4].length: '+arraAux[4].length)
            arraAux =  arraAux[4].split(':')
            numAux = parseInt (arraAux[1])
            console.log('contpuntaje === '+numAux)

            arraAux = dataGame[dataGame.length-1].split(',')
            console.log('cntRondas '+arraAux[5]+' arraAux[5].length: '+arraAux[5].length)
            arraAux =  arraAux[5].split(':')
            numAux2 = parseInt (arraAux[1])
            console.log('cntRondas === '+numAux2)

            this.totalPuntos.innerHTML = numAux
            this.nroRondaActual.innerHTML =  numAux2

           

    }
    validaRondas  =  (RondaActual)=> {
        if (RondaActual === 10){
            let mensaje1 = 'RONDA NRO: '+RondaActual+' !! FIN DEL JUEGO !!'
            alert(mensaje1)
            RondaActual = 0

            for (let index = this.Puntuaciones.length-1; index+1> 0; index--) {
                const element = this.Puntuaciones[index];
                
                console.log('element en posicion :'+(index)+' = '+element+' this.Puntuaciones.length '+this.Puntuaciones.length) 
                
            }
            mensaje1 = 'PUNTAJE TOTAL: '+this.dataPlayGame.cntPuntaje+' !!'
            alert(mensaje1)
            this.btnComenzar.removeAttribute('class','btnComenzarNODisponible')
            this.btnComenzar.removeAttribute('disabled') 
            this.btnComenzar.setAttribute('class','btnComenzarDisponible') 
            this.opcPiedra.classList.add('opcActivated');  
            this.opcPapel.classList.add('opcActivated');   
            this.opcTijera.classList.add('opcActivated');  
            this.opcPiedra.setAttribute('disabled','true')
            this.opcPapel.setAttribute('disabled','true')
            this.opcTijera.setAttribute('disabled','true')
            let arraAux = this.Puntuaciones[this.Puntuaciones.length-1].split(',')
            console.log('contpuntaje '+arraAux[4]+' arraAux[4].length: '+arraAux[4].length)
            arraAux =  arraAux[4].split(':')
            let numAux = parseInt (arraAux[1])
            console.log('contpuntaje === '+numAux)
            this.historicoScoresGame.push(numAux)
            console.log('this.historicoScoresGame.length === '+this.historicoScoresGame.length)
            for (let i = this.historicoScoresGame.length-1; i+1> 0; i--) {
                const element = this.historicoScoresGame[i];
                
                console.log('element en posicion :'+(i)+' = '+element+' this.historicoScoresGame.length '+this.historicoScoresGame.length) 
                
            }

        }   
    }
    startGame  =  ()=> {
        this.btnComenzar.removeAttribute('class','btnComenzarDisponible')
        this.btnComenzar.setAttribute('disabled','true')
        this.btnComenzar.setAttribute('class','btnComenzarNODisponible') 
        this.opcPiedra.classList.remove('opcActivated');  
        this.opcPapel.classList.remove('opcActivated');   
        this.opcTijera.classList.remove('opcActivated');  
        this.opcPiedra.removeAttribute('disabled')
        this.opcPapel.removeAttribute('disabled')
        this.opcTijera.removeAttribute('disabled')
        let auxDom = document.querySelectorAll('.fila')    
     
        console.log('auxDom.length: '+auxDom.length)
        auxDom.forEach(element => { 
            element.innerHTML = "";
            console.log ('borrando')
        });
        this.totalPuntos.innerHTML = "0"

        this.nroRondaActual.innerHTML = "" 
        console.log ('this.Puntuaciones.length '+this.Puntuaciones.length)  
        for (let i = this.Puntuaciones.length; i > 0; i--) {
            this.Puntuaciones.pop();
          }
        console.log ('this.Puntuaciones.length '+this.Puntuaciones.length)  
        this.dataPlayGame.cntRondas = 0 
        this.dataPlayGame.resultRonda = 0
        this.dataPlayGame.cntPuntaje = 0
    }

    historyGames  =  ()=> {
        let auxDom = document.querySelectorAll('.juego')    
        let cantidadResultsJuegos = this.historicoScoresGame.length
        let y = 0
        console.log ('cantidadResultsJuegos' +cantidadResultsJuegos)

            auxDom.forEach(element => {           
                console.log ('this.historicoScoresGame ' +this.historicoScoresGame[cantidadResultsJuegos-1])
                if (cantidadResultsJuegos > 0 ){
                    
                        element.innerHTML = 'Juego '+(++y)+' ='+this.historicoScoresGame[cantidadResultsJuegos-1];
                        element.setAttribute('class', 'juego')
                        console.log ('agreagndo juego')
                        cantidadResultsJuegos--
                } 
                
            });
    }
    loadHistoricoScores =  (sessionStorage)=> {  
        let auxDom = document.querySelectorAll('.juego')   
        if (sessionStorage.length >= 5 ){
            let cantidadResultsJuegos = sessionStorage.length
        let y = 0
        console.log ('cantidadResultsJuegos' +cantidadResultsJuegos)

        auxDom.forEach(element => {           
                console.log ('sessionStorage ' +sessionStorage[cantidadResultsJuegos-1])
                if (cantidadResultsJuegos > 0 ){
                    
                        element.innerHTML = 'Juego '+(y+++1)+' ='+sessionStorage[cantidadResultsJuegos-1];
                        this.historicoScoresGame[y]=sessionStorage[cantidadResultsJuegos-1]    
                        element.setAttribute('class', 'juego')
                        console.log ('agreagndo juego')
                        cantidadResultsJuegos--
                } 
                
            });

        }

    }

    loadHistorialGameActual=  (localStorage)=> {  
        // let auxDom = document.querySelectorAll('.fila')   
        if (localStorage.length >= 0 && localStorage.length < 10){
            let cantidadResultsRonda = localStorage.length
        let x = 0
        console.log ('cantidadResultsRonda' +cantidadResultsRonda)
        
        this.showTableResults(localStorage)

            for (let index = localStorage.length-1; index+1> 0; index--) {
                const element = localStorage[index];
                
                console.log('element en posicion :'+(index)+' = '+element+' localStorage.length '+localStorage.length) 
                this.Puntuaciones[x++]=element    
            }

            this.dataPlayGame.cntRondas = this.Puntuaciones.length
        }else {
            this.btnComenzar.removeAttribute('class','btnComenzarNODisponible')
            this.btnComenzar.removeAttribute('disabled') 
            this.btnComenzar.setAttribute('class','btnComenzarDisponible') 
            this.opcPiedra.classList.add('opcActivated');  
            this.opcPapel.classList.add('opcActivated');   
            this.opcTijera.classList.add('opcActivated');  
            this.opcPiedra.setAttribute('disabled','true')
            this.opcPapel.setAttribute('disabled','true')
            this.opcTijera.setAttribute('disabled','true') 
        }
    }
    

}
let gameform = new game();

const tijera = document.querySelector('.opcion3')
tijera.addEventListener('click',  ()=> { 
     gameform.getTijeraActivated()
     gameform.getSeleccionIA()
    setTimeout( () => {
         gameform.viewResultRonda()
         
         gameform.Puntuaciones.push(JSON.stringify(  gameform.dataPlayGame))
         
         gameform.showTableResults (gameform.Puntuaciones)
         setTimeout( () => {
            
            gameform.validaRondas(gameform.dataPlayGame.cntRondas)
            gameform.historyGames()
            localStorage.setItem("historial", JSON.stringify(gameform.Puntuaciones));
            sessionStorage.setItem("historicoPuntuaciones", JSON.stringify(gameform.historicoScoresGame));
         }, 600);

    }, 700);
    
})
const piedra = document.querySelector('.opcion1')
piedra.addEventListener('click',  ()=>{ 
     gameform.getPiedraActivated()
     gameform.getSeleccionIA()
    setTimeout( () => {
         gameform.viewResultRonda()
         
         gameform.Puntuaciones.push(JSON.stringify(  gameform.dataPlayGame))
        
         gameform.showTableResults (gameform.Puntuaciones)
         setTimeout( () => {
            
            gameform.validaRondas(gameform.dataPlayGame.cntRondas)
            gameform.historyGames()
            localStorage.setItem('historial',JSON.stringify(gameform.Puntuaciones));
            sessionStorage.setItem("historicoPuntuaciones", JSON.stringify(gameform.historicoScoresGame));
         }, 600)
    }, 700);
    
    
})
const papel = document.querySelector('.opcion2')
papel.addEventListener('click',  ()=> { 
    
     gameform.getPapelActivated()
     gameform.getSeleccionIA()
     setTimeout( () => {
         gameform.viewResultRonda()     
         
         gameform.Puntuaciones.push(JSON.stringify(  gameform.dataPlayGame))
        
         gameform.showTableResults (gameform.Puntuaciones)
         setTimeout( () => {
            
            gameform.validaRondas(gameform.dataPlayGame.cntRondas)
            gameform.historyGames()
            localStorage.setItem('historial',JSON.stringify(gameform.Puntuaciones));
            sessionStorage.setItem("historicoPuntuaciones", JSON.stringify(gameform.historicoScoresGame));
         },  600)
         

    }, 700);
    

})

window.addEventListener('DOMContentLoaded', function () {
    
    setTimeout( () => {
        let historial = JSON.parse(localStorage.getItem('historial'));
        console.log( historial+'nro rondas :'+  historial.length)
        gameform.loadHistorialGameActual (historial)

        let historicoScores = JSON.parse(sessionStorage.getItem('historicoPuntuaciones'));
        console.log( historicoScores+'nro Juegos : '+  historicoScores.length)

        gameform.loadHistoricoScores (historicoScores)
    
   }, 300);

  
  });


const btncomenzar = document.querySelector('#btnComenzar')
btncomenzar.addEventListener('click',  ()=> { 
     gameform.startGame()

})


const btnSalir = document.querySelector('#bntCerrar')
btnSalir.addEventListener('click',  ()=> { 
     location.reload()

})



// const seleccionPlayer = document.querySelector('.opcActivated')
// seleccionPlayer.addEventListener('change',()=> gameform.getSeleccionIA())