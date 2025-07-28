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
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  registrosDiv.innerHTML = '';
  if (registros.length === 0) {
    registrosDiv.innerHTML = '<div class="mensaje">No hay registros aún.</div>';
    return;
  }
  registros.forEach((reg, idx) => {
    const div = document.createElement('div');
    div.className = 'registro';
    div.innerHTML = `
      <strong>#${idx+1}</strong>
      <div><b>Nombre:</b> ${reg.nombre}</div>
      <div><b>Email:</b> ${reg.email}</div>
      <div><b>Edad:</b> ${reg.edad}</div>
    `;
    registrosDiv.appendChild(div);
  });
}


form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
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
  registros.push({ nombre, email, edad, estado: 'Presente' });
  localStorage.setItem('registros', JSON.stringify(registros));
  form.reset();
  mostrarMensaje('¡Registro guardado exitosamente!', 'success');
  mostrarRegistros();
});

document.addEventListener('DOMContentLoaded', mostrarRegistros);
