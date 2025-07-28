// script.js - Lógica para el registro

const form = document.getElementById('formulario');
const registrosDiv = document.getElementById('registros');

function mostrarMensaje(texto, tipo = 'info') {
  let mensaje = document.querySelector('.mensaje');
  if (mensaje) mensaje.remove();
  mensaje = document.createElement('div');
  mensaje.className = 'mensaje';
  mensaje.textContent = texto;
  if (tipo === 'error') mensaje.style.background = '#ffcdd2', mensaje.style.color = '#b71c1c';
  if (tipo === 'success') mensaje.style.background = '#c8e6c9', mensaje.style.color = '#388e3c';
  form.parentNode.insertBefore(mensaje, form.nextSibling);
  setTimeout(() => mensaje.remove(), 3000);
}

function mostrarRegistros() {
  let registros = JSON.parse(localStorage.getItem('registros') || '[]');
  localStorage.setItem('registros', JSON.stringify(registros));
  registrosDiv.innerHTML = '';
  if (registros.length === 0) {
    registrosDiv.innerHTML = '<div class="mensaje">No hay registros aún.</div>';
    return;
  }
  registros.forEach((reg, idx) => {
    const div = document.createElement('div');
    div.className = 'registro';
    if (reg.editando) {
      // Mostrar formulario de edición en línea
      div.innerHTML = `
        <strong>#${idx+1}</strong>
        <input type="text" id="edit-nombre-${idx}" value="${reg.nombre || ''}" placeholder="Nombre">
        <input type="text" id="edit-cedula-${idx}" value="${reg.cedula || ''}" placeholder="Cédula">
        <input type="text" id="edit-apellido1-${idx}" value="${reg.apellido1 || ''}" placeholder="Apellido 1">
        <input type="text" id="edit-apellido2-${idx}" value="${reg.apellido2 || ''}" placeholder="Apellido 2">
        <input type="email" id="edit-email-${idx}" value="${reg.email || ''}" placeholder="Email">
        <input type="number" id="edit-edad-${idx}" value="${reg.edad || ''}" placeholder="Edad">
        <button onclick="guardarEdicionDesdeUI(${idx})">Guardar</button>
      `;
    } else {
      div.innerHTML = `
        <strong>#${idx+1}</strong>
        <div><b>Nombre:</b> ${reg.nombre || ''}</div>
        <div><b>Cédula:</b> ${reg.cedula || ''}</div>
        <div><b>Apellido 1:</b> ${reg.apellido1 || ''}</div>
        <div><b>Apellido 2:</b> ${reg.apellido2 || ''}</div>
        <div><b>Email:</b> ${reg.email || ''}</div>
        <div><b>Edad:</b> ${reg.edad || ''}</div>
        <button onclick="editarRegistro(${idx})">Editar</button>
        <button onclick="eliminarRegistro(${idx})">Eliminar</button>
      `;
    }
// Función para eliminar registro manualmente
function eliminarRegistro(idx) {
  let registros = JSON.parse(localStorage.getItem('registros') || '[]');
  if (!registros[idx]) return;
  registros.splice(idx, 1);
  localStorage.setItem('registros', JSON.stringify(registros));
  mostrarRegistros();
}
    registrosDiv.appendChild(div);
  });
}

// Función para guardar edición desde el formulario en línea
function guardarEdicionDesdeUI(idx) {
  const datos = {
    nombre: document.getElementById(`edit-nombre-${idx}`).value.trim(),
    cedula: document.getElementById(`edit-cedula-${idx}`).value.trim(),
    apellido1: document.getElementById(`edit-apellido1-${idx}`).value.trim(),
    apellido2: document.getElementById(`edit-apellido2-${idx}`).value.trim(),
    email: document.getElementById(`edit-email-${idx}`).value.trim(),
    edad: document.getElementById(`edit-edad-${idx}`).value.trim()
  };
  guardarEdicion(idx, datos);
}

// Función para editar un registro
function editarRegistro(idx) {
  let registros = JSON.parse(localStorage.getItem('registros') || '[]');
  if (!registros[idx]) return;
  registros[idx].editando = true;
  localStorage.setItem('registros', JSON.stringify(registros));
  mostrarRegistros();
}

// Función para guardar cambios y salir de edición
function guardarEdicion(idx, datos) {
  let registros = JSON.parse(localStorage.getItem('registros') || '[]');
  if (!registros[idx]) return;
  // Solo actualiza los datos y sale del modo edición, nunca elimina automáticamente
  Object.assign(registros[idx], datos);
  registros[idx].editando = false;
  localStorage.setItem('registros', JSON.stringify(registros));
  mostrarRegistros();
}


form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const cedula = form.cedula ? form.cedula.value.trim() : '';
  const apellido1 = form.apellido1 ? form.apellido1.value.trim() : '';
  const apellido2 = form.apellido2 ? form.apellido2.value.trim() : '';
  const email = form.email.value.trim();
  const edad = form.edad.value.trim();
  // Validación visual
  [form.nombre, form.email, form.edad].forEach(input => {
    input.style.borderColor = input.value.trim() ? '#1976d2' : '#b71c1c';
  });
  if (!nombre || !email || !edad) {
    mostrarMensaje('Por favor, completa todos los campos.', 'error');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    mostrarMensaje('El correo no es válido.', 'error');
    form.email.style.borderColor = '#b71c1c';
    return;
  }
  if (isNaN(edad) || edad < 1 || edad > 120) {
    mostrarMensaje('La edad debe ser entre 1 y 120.', 'error');
    form.edad.style.borderColor = '#b71c1c';
    return;
  }
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  registros.push({ nombre, cedula, apellido1, apellido2, email, edad, estado: 'Presente' });
  localStorage.setItem('registros', JSON.stringify(registros));
  form.reset();
  mostrarMensaje('¡Registro guardado exitosamente!', 'success');
  mostrarRegistros();
});

document.addEventListener('DOMContentLoaded', mostrarRegistros);
