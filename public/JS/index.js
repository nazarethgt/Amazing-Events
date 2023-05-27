let fechaBase
let eventos = []
var eventosPasados = []
var eventosFuturos = []
var stats = ""
var contact = ""
let textoHTML = document.getElementById("form")
let ulNombreEventos = document.getElementById("eventos")
let arrayAFiltrar = []
var searchContainer = document.getElementById("searchContainer")
var inputSearch = document.getElementById("inputSearch")

let checkedCheckboxes = []
let search = ""


async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual

    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        } else {
            eventosPasados.push(eventos[i])
        }
    }

    imprimir()
}

getData()



var buttonNavegacion = []
var buttonNav = document.getElementsByClassName("navlink")
for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i]
    buttonNavegacion.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        document.getElementById("name").innerHTML = e.target.innerText
        imprimir(e.target.id);
    })
}

function imprimir(id) {
    switch (id) {
        case "upcomingEvents":
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"  
            displayCards(eventosFuturos)
            eventsCategories(eventosFuturos)
            textoHTML.innerHTML = ""
            break;
        case "pastEvents":
            arrayAFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            inputSearch.value = ""
            checkedCheckboxes = []
            displayCards(eventosPasados)
            eventsCategories(eventosPasados)
            break;
        case "contact":
            imprimirFormulario()
            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        case "stats":
            imprimirStats()
            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        default:
            arrayAFiltrar = eventos
            searchContainer.style.display = "flex"
            displayCards(eventos)
            eventsCategories(eventos)
            break;
    }
}

function displayCards(array) {
    var url
    if (location.pathname == "/pages/detalle.html") {
        url = "../detalle.html"
    } else {
        url = "../pages/detalle.html"
    }
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
        <li class="cards_item">
            <div class="card">
                <div class= "card-image">     
                    <img src="${array[i].image}" alt="${array[i].name}">
                </div>
                <div class="card_content">
                    <p class="card_title">${array[i].name}</p>
                 
                    <div class="card_body"> 
                        <h6 class="card_text"> Price: $${array[i].price}</h6>
                        <button type="button" class="card_btn" data-bs-toggle="modal" data-bs-target="#dialogo${array[i].id}">ver más</button>
                    </div>

                </div>
            </div>
            <!-- ventana modal -->
            <div class="modal fade" id="dialogo${array[i].id}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="main">
                                <ul class="cards">
                                    <li class="cards_detalle">
                                        <div class="cardDetalle">
                                            <div class="card_image"><img src="${array[i].image}"></div>
                                            <div class="card_content">
                                                <h2 class="card_title"> ${array[i].category}</h2>
                                                <p class="card_text"> ${array[i].name}</p>
                                                <p class="card_text"> ${array[i].date} </p>
                                                <p class="card_text"> ${array[i].description}</p>
                                                <p class="card_text"> ${array[i].place} </p>
                                                <p class="card_text"> Capacity: ${array[i].capacity} </p>
                                       
                                                <h6 class="card_text">Price:  $${array[i].price}</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>


    `
    }
    document.getElementById("todosLosEventos").innerHTML = html;
}


var time = location.search.split("?time=")

switch (time[1]) {
    case "pastEvents": imprimir("pastEvents")
        textoHTML.innerHTML = ""
        arrayAFiltrar = eventosPasados
        inputSearch.value = ""
        checkedCheckboxes = []
        searchContainer.style.display = "flex"
        changePage(2)
        break;
    case "upcomingEvents": imprimir("upcomingEvents")
        arrayAFiltrar = eventosFuturos
        inputSearch.value = ""
        checkedCheckboxes = []
        searchContainer.style.display = "flex"
        changePage(1)
        break;
    case "contact": imprimir("contact")
        imprimirFormulario()
        textoHTML.innerHTML = ""
        searchContainer.style.display = "none"
        changePage(3)
        break;
    case "stats": imprimir("stats")
        textoHTML.innerHTML = ""
        searchContainer.style.display = "none"
        changePage(4)
        break;
    default: imprimir("home")
        changePage(0)
}

var buttonafter = document.getElementById("next")
buttonafter.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) == 4) {
        changePage(0)
    } else {
        changePage(buttonNavegacion.indexOf(page) + 1)
    }

})

var buttonafter = document.getElementById("after")
buttonafter.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) == 0) {
        changePage(4)
    } else {
        changePage(buttonNavegacion.indexOf(page) - 1)
    }
})


function changePage(i) {
    switch (i) {
        case 0: displayCards(eventos)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            arrayAFiltrar = eventosPasados
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 1: displayCards(eventosFuturos)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 2: displayCards(eventosPasados)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            arrayAFiltrar = eventosPasados
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 3: imprimirFormulario("contact")
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        case 4: imprimirStats("stats")
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            searchContainer.style.display = "none"
            break;
    }
}

function imprimirFormulario() {
    document.getElementById("todosLosEventos").innerHTML =
        `
        <div class="form">
            <form class="formulario" method="POST" action="" id="formulario">
              
                <div class="input-field">
                    <i class="fas fa-user"></i>
                    <div class="formulario__grupo" id="grupo__nombre">
                        <label for="nombre">Name</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" name="nombre" id="nombre" placeholder="John Doe" required>
                            <i class="formulario__validacion-estado fas fa-times-circle"></i>
                        </div>
                        <p class="formulario__input-error">El nombre no puede estar vacío y solo puede contener letras</p>
                    </div>
                </div>

                <div class="input-field">
                    <i class="fas fa-mobile-alt"></i>
                    <div class="formulario__grupo" id="grupo__telefono">
                        <label for="telefono">Cell Phone</label>
                        <div class="formulario__grupo-input">
                            <input class="formulario__input" type="text" name="telefono" id="telefono" placeholder="11 5555 5555" required>
                            <i class="formulario__validacion-estado fas fa-times-circle"></i>
                        </div>
                        <p class="formulario__input-error">El teléfono solo puede contener números</p>
                    </div>
                </div>


                <div class="input-field">
                    <i class="fas fa-at"></i>
                    <div class="formulario__grupo" id="grupo__email">
                        <label for="email">Email</label>
                        <div class="formulario__grupo-input">
                            <input class="formulario__input" type="email" name="email" id="email" placeholder="aevents@mail.com" required>
                            <i class="formulario__validacion-estado fas fa-times-circle"></i>
                        </div>
                        <p class="formulario__input-error">El e-mail no puede estar vacío, debe tener el siguiente formato tu@email.com y solo puede contener letras, números, puntos, guiones y guión bajo.</p>
                    </div>
                </div>

                <div class="input-field">
                    <i class="fas fa-pen"></i>
                    <div class="formulario__grupo" id="grupo__mensaje">
                        <label for="mensaje">Message</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" name="mensaje" id="mensaje" cols="30" rows="10" placeholder="Escriba aquí su mensaje.">
                            <i class="formulario__validacion-estado fas fa-times-circle"></i>
                        </div>
                        <p class="formulario__input-error">Escriba su mensaje</p>
                    </div>
                </div>

                <div class="formulario__completa" id="formulario__completa">
                    <p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Por favor, complete el formulario correctamente.</p>
                </div>

                <div class="btn-block formulario__grupo formulario__grupo-btn-enviar">
                    <button class="btn" type="submit" data-bs-toggle="modal" data-bs-target="#agradecimiento"><i class="fas fa-paper-plane"></i>Submit</button>
                    <p class="formulario__mensaje-exito" id="formulario__mensaje-exito"> <!--Formulario enviado con éxito--> </p>
                </div>
            </form>
        </div>

        <div class="modal fade" id="agradecimiento">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exModalLabel"> </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        Muchas gracias por tu mensaje, nos contactaremos a la brevedad.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const formulario = document.getElementById('formulario');
    const menu = document.getElementById('check');
    const opcion = document.querySelectorAll('#menu-bar a');

    menu.addEventListener('change', () => {
        if (menu.checked) {
            opcion.forEach((opcion) => {
                opcion.addEventListener('click', () => {
                    menu.checked = false;
                });
            });
        } else {
            console.log('no se está detectando el evento');
        }
    });

    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = { 
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
        telefono: /^[0-9]{1,15}$/, 
        mensaje: /^[a-zA-ZÀ-ÿ\s\W]{5,200}$/ 
    };

    const campos = {
        nombre: false,
        email: false,
        telefono: false,
        mensaje: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            case "mensaje":
                validarCampo(expresiones.mensaje, e.target, 'mensaje');
                break;
        }
    };
 
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    };
    
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(campos)

        if (campos.nombre && campos.email && campos.telefono && campos.mensaje) {
            formulario.reset();

            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            document.getElementById('formulario__completa').classList.remove('formulario__completa-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } else {
            document.getElementById('formulario__completa').classList.add('formulario__completa-activo');
        }
    });
}

function imprimirStats() {
    document.getElementById("todosLosEventos").innerHTML =
    `
    <div class=" col-12 col-md-9 ">
    <table class="table table-hover text-black">
    <tbody>

        <tr class="color table-primary">
          <th colspan="3">Estadísticas de Eventos</th>
        </tr>
        <tr class="titulo ">
          <td>Eventos con Mayor Porcentaje de Asistencia</td>
          <td>Eventos con Menor Porcentaje de Asistencia</td>
          <td class="col-3">Eventos de Mayor Capacidad</td>
        </tr>
        <tr>
          <td>Metallica en Concierto</td>
          <td>Fiesta de Disfraces</td>
          <td>Metallica en Concierto</td>
        </tr>
        <tr>
          <td>Feria del libro Escolar</td>
          <td>Avengers</td>
          <td>Feria del libro Escolar</td>
        </tr>
        <tr class="color table-primary">
          <th colspan="3 ">Estadísticas de eventos próximos por categoría</th>
        </tr>
        <tr class="titulo">
          <th>Categorías</th>
          <th>Ingresos</th>
          <th>Porcentaje de Estimación</th>
        </tr>
        <tr>
          <td>Metallica en Concierto</td>
          <td>Concierto de Música</td>
          <td>138.000</td>
        </tr>
        <tr>
          <td>Noche de Halloween</td>
          <td>Fiesta de Disfraces</td>
          <td>9.000</td>
        </tr>
        <tr>
          <td>Avengers</td>
          <td>Vamos al Cine</td>
          <td>9.000</td>
        </tr>
        <tr class="color table-primary">
        <th colspan="3" >Estadísticas de eventos pasados por categoría</th>
        </tr>
        <tr class="titulo">
        <th>Categorías</th>
        <th>Ingresos</th>
        <th>Porcentaje de Asistencia</th>
        </tr>
        <tr>
        <td>10K por la vida</td>
        <td>Carrera</td>
        <td>25.698</td>
        </tr>
        <tr>
        <td>Feria del libro Escolar</td>
        <td>Intercambio de Libros</td>
        <td>123.286</td>
        </tr>
        <tr>
        <td>Parque Jurásico</td>
        <td>Salida al Museo</td>
        <td>65.892</td>
        </tr>
        <tr>
            <td>Fiesta de las Colectividades</td>
            <td>Feria de Comida</td>
            <td>42.756</td>
        </tr>
        </tbody>
    </table>
    </div>
    `
}

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    console.log('DATOINPUT==> ', datoInput)
    search = datoInput.trim().toLowerCase()
    console.log('SEARCXH==> ', datoInput)
    filtrosCombinados()
})

function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]
    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `
    )
    document.getElementById("checkcategories").innerHTML = categoriasEventos
    checkboxListener()
}

function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox')
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkedCheckboxes = []
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            console.log(checkedCheckboxes)
            filtrosCombinados()
        })
    }
}

function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))
    }
    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )
    }
    else {
        filtrado = arrayAFiltrar
    }
    filtrado.length > 0 ?
        displayCards(filtrado) :
        ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>`
}
