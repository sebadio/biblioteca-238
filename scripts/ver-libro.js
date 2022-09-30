const getLibro = async (id) => {
  let libro = await getJSONData(`${LIBRO_URL + id}.json`);
  return libro;
};

function redireccionar(id) {
  localStorage.setItem("libroID", id);
  window.location = "ver-libro.html";
}

const libroInfo = async () => {
  let { data } = await getLibro(localStorage.getItem("libroID"));
  let {
    autor,
    descripcion,
    editorial,
    imagenes,
    isbn,
    paginas,
    relacionados,
    titulo,
  } = await data;

  document.getElementById("contenido").innerHTML = `
    <div class="p-4 mt-4">
        <div class="row" >
          <div class="col-lg-3" style="height: 300px" id="carouselCol"></div>
          <div class="col-lg-6">
            <h2><b>${titulo}</b></h2>
            <hr>

            <p class="fw-bold">Descripción:</p>
            <p>${descripcion}</p>

            <hr >
            
            <p class="mx-auto fw-semibold">Datos del libro:</p>
            
            <ul class="list-group list-group${
              window.innerWidth < 600 ? "-flush" : ""
            }">
              <li class="list-group-item bg-dark text-white border-secondary"><b>Autor:</b> ${autor}</li>
              <li class="list-group-item bg-dark text-white border-secondary"><b>Editorial:</b> ${editorial}</li>
              <li class="list-group-item bg-dark text-white border-secondary">${paginas} paginas</li>
              <li class="list-group-item bg-dark text-white border-secondary"><b>Identificador ISBN:</b> ${isbn}</li>
            </ul>
          </div>
        </div>

        <hr >

        <h2>Relacionados:</h2>

        <div class="row d-flex justify-content-center mt-4 gap-2" id="related"></div>

    </div>
  `;
  agregarImagenes(imagenes);
  agregarRelacionados(relacionados);
};

libroInfo();

const agregarImagenes = (imagenes) => {
  document.getElementById("carouselCol").innerHTML = `
  
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div id="carouselIndicador" class="carousel-indicators">
    <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
  </div>
  <div id="carouselImagenes" class="carousel-inner">
    <div class="carousel-item active">
      <img src="${imagenes[0]}" class="d-block h-100 mx-auto" />
    </div>
  </div>
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  

  `;

  for (let i = 1; i < imagenes.length; i++) {
    const element = imagenes[i];
    document.getElementById("carouselImagenes").innerHTML += `
        <div class="carousel-item ">
          <img src="${element}" class="d-block h-100 mx-auto" />
        </div>
    `;

    document.getElementById("carouselIndicador").innerHTML += `

      <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="${i}"
      aria-label="Slide ${i + 1}"
    ></button>

    `;
  }
};

const agregarRelacionados = async (relacionados) => {
  let related = document.getElementById("related");

  for (let i = 0; i < relacionados.length; i++) {
    const element = relacionados[i];

    const { data } = await getLibro(element);
    const { titulo, imagenes, autor } = await data;

    related.innerHTML += `
    
      <div class="card p-1 bg-dark border-secondary col-lg-2" >
        <img src="${imagenes[0]}" style="height: 12rem; width: auto" class="card-img-top mx-auto">
        <div class="card-body h-full d-flex flex-column">
          <h5 class="card-title">${titulo}</h5>
          <button onclick="(redireccionar(${element}))" class="btn btn-primary my-auto">Ver libro</button>
        </div>
      </div>
    
    `;
  }
};
