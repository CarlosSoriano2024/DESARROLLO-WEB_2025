const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const contrasena = document.getElementById('contrasena');
const confirmar = document.getElementById('confirmar');
const edad = document.getElementById('edad');
const enviar = document.getElementById('enviar');
const form = document.getElementById('registroForm');

const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorContrasena = document.getElementById('errorContrasena');
const errorConfirmar = document.getElementById('errorConfirmar');
const errorEdad = document.getElementById('errorEdad');

function validarNombre() {
    if (nombre.value.length >= 3) {
        marcarValido(nombre, errorNombre);
        return true;
    } else {
        marcarInvalido(nombre, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
        return false;
    }
}

function validarCorreo() {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (regex.test(correo.value)) {
        marcarValido(correo, errorCorreo);
        return true;
    } else {
        marcarInvalido(correo, errorCorreo, 'Ingrese un correo válido.');
        return false;
    }
}

function validarContrasena() {
    const regex = /^(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (regex.test(contrasena.value)) {
        marcarValido(contrasena, errorContrasena);
        return true;
    } else {
        marcarInvalido(contrasena, errorContrasena, 'Mínimo 8 caracteres, un número y un carácter especial.');
        return false;
    }
}

function validarConfirmacion() {
    if (confirmar.value === contrasena.value && contrasena.value !== '') {
        marcarValido(confirmar, errorConfirmar);
        return true;
    } else {
        marcarInvalido(confirmar, errorConfirmar, 'Las contraseñas no coinciden.');
        return false;
    }
}

function validarEdad() {
    if (parseInt(edad.value) >= 18) {
        marcarValido(edad, errorEdad);
        return true;
    } else {
        marcarInvalido(edad, errorEdad, 'Debes tener al menos 18 años.');
        return false;
    }
}

function marcarValido(input, errorSpan) {
    input.classList.remove('invalido');
    input.classList.add('valido');
    errorSpan.textContent = '';
}

function marcarInvalido(input, errorSpan, mensaje) {
    input.classList.remove('valido');
    input.classList.add('invalido');
    errorSpan.textContent = mensaje;
}

function validarFormulario() {
    const esValido = validarNombre() && validarCorreo() && validarContrasena() && validarConfirmacion() && validarEdad();
    enviar.disabled = !esValido;
}

nombre.addEventListener('input', validarFormulario);
correo.addEventListener('input', validarFormulario);
contrasena.addEventListener('input', validarFormulario);
confirmar.addEventListener('input', validarFormulario);
edad.addEventListener('input', validarFormulario);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Formulario enviado correctamente.');
    form.reset();
    enviar.disabled = true;
    document.querySelectorAll('input').forEach(i => i.classList.remove('valido', 'invalido'));
});

form.addEventListener('reset', () => {
    enviar.disabled = true;
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    document.querySelectorAll('input').forEach(i => i.classList.remove('valido', 'invalido'));
});
