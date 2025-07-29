// Inicialización global de estudiantes y dias para el sistema de asistencia
window.estudiantes = window.estudiantes || [];
window.dias = window.dias || [{fecha: '', nombre: 'Día 1', lecciones: 0}];
window.VERSION = window.VERSION || '1.0';
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
  // Campo de alerta temprana SIEMPRE visible
  let alertaContainer = document.getElementById('alerta-temprana-registros');
  if (alertaContainer) alertaContainer.remove();
  alertaContainer = document.createElement('div');
  alertaContainer.id = 'alerta-temprana-registros';
  alertaContainer.style = 'margin-bottom:14px;display:flex;align-items:center;gap:12px;';
  alertaContainer.innerHTML = `<label for="input-alerta-temprana-registros" style="font-weight:600;color:#1976d2;font-size:1.08em;">Valor alerta temprana (%)</label>
    <input type="number" id="input-alerta-temprana-registros" min="0" max="100" value="${window.valorExtra}" style="width:70px;padding:7px 8px;border-radius:8px;border:1.5px solid #1976d2;font-size:1em;box-shadow:0 2px 8px rgba(25,118,210,0.07);transition:border 0.18s, box-shadow 0.18s;">
    <span style="color:#888;font-size:0.98em;">(La alerta se activa si 10% - %Asistencia ≥ valor ingresado)</span>`;
  if (registrosDiv && registrosDiv.parentNode) {
    registrosDiv.parentNode.insertBefore(alertaContainer, registrosDiv);
  } else if (form && form.parentNode) {
    form.parentNode.insertBefore(alertaContainer, form);
  } else {
    document.body.insertBefore(alertaContainer, document.body.firstChild);
  }
  document.getElementById('input-alerta-temprana-registros').addEventListener('input', function() {
    let val = Number(this.value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 100) val = 100;
    window.valorExtra = val;
    let inputTabla = document.getElementById('input-alerta-temprana');
    if (inputTabla) inputTabla.value = val;
    mostrarRegistros();
    renderAsistencia();
  });

  // SIEMPRE mostrar el campo, aunque no haya registros
  if (registros.length === 0) {
    registrosDiv.innerHTML = '<div class="mensaje">No hay registros aún.</div>';
    return;
  }

  registros.forEach((reg, idx) => {
    const div = document.createElement('div');
    div.className = 'registro';
    let porcentajeAsistencia = 0;
    let totalLecciones = 10; // Puedes ajustar esto según tu lógica
    let totalAusente = Number(reg.ausente || 0);
    let totalTarde = Number(reg.tarde || 0);
    let totalEscapada = Number(reg.escapada || 0);
    if (totalLecciones > 0) {
      let totalAusencias = totalAusente + (totalTarde * 0.5) + totalEscapada;
      let porcentajeAusencia = (totalAusencias / totalLecciones) * 100;
      porcentajeAusencia = Math.round(porcentajeAusencia * 100) / 100;
      if (porcentajeAusencia > 100) porcentajeAsistencia = 0;
      if (porcentajeAusencia < 1) porcentajeAsistencia = 10;
      else if (porcentajeAusencia < 10) porcentajeAsistencia = 9;
      else if (porcentajeAusencia < 20) porcentajeAsistencia = 8;
      else if (porcentajeAusencia < 30) porcentajeAsistencia = 7;
      else if (porcentajeAusencia < 40) porcentajeAsistencia = 6;
      else if (porcentajeAusencia < 50) porcentajeAsistencia = 5;
      else if (porcentajeAusencia < 60) porcentajeAsistencia = 4;
      else if (porcentajeAusencia < 70) porcentajeAsistencia = 3;
      else if (porcentajeAusencia < 80) porcentajeAsistencia = 2;
      else if (porcentajeAusencia < 90) porcentajeAsistencia = 1;
      else porcentajeAsistencia = 0;
    }
    let accionHtml = '';
    let diferencia = 10 - porcentajeAsistencia;
    if (
      porcentajeAsistencia >= 0 && porcentajeAsistencia < 10 &&
      diferencia >= window.valorExtra &&
      reg.cedula && reg.cedula.trim() !== '' &&
      reg.nombre && reg.nombre.trim() !== '' &&
      reg.apellido1 && reg.apellido1.trim() !== ''
    ) {
      accionHtml = `<span style='background:#ffeaea;color:#222;border-radius:6px;padding:4px 10px;font-weight:bold;border:2px solid #e74c3c;'>Alerta temprana</span>`;
    }
    if (reg.editando) {
      div.innerHTML = `
        <strong>#${idx+1}</strong>
        <input type="text" id="edit-nombre-${idx}" value="${reg.nombre || ''}" placeholder="Nombre">
        <input type="text" id="edit-cedula-${idx}" value="${reg.cedula || ''}" placeholder="Cédula">
        <input type="text" id="edit-apellido1-${idx}" value="${reg.apellido1 || ''}" placeholder="Apellido 1">
        <input type="text" id="edit-apellido2-${idx}" value="${reg.apellido2 || ''}" placeholder="Apellido 2">
        <input type="email" id="edit-email-${idx}" value="${reg.email || ''}" placeholder="Email">
        <input type="number" id="edit-edad-${idx}" value="${reg.edad || ''}" placeholder="Edad">
        <button onclick="guardarEdicionDesdeUI(${idx})">Guardar</button>
        <div style='margin-top:8px;'>${accionHtml}</div>
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
        <div style='margin-top:8px;'>${accionHtml}</div>
      `;
    }
    registrosDiv.appendChild(div);
  });

// Función para eliminar registro manualmente
function eliminarRegistro(idx) {
  let registros = JSON.parse(localStorage.getItem('registros') || '[]');
  if (!registros[idx]) return;
  registros.splice(idx, 1);
  localStorage.setItem('registros', JSON.stringify(registros));
  mostrarRegistros();
}
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

document.addEventListener('DOMContentLoaded', function() {
  renderAsistencia();
  mostrarRegistros();
});

// Valor de alerta temprana (porcentaje)
// Valor de alerta temprana (porcentaje)
const STORAGE_KEY_ALERTA = 'valorExtraAlertaTemprana';
window.valorExtra = localStorage.getItem(STORAGE_KEY_ALERTA) ? parseFloat(localStorage.getItem(STORAGE_KEY_ALERTA)) : 2;

// Sincroniza el input de la barra de acciones con la lógica de alerta temprana
function sincronizarInputAlertaTemprana() {
  const input = document.getElementById('alertaTempranaInput');
  if (!input) return;
  // Inicializa el valor del input con window.valorExtra
  input.value = window.valorExtra;
  input.min = 0;
  input.max = 10;
  // Al cambiar el input, actualiza window.valorExtra, guarda en localStorage y refresca la tabla
  input.addEventListener('input', function() {
    let val = Number(this.value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 10) val = 10;
    window.valorExtra = val;
    localStorage.setItem(STORAGE_KEY_ALERTA, val);
    // Si existe el otro input (de la tabla), sincronízalo
    let inputTabla = document.getElementById('input-alerta-temprana');
    if (inputTabla) inputTabla.value = val;
    renderAsistencia();
    mostrarRegistros();
  });
}

// Al cargar la página, sincronizar el input de la barra de acciones
document.addEventListener('DOMContentLoaded', function() {
  sincronizarInputAlertaTemprana();
});

// Renderiza el campo para ingresar el valor de alerta temprana
function renderCampoAlertaTemprana() {
  let container = document.getElementById('alerta-temprana-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'alerta-temprana-container';
    container.style = 'margin-bottom:14px;display:flex;align-items:center;gap:12px;';
    container.innerHTML = `<label for="input-alerta-temprana" style="font-weight:600;color:var(--color-primario);font-size:1.08em;">Valor alerta temprana (%)</label>
      <input type="number" id="input-alerta-temprana" min="0" max="10" value="${window.valorExtra}" style="width:70px;padding:7px 8px;border-radius:8px;border:1.5px solid var(--color-primario);font-size:1em;box-shadow:0 2px 8px rgba(25,118,210,0.07);transition:border 0.18s, box-shadow 0.18s;">
      <span style="color:#888;font-size:0.98em;">(La alerta se activa si 10% - %Asistencia ≥ valor ingresado)</span>`;
    // Insertar el campo antes del elemento 'app'
    const app = document.getElementById('app');
    if (app && app.parentNode) {
      const anterior = document.getElementById('alerta-temprana-container');
      if (anterior) anterior.remove();
      app.parentNode.insertBefore(container, app);
    }
    document.getElementById('input-alerta-temprana').addEventListener('input', function() {
      let val = Number(this.value);
      if (isNaN(val) || val < 0) val = 0;
      if (val > 10) val = 10;
      window.valorExtra = val;
      localStorage.setItem(STORAGE_KEY_ALERTA, val);
      let inputBarra = document.getElementById('alertaTempranaInput');
      if (inputBarra) inputBarra.value = val;
      renderAsistencia();
      mostrarRegistros();
    });
  } else {
    document.getElementById('input-alerta-temprana').value = window.valorExtra;
  }
}

// Función para renderizar la asistencia
function renderAsistencia() {
    // Renderizar el campo de alerta temprana SIEMPRE antes de la tabla
    setTimeout(renderCampoAlertaTemprana, 0);
    // Leer el valor actual del input de alerta temprana de la barra de acciones
    let alertaInput = document.getElementById('alertaTempranaInput');
    let valorAlerta = window.valorExtra;
    if (alertaInput) {
        let val = Number(alertaInput.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 10) val = 10;
        valorAlerta = val;
        window.valorExtra = val;
    }
    // Usar window.estudiantes y window.dias
    const estudiantes = window.estudiantes;
    const dias = window.dias;
    if (Array.isArray(estudiantes)) {
        let vacios = estudiantes.filter(e => !e.cedula && !e.nombre && !e.apellido1 && !e.apellido2);
        if (vacios.length > 1) {
            let toRemove = vacios.length - 1;
            for (let i = estudiantes.length - 1; i >= 0 && toRemove > 0; i--) {
                if (!estudiantes[i].cedula && !estudiantes[i].nombre && !estudiantes[i].apellido1 && !estudiantes[i].apellido2) {
                    estudiantes.splice(i, 1);
                    toRemove--;
                }
            }
        }
    }
    if (!estudiantes || estudiantes.length === 0) {
        let html = `<div class="version-mensaje" style="margin-bottom:10px;font-size:1.08em;color:var(--color-primario);font-weight:500;">🗓️ Sistema de registro de asistencia <span style="color:var(--color-error);font-weight:bold;">v${VERSION}</span></div>`;
        html += `<div style="width:100%;display:flex;justify-content:flex-end;margin:0 0 12px 0;"></div>`;
        html += `<table border="1" aria-label="Tabla de asistencia" style="border-collapse:collapse;background:var(--color-table-bg);">`;
        html += '<thead>';
        html += '<tr>' +
            '<th>#</th>' +
            '<th class="cedula">Cédula</th>' +
            '<th class="apellido1">Primer apellido</th>' +
            '<th class="apellido2">Segundo apellido</th>' +
            '<th class="nombre">Nombre</th>';
        for (let d = 0; d < dias.length; d++) {
            html += `<th><input type="date" value="${dias[d].fecha}" style="width:110px;" aria-label="Fecha del día ${d+1}"><br><span class="label-dia" style="font-size:12px;color:#fff !important;text-shadow:0 2px 8px #222 !important;">${dias[d].nombre}</span><br><div style='display:flex;align-items:center;gap:6px;margin-top:4px;'><span style='font-size:11px;color:#888;background:#f4f7fb;padding:2px 8px;border-radius:6px;'>Lecciones</span><input type="number" min="0" value="${dias[d].lecciones}" style="width:70px;" placeholder="Lecciones" aria-label="Lecciones día ${d+1}"></div></th>`;
        }
        html += '<th class="th-resumen">Acciones</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        html += `<tr><td colspan="${5 + dias.length + 1}" style="text-align:center;color:#888;font-size:1.08em;padding:18px 0;background:none;border:none;">No hay estudiantes registrados.</td></tr>`;
        html += '</tbody></table>';
        document.getElementById('app').innerHTML = html;
        actualizarContador();
        return;
    }
    let html = `<div class="version-mensaje" style="margin-bottom:10px;font-size:1.08em;color:var(--color-primario);font-weight:500;">🗓️ Sistema de registro de asistencia <span style="color:var(--color-error);font-weight:bold;">v${VERSION}</span></div>`;
    html += `<table border="1" aria-label="Tabla de asistencia" style="border-collapse:collapse;background:var(--color-table-bg);">`;
    html += '<thead>';
    html += '<tr>' +
        '<th rowspan="2">#</th>' +
        '<th rowspan="2" class="cedula">Cédula</th>' +
        '<th rowspan="2" class="apellido1">Primer apellido</th>' +
        '<th rowspan="2" class="apellido2">Segundo apellido</th>' +
        '<th rowspan="2" class="nombre">Nombre</th>' +
        `<th colspan="${dias.length}"><span style="font-size:1em;font-weight:600;color:var(--color-primario);"><svg style="vertical-align:middle;margin-right:4px;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primario)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="4"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Asistencia por día</span></th>` +
        '<th rowspan="2" class="th-resumen">Ausencias</th>' +
        '<th rowspan="2" class="th-resumen">Justificadas</th>' +
        '<th rowspan="2" class="th-resumen">Presentes</th>' +
        '<th rowspan="2" class="th-resumen">Tardías</th>' +
        '<th rowspan="2" class="th-resumen">Escapadas</th>' +
        '<th rowspan="2" class="th-resumen">Total ausencias</th>' +
        '<th rowspan="2" class="th-resumen">Total lecciones</th>' +
        `<th rowspan="2" class="th-resumen" title="Porcentaje de ausencias injustificadas del total de lecciones impartidas:\n0% a <1% = 10\n1% a <10% = 9\n10% a <20% = 8\n20% a <30% = 7\n30% a <40% = 6\n40% a <50% = 5\n50% a <60% = 4\n60% a <70% = 3\n70% a <80% = 2\n80% a <90% = 1\n90% a 100% = 0">% Asistencia</th>` +
        '<th rowspan="2" class="th-resumen">Acciones</th>' +
        '</tr>';
    html += '<tr>';
    for (let d = 0; d < dias.length; d++) {
        let ausentesDia = 0;
        for (let i = 0; i < estudiantes.length; i++) {
            let dia = estudiantes[i].asistenciaDias[d];
            if (typeof dia === 'object' && dia.tipo === 'Ausente' && dia.cantidad > 0) ausentesDia++;
        }
        html += `<th>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
                <input type="date" value="${dias[d].fecha}" onchange="actualizarFechaDia(${d}, this.value)" style="width:110px;align-self:flex-start;" aria-label="Fecha del día ${d+1}">
                <div style="width:100%;display:flex;align-items:center;justify-content:space-between;">
                    <span class="label-dia" style="font-size:12px;color:#fff !important;text-shadow:0 2px 8px #222 !important;">${dias[d].nombre}</span>
                    ${d === dias.length - 1 ? `<button onclick=\"agregarDia()\" class=\"btn-agregar-dia\" style=\"padding:6px 18px;font-size:1em;border-radius:8px;background:linear-gradient(90deg,#43a047 60%,#27ae60 100%);color:#fff;border:none;box-shadow:0 2px 8px rgba(67,160,71,0.13);font-weight:600;line-height:1;min-width:54px;max-width:90px;margin-left:8px;display:inline-block;\" title=\"Agregar día\">+ Día</button>` : ''}
                </div>
            </div>
        `;
        html += `<br><div style='display:flex;align-items:center;gap:8px;margin-top:6px;'>
            <span style='font-size:12px;color:var(--color-primario);background:linear-gradient(90deg,#e3e9f7 0%,#fff 100%);padding:3px 12px;border-radius:8px;border:1.5px solid var(--color-primario);font-weight:600;box-shadow:0 2px 8px rgba(25,118,210,0.08);transition:background 0.18s;'>Lecciones</span>
            <input type="number" min="0" value="${dias[d].lecciones}" style="width:70px;padding:7px 8px;border-radius:8px;border:1.5px solid var(--color-primario);font-size:1em;box-shadow:0 2px 8px rgba(25,118,210,0.07);transition:border 0.18s, box-shadow 0.18s;" onchange="actualizarLeccionesDia(${d}, this.value)" placeholder="Lecciones" aria-label="Lecciones día ${d+1}">
        </div>`;
        html += `<br><span style="font-size:11px;color:var(--color-error);font-weight:bold;">Ausentes: ${ausentesDia}</span>`;
        html += `<br><button onclick="eliminarDia(${d})" class="btn-eliminar-dia" title="Eliminar este día" aria-label="Eliminar día" style="display:flex;align-items:center;gap:8px;padding:8px 22px;font-size:1.08em;font-weight:600;border-radius:10px;background:linear-gradient(90deg,#e74c3c 60%,#c0392b 100%);color:#fff;border:none;box-shadow:0 4px 16px rgba(231,76,60,0.13);transition:background 0.18s,box-shadow 0.18s,transform 0.18s;">
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle;'><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/></svg>
            Eliminar día
        </button>`;
        html += `</th>`;
    }
    html += '</tr>';
    let num = 1;
    for (let i = 0; i < estudiantes.length; i++) {
        const estudiante = estudiantes[i];
        let totalAusente = 0, totalTarde = 0, totalEscapada = 0, totalJustificada = 0;
        html += `<tr>`;
        html += `<td class="numero sticky">${num++}</td>`;
        html += `<td class="cedula sticky"><input type="text" value="${estudiante.cedula || ''}" onchange="actualizarEstudiante(${i}, 'cedula', this.value)" placeholder="Número de cédula" aria-label="Cédula"></td>`;
        html += `<td class="apellido1 sticky"><input type="text" value="${estudiante.apellido1 || ''}" onchange="actualizarEstudiante(${i}, 'apellido1', this.value)" placeholder="Primer apellido" aria-label="Primer apellido"></td>`;
        html += `<td class="apellido2 sticky"><input type="text" value="${estudiante.apellido2 || ''}" onchange="actualizarEstudiante(${i}, 'apellido2', this.value)" placeholder="Segundo apellido" aria-label="Segundo apellido"></td>`;
        html += `<td class="nombre sticky"><input type="text" value="${estudiante.nombre || ''}" onchange="actualizarEstudiante(${i}, 'nombre', this.value)" placeholder="Nombre" aria-label="Nombre"></td>`;
        for (let d = 0; d < dias.length; d++) {
            let dia = estudiante.asistenciaDias[d];
            if (typeof dia === 'string') {
                let tipo = 'Ausente';
                if (dia === 'Tardía') tipo = 'Tardía';
                if (dia === 'Escapada') tipo = 'Escapada';
                dia = { tipo: tipo, cantidad: 1 };
                estudiante.asistenciaDias[d] = dia;
            }
            if (!dia.tipo) dia.tipo = 'Ausente';
            if (typeof dia.cantidad !== 'number') dia.cantidad = 0;
            if (dia.tipo === 'Ausente') totalAusente += Number(dia.cantidad || 0);
            if (dia.tipo === 'Tardía') totalTarde += Number(dia.cantidad || 0);
            if (dia.tipo === 'Escapada') totalEscapada += Number(dia.cantidad || 0);
            if (dia.tipo === 'Justificada') totalJustificada += Number(dia.cantidad || 0);
            html += `<td style="min-width:130px;text-align:${dia.tipo === 'Presente' ? 'left' : 'center'};vertical-align:middle;">`;
            html += `<div style="display:flex;align-items:center;justify-content:${dia.tipo === 'Presente' ? 'flex-start' : 'center'};gap:8px;">`;
            html += `<select onchange="actualizarAsistenciaTipo(${i},${d},this.value)" style="width:110px;padding:6px 8px;font-size:1em;margin-right:8px;text-align:${dia.tipo === 'Presente' ? 'left' : 'center'};" aria-label="Tipo asistencia estudiante ${num-1} día ${d+1}">`;
            html += `<option value="Presente"${dia.tipo === 'Presente' ? ' selected' : ''}>Presente</option>`;
            html += `<option value="Ausente"${dia.tipo === 'Ausente' ? ' selected' : ''}>Ausente</option>`;
            html += `<option value="Tardía"${dia.tipo === 'Tardía' ? ' selected' : ''}>Tardía</option>`;
            html += `<option value="Escapada"${dia.tipo === 'Escapada' ? ' selected' : ''}>Escapada</option>`;
            html += `<option value="Justificada"${dia.tipo === 'Justificada' ? ' selected' : ''}>Justificada</option>`;
            html += `</select>`;
            if (dia.tipo !== 'Presente') {
                html += `<input type="number" min="0" value="${dia.cantidad || 0}" style="width:54px;padding:6px 4px;font-size:1em;" onchange="actualizarAsistenciaCantidad(${i},${d},this.value)" aria-label="Cantidad asistencia estudiante ${num-1} día ${d+1}">`;
            }
            html += `</div>`;
            html += `</td>`;
        }
        let totalLecciones = dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0);
        let porcentajeAsistencia = 0;
        if (totalLecciones > 0) {
            let totalAusencias = totalAusente + (totalTarde * 0.5) + totalEscapada;
            let porcentajeAusencia = (totalAusencias / totalLecciones) * 100;
            porcentajeAusencia = Math.round(porcentajeAusencia * 100) / 100;
            if (porcentajeAusencia > 100) porcentajeAsistencia = 0;
            if (porcentajeAusencia < 1) porcentajeAsistencia = 10;
            else if (porcentajeAusencia < 10) porcentajeAsistencia = 9;
            else if (porcentajeAusencia < 20) porcentajeAsistencia = 8;
            else if (porcentajeAusencia < 30) porcentajeAsistencia = 7;
            else if (porcentajeAusencia < 40) porcentajeAsistencia = 6;
            else if (porcentajeAusencia < 50) porcentajeAsistencia = 5;
            else if (porcentajeAusencia < 60) porcentajeAsistencia = 4;
            else if (porcentajeAusencia < 70) porcentajeAsistencia = 3;
            else if (porcentajeAusencia < 80) porcentajeAsistencia = 2;
            else if (porcentajeAusencia < 90) porcentajeAsistencia = 1;
            else porcentajeAsistencia = 0;
        }
        html += `<td style="font-weight:bold;color:#e74c3c;text-align:center;">${totalAusente}</td>`;
        html += `<td style="font-weight:bold;color:#1976d2;text-align:center;">${totalJustificada}</td>`;
        let totalLeccionesPresentes = dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0);
        let totalAusenciasPresentes = totalAusente + (totalTarde * 0.5) + totalEscapada;
        let totalPresentes = totalLeccionesPresentes - totalAusenciasPresentes;
        html += `<td style="font-weight:bold;color:#43a047;text-align:center;">${totalPresentes}</td>`;
        html += `<td style="font-weight:bold;color:var(--color-alerta);text-align:center;">${totalTarde}</td>`;
        html += `<td style="font-weight:bold;color:var(--color-exito);text-align:center;">${totalEscapada}</td>`;
        html += `<td style="font-weight:bold;color:#e74c3c;text-align:center;">${totalAusente + (totalTarde * 0.5) + totalEscapada}</td>`;
        html += `<td style="font-weight:bold;color:var(--color-primario);text-align:center;">${totalLecciones}</td>`;
        html += `<td style="font-weight:bold;color:var(--color-exito);text-align:center;">${porcentajeAsistencia}</td>`;
        let diferencia = 10 - porcentajeAsistencia;
        let accionHtml = '';
        // Alerta temprana: se activa si 10% - %Asistencia >= valorAlerta
        if (
            porcentajeAsistencia < 10 &&
            (10 - porcentajeAsistencia) >= valorAlerta &&
            totalLecciones > 0 &&
            estudiante.cedula && estudiante.cedula.trim() !== '' &&
            estudiante.nombre && estudiante.nombre.trim() !== '' &&
            estudiante.apellido1 && estudiante.apellido1.trim() !== ''
        ) {
            accionHtml = `<span style='background:#ffeaea;color:#222;border-radius:6px;padding:4px 10px;font-weight:bold;border:2px solid #e74c3c;'>Alerta temprana</span>`;
        }
        html += `<td style='font-size:0.92em;padding:2px 0;'>${accionHtml}</td>`;
        html += `</tr>`;
    }
    html += '</tbody></table>';
    document.getElementById('app').innerHTML = html;
    actualizarContador();
}
