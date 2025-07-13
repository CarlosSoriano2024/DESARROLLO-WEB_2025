// Arreglo inicial de productos
let productos = [
  { nombre: "Lápiz", precio: 0.50, descripcion: "Para escribir con precisión." },
  { nombre: "Cuaderno", precio: 1.75, descripcion: "Perfecto para tomar apuntes." },
  { nombre: "Mochila", precio: 15.00, descripcion: "Ligera y resistente." }
];

// Elementos del DOM
const lista = document.getElementById("lista-productos");
const botonAgregar = document.getElementById("agregar-producto");

// Función para renderizar productos
function renderizarProductos() {
  lista.innerHTML = ""; // Limpiar la lista

  productos.forEach(producto => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)}<br>
      <em>${producto.descripcion}</em>
    `;
    lista.appendChild(li);
  });
}

// Agregar un nuevo producto de ejemplo
botonAgregar.addEventListener("click", () => {
  const nuevoProducto = {
    nombre: "Marcador",
    precio: 1.25,
    descripcion: "Ideal para subrayar."
  };
  productos.push(nuevoProducto);
  renderizarProductos();
});

// Renderizar al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProductos);
