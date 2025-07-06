const imageUrlInput = document.getElementById('imageUrl');
const addImageBtn = document.getElementById('addImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const gallery = document.getElementById('gallery');

let selectedImage = null;

// Agregar nueva imagen
addImageBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();

    if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Imagen de galería';

        // Animación al agregar (opcional)
        img.style.opacity = 0;
        setTimeout(() => { img.style.opacity = 1; }, 10);

        img.addEventListener('click', () => {
            selectImage(img);
        });

        gallery.appendChild(img);
        imageUrlInput.value = '';
    } else {
        alert('Por favor, ingresa una URL válida.');
    }
});

// Seleccionar imagen
function selectImage(img) {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(image => image.classList.remove('selected'));

    img.classList.add('selected');
    selectedImage = img;
}

// Eliminar imagen seleccionada
deleteImageBtn.addEventListener('click', () => {
    if (selectedImage) {
        gallery.removeChild(selectedImage);
        selectedImage = null;
    } else {
        alert('Selecciona una imagen para eliminar.');
    }
});

// Atajo con teclado: presionar "Enter" agrega imagen
imageUrlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addImageBtn.click();
    }
});
