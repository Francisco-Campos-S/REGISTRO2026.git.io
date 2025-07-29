// ===== CONFIGURACIÓN GLOBAL =====
const VERSION = '2.2';
const STORAGE_KEY = 'registroAsistencia_v2';
const STORAGE_KEY_ALERTA = 'valorExtraAlertaTemprana';
const maxEstudiantes = 50;

// ===== VARIABLES GLOBALES =====
let estudiantes = [];
let dias = [
    { fecha: '', nombre: 'Día 1', lecciones: 0 },
    { fecha: '', nombre: 'Día 2', lecciones: 0 },
    { fecha: '', nombre: 'Día 3', lecciones: 0 },
    { fecha: '', nombre: 'Día 4', lecciones: 0 },
    { fecha: '', nombre: 'Día 5', lecciones: 0 }
];

// Valor de alerta temprana
window.valorExtra = localStorage.getItem(STORAGE_KEY_ALERTA) ? parseFloat(localStorage.getItem(STORAGE_KEY_ALERTA)) : 2;

console.log('🔧 VALOR INICIAL DE ALERTA:', window.valorExtra);

// Plantilla de ejemplo
const plantillaEjemplo = [
    { cedula: "207890123", nombre: "Juan", apellido1: "Pérez", apellido2: "González", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) },
    { cedula: "208901234", nombre: "María", apellido1: "Rodríguez", apellido2: "López", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) },
    { cedula: "209012345", nombre: "Carlos", apellido1: "Sánchez", apellido2: "Jiménez", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) }
];

// ===== FUNCIONES DE INICIALIZACIÓN =====
function inicializarAplicacion() {
    console.log('🚀 Iniciando aplicación...');
    cargarDatosGuardados();
    sincronizarInputAlerta();
    configurarModoOscuro();
    configurarEventos();
    renderAsistencia();
    console.log('✅ Aplicación iniciada correctamente');
}

function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
        try {
            let datos = JSON.parse(datosGuardados);
            if (Array.isArray(datos)) {
                // Compatibilidad con versiones anteriores
                estudiantes = datos;
            } else {
                estudiantes = datos.estudiantes || [];
                if (Array.isArray(datos.dias)) {
                    dias = datos.dias.map((dia, idx) => ({
                        fecha: dia.fecha || '',
                        nombre: dia.nombre || `Día ${idx + 1}`,
                        lecciones: Number(dia.lecciones) || 0
                    }));
                }
            }
            sincronizarAsistenciaDias();
            
            // Debug: mostrar datos cargados
            console.log('=== DATOS CARGADOS ===');
            console.log('Días cargados:', dias);
            console.log('Total lecciones cargadas:', dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0));
            console.log('=====================');
            
            mostrarAlerta('Datos cargados correctamente', 'exito');
        } catch (error) {
            console.error('Error al cargar datos:', error);
            estudiantes = JSON.parse(JSON.stringify(plantillaEjemplo));
        }
    } else {
        estudiantes = JSON.parse(JSON.stringify(plantillaEjemplo));
    }
    renderAsistencia();
}

function sincronizarAsistenciaDias() {
    estudiantes.forEach(est => {
        if (!est.asistenciaDias) {
            est.asistenciaDias = Array.from({ length: dias.length }, () => ({ tipo: 'Presente', cantidad: 0 }));
        } else if (est.asistenciaDias.length < dias.length) {
            est.asistenciaDias = est.asistenciaDias.concat(
                Array.from({ length: dias.length - est.asistenciaDias.length }, () => ({ tipo: 'Presente', cantidad: 0 }))
            );
        } else if (est.asistenciaDias.length > dias.length) {
            est.asistenciaDias = est.asistenciaDias.slice(0, dias.length);
        }
    });
}

// ===== FUNCIONES DE MODO OSCURO =====
function configurarModoOscuro() {
    const modoOscuro = localStorage.getItem('modoOscuro') === '1';
    aplicarModoOscuro(modoOscuro);
    
    document.getElementById('btnModoOscuro').addEventListener('mouseenter', mostrarTooltipModoOscuro);
    document.getElementById('btnModoOscuro').addEventListener('mouseleave', ocultarTooltipModoOscuro);
}

function aplicarModoOscuro(valor) {
    if (valor) {
        document.body.classList.add('dark-mode');
        document.getElementById('btnModoOscuro').innerHTML = '☀️';
        document.getElementById('tooltipModoOscuro').textContent = 'Modo claro';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('btnModoOscuro').innerHTML = '🌙';
        document.getElementById('tooltipModoOscuro').textContent = 'Modo oscuro';
    }
}

function toggleModoOscuro() {
    const esOscuro = !document.body.classList.contains('dark-mode');
    aplicarModoOscuro(esOscuro);
    localStorage.setItem('modoOscuro', esOscuro ? '1' : '0');
}

function mostrarTooltipModoOscuro() {
    document.getElementById('tooltipModoOscuro').style.display = 'block';
}

function ocultarTooltipModoOscuro() {
    document.getElementById('tooltipModoOscuro').style.display = 'none';
}

// ===== FUNCIONES DE ALERTA TEMPRANA =====
function sincronizarInputAlerta() {
    let input = document.getElementById('alertaTempranaInput');
    if (!input) {
        console.log('❌ No se encontró el input de alerta temprana');
        return;
    }
    
    console.log('✅ Input de alerta temprana encontrado');
    
    // Configurar el input para aceptar valores enteros de 0 a 10
    input.min = 0;
    input.max = 10;
    input.step = 1; // Solo valores enteros
    
    // Establecer valor inicial directamente desde el HTML
    window.valorExtra = parseInt(input.value) || 2;
    console.log('🔧 Valor inicial establecido:', window.valorExtra);
    
    // Validar y actualizar el valor
    input.oninput = function() {
        let val = parseInt(this.value) || 0; // Usar parseInt para valores enteros
        if (val < 0) val = 0;
        if (val > 10) val = 10;
        window.valorExtra = val;
        this.value = val;
        localStorage.setItem(STORAGE_KEY_ALERTA, val);
        console.log('🔄 Alerta temprana configurada en:', val, '(escala 0-10, entero)');
        renderAsistencia(); // Re-renderizar para actualizar alertas
    };
}

// ===== FUNCIÓN DE VERIFICACIÓN DE DATOS =====
function verificarDatosLecciones() {
    console.log('=== VERIFICACIÓN DE DATOS LECCIONES ===');
    console.log('Array de días:', dias);
    console.log('Días individuales:');
    dias.forEach((dia, index) => {
        console.log(`  Día ${index + 1} (${dia.nombre}): ${dia.lecciones} lecciones (tipo: ${typeof dia.lecciones})`);
    });
    
    let sumaManual = 0;
    dias.forEach(dia => {
        sumaManual += Number(dia.lecciones) || 0;
    });
    console.log('Suma manual de lecciones:', sumaManual);
    
    let sumaReduce = dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0);
    console.log('Suma con reduce:', sumaReduce);
    console.log('=====================================');
}

// ===== FUNCIONES DE RENDERIZADO =====
function renderAsistencia() {
    verificarDatosLecciones();
    
    if (estudiantes.length === 0) {
        document.getElementById('app').innerHTML = renderTablaVacia();
        actualizarContador();
        return;
    }
    
    limpiarEstudiantesVacios();
    
    let html = generarEncabezadoTabla();
    html += generarFilasEstudiantes();
    html += '</tbody></table>';
    
    document.getElementById('app').innerHTML = html;
    actualizarContador();
    configurarHoverFilas();
}

function limpiarEstudiantesVacios() {
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
}

function renderTablaVacia() {
    let html = `<div class="version-mensaje">🗓️ Sistema de registro de asistencia <span style="color:var(--color-error);font-weight:bold;">v${VERSION}</span></div>`;
    html += `<table border="1" aria-label="Tabla de asistencia">`;
            html += '<thead><tr>';
        html += '<th class="numero">#</th><th class="nombre">Nombre</th><th class="cedula">Cédula</th><th class="apellido1">Primer apellido</th><th class="apellido2">Segundo apellido</th>';
    
    for (let d = 0; d < dias.length; d++) {
        html += `<th><input type="date" value="${dias[d].fecha}" style="width:140px;" aria-label="Fecha del día ${d+1}"><br><span class="label-dia">${dias[d].nombre}</span><br><div style='display:flex;align-items:center;gap:6px;margin-top:4px;'><span style='font-size:11px;color:#888;background:#f4f7fb;padding:2px 8px;border-radius:6px;'>Lecciones</span><input type="number" min="0" value="${dias[d].lecciones}" style="width:70px;" placeholder="Lecciones" aria-label="Lecciones día ${d+1}"></div></th>`;
    }
    
    html += '<th class="th-resumen">Acciones</th></tr></thead><tbody>';
            html += `<tr><td colspan="${4 + dias.length + 1}" style="text-align:center;color:#888;font-size:1.08em;padding:18px 0;background:none;border:none;">No hay estudiantes registrados.</td></tr>`;
    html += '</tbody></table>';
    
    document.getElementById('app').innerHTML = html;
    actualizarContador();
}

function generarEncabezadoTabla() {
    let html = `<div class="version-mensaje">🗓️ Sistema de registro de asistencia <span style="color:var(--color-error);font-weight:bold;">v${VERSION}</span></div>`;
    html += `<table border="1" aria-label="Tabla de asistencia">`;
    html += '<thead>';
    html += '<tr>' +
        '<th rowspan="2" class="numero">#</th>' +
        '<th rowspan="2" class="nombre">Nombre</th>' +
        '<th rowspan="2" class="apellido1">Primer apellido</th>' +
        '<th rowspan="2" class="apellido2">Segundo apellido</th>' +
        '<th rowspan="2" class="cedula">Cédula</th>' +
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
        let ausentesDia = contarAusentesDia(d);
        html += generarEncabezadoDia(d, ausentesDia);
    }
    html += '</tr></thead><tbody>';
    
    return html;
}

function contarAusentesDia(diaIndex) {
    let ausentesDia = 0;
    for (let i = 0; i < estudiantes.length; i++) {
        let dia = estudiantes[i].asistenciaDias[diaIndex];
        if (typeof dia === 'string') {
            let tipo = 'Ausente';
            if (dia === 'Tardía') tipo = 'Tardía';
            if (dia === 'Escapada') tipo = 'Escapada';
            dia = { tipo: tipo, cantidad: 1 };
            estudiantes[i].asistenciaDias[diaIndex] = dia;
        }
        
        if (!dia.tipo) dia.tipo = 'Ausente';
        if (typeof dia.cantidad !== 'number') dia.cantidad = 0;
        
        if (dia.tipo === 'Ausente') {
            ausentesDia += Number(dia.cantidad || 0);
        } else if (dia.tipo === 'Tardía') {
            ausentesDia += Number(dia.cantidad || 0) * 0.5; // Tardía cuenta como 0.5 ausencias
        } else if (dia.tipo === 'Escapada') {
            ausentesDia += Number(dia.cantidad || 0);
        }
    }
    return Math.round(ausentesDia * 100) / 100; // Redondear a 2 decimales
}

function generarEncabezadoDia(diaIndex, ausentesDia) {
    let html = `<th>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
            <input type="date" value="${dias[diaIndex].fecha}" onchange="actualizarFechaDia(${diaIndex}, this.value)" style="width:140px;align-self:flex-start;" aria-label="Fecha del día ${diaIndex+1}">
            <div style="width:100%;display:flex;align-items:center;justify-content:space-between;">
                <span class="label-dia">${dias[diaIndex].nombre}</span>
                ${diaIndex === dias.length - 1 ? `<button onclick="agregarDia()" class="btn-agregar-dia" title="Agregar día">+ Día</button>` : ''}
            </div>
        </div>
        <br><div style='display:flex;align-items:center;gap:8px;margin-top:6px;'>
            <span style='font-size:12px;color:var(--color-primario);background:linear-gradient(90deg,#e3e9f7 0%,#fff 100%);padding:3px 12px;border-radius:8px;border:1.5px solid var(--color-primario);font-weight:600;box-shadow:0 2px 8px rgba(25,118,210,0.08);transition:background 0.18s;'>Lecciones</span>
            <input type="number" min="0" value="${dias[diaIndex].lecciones}" style="width:70px;padding:7px 8px;border-radius:8px;border:1.5px solid var(--color-primario);font-size:1em;box-shadow:0 2px 8px rgba(25,118,210,0.07);transition:border 0.18s, box-shadow 0.18s;' onchange="actualizarLeccionesDia(${diaIndex}, this.value)" oninput="actualizarLeccionesDia(${diaIndex}, this.value)" placeholder="Lecciones" aria-label="Lecciones día ${diaIndex+1}">
        </div>
        <br><span style="font-size:11px;color:var(--color-error);font-weight:bold;">Ausentes: ${ausentesDia}</span>
        <br><button onclick="eliminarDia(${diaIndex})" class="btn-eliminar-dia" title="Eliminar este día" aria-label="Eliminar día">
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle;'><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/></svg>
            Eliminar día
        </button>
    </th>`;
    return html;
}

function generarFilasEstudiantes() {
    let html = '';
    let num = 1;
    
    for (let i = 0; i < estudiantes.length; i++) {
        const estudiante = estudiantes[i];
        const totales = calcularTotalesEstudiante(estudiante);
        const porcentajeAsistencia = calcularPorcentajeAsistencia(totales);
        
        html += `<tr>`;
        html += `<td class="numero" style="text-align:center;font-weight:bold;background:var(--color-header);color:var(--color-header-text);">${i + 1}</td>`;
        html += `<td class="nombre"><input type="text" value="${estudiante.nombre || ''}" onchange="actualizarEstudiante(${i}, 'nombre', this.value)" onfocus="agregarBordeRojoFila(this)" onblur="quitarBordeRojoFila(this)" placeholder="Nombre" aria-label="Nombre"></td>`;
        html += `<td class="apellido1"><input type="text" value="${estudiante.apellido1 || ''}" onchange="actualizarEstudiante(${i}, 'apellido1', this.value)" placeholder="Primer apellido" aria-label="Primer apellido"></td>`;
        html += `<td class="apellido2"><input type="text" value="${estudiante.apellido2 || ''}" onchange="actualizarEstudiante(${i}, 'apellido2', this.value)" placeholder="Segundo apellido" aria-label="Segundo apellido"></td>`;
        html += `<td class="cedula"><input type="text" value="${estudiante.cedula || ''}" onchange="actualizarEstudiante(${i}, 'cedula', this.value)" placeholder="Número de cédula" aria-label="Cédula"></td>`;
        
        for (let d = 0; d < dias.length; d++) {
            html += generarCeldaAsistencia(i, d, estudiante.asistenciaDias[d]);
        }
        
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.ausente}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.justificada}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.presente}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.tarde}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.escapada}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.totalAusencias}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${totales.totalLecciones}</td>`;
        html += `<td style="font-weight:bold;color:#000;text-align:center;">${porcentajeAsistencia}</td>`;
        
        const accionHtml = generarAccionAlerta(porcentajeAsistencia, estudiante);
        html += `<td style='font-size:1em;padding:2px 0;text-align:center;'>${accionHtml}</td>`;
        html += `</tr>`;
    }
    
    return html;
}

function generarCeldaAsistencia(estIndex, diaIndex, dia) {
    // Convertir formato antiguo a nuevo si es necesario
    if (typeof dia === 'string') {
        let tipo = 'Ausente';
        if (dia === 'Tardía') tipo = 'Tardía';
        if (dia === 'Escapada') tipo = 'Escapada';
        dia = { ausencias: [{ tipo: tipo, cantidad: 1 }] };
        estudiantes[estIndex].asistenciaDias[diaIndex] = dia;
    }
    
    // Si es formato antiguo (solo un tipo), convertir a nuevo formato
    if (dia.tipo && !dia.ausencias) {
        dia = { ausencias: [{ tipo: dia.tipo, cantidad: dia.cantidad || 0 }] };
        estudiantes[estIndex].asistenciaDias[diaIndex] = dia;
    }
    
    // Asegurar que existe el array de ausencias
    if (!dia.ausencias) {
        dia.ausencias = [{ tipo: 'Presente', cantidad: 0 }];
    }
    
    let html = `<td style="min-width:130px;text-align:center;vertical-align:middle;">`;
    html += `<div class="celda-asistencia-multiple" style="display:flex;flex-direction:column;gap:4px;align-items:center;">`;
    
    // Mostrar cada ausencia
    dia.ausencias.forEach((ausencia, ausenciaIndex) => {
        html += `<div style="display:flex;align-items:center;gap:4px;">`;
        html += `<select onchange="actualizarAsistenciaTipoMultiple(${estIndex},${diaIndex},${ausenciaIndex},this.value)" class="select-asistencia select-${ausencia.tipo === 'Tardía' ? 'tardia' : ausencia.tipo.toLowerCase()}" style="width:100px;padding:4px 6px;font-size:0.9em;text-align:center;" aria-label="Tipo ausencia ${ausenciaIndex+1} estudiante ${estIndex+1} día ${diaIndex+1}">`;
        
        // Si es la primera ausencia (selector principal), incluir "Presente"
        if (ausenciaIndex === 0) {
            html += `<option value="Presente"${ausencia.tipo === 'Presente' ? ' selected' : ''}>Presente</option>`;
        }
        
        html += `<option value="Ausente"${ausencia.tipo === 'Ausente' ? ' selected' : ''}>Ausente</option>`;
        html += `<option value="Tardía"${ausencia.tipo === 'Tardía' ? ' selected' : ''}>Tardía</option>`;
        html += `<option value="Escapada"${ausencia.tipo === 'Escapada' ? ' selected' : ''}>Escapada</option>`;
        html += `<option value="Justificada"${ausencia.tipo === 'Justificada' ? ' selected' : ''}>Justificada</option>`;
        html += `</select>`;
        
        // Solo mostrar input de cantidad si no es "Presente"
        if (ausencia.tipo !== 'Presente') {
            html += `<input type="number" min="0" value="${ausencia.cantidad || 0}" style="width:45px;padding:4px 2px;font-size:0.9em;" onchange="actualizarAsistenciaCantidadMultiple(${estIndex},${diaIndex},${ausenciaIndex},this.value)" aria-label="Cantidad ausencia ${ausenciaIndex+1} estudiante ${estIndex+1} día ${diaIndex+1}">`;
        }
        
        // Botón eliminar ausencia (solo si hay más de una)
        if (dia.ausencias.length > 1) {
            html += `<button onclick="eliminarAusencia(${estIndex},${diaIndex},${ausenciaIndex})" style="background:#ff4757;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.8em;cursor:pointer;" title="Eliminar ausencia">×</button>`;
        }
        
        html += `</div>`;
    });
    
    // Botón agregar nueva ausencia
    html += `<button onclick="agregarAusencia(${estIndex},${diaIndex})" style="background:#2ed573;color:white;border:none;border-radius:4px;padding:4px 8px;font-size:0.9em;cursor:pointer;margin-top:4px;" title="Agregar ausencia">+</button>`;
    
    html += `</div></td>`;
    return html;
}

function calcularTotalesEstudiante(estudiante) {
    let totalAusente = 0, totalTarde = 0, totalEscapada = 0, totalJustificada = 0;
    
    for (let d = 0; d < dias.length; d++) {
        let dia = estudiante.asistenciaDias[d];
        
        // Convertir formato antiguo si es necesario
        if (typeof dia === 'string') {
            let tipo = 'Ausente';
            if (dia === 'Tardía') tipo = 'Tardía';
            if (dia === 'Escapada') tipo = 'Escapada';
            dia = { ausencias: [{ tipo: tipo, cantidad: 1 }] };
            estudiante.asistenciaDias[d] = dia;
        }
        
        // Si es formato antiguo (solo un tipo), convertir a nuevo formato
        if (dia.tipo && !dia.ausencias) {
            dia = { ausencias: [{ tipo: dia.tipo, cantidad: dia.cantidad || 0 }] };
            estudiante.asistenciaDias[d] = dia;
        }
        
        // Asegurar que existe el array de ausencias
        if (!dia.ausencias) {
            dia.ausencias = [{ tipo: 'Presente', cantidad: 0 }];
        }
        
        // Sumar todas las ausencias del día
        dia.ausencias.forEach(ausencia => {
            if (ausencia.tipo === 'Ausente') {
                totalAusente += Number(ausencia.cantidad || 0);
            } else if (ausencia.tipo === 'Tardía') {
                totalTarde += Number(ausencia.cantidad || 0);
            } else if (ausencia.tipo === 'Escapada') {
                totalEscapada += Number(ausencia.cantidad || 0);
            } else if (ausencia.tipo === 'Justificada') {
                totalJustificada += Number(ausencia.cantidad || 0);
            }
        });
    }
    
    let totalLecciones = dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0);
    // Las ausencias justificadas NO cuentan para el cálculo de presentes
    let totalAusencias = totalAusente + (totalTarde * 0.5) + totalEscapada;
    let totalPresente = totalLecciones - totalAusencias;
    
    // Debug: mostrar información en consola
    console.log('=== DEBUG CALCULO TOTALES ===');
    console.log('Estudiante:', estudiante.nombre || 'Sin nombre');
    console.log('Días:', dias.map(d => ({ nombre: d.nombre, lecciones: d.lecciones })));
    console.log('Total lecciones:', totalLecciones);
    console.log('Ausente:', totalAusente, 'Tardía:', totalTarde, 'Escapada:', totalEscapada, 'Justificada:', totalJustificada);
    console.log('Total ausencias (sin justificadas):', totalAusencias);
    console.log('Total presente:', totalPresente);
    console.log('Fórmula: Presentes =', totalLecciones, '-', totalAusencias, '=', totalPresente);
    console.log('=============================');
    
    return {
        ausente: totalAusente,
        tarde: totalTarde,
        escapada: totalEscapada,
        justificada: totalJustificada,
        presente: totalPresente,
        totalAusencias: totalAusencias,
        totalLecciones: totalLecciones
    };
}

function calcularPorcentajeAsistencia(totales) {
    if (totales.totalLecciones <= 0) return 0;
    
    // Calcular porcentaje de ausencia (no de asistencia)
    let porcentajeAusencia = (totales.totalAusencias / totales.totalLecciones) * 100;
    porcentajeAusencia = Math.round(porcentajeAusencia * 100) / 100;
    
    // Asegurar que el porcentaje esté entre 0 y 100
    if (porcentajeAusencia > 100) porcentajeAusencia = 100;
    if (porcentajeAusencia < 0) porcentajeAusencia = 0;
    
    // Aplicar las reglas específicas de porcentaje de asistencia
    let porcentajeAsistencia;
    if (porcentajeAusencia === 0) porcentajeAsistencia = 10;
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
    
    return porcentajeAsistencia;
}

function generarAccionAlerta(porcentajeAsistencia, estudiante) {
    let accionHtml = '';
    
    // Forzar un valor de prueba para verificar que funcione
    let valorAlerta = window.valorExtra || 2;
    
    // Calcular la diferencia: 10 - %asistencia
    let diferencia = 10 - porcentajeAsistencia;
    
    // Debug: mostrar valores para comparación
    console.log('=== DEBUG ALERTA TEMPRANA ===');
    console.log('Estudiante:', estudiante.nombre || 'Sin nombre');
    console.log('Porcentaje asistencia (escala 0-10):', porcentajeAsistencia, 'tipo:', typeof porcentajeAsistencia);
    console.log('Valor alerta configurado (escala 0-10):', valorAlerta, 'tipo:', typeof valorAlerta);
    console.log('Diferencia (10 - %asistencia):', diferencia);
    console.log('¿Debería mostrar alerta?', diferencia > valorAlerta);
    console.log('Datos del estudiante:', {
        cedula: estudiante.cedula && estudiante.cedula.trim() !== '',
        nombre: estudiante.nombre && estudiante.nombre.trim() !== '',
        apellido1: estudiante.apellido1 && estudiante.apellido1.trim() !== ''
    });
    console.log('=============================');
    
    // Mostrar alerta temprana si la diferencia es mayor al valor configurado
    // Se activa cuando (10 - %asistencia) > valor_alerta
    if (diferencia > valorAlerta && 
        estudiante.cedula && estudiante.cedula.trim() !== '' &&
        estudiante.nombre && estudiante.nombre.trim() !== '' &&
        estudiante.apellido1 && estudiante.apellido1.trim() !== '') {
        accionHtml = `<span style='background:#ffeaea;color:#e74c3c;border-radius:6px;padding:4px 12px;font-weight:bold;border:2.5px solid #e74c3c;font-size:1.08em;box-shadow:0 2px 8px #e74c3c33;'>⚠️ Alerta temprana</span>`;
        console.log('✅ ALERTA ACTIVADA para estudiante:', estudiante.nombre);
    } else {
        console.log('❌ NO se activa alerta para estudiante:', estudiante.nombre);
        if (diferencia <= valorAlerta) {
            console.log('   - Razón: Diferencia <= Valor alerta');
        }
        if (!estudiante.cedula || !estudiante.cedula.trim()) {
            console.log('   - Razón: Sin cédula');
        }
        if (!estudiante.nombre || !estudiante.nombre.trim()) {
            console.log('   - Razón: Sin nombre');
        }
        if (!estudiante.apellido1 || !estudiante.apellido1.trim()) {
            console.log('   - Razón: Sin primer apellido');
        }
    }
    
    return accionHtml;
}

// ===== FUNCIONES DE ACTUALIZACIÓN =====
function actualizarEstudiante(idx, campo, valor) {
    estudiantes[idx][campo] = valor;
    const est = estudiantes[idx];
    const esVacio = !est.cedula && !est.nombre && !est.apellido1 && !est.apellido2;
    
    if (esVacio) {
        const vacios = estudiantes.filter(e => !e.cedula && !e.nombre && !e.apellido1 && !e.apellido2);
        if (vacios.length > 1) {
            estudiantes.splice(idx, 1);
        }
    }
    
    guardarDatos();
    renderAsistencia();
}

function actualizarAsistenciaTipo(estIdx, diaIdx, valor) {
    if (typeof estudiantes[estIdx].asistenciaDias[diaIdx] !== 'object') {
        estudiantes[estIdx].asistenciaDias[diaIdx] = { tipo: valor, cantidad: 0 };
    } else {
        estudiantes[estIdx].asistenciaDias[diaIdx].tipo = valor;
    }
    
    // Actualizar clase CSS del select para cambiar color
    const selectElement = event.target;
    if (selectElement) {
        let className = `select-asistencia select-${valor === 'Tardía' ? 'tardia' : valor.toLowerCase()}`;
        selectElement.className = className;
    }
    
    guardarDatos();
    renderAsistencia();
}

function actualizarAsistenciaCantidad(estIdx, diaIdx, valor) {
    if (typeof estudiantes[estIdx].asistenciaDias[diaIdx] !== 'object') {
        estudiantes[estIdx].asistenciaDias[diaIdx] = { tipo: 'Ausente', cantidad: 0 };
    }
    estudiantes[estIdx].asistenciaDias[diaIdx].cantidad = Number(valor);
    guardarDatos();
    renderAsistencia();
}

// Nuevas funciones para múltiples ausencias
function actualizarAsistenciaTipoMultiple(estIdx, diaIdx, ausenciaIdx, valor) {
    if (!estudiantes[estIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx].ausencias) return;
    
    estudiantes[estIdx].asistenciaDias[diaIdx].ausencias[ausenciaIdx].tipo = valor;
    
    // Si es el primer selector (ausenciaIndex === 0) y se selecciona "Ausente" o "Justificada", precargar con lecciones del día
    if (ausenciaIdx === 0 && (valor === 'Ausente' || valor === 'Justificada')) {
        const leccionesDia = Number(dias[diaIdx].lecciones) || 0;
        estudiantes[estIdx].asistenciaDias[diaIdx].ausencias[ausenciaIdx].cantidad = leccionesDia;
        console.log(`Precargando ${valor.toLowerCase()} con ${leccionesDia} lecciones para estudiante ${estIdx + 1}, día ${diaIdx + 1}`);
    }
    
    guardarDatos();
    renderAsistencia();
}

function actualizarAsistenciaCantidadMultiple(estIdx, diaIdx, ausenciaIdx, valor) {
    if (!estudiantes[estIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx].ausencias) return;
    
    estudiantes[estIdx].asistenciaDias[diaIdx].ausencias[ausenciaIdx].cantidad = Number(valor) || 0;
    guardarDatos();
    renderAsistencia();
}

function agregarAusencia(estIdx, diaIdx) {
    if (!estudiantes[estIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx]) return;
    
    // Asegurar que existe el array de ausencias
    if (!estudiantes[estIdx].asistenciaDias[diaIdx].ausencias) {
        estudiantes[estIdx].asistenciaDias[diaIdx].ausencias = [];
    }
    
    // Agregar nueva ausencia
    estudiantes[estIdx].asistenciaDias[diaIdx].ausencias.push({
        tipo: 'Tardía',
        cantidad: 0
    });
    
    guardarDatos();
    renderAsistencia();
}

function eliminarAusencia(estIdx, diaIdx, ausenciaIdx) {
    if (!estudiantes[estIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx].ausencias) return;
    
    // Eliminar la ausencia específica
    estudiantes[estIdx].asistenciaDias[diaIdx].ausencias.splice(ausenciaIdx, 1);
    
    // Si no quedan ausencias, agregar una por defecto
    if (estudiantes[estIdx].asistenciaDias[diaIdx].ausencias.length === 0) {
        estudiantes[estIdx].asistenciaDias[diaIdx].ausencias.push({
            tipo: 'Presente',
            cantidad: 0
        });
    }
    
    guardarDatos();
    renderAsistencia();
}

function actualizarFechaDia(idx, fecha) {
    dias[idx].fecha = fecha;
    guardarDatos();
    renderAsistencia();
}

function actualizarLeccionesDia(idx, valor) {
    console.log(`=== ACTUALIZANDO LECCIONES DÍA ${idx + 1} ===`);
    console.log('Valor recibido:', valor, 'tipo:', typeof valor);
    console.log('Valor convertido a Number:', Number(valor));
    
    const valorAnterior = Number(dias[idx].lecciones) || 0;
    dias[idx].lecciones = Number(valor);
    
    console.log('Día actualizado:', dias[idx]);
    console.log('Array completo después de actualizar:', dias);
    
    // Debug: mostrar actualización de lecciones
    console.log('=== ACTUALIZACIÓN LECCIONES ===');
    console.log(`Día ${idx + 1} (${dias[idx].nombre}): ${dias[idx].lecciones} lecciones`);
    console.log('Total lecciones actual:', dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0));
    console.log('================================');
    
    // Actualizar automáticamente las cantidades de ausencias en el primer selector
    if (valorAnterior !== Number(valor)) {
        console.log('=== ACTUALIZANDO AUSENCIAS AUTOMÁTICAMENTE ===');
        let contadorActualizados = 0;
        
        estudiantes.forEach((estudiante, estIdx) => {
            if (estudiante.asistenciaDias && estudiante.asistenciaDias[idx] && 
                estudiante.asistenciaDias[idx].ausencias && estudiante.asistenciaDias[idx].ausencias[0]) {
                
                const primeraAusencia = estudiante.asistenciaDias[idx].ausencias[0];
                
                // Solo actualizar si es "Ausente" o "Justificada" en el primer selector
                if (primeraAusencia.tipo === 'Ausente' || primeraAusencia.tipo === 'Justificada') {
                    const cantidadAnterior = primeraAusencia.cantidad;
                    primeraAusencia.cantidad = Number(valor);
                    contadorActualizados++;
                    
                    console.log(`Estudiante ${estIdx + 1}: ${primeraAusencia.tipo} actualizada de ${cantidadAnterior} a ${primeraAusencia.cantidad} lecciones`);
                }
            }
        });
        
        console.log(`Total de ausencias actualizadas: ${contadorActualizados}`);
        console.log('==============================================');
    }
    
    guardarDatos();
    renderAsistencia();
}

// ===== FUNCIONES DE GESTIÓN =====
function agregarEstudiante() {
    if (!Array.isArray(estudiantes)) estudiantes = [];
    if (estudiantes.length >= maxEstudiantes) {
        mostrarAlerta('No se pueden agregar más de 50 estudiantes', 'error');
        return;
    }
    
    estudiantes.push({
        cedula: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        asistenciaDias: Array.from({ length: dias.length }, () => ({ ausencias: [{ tipo: 'Presente', cantidad: 0 }] }))
    });
    
    guardarDatos();
    renderAsistencia();
    sincronizarEstudiantesEvaluacion();
}

function agregarDia() {
    if (dias.length >= 100) {
        mostrarAlerta('No se pueden agregar más de 100 días', 'error');
        return;
    }
    
    dias.push({ fecha: '', nombre: `Día ${dias.length + 1}`, lecciones: 0 });
    estudiantes.forEach(est => {
        est.asistenciaDias.push({ ausencias: [{ tipo: 'Presente', cantidad: 0 }] });
    });
    
    guardarDatos();
    renderAsistencia();
}

function eliminarDia(idx) {
    if (dias.length <= 1) {
        mostrarAlerta('Debe haber al menos un día', 'error');
        return;
    }
    
    if (confirm('¿Seguro que deseas eliminar este día? Esta acción no se puede deshacer.')) {
        dias.splice(idx, 1);
        estudiantes.forEach(est => {
            est.asistenciaDias.splice(idx, 1);
        });
        
        // Ordenar días por fecha ascendente si tienen fecha válida
        dias.sort((a, b) => {
            if (!a.fecha) return 1;
            if (!b.fecha) return -1;
            return new Date(a.fecha) - new Date(b.fecha);
        });
        
        // Renombrar días consecutivamente
        dias.forEach((dia, i) => {
            dia.nombre = `Día ${i + 1}`;
        });
        
        guardarDatos();
        renderAsistencia();
        mostrarAlerta('Día eliminado', 'info');
    }
}

function eliminarEstudiante(idx) {
    if (confirm('¿Seguro que deseas eliminar este estudiante? Esta acción no se puede deshacer.')) {
        estudiantes.splice(idx, 1);
        guardarDatos();
        renderAsistencia();
        sincronizarEstudiantesEvaluacion();
        mostrarAlerta('Estudiante eliminado', 'info');
    }
}

function eliminarEstudiantePorNumero() {
    const input = document.getElementById('inputEliminarEst');
    let num = parseInt(input.value);
    
    if (isNaN(num) || num < 1 || num > estudiantes.length) {
        mostrarAlerta('Número inválido', 'error');
        return;
    }
    
    eliminarEstudiante(num - 1);
    input.value = '';
}

function ordenarEstudiantesManual() {
    if (!estudiantes || estudiantes.length === 0) {
        mostrarAlerta('No hay estudiantes para ordenar.', 'error');
        return;
    }
    
    estudiantes.sort((a, b) => {
        const aVacio = !(a.cedula || a.nombre || a.apellido1 || a.apellido2);
        const bVacio = !(b.cedula || b.nombre || b.apellido1 || b.apellido2);
        
        if (aVacio && !bVacio) return 1;
        if (!aVacio && bVacio) return -1;
        if (aVacio && bVacio) return 0;
        
        const ap1 = (a.apellido1 || '').toLowerCase();
        const ap2 = (b.apellido1 || '').toLowerCase();
        
        if (ap1 < ap2) return -1;
        if (ap1 > ap2) return 1;
        return 0;
    });
    
    guardarDatos();
    renderAsistencia();
}

// ===== FUNCIONES DE PERSISTENCIA =====
function guardarDatos() {
    // Debug: mostrar datos antes de guardar
    console.log('=== GUARDANDO DATOS ===');
    console.log('Días a guardar:', dias);
    console.log('Total lecciones a guardar:', dias.reduce((acc, dia) => acc + (Number(dia.lecciones) || 0), 0));
    console.log('=======================');
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ estudiantes, dias }));
}

function guardarDatosManual() {
    guardarDatos();
    mostrarAlerta('Datos guardados manualmente', 'exito');
}

function actualizarContador() {
    document.getElementById('contadorEstudiantes').textContent = `Cantidad de estudiantes: ${estudiantes.length}`;
}

// ===== FUNCIONES DE ALERTAS MEJORADAS =====
function mostrarAlerta(mensaje, tipo) {
    let alerta = document.createElement('div');
    alerta.className = 'alerta ' + tipo;
    
    let icon = '';
    if (tipo === 'exito') icon = '✅';
    else if (tipo === 'error') icon = '❌';
    else if (tipo === 'info') icon = 'ℹ️';
    
    alerta.innerHTML = `<span style="margin-right:8px;font-size:1.2em;">${icon}</span>${mensaje}`;
    alerta.setAttribute('role', 'alert');
    alerta.setAttribute('aria-live', 'assertive');
    
    document.body.appendChild(alerta);
    
    // Animación de salida suave
    setTimeout(() => {
        alerta.style.animation = 'slideOutUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 500);
    }, 2500);
}

// ===== FUNCIONES DE IMPORTACIÓN/EXPORTACIÓN =====
function descargarPlantilla() {
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["#", "Nombre", "Primer apellido", "Segundo apellido", "Cédula", ...dias.map(d => d.nombre)]
    ];
    
    plantillaEjemplo.forEach((est, index) => {
        ws_data.push([
            index + 1,
            est.nombre,
            est.apellido1,
            est.apellido2,
            est.cedula,
            ...est.asistenciaDias
        ]);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Asistencia");
    XLSX.writeFile(wb, "Plantilla_Registro2026.xlsx");
}

function cargarPlantilla(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
            
            if (rows.length < 2) {
                mostrarAlerta('El archivo está vacío o no tiene formato válido', 'error');
                return;
            }
            
            const encabezado = rows[0];
            const numDias = dias.length;
            
            rows.slice(1).forEach(row => {
                const asistenciaDias = [];
                for (let i = 0; i < numDias; i++) {
                    asistenciaDias.push({ tipo: 'Presente', cantidad: 0 });
                }
                
                estudiantes.push({
                    // Nuevo orden: #, Nombre, Apellido1, Apellido2, Cédula
                    // row[0] es el número (lo ignoramos ya que lo generamos automáticamente)
                    nombre: row[1] || '',
                    apellido1: row[2] || '',
                    apellido2: row[3] || '',
                    cedula: row[4] || '',
                    asistenciaDias
                });
            });
            
            limpiarEstudiantesVacios();
            guardarDatos();
            renderAsistencia();
            mostrarAlerta('Datos importados y agregados correctamente', 'exito');
            
        } catch (error) {
            console.error('Error al importar:', error);
            mostrarAlerta('Error al importar el archivo', 'error');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

function exportarDatos() {
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["#", "Nombre", "Primer apellido", "Segundo apellido", "Cédula", ...dias.map(d => d.nombre)]
    ];
    
    estudiantes.forEach((est, index) => {
        ws_data.push([
            index + 1,
            est.nombre,
            est.apellido1,
            est.apellido2,
            est.cedula,
            ...est.asistenciaDias
        ]);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Asistencia");
    XLSX.writeFile(wb, "Registro2026.xlsx");
    mostrarAlerta('Datos exportados correctamente', 'exito');
}

// ===== FUNCIONES DE CONFIGURACIÓN =====
function configurarEventos() {
    // Scroll horizontal con mouse cerca del borde
    const tableContainer = document.querySelector('.table-responsive');
    if (tableContainer) {
        tableContainer.addEventListener('mousemove', function(e) {
            const rect = tableContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const scrollSpeed = 18;
            
            if (x < 30) {
                tableContainer.scrollLeft -= scrollSpeed;
            }
            if (x > rect.width - 30) {
                tableContainer.scrollLeft += scrollSpeed;
            }
        });
    }
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== FUNCIONES DE BORDE ROJO UNIFORME EN TODA LA FILA =====
function agregarBordeRojoFila(input) {
    // Limpiar bordes rojos anteriores
    document.querySelectorAll('tr').forEach(tr => {
        tr.classList.remove('fila-focus-activa');
    });
    
    // Encontrar la fila padre y agregar clase
    const fila = input.closest('tr');
    if (fila) {
        fila.classList.add('fila-focus-activa');
        console.log('Borde rojo uniforme aplicado a toda la fila via CSS');
    }
}

function quitarBordeRojoFila(input) {
    // Quitar clase de todas las filas
    document.querySelectorAll('tr').forEach(tr => {
        tr.classList.remove('fila-focus-activa');
    });
    console.log('Borde rojo uniforme removido');
}

// ===== MANEJO DE HOVER CON JAVASCRIPT =====
function configurarHoverFilas() {
    // Remover listeners anteriores para evitar duplicados
    const filasExistentes = document.querySelectorAll('tbody tr');
    filasExistentes.forEach(fila => {
        fila.removeEventListener('mouseenter', fila._mouseenterHandler);
        fila.removeEventListener('mouseleave', fila._mouseleaveHandler);
    });
    
    const filas = document.querySelectorAll('tbody tr');
    console.log(`Configurando hover para ${filas.length} filas`);
    
    filas.forEach(fila => {
        // Crear handlers únicos para cada fila
        const mouseenterHandler = function() {
            console.log('Mouse enter en fila');
            // Limpiar bordes anteriores
            document.querySelectorAll('tr').forEach(tr => {
                tr.classList.remove('fila-focus-activa');
            });
            // Agregar borde a esta fila
            this.classList.add('fila-focus-activa');
        };
        
        const mouseleaveHandler = function() {
            console.log('Mouse leave en fila');
            // Solo quitar si no hay focus en el input de nombre
            const inputNombre = this.querySelector('td.nombre input');
            if (!inputNombre || document.activeElement !== inputNombre) {
                this.classList.remove('fila-focus-activa');
            }
        };
        
        // Guardar referencia a los handlers para poder removerlos después
        fila._mouseenterHandler = mouseenterHandler;
        fila._mouseleaveHandler = mouseleaveHandler;
        
        // Agregar event listeners
        fila.addEventListener('mouseenter', mouseenterHandler);
        fila.addEventListener('mouseleave', mouseleaveHandler);
    });
    
    console.log('Hover configurado correctamente');
}

// ===== STICKY CSS PURO - SIN JAVASCRIPT MANUAL =====

// ===== STICKY CSS PURO - SIN JAVASCRIPT MANUAL =====
function implementarStickyManual() {
    // Ya no necesitamos JavaScript manual, CSS sticky funciona correctamente
    // Solo asegurar que los estilos estén aplicados
    console.log('Sticky CSS aplicado correctamente');
}

// ===== EVALUACIÓN DE PRUEBAS =====
let pruebas = [
    { nombre: 'I PRUEBA', puntosMaximos: 30, peso: 20 },
    { nombre: 'II PRUEBA', puntosMaximos: 30, peso: 15 }
];

let evaluacionesEstudiantes = [];

// Función para renderizar la tabla de evaluación
function renderEvaluacion() {
    const container = document.getElementById('evaluacion-app');
    if (!container) return;

    let html = '<table class="evaluacion-table">';
    
    // Encabezado
    html += '<thead><tr>';
    html += '<th>Estudiante</th>';
    
    pruebas.forEach(prueba => {
        html += `<th colspan="3">${prueba.nombre}</th>`;
    });
    
    html += '<th>TOTAL</th>';
    html += '</tr><tr>';
    html += '<th></th>';
    
    pruebas.forEach(prueba => {
        html += '<th>PTS</th>';
        html += '<th>NOTA</th>';
        html += '<th>%</th>';
    });
    
    html += '<th>%</th>';
    html += '</tr></thead>';
    
    // Fila de configuración
    html += '<tbody>';
    html += '<tr class="config-row">';
    html += '<td class="student-name">CONFIGURACIÓN</td>';
    
    pruebas.forEach((prueba, idx) => {
        html += `<td class="editable"><input type="number" value="${prueba.puntosMaximos}" min="0" step="1" onchange="actualizarPuntosMaximos(${idx}, this.value)" title="Puntos máximos de la prueba"></td>`;
        html += '<td class="calculated">-------</td>';
        
        // Celda de peso con botón eliminar integrado
        if (pruebas.length > 1) {
            html += `<td class="editable" style="position:relative;">
                <input type="number" value="${prueba.peso}" min="0" max="100" step="1" onchange="actualizarPeso(${idx}, this.value)" title="% de peso de la prueba" style="padding-right:30px;width:80px;">
                <button onclick="eliminarPrueba(${idx})" style="position:absolute;right:2px;top:50%;transform:translateY(-50%);background:#ff4757;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar prueba">🗑️</button>
            </td>`;
        } else {
            html += `<td class="editable"><input type="number" value="${prueba.peso}" min="0" max="100" step="1" onchange="actualizarPeso(${idx}, this.value)" title="% de peso de la prueba" style="width:80px;"></td>`;
        }
    });
    
    // Calcular la suma total de los pesos
    const totalPeso = pruebas.reduce((sum, prueba) => sum + prueba.peso, 0);
    const totalClass = totalPeso > 100 ? 'total-excedido' : '';
    html += `<td class="calculated ${totalClass}">${totalPeso}%</td>`;
    html += '</tr>';
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return; // Saltar estudiantes vacíos
        
        html += '<tr>';
        html += `<td class="student-name">${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}</td>`;
        
        let totalPorcentaje = 0;
        
        pruebas.forEach((prueba, pruebaIdx) => {
            const evaluacion = obtenerEvaluacion(estIdx, pruebaIdx);
            const nota = calcularNota(evaluacion.puntos, prueba.puntosMaximos);
            const porcentaje = calcularPorcentaje(evaluacion.puntos, prueba.puntosMaximos);
            const porcentajePonderado = (nota * prueba.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            html += `<td class="editable"><input type="number" value="${evaluacion.puntos}" min="0" max="${prueba.puntosMaximos}" step="0.1" onchange="actualizarPuntos(${estIdx}, ${pruebaIdx}, this.value)" title="Puntos obtenidos"></td>`;
            html += `<td class="calculated">${nota.toFixed(1)}</td>`;
            html += `<td class="calculated">${porcentajePonderado.toFixed(1)}%</td>`;
        });
        
        html += `<td class="calculated">${totalPorcentaje.toFixed(1)}%</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Función para obtener evaluación de un estudiante en una prueba
function obtenerEvaluacion(estIdx, pruebaIdx) {
    if (!evaluacionesEstudiantes[estIdx]) {
        evaluacionesEstudiantes[estIdx] = [];
    }
    if (!evaluacionesEstudiantes[estIdx][pruebaIdx]) {
        evaluacionesEstudiantes[estIdx][pruebaIdx] = { puntos: 0 };
    }
    return evaluacionesEstudiantes[estIdx][pruebaIdx];
}

// Función para calcular nota (escala 0-10)
function calcularNota(puntos, puntosMaximos) {
    if (puntosMaximos <= 0) return 0;
    return Math.round((puntos / puntosMaximos) * 100 * 10) / 10; // Redondeo a 1 decimal
}

// Función para calcular porcentaje
function calcularPorcentaje(puntos, puntosMaximos) {
    if (puntosMaximos <= 0) return 0;
    return (puntos / puntosMaximos) * 100;
}

// Función para actualizar puntos máximos de una prueba
function actualizarPuntosMaximos(pruebaIdx, valor) {
    pruebas[pruebaIdx].puntosMaximos = parseInt(valor) || 0;
    guardarEvaluacion();
    renderEvaluacion();
}

// Función para actualizar peso de una prueba
function actualizarPeso(pruebaIdx, valor) {
    const peso = parseInt(valor) || 0;
    // Validar que esté entre 0 y 100
    if (peso < 0) {
        pruebas[pruebaIdx].peso = 0;
    } else if (peso > 100) {
        pruebas[pruebaIdx].peso = 100;
    } else {
        pruebas[pruebaIdx].peso = peso;
    }
    
    // Calcular el total de pesos
    const totalPeso = pruebas.reduce((sum, prueba) => sum + prueba.peso, 0);
    
    // Mostrar alerta si el total excede 100%
    if (totalPeso > 100) {
        mostrarAlerta(`⚠️ El total de pesos es ${totalPeso}%, que excede el 100% recomendado`, 'info');
    }
    
    guardarEvaluacion();
    renderEvaluacion();
}

// Función para actualizar puntos de un estudiante
function actualizarPuntos(estIdx, pruebaIdx, valor) {
    const evaluacion = obtenerEvaluacion(estIdx, pruebaIdx);
    evaluacion.puntos = Number(valor) || 0;
    guardarEvaluacion();
    renderEvaluacion();
}

// Función para obtener nombre de prueba según posición
function obtenerNombrePrueba(posicion) {
    const nombres = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    if (posicion <= nombres.length) {
        return `${nombres[posicion - 1]} PRUEBA`;
    } else {
        return `${posicion}ª PRUEBA`;
    }
}

// Función para actualizar nombres de todas las pruebas
function actualizarNombresPruebas() {
    pruebas.forEach((prueba, index) => {
        prueba.nombre = obtenerNombrePrueba(index + 1);
    });
}

// Función para agregar nueva prueba
function agregarPrueba() {
    pruebas.push({
        nombre: '', // Se actualizará automáticamente
        puntosMaximos: 30,
        peso: 10
    });
    
    // Actualizar nombres de todas las pruebas
    actualizarNombresPruebas();
    
    // Agregar evaluaciones para todos los estudiantes existentes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!evaluacionesEstudiantes[estIdx]) {
            evaluacionesEstudiantes[estIdx] = [];
        }
        evaluacionesEstudiantes[estIdx].push({ puntos: 0 });
    });
    
    guardarEvaluacion();
    renderEvaluacion();
    mostrarAlerta(`Prueba "${pruebas[pruebas.length - 1].nombre}" agregada`, 'exito');
}

// Función para eliminar prueba
function eliminarPrueba(pruebaIdx) {
    if (pruebas.length <= 1) {
        mostrarAlerta('Debe haber al menos una prueba', 'error');
        return;
    }
    
    const nombrePrueba = pruebas[pruebaIdx].nombre;
    
    if (confirm(`¿Seguro que deseas eliminar la prueba "${nombrePrueba}"? Esta acción no se puede deshacer.`)) {
        pruebas.splice(pruebaIdx, 1);
        
        // Eliminar evaluaciones de esa prueba para todos los estudiantes
        evaluacionesEstudiantes.forEach(estudiante => {
            if (estudiante && estudiante[pruebaIdx]) {
                estudiante.splice(pruebaIdx, 1);
            }
        });
        
        // Actualizar nombres de todas las pruebas
        actualizarNombresPruebas();
        
        guardarEvaluacion();
        renderEvaluacion();
        mostrarAlerta(`Prueba "${nombrePrueba}" eliminada`, 'info');
    }
}

// Función para exportar evaluación
function exportarEvaluacion() {
    const wb = XLSX.utils.book_new();
    
    // Preparar datos para exportar
    const datos = [];
    
    // Fila de configuración
    const configRow = ['CONFIGURACIÓN'];
    const totalPeso = pruebas.reduce((sum, prueba) => sum + prueba.peso, 0);
    pruebas.forEach(prueba => {
        configRow.push(prueba.puntosMaximos, '-------', prueba.peso);
    });
    configRow.push(`${totalPeso}%`);
    datos.push(configRow);
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        const row = [`${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`];
        let totalPorcentaje = 0;
        
        pruebas.forEach((prueba, pruebaIdx) => {
            const evaluacion = obtenerEvaluacion(estIdx, pruebaIdx);
            const nota = calcularNota(evaluacion.puntos, prueba.puntosMaximos);
            const porcentajePonderado = (nota * prueba.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            row.push(evaluacion.puntos, nota.toFixed(1), porcentajePonderado.toFixed(1) + '%');
        });
        
        row.push(totalPorcentaje.toFixed(1) + '%');
        datos.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluación');
    
    XLSX.writeFile(wb, 'evaluacion_pruebas.xlsx');
    mostrarAlerta('Evaluación exportada correctamente', 'exito');
}

// Función para guardar evaluación
function guardarEvaluacion() {
    const datos = {
        pruebas: pruebas,
        evaluaciones: evaluacionesEstudiantes
    };
    localStorage.setItem('evaluacionPruebas', JSON.stringify(datos));
}

// Función para cargar evaluación
function cargarEvaluacion() {
    const datos = localStorage.getItem('evaluacionPruebas');
    if (datos) {
        try {
            const parsed = JSON.parse(datos);
            pruebas = parsed.pruebas || pruebas;
            evaluacionesEstudiantes = parsed.evaluaciones || [];
            
            // Actualizar nombres de pruebas al cargar
            actualizarNombresPruebas();
        } catch (error) {
            console.error('Error al cargar evaluación:', error);
        }
    }
}

// Función para sincronizar estudiantes en evaluación
function sincronizarEstudiantesEvaluacion() {
    // Agregar evaluaciones para nuevos estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!evaluacionesEstudiantes[estIdx]) {
            evaluacionesEstudiantes[estIdx] = [];
        }
        
        // Asegurar que tenga evaluaciones para todas las pruebas
        while (evaluacionesEstudiantes[estIdx].length < pruebas.length) {
            evaluacionesEstudiantes[estIdx].push({ puntos: 0 });
        }
    });
    
    // Eliminar evaluaciones de estudiantes eliminados
    evaluacionesEstudiantes = evaluacionesEstudiantes.slice(0, estudiantes.length);
    
    guardarEvaluacion();
    renderEvaluacion();
}

// Modificar la función inicializarAplicacion para incluir evaluación
const originalInicializarAplicacion = inicializarAplicacion;
inicializarAplicacion = function() {
    originalInicializarAplicacion();
    cargarEvaluacion();
    sincronizarEstudiantesEvaluacion();
    renderEvaluacion();
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
    // CSS sticky funciona automáticamente, no necesitamos JavaScript
    console.log('Aplicación inicializada con CSS sticky');
    
    // Configurar hover de filas después de que se renderice la tabla
    setTimeout(configurarHoverFilas, 500);
    
    // Re-aplicar estilos cuando cambie el modo oscuro
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target === document.body) {
                    console.log('Modo oscuro cambiado, re-configurando hover');
                    // Re-configurar hover después del cambio de modo
                    setTimeout(configurarHoverFilas, 200);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
});
