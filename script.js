// ===== CONFIGURACIÓN GLOBAL =====
console.log('📜 SCRIPT.JS CARGADO - VERSIÓN CORREGIDA');
console.log('🔧 FUNCIONES DE SEA PERIÓDO HABILITADAS');
console.log('✅ SISTEMA LISTO PARA USO');
// SOLUCIÓN SIMPLIFICADA PARA ALERTAS TEMPRANAS:
// Se ha restaurado el estado original del sistema, manteniendo solo la funcionalidad básica
// de alertas tempranas sin modificar los estilos originales de las columnas de datos.
// 
// Funcionalidad actual:
// 1. Las alertas tempranas aparecen solo en la columna de acción (última columna)
// 2. Las columnas de datos (nombre, apellidos, cédula) mantienen su estilo original
// 3. Todos los encabezados tienen estilo profesional con color azul oscuro y degradado
// 4. El texto "ALERTA TEMPRANA" se muestra con estilos básicos y visibles
// 5. No se aplican estilos especiales a otras columnas para evitar conflictos
// 6. Zebra striping más oscuro (#d0d0d0 para filas pares) que se aplica a TODA la fila
// 7. Columna "Nombre" con encabezado del mismo color que los otros encabezados
// 8. Columna de números mejorada con mejor apariencia visual
// 9. Todos los encabezados (fijos y días) tienen degradado azul oscuro (#1e40af a #1d4ed8)
// 10. Efecto hover mejorado con degradado más oscuro y animación suave
// 11. Sombras sutiles para dar profundidad y profesionalismo
// 
// Esta solución mantiene la funcionalidad de alertas sin alterar la apariencia original
// del sistema, como lo solicitó el usuario.
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
window.valorExtra = localStorage.getItem(STORAGE_KEY_ALERTA) ? parseInt(localStorage.getItem(STORAGE_KEY_ALERTA)) : 2;

// ===== VARIABLES PARA INDICADORES =====
const STORAGE_KEY_INDICADORES = 'indicadores_v1';
let indicadores = [
    { id: 1, nombre: 'Indicador 1' },
    { id: 2, nombre: 'Indicador 2' },
    { id: 3, nombre: 'Indicador 3' },
    { id: 4, nombre: 'Indicador 4' },
    { id: 5, nombre: 'Indicador 5' },
    { id: 6, nombre: 'Indicador 6' },
    { id: 7, nombre: 'Indicador 7' },
    { id: 8, nombre: 'Indicador 8' },
    { id: 9, nombre: 'Indicador 9' },
    { id: 10, nombre: 'Indicador 10' },
    { id: 11, nombre: 'Indicador 11' },
    { id: 12, nombre: 'Indicador 12' },
    { id: 13, nombre: 'Indicador 13' },
    { id: 14, nombre: 'Indicador 14' },
    { id: 15, nombre: 'Indicador 15' },
    { id: 16, nombre: 'Indicador 16' }
];

// ===== VARIABLES GLOBALES PARA EVALUACIONES =====
// Variables para Pruebas
let pruebas = [
    { nombre: 'I PRUEBA', puntosMaximos: 30, peso: 20 },
    { nombre: 'II PRUEBA', puntosMaximos: 30, peso: 15 }
];
let evaluacionesEstudiantes = [];

// Variables para Tareas
let tareas = [
    { nombre: 'I TAREA', puntosMaximos: 20, peso: 5 },
    { nombre: 'II TAREA', puntosMaximos: 20, peso: 5 }
];
let tareasEstudiantes = [];

// Variables para Trabajo Cotidiano
let diasTrabajo = [];
let trabajoCotidianoEstudiantes = [];
let escalaMaxima = 3;
let valorTotalTrabajo = 35;

// Variables para Proyecto
let proyectos = [];
let proyectosEstudiantes = [];

// Variables para Portafolio
let portafolios = [];
let portafoliosEstudiantes = [];

// Debounce para actualizaciones
let debounceTimer;
function debounce(func, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
}



// Detectar si estamos en Live Server
function detectarLiveServer() {
    const esLiveServer = window.location.href.includes('127.0.0.1:5501') || 
                        window.location.href.includes('localhost:5501') ||
                        window.location.href.includes('live-server');
    return esLiveServer;
}



// Plantilla de ejemplo
const plantillaEjemplo = [
    { cedula: "207890123", nombre: "Juan", apellido1: "Pérez", apellido2: "González", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) },
    { cedula: "208901234", nombre: "María", apellido1: "Rodríguez", apellido2: "López", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) },
    { cedula: "209012345", nombre: "Carlos", apellido1: "Sánchez", apellido2: "Jiménez", asistenciaDias: Array(dias.length).fill({ tipo: 'Presente', cantidad: 0 }) }
];

// ===== FUNCIONES DE INICIALIZACIÓN =====
function inicializarAplicacion() {
    console.log('🚀 EJECUTANDO inicializarAplicacion() - VERSIÓN CORREGIDA');
    // Evitar inicializaciones múltiples
    if (window.aplicacionInicializada) {
        console.log('⚠️ Aplicación ya inicializada, saliendo...');
        return;
    }
    
    window.aplicacionInicializada = true;
    
    // Cargar todos los datos primero
    cargarDatosGuardados();
    
    // Configurar modo oscuro y eventos
    configurarModoOscuro();
    configurarEventos();
    
    // Renderizar todas las secciones
    renderAsistencia();
    renderEvaluacion();
    renderTareas();
    renderTrabajoCotidiano();
    renderProyecto();
    renderPortafolio();
    renderIndicadores();
    renderSeaPeriodo();
    
    // Configurar navegación
    configurarNavegacionTeclado();
    agregarIndicadoresNavegacion();
    
    // Configurar escala máxima para trabajo cotidiano
    configurarEscalaMaxima();
    
    // Esperar a que el DOM esté completamente cargado antes de sincronizar alertas
    setTimeout(() => {
        sincronizarInputAlerta();
    }, 100);
    
    // Configurar hover de filas después de que se renderice la tabla
    setTimeout(configurarHoverFilas, 500);
    
    // Re-aplicar estilos cuando cambie el modo oscuro
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target === document.body) {
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
    
    console.log('✅ inicializarAplicacion() completada');
}

// Función para verificar que el DOM esté listo
function esperarDOMListo() {
    console.log('🌐 EJECUTANDO esperarDOMListo()');
    const esLiveServer = detectarLiveServer();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarAplicacion);
    } else {
        inicializarAplicacion();
    }
    
    // Fallback adicional para Live Server
    const tiempoFallback = esLiveServer ? 3000 : 2000;
    console.log('⏰ Configurando fallback de', tiempoFallback, 'ms');
    setTimeout(() => {
        if (!window.aplicacionInicializada) {
            console.log('🔄 Ejecutando fallback - inicializarAplicacion()');
            window.aplicacionInicializada = true;
            inicializarAplicacion();
        } else {
            console.log('✅ Aplicación ya inicializada, no se ejecuta fallback');
        }
    }, tiempoFallback);
}

function cargarDatosGuardados() {
    console.log('🔍 EJECUTANDO cargarDatosGuardados()');
    try {
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
            mostrarAlerta('Datos cargados correctamente', 'exito');
        } catch (error) {
            estudiantes = JSON.parse(JSON.stringify(plantillaEjemplo));
        }
    } else {
        estudiantes = JSON.parse(JSON.stringify(plantillaEjemplo));
    }
    
    // Cargar datos de trabajo cotidiano
    cargarTrabajoCotidiano();
    
    // Sincronizar estudiantes de trabajo cotidiano
    sincronizarEstudiantesTrabajoCotidiano();
    
    // Verificar integridad de datos después de cargar
    setTimeout(() => {
        verificarIntegridadDatosTrabajoCotidiano();
    }, 100);
    
    // Sincronizar input de alerta temprana después de cargar datos
    sincronizarInputAlerta();
    renderAsistencia();
    
    // Cargar indicadores
    cargarIndicadoresGuardados();
    
    // Cargar datos de todas las secciones
    console.log('=== CARGANDO DATOS DE SECCIONES ===');
    console.log('🔍 Llamando a cargarEvaluacion()...');
    cargarEvaluacion();
    console.log('✅ Después de cargarEvaluacion - pruebas:', pruebas);
    console.log('✅ Después de cargarEvaluacion - evaluacionesEstudiantes:', evaluacionesEstudiantes);
    
    console.log('🔍 Llamando a cargarTareas()...');
    cargarTareas();
    console.log('✅ Después de cargarTareas - tareas:', tareas);
    console.log('✅ Después de cargarTareas - tareasEstudiantes:', tareasEstudiantes);
    
    console.log('🔍 Llamando a cargarProyecto()...');
    cargarProyecto();
    console.log('✅ Después de cargarProyecto - proyectos:', proyectos);
    console.log('✅ Después de cargarProyecto - proyectosEstudiantes:', proyectosEstudiantes);
    
    console.log('🔍 Llamando a cargarPortafolio()...');
    cargarPortafolio();
    console.log('✅ Después de cargarPortafolio - portafolios:', portafolios);
    console.log('✅ Después de cargarPortafolio - portafoliosEstudiantes:', portafoliosEstudiantes);
    console.log('=== FIN CARGADO DE DATOS ===');
    
    // Renderizar trabajo cotidiano después de sincronizar
    setTimeout(() => {
        renderTrabajoCotidiano();
        // Forzar una segunda sincronización después del render
        setTimeout(() => {
            sincronizarEstudiantesTrabajoCotidiano();
            renderTrabajoCotidiano();
        }, 200);
    }, 100);
    } catch (error) {
        console.error('❌ ERROR en cargarDatosGuardados():', error);
    }
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
        const esLiveServer = detectarLiveServer();
        const tiempoReintento = esLiveServer ? 100 : 50;
        // Reintentar si el input no está disponible
        setTimeout(sincronizarInputAlerta, tiempoReintento);
        return;
    }
    
    // Configurar el input para aceptar valores enteros de 0 a 10
    input.min = 0;
    input.max = 10;
    input.step = 1; // Solo valores enteros
    
    // Cargar valor guardado en localStorage o usar valor por defecto
    const valorGuardado = localStorage.getItem(STORAGE_KEY_ALERTA);
    const valorInicial = valorGuardado ? parseInt(valorGuardado) : 2;
    input.value = valorInicial;
    window.valorExtra = valorInicial;
    
    // Validar y actualizar el valor
    input.oninput = function() {
        let val = parseInt(this.value) || 0; // Usar parseInt para valores enteros
        if (val < 0) val = 0;
        if (val > 10) val = 10;
        window.valorExtra = val;
        this.value = val;
        localStorage.setItem(STORAGE_KEY_ALERTA, val);
        renderAsistencia(); // Re-renderizar para actualizar alertas
    };
    
    // También agregar evento onchange para mayor compatibilidad
    input.onchange = function() {
        let val = parseInt(this.value) || 0;
        if (val < 0) val = 0;
        if (val > 10) val = 10;
        window.valorExtra = val;
        this.value = val;
        localStorage.setItem(STORAGE_KEY_ALERTA, val);
        renderAsistencia();
    };
    
    // Verificar que el input esté realmente configurado
    setTimeout(() => {
        if (input.value !== valorInicial.toString()) {
            input.value = valorInicial;
            window.valorExtra = valorInicial;
        }
    }, 100);
}

// Función para verificar y corregir estilos de alertas tempranas
function verificarYCorregirAlertas() {
    setTimeout(() => {
        const celdasAlerta = document.querySelectorAll('td.alerta-temprana');
        celdasAlerta.forEach(celda => {
            // Asegurar que el texto de alerta sea visible
            const textoAlerta = celda.querySelector('.texto-alerta');
            if (textoAlerta) {
                textoAlerta.style.color = '#e74c3c !important';
                textoAlerta.style.fontWeight = 'bold !important';
                textoAlerta.style.fontSize = '1em !important';
                textoAlerta.style.display = 'inline-block !important';
                textoAlerta.style.visibility = 'visible !important';
                textoAlerta.style.opacity = '1 !important';
            }
        });
    }, 200);
}

// Función de limpieza final para eliminar fondos verdes residuales
function limpiarFondosVerdes() {
    // Función removida - no necesaria con enfoque simplificado
}



// ===== FUNCIONES DE RENDERIZADO =====
function renderAsistencia() {
    
    if (estudiantes.length === 0) {
        document.getElementById('app').innerHTML = renderTablaVacia();
        actualizarContador();
        return;
    }
    
    limpiarEstudiantesVacios();
    
    let html = `<div class="version-mensaje">🗓️ Sistema de registro de asistencia <span style="color:var(--color-error);font-weight:bold;">v${VERSION}</span></div>`;
    html += `<table border="1" class="asistencia-table" aria-label="Tabla de asistencia">`;
    html += generarEncabezadoTabla();
    html += generarFilasEstudiantes();
    html += '</tbody></table>';
    
    document.getElementById('app').innerHTML = html;
    actualizarContador();
    configurarHoverFilas();
    
    // Verificar y corregir alertas tempranas después del renderizado
    verificarYCorregirAlertas();
    
    // Validar alertas tempranas
    setTimeout(() => {
        const celdasConAlerta = document.querySelectorAll('td[style*="background:#ffeaea"]');
        const todasLasCeldas = document.querySelectorAll('td');
        let alertasEncontradas = 0;
        todasLasCeldas.forEach(celda => {
            if (celda.textContent.includes('ALERTA TEMPRANA')) {
                alertasEncontradas++;
            }
        });
    }, 100);
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
    html += `<table border="1" class="asistencia-table" aria-label="Tabla de asistencia">`;
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
    let html = '<thead><tr>';
    
    // Encabezados fijos con color azul oscuro y degradado
    html += '<th class="numero" style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">#</th>';
    html += '<th class="nombre" style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Nombre</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Primer apellido</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Segundo apellido</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Cédula</th>';
    
    // Encabezados de días
    for (let i = 0; i < dias.length; i++) {
        html += generarEncabezadoDia(i, contarAusentesDia(i));
    }
    
    // Encabezados de totales
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Ausente</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Justificada</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Presente</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Tarde</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Escapada</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Total ausencias</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Total lecciones</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">% Asistencia</th>';
    html += '<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">Acción</th>';
    
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
    let html = `<th style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">
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
        
        const accionHtml = generarAccionAlerta(porcentajeAsistencia, estudiante);
        const tieneAlerta = accionHtml.includes('ALERTA TEMPRANA');
        
        html += `<tr>`;
        html += `<td class="numero" style="text-align:center;font-weight:bold;background:linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);color:white;box-shadow:0 2px 4px rgba(30,64,175,0.3);">${i + 1}</td>`;
        
        // Celdas de datos sin estilos especiales
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
        
        // Celda de acción con estilo simple
        let estiloCelda = 'font-size:1em;padding:2px 0;text-align:center;min-width:120px;vertical-align:middle;';
        let claseCelda = '';
        
        if (tieneAlerta) {
            claseCelda = 'alerta-temprana';
            estiloCelda += 'background:#ffeaea !important;background-color:#ffeaea !important;border:2.5px solid #e74c3c !important;border-radius:6px !important;color:#e74c3c !important;font-weight:bold !important;box-shadow:0 2px 8px rgba(231,76,60,0.2) !important;';
        }
        
        html += `<td class="${claseCelda}" style="${estiloCelda}">${accionHtml}</td>`;
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
            html += `<button onclick="eliminarAusencia(${estIndex},${diaIndex},${ausenciaIndex})" style="background:#e11d48;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.8em;cursor:pointer;" title="Eliminar ausencia">×</button>`;
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
    // Obtener el valor actual del input de alerta temprana
    let inputAlerta = document.getElementById('alertaTempranaInput');
    let valorAlerta = 2; // Valor por defecto
    
    if (inputAlerta) {
        valorAlerta = parseInt(inputAlerta.value) || 2;
    } else {
        valorAlerta = window.valorExtra || 2;
    }
    
    // Calcular la diferencia: 10 - %asistencia
    let diferencia = 10 - porcentajeAsistencia;
    
    // Mostrar alerta temprana si la diferencia es mayor al valor configurado
    if (diferencia > valorAlerta) {
        return '<span class="texto-alerta">⚠️ ALERTA TEMPRANA</span>';
    } else {
        return '-';
    }
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
    // sincronizarTodasLasSecciones(); // TEMPORALMENTE COMENTADO PARA DETENER BUCLE INFINITO
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
    actualizarResumenSeaPeriodo();
}

function actualizarAsistenciaCantidad(estIdx, diaIdx, valor) {
    if (typeof estudiantes[estIdx].asistenciaDias[diaIdx] !== 'object') {
        estudiantes[estIdx].asistenciaDias[diaIdx] = { tipo: 'Ausente', cantidad: 0 };
    }
    estudiantes[estIdx].asistenciaDias[diaIdx].cantidad = Number(valor);
    guardarDatos();
    renderAsistencia();
    actualizarResumenSeaPeriodo();
}

// Nuevas funciones para múltiples ausencias
function actualizarAsistenciaTipoMultiple(estIdx, diaIdx, ausenciaIdx, valor) {
    if (!estudiantes[estIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx] || !estudiantes[estIdx].asistenciaDias[diaIdx].ausencias) return;
    
    estudiantes[estIdx].asistenciaDias[diaIdx].ausencias[ausenciaIdx].tipo = valor;
    
    // Si es el primer selector (ausenciaIndex === 0) y se selecciona "Ausente" o "Justificada", precargar con lecciones del día
    if (ausenciaIdx === 0 && (valor === 'Ausente' || valor === 'Justificada')) {
        const leccionesDia = Number(dias[diaIdx].lecciones) || 0;
        estudiantes[estIdx].asistenciaDias[diaIdx].ausencias[ausenciaIdx].cantidad = leccionesDia;

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
    // Validar formato de fecha
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        mostrarAlerta('Formato de fecha inválido. Use YYYY-MM-DD', 'error');
        return;
    }
    
    // Validar que la fecha sea válida
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
        mostrarAlerta('Fecha inválida', 'error');
        return;
    }
    
    dias[idx].fecha = fecha;
    guardarDatos();
    renderAsistencia();
}

function actualizarLeccionesDia(idx, valor) {
    // Validar que el valor sea un número válido
    const valorNumerico = Number(valor);
    if (isNaN(valorNumerico) || valorNumerico < 0) {
        mostrarAlerta('El número de lecciones debe ser un valor válido mayor o igual a 0', 'error');
        return;
    }
    
    const valorAnterior = Number(dias[idx].lecciones) || 0;
    dias[idx].lecciones = valorNumerico;
    

    
    // Actualizar automáticamente las cantidades de ausencias en el primer selector
    if (valorAnterior !== Number(valor)) {
        let contadorActualizados = 0;
        
        estudiantes.forEach((estudiante, estIdx) => {
            if (estudiante.asistenciaDias && estudiante.asistenciaDias[idx] && 
                estudiante.asistenciaDias[idx].ausencias && estudiante.asistenciaDias[idx].ausencias[0]) {
                
                const primeraAusencia = estudiante.asistenciaDias[idx].ausencias[0];
                
                // Solo actualizar si es "Ausente" o "Justificada" en el primer selector
                if (primeraAusencia.tipo === 'Ausente' || primeraAusencia.tipo === 'Justificada') {
                    primeraAusencia.cantidad = Number(valor);
                    contadorActualizados++;
                }
            }
        });
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
    
    // Renderizar todas las secciones para sincronizar el nuevo estudiante
    renderAsistencia();
    renderEvaluacion();
    renderTareas();
    renderTrabajoCotidiano();
    renderProyecto();
    renderPortafolio();
    
    actualizarResumenSeaPeriodo();
}

function agregarDia() {
    if (dias.length >= 100) {
        mostrarAlerta('No se pueden agregar más de 100 días', 'error');
        return;
    }
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];
    
    dias.push({ fecha: fechaActual, nombre: `Día ${dias.length + 1}`, lecciones: 0 });
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
        
        // Renderizar todas las secciones para sincronizar después de eliminar
        renderAsistencia();
        renderEvaluacion();
        renderTareas();
        renderTrabajoCotidiano();
        renderProyecto();
        renderPortafolio();
        
        actualizarResumenSeaPeriodo();
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
    
    // Guardar el orden anterior para reordenar los datos
    const ordenAnterior = estudiantes.map((est, index) => ({
        estudiante: est,
        index: index
    }));
    
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
    
    // Reordenar los datos de todas las secciones según el nuevo orden
    sincronizarOrdenEstudiantes(ordenAnterior);
    
    guardarDatos();
    
    // Renderizar todas las secciones para actualizar el orden de estudiantes
    renderAsistencia();
    renderEvaluacion();
    renderTareas();
    renderTrabajoCotidiano();
    renderProyecto();
    renderPortafolio();
    
    actualizarResumenSeaPeriodo();
    mostrarAlerta('Estudiantes ordenados y sincronizados en todas las secciones', 'exito');
}

// ===== FUNCIONES DE PERSISTENCIA =====
function guardarDatos() {

    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ estudiantes, dias }));
}

function guardarDatosManual() {
    guardarDatos();
    mostrarAlerta('Datos guardados manualmente', 'exito');
}

function actualizarContador() {
    // Contar solo estudiantes que tienen nombre
    const estudiantesConNombre = estudiantes.filter(est => 
        est.nombre && est.nombre.trim() !== ''
    ).length;
    
    document.getElementById('contadorEstudiantes').textContent = `Cantidad de estudiantes: ${estudiantesConNombre}`;
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
    
    // Add additional styling to ensure visibility
    alerta.style.zIndex = '10001';
    alerta.style.position = 'fixed';
    alerta.style.top = '220px';
    alerta.style.left = '50%';
    alerta.style.transform = 'translateX(-50%)';
    alerta.style.minWidth = '280px';
    alerta.style.maxWidth = '90vw';
    alerta.style.fontSize = '1.12em';
    alerta.style.fontWeight = '600';
    alerta.style.borderRadius = '15px';
    alerta.style.padding = '16px 28px';
    alerta.style.letterSpacing = '0.5px';
    alerta.style.border = '2px solid rgba(255,255,255,0.2)';
    alerta.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    alerta.style.willChange = 'transform, box-shadow';
    
    // Set background based on type
    if (tipo === 'exito') {
        alerta.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        alerta.style.color = '#fff';
        alerta.style.border = '2px solid rgba(16, 185, 129, 0.3)';
        alerta.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.2)';
    } else if (tipo === 'error') {
        alerta.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        alerta.style.color = '#fff';
        alerta.style.border = '2px solid rgba(239, 68, 68, 0.3)';
        alerta.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.2)';
    } else if (tipo === 'info') {
        alerta.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
        alerta.style.color = '#fff';
        alerta.style.border = '2px solid rgba(99, 102, 241, 0.3)';
        alerta.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.2)';
    }
    
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
            
            // Guardar estudiantes existentes y sus datos antes de importar
            const estudiantesExistentes = [...estudiantes];
            const evaluacionesExistentes = [...evaluacionesEstudiantes];
            const tareasExistentes = [...tareasEstudiantes];
            const trabajoCotidianoExistentes = [...trabajoCotidianoEstudiantes];
            const proyectosExistentes = [...proyectosEstudiantes];
            const portafoliosExistentes = [...portafoliosEstudiantes];
            
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
            
            // Ordenar estudiantes automáticamente por primer apellido (solo al importar)
            if (estudiantes.length > 0) {
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
                
                // Reconstruir arrays de evaluación preservando datos de estudiantes existentes
                // Evaluaciones
                evaluacionesEstudiantes = [];
                estudiantes.forEach((estudiante, index) => {
                    // Buscar si el estudiante ya existía
                    const estudianteExistente = estudiantesExistentes.find(est => 
                        est.cedula === estudiante.cedula && 
                        est.nombre === estudiante.nombre && 
                        est.apellido1 === estudiante.apellido1 && 
                        est.apellido2 === estudiante.apellido2
                    );
                    
                    if (estudianteExistente) {
                        // Preservar datos existentes
                        const indexExistente = estudiantesExistentes.indexOf(estudianteExistente);
                        evaluacionesEstudiantes.push([...evaluacionesExistentes[indexExistente]]);
                    } else {
                        // Nuevo estudiante - inicializar con ceros
                        const evaluacionEstudiante = [];
                        pruebas.forEach(() => {
                            evaluacionEstudiante.push({ puntos: 0, puntosMaximos: 0 });
                        });
                        evaluacionesEstudiantes.push(evaluacionEstudiante);
                    }
                });
                
                // Tareas
                tareasEstudiantes = [];
                estudiantes.forEach((estudiante, index) => {
                    const estudianteExistente = estudiantesExistentes.find(est => 
                        est.cedula === estudiante.cedula && 
                        est.nombre === estudiante.nombre && 
                        est.apellido1 === estudiante.apellido1 && 
                        est.apellido2 === estudiante.apellido2
                    );
                    
                    if (estudianteExistente) {
                        const indexExistente = estudiantesExistentes.indexOf(estudianteExistente);
                        tareasEstudiantes.push([...tareasExistentes[indexExistente]]);
                    } else {
                        const tareasEstudiante = [];
                        tareas.forEach(() => {
                            tareasEstudiante.push({ puntos: 0, puntosMaximos: 0 });
                        });
                        tareasEstudiantes.push(tareasEstudiante);
                    }
                });
                
                // Trabajo Cotidiano
                trabajoCotidianoEstudiantes = [];
                estudiantes.forEach((estudiante, index) => {
                    const estudianteExistente = estudiantesExistentes.find(est => 
                        est.cedula === estudiante.cedula && 
                        est.nombre === estudiante.nombre && 
                        est.apellido1 === estudiante.apellido1 && 
                        est.apellido2 === estudiante.apellido2
                    );
                    
                    if (estudianteExistente) {
                        const indexExistente = estudiantesExistentes.indexOf(estudianteExistente);
                        trabajoCotidianoEstudiantes.push([...trabajoCotidianoExistentes[indexExistente]]);
                    } else {
                        const trabajoEstudiante = [];
                        diasTrabajo.forEach(() => {
                            trabajoEstudiante.push({ nota: 0 });
                        });
                        trabajoCotidianoEstudiantes.push(trabajoEstudiante);
                    }
                });
                
                // Proyectos
                proyectosEstudiantes = [];
                estudiantes.forEach((estudiante, index) => {
                    const estudianteExistente = estudiantesExistentes.find(est => 
                        est.cedula === estudiante.cedula && 
                        est.nombre === estudiante.nombre && 
                        est.apellido1 === estudiante.apellido1 && 
                        est.apellido2 === estudiante.apellido2
                    );
                    
                    if (estudianteExistente) {
                        const indexExistente = estudiantesExistentes.indexOf(estudianteExistente);
                        proyectosEstudiantes.push([...proyectosExistentes[indexExistente]]);
                    } else {
                        const proyectoEstudiante = [];
                        proyectos.forEach(() => {
                            proyectoEstudiante.push({ puntos: 0, puntosMaximos: 0 });
                        });
                        proyectosEstudiantes.push(proyectoEstudiante);
                    }
                });
                
                // Portafolios
                portafoliosEstudiantes = [];
                estudiantes.forEach((estudiante, index) => {
                    const estudianteExistente = estudiantesExistentes.find(est => 
                        est.cedula === estudiante.cedula && 
                        est.nombre === estudiante.nombre && 
                        est.apellido1 === estudiante.apellido1 && 
                        est.apellido2 === estudiante.apellido2
                    );
                    
                    if (estudianteExistente) {
                        const indexExistente = estudiantesExistentes.indexOf(estudianteExistente);
                        portafoliosEstudiantes.push([...portafoliosExistentes[indexExistente]]);
                    } else {
                        const portafolioEstudiante = [];
                        portafolios.forEach(() => {
                            portafolioEstudiante.push({ puntos: 0, puntosMaximos: 0 });
                        });
                        portafoliosEstudiantes.push(portafolioEstudiante);
                    }
                });
            }
            
            guardarDatos();
            renderAsistencia();
            
            // Sincronizar y renderizar todas las secciones
            sincronizarEstudiantesEvaluacion();
            sincronizarEstudiantesTareas();
            sincronizarEstudiantesTrabajoCotidiano();
            sincronizarEstudiantesProyecto();
            sincronizarEstudiantesPortafolio();
            
            setTimeout(() => {
                renderEvaluacion();
                renderTareas();
                renderTrabajoCotidiano();
                renderProyecto();
                renderPortafolio();
            }, 100);
            
            mostrarAlerta('Datos importados, ordenados alfabéticamente y agregados correctamente', 'exito');
            
            } catch (error) {
        console.error('Error al importar:', error);
        let mensajeError = 'Error al importar el archivo';
        
        if (error.message.includes('Invalid file format')) {
            mensajeError = 'El archivo no es un archivo Excel válido (.xlsx)';
        } else if (error.message.includes('Empty workbook')) {
            mensajeError = 'El archivo Excel está vacío';
        } else if (error.message.includes('Cannot read')) {
            mensajeError = 'No se puede leer el archivo. Verifique que no esté corrupto';
        }
        
        mostrarAlerta(mensajeError, 'error');
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
    
    // Configurar trabajo cotidiano después de que se cargue el DOM
    setTimeout(() => {
        configurarEscalaMaxima();
        renderTrabajoCotidiano();
    }, 200);
    
    // Eventos para preservar datos antes de cerrar/recargar
    window.addEventListener('beforeunload', function() {
        preservarDatosInputs();
        guardarTrabajoCotidiano();
    });
    
    // Eventos para preservar datos en intervalos regulares
    setInterval(function() {
        preservarDatosInputs();
        guardarTrabajoCotidiano();
    }, 2000); // Guardar cada 2 segundos
    
    // Eventos para preservar datos cuando se pierde el foco
    document.addEventListener('blur', function() {
        preservarDatosInputs();
        guardarTrabajoCotidiano();
    }, true);
    
    // Eventos para preservar datos cuando se hace clic en cualquier lugar
    document.addEventListener('click', function() {
        setTimeout(() => {
            preservarDatosInputs();
            guardarTrabajoCotidiano();
        }, 100);
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
    }
}

function quitarBordeRojoFila(input) {
    // Quitar clase de todas las filas
    document.querySelectorAll('tr').forEach(tr => {
        tr.classList.remove('fila-focus-activa');
    });
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
    
    filas.forEach(fila => {
        // Crear handlers únicos para cada fila
        const mouseenterHandler = function() {
            // Limpiar bordes anteriores
            document.querySelectorAll('tr').forEach(tr => {
                tr.classList.remove('fila-focus-activa');
            });
            // Agregar borde a esta fila
            this.classList.add('fila-focus-activa');
        };
        
        const mouseleaveHandler = function() {
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
    
    
}

// ===== STICKY CSS PURO - SIN JAVASCRIPT MANUAL =====

// ===== STICKY CSS PURO - SIN JAVASCRIPT MANUAL =====
function implementarStickyManual() {
    // Ya no necesitamos JavaScript manual, CSS sticky funciona correctamente
    // Solo asegurar que los estilos estén aplicados
    
}

// ===== EVALUACIÓN DE PRUEBAS =====

// Función para renderizar la tabla de evaluación
function renderEvaluacion() {
    const container = document.getElementById('evaluacion-app');
    if (!container) return;

    // Si no hay pruebas configuradas, mostrar mensaje
    if (pruebas.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; background: #f9f9f9; border-radius: 8px; margin: 20px 0;"><h3>📝 No hay evaluaciones configuradas</h3><p>Agregue al menos una prueba para comenzar a evaluar a los estudiantes.</p><p><em>Los estudiantes se ocultarán automáticamente cuando no haya evaluaciones disponibles.</em></p><br><button onclick="agregarPrueba()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px;">➕ Agregar Primera Prueba</button></div>';
        return;
    }

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
        html += `<td class="editable" style="position:relative;">
            <input type="number" value="${prueba.peso}" min="0" max="100" step="1" onchange="actualizarPeso(${idx}, this.value)" title="% de peso de la prueba" style="padding-right:40px;width:80px;">
            <button onclick="eliminarPrueba(${idx})" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#dc2626;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar prueba">🗑️</button>
        </td>`;
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
    const puntos = Number(valor);
    if (isNaN(puntos) || puntos < 0 || puntos > 1000) {
        mostrarAlerta('Los puntos máximos deben estar entre 0 y 1000', 'error');
        return;
    }
    pruebas[pruebaIdx].puntosMaximos = puntos;
    guardarEvaluacion();
    renderEvaluacion();
}

// Función para actualizar peso de una prueba
function actualizarPeso(pruebaIdx, valor) {
    const peso = Number(valor);
    if (isNaN(peso) || peso < 0 || peso > 100) {
        mostrarAlerta('El peso debe estar entre 0 y 100', 'error');
        return;
    }
    pruebas[pruebaIdx].peso = peso;
    
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
    const puntos = Number(valor);
    if (isNaN(puntos) || puntos < 0) {
        mostrarAlerta('Los puntos deben ser un número válido mayor o igual a 0', 'error');
        return;
    }
    evaluacion.puntos = puntos;
    guardarEvaluacion();
    renderEvaluacion();
    actualizarResumenSeaPeriodo();
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
    
    // Actualizar resumen SEA I PERIÓDO
    actualizarResumenSeaPeriodo();
    
    mostrarAlerta(`Prueba "${pruebas[pruebas.length - 1].nombre}" agregada`, 'exito');
}

// Función para eliminar prueba
function eliminarPrueba(pruebaIdx) {
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
        
        // Actualizar resumen SEA I PERIÓDO automáticamente
        actualizarResumenSeaPeriodo();
        
        // Verificar si se eliminó la última prueba
        if (pruebas.length === 0) {
            mostrarAlerta(`Prueba "${nombrePrueba}" eliminada. No quedan evaluaciones configuradas. Los estudiantes se han ocultado.`, 'info');
        } else {
            mostrarAlerta(`Prueba "${nombrePrueba}" eliminada`, 'info');
        }
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
            
            // Sincronizar estudiantes después de cargar
            sincronizarEstudiantesEvaluacion();
        } catch (error) {
            console.error('Error al cargar evaluación:', error);
        }
    }
}

// Función para sincronizar estudiantes en evaluación
function sincronizarEstudiantesEvaluacion() {
    // Crear un nuevo array que mantenga el orden correcto
    const nuevoEvaluacionesEstudiantes = [];
    
    // Agregar evaluaciones para todos los estudiantes en el orden correcto
    estudiantes.forEach((estudiante, estIdx) => {
        // Si ya existe una entrada para este estudiante, mantenerla
        if (evaluacionesEstudiantes[estIdx]) {
            nuevoEvaluacionesEstudiantes[estIdx] = evaluacionesEstudiantes[estIdx];
        } else {
            // Crear nueva entrada para el estudiante
            nuevoEvaluacionesEstudiantes[estIdx] = [];
        }
        
        // Asegurar que tenga evaluaciones para todas las pruebas
        while (nuevoEvaluacionesEstudiantes[estIdx].length < pruebas.length) {
            nuevoEvaluacionesEstudiantes[estIdx].push({ puntos: 0 });
        }
    });
    
    // Reemplazar el array original
    evaluacionesEstudiantes = nuevoEvaluacionesEstudiantes;
    
    guardarEvaluacion();
}

// ===== FUNCIONES DE TAREAS =====
function renderTareas() {
    const container = document.getElementById('tareas-app');
    if (!container) return;

    // Si no hay tareas configuradas, mostrar mensaje
    if (tareas.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; background: #f9f9f9; border-radius: 8px; margin: 20px 0;"><h3>📚 No hay tareas configuradas</h3><p>Agregue al menos una tarea para comenzar a evaluar a los estudiantes.</p><p><em>Los estudiantes se ocultarán automáticamente cuando no haya tareas disponibles.</em></p><br><button onclick="agregarTarea()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px;">➕ Agregar Primera Tarea</button></div>';
        return;
    }

    let html = '<table class="tareas-table">';
    
    // Encabezado
    html += '<thead><tr>';
    html += '<th>Estudiante</th>';
    
    tareas.forEach(tarea => {
        html += `<th colspan="3">${tarea.nombre}</th>`;
    });
    
    html += '<th>TOTAL</th>';
    html += '</tr><tr>';
    html += '<th></th>';
    
    tareas.forEach(tarea => {
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
    
    tareas.forEach((tarea, idx) => {
        html += `<td class="editable"><input type="number" value="${tarea.puntosMaximos}" min="0" step="1" onchange="actualizarPuntosMaximosTarea(${idx}, this.value)" title="Puntos máximos de la tarea"></td>`;
        html += '<td class="calculated">-------</td>';
        
        // Celda de peso con botón eliminar integrado
        html += `<td class="editable" style="position:relative;">
            <input type="number" value="${tarea.peso}" min="0" max="100" step="1" onchange="actualizarPesoTarea(${idx}, this.value)" title="% de peso de la tarea" style="padding-right:40px;width:80px;">
            <button onclick="eliminarTarea(${idx})" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#dc2626;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar tarea">🗑️</button>
        </td>`;
    });
    
    // Calcular la suma total de los pesos
    const totalPeso = tareas.reduce((sum, tarea) => sum + tarea.peso, 0);
    const totalClass = totalPeso > 100 ? 'total-excedido' : '';
    html += `<td class="calculated ${totalClass}">${totalPeso}%</td>`;
    html += '</tr>';
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return; // Saltar estudiantes vacíos
        
        html += '<tr>';
        html += `<td class="student-name">${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}</td>`;
        
        let totalPorcentaje = 0;
        
        tareas.forEach((tarea, tareaIdx) => {
            const tareaEstudiante = obtenerTarea(estIdx, tareaIdx);
            const nota = calcularNota(tareaEstudiante.puntos, tarea.puntosMaximos);
            const porcentaje = calcularPorcentaje(tareaEstudiante.puntos, tarea.puntosMaximos);
            const porcentajePonderado = (nota * tarea.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            html += `<td class="editable"><input type="number" value="${tareaEstudiante.puntos}" min="0" max="${tarea.puntosMaximos}" step="0.1" onchange="actualizarPuntosTarea(${estIdx}, ${tareaIdx}, this.value)" title="Puntos obtenidos"></td>`;
            html += `<td class="calculated">${nota.toFixed(1)}</td>`;
            html += `<td class="calculated">${porcentajePonderado.toFixed(1)}%</td>`;
        });
        
        html += `<td class="calculated">${totalPorcentaje.toFixed(1)}%</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function obtenerTarea(estIdx, tareaIdx) {
    if (!tareasEstudiantes[estIdx]) {
        tareasEstudiantes[estIdx] = [];
    }
    if (!tareasEstudiantes[estIdx][tareaIdx]) {
        tareasEstudiantes[estIdx][tareaIdx] = { puntos: 0 };
    }
    return tareasEstudiantes[estIdx][tareaIdx];
}

function actualizarPuntosMaximosTarea(tareaIdx, valor) {
    tareas[tareaIdx].puntosMaximos = parseInt(valor);
    guardarTareas();
    renderTareas();
}

function actualizarPesoTarea(tareaIdx, valor) {
    const peso = parseInt(valor);
    if (peso < 0 || peso > 100) {
        mostrarAlerta('El peso debe estar entre 0 y 100', 'error');
        return;
    }
    
    tareas[tareaIdx].peso = peso;
    
    // Verificar si el total excede 100%
    const totalPeso = tareas.reduce((sum, tarea) => sum + tarea.peso, 0);
    if (totalPeso > 100) {
        mostrarAlerta(`¡Atención! El total de pesos es ${totalPeso}%, que excede el 100%`, 'info');
    }
    
    guardarTareas();
    renderTareas();
}

function actualizarPuntosTarea(estIdx, tareaIdx, valor) {
    const puntos = parseFloat(valor) || 0;
    obtenerTarea(estIdx, tareaIdx).puntos = puntos;
    guardarTareas();
    renderTareas();
    actualizarResumenSeaPeriodo();
}

function obtenerNombreTarea(posicion) {
    const nombres = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    if (posicion <= nombres.length) {
        return `${nombres[posicion - 1]} TAREA`;
    } else {
        return `${posicion}ª TAREA`;
    }
}

function actualizarNombresTareas() {
    tareas.forEach((tarea, index) => {
        tarea.nombre = obtenerNombreTarea(index + 1);
    });
}

function agregarTarea() {
    tareas.push({
        nombre: '',
        puntosMaximos: 20,
        peso: 5
    });
    
    actualizarNombresTareas();
    
    estudiantes.forEach((estudiante, estIdx) => {
        if (!tareasEstudiantes[estIdx]) {
            tareasEstudiantes[estIdx] = [];
        }
        tareasEstudiantes[estIdx].push({ puntos: 0 });
    });
    
    guardarTareas();
    renderTareas();
    
    // Actualizar resumen SEA I PERIÓDO
    actualizarResumenSeaPeriodo();
    
    mostrarAlerta(`Tarea "${tareas[tareas.length - 1].nombre}" agregada`, 'exito');
}

function eliminarTarea(tareaIdx) {
    const nombreTarea = tareas[tareaIdx].nombre;
    
    if (confirm(`¿Seguro que deseas eliminar la tarea "${nombreTarea}"? Esta acción no se puede deshacer.`)) {
        tareas.splice(tareaIdx, 1);
        
        tareasEstudiantes.forEach(estudiante => {
            if (estudiante && estudiante[tareaIdx]) {
                estudiante.splice(tareaIdx, 1);
            }
        });
        
        actualizarNombresTareas();
        
        guardarTareas();
        renderTareas();
        
        // Actualizar resumen SEA I PERIÓDO automáticamente
        actualizarResumenSeaPeriodo();
        
        // Verificar si se eliminó la última tarea
        if (tareas.length === 0) {
            mostrarAlerta(`Tarea "${nombreTarea}" eliminada. No quedan tareas configuradas. Los estudiantes se han ocultado.`, 'info');
        } else {
            mostrarAlerta(`Tarea "${nombreTarea}" eliminada`, 'info');
        }
    }
}

function exportarTareas() {
    const wb = XLSX.utils.book_new();
    
    // Hoja de configuración
    const configData = [
        ['CONFIGURACIÓN DE TAREAS'],
        ['Tarea', 'Puntos Máximos', 'Peso (%)']
    ];
    
    tareas.forEach(tarea => {
        configData.push([tarea.nombre, tarea.puntosMaximos, tarea.peso]);
    });
    
    const totalPeso = tareas.reduce((sum, tarea) => sum + tarea.peso, 0);
    configData.push(['TOTAL', '', `${totalPeso}%`]);
    
    const wsConfig = XLSX.utils.aoa_to_sheet(configData);
    XLSX.utils.book_append_sheet(wb, wsConfig, 'Configuración');
    
    // Hoja de resultados
    const datos = [
        ['Estudiante', ...tareas.flatMap(tarea => [tarea.nombre + ' PTS', tarea.nombre + ' NOTA', tarea.nombre + ' %']), 'TOTAL %']
    ];
    
    // Fila de configuración
    const configRow = ['CONFIGURACIÓN'];
    tareas.forEach(tarea => {
        configRow.push(tarea.puntosMaximos, '-------', tarea.peso + '%');
    });
    configRow.push(`${totalPeso}%`);
    datos.push(configRow);
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        const row = [`${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`];
        let totalPorcentaje = 0;
        
        tareas.forEach((tarea, tareaIdx) => {
            const tareaEstudiante = obtenerTarea(estIdx, tareaIdx);
            const nota = calcularNota(tareaEstudiante.puntos, tarea.puntosMaximos);
            const porcentajePonderado = (nota * tarea.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            row.push(tareaEstudiante.puntos, nota.toFixed(1), porcentajePonderado.toFixed(1) + '%');
        });
        
        row.push(totalPorcentaje.toFixed(1) + '%');
        datos.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Tareas');
    
    XLSX.writeFile(wb, 'evaluacion_tareas.xlsx');
    mostrarAlerta('Tareas exportadas correctamente', 'exito');
}

function guardarTareas() {
    const datos = {
        tareas: tareas,
        tareasEstudiantes: tareasEstudiantes
    };
    localStorage.setItem('tareasEvaluacion', JSON.stringify(datos));
}

function cargarTareas() {
    const datos = localStorage.getItem('tareasEvaluacion');
    if (datos) {
        try {
            const parsed = JSON.parse(datos);
            tareas = parsed.tareas || tareas;
            tareasEstudiantes = parsed.tareasEstudiantes || [];
            
            actualizarNombresTareas();
            
            // Sincronizar estudiantes después de cargar
            sincronizarEstudiantesTareas();
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    }
}

function sincronizarEstudiantesTareas() {
    // Crear un nuevo array que mantenga el orden correcto
    const nuevoTareasEstudiantes = [];
    
    // Agregar tareas para todos los estudiantes en el orden correcto
    estudiantes.forEach((estudiante, estIdx) => {
        // Si ya existe una entrada para este estudiante, mantenerla
        if (tareasEstudiantes[estIdx]) {
            nuevoTareasEstudiantes[estIdx] = tareasEstudiantes[estIdx];
        } else {
            // Crear nueva entrada para el estudiante
            nuevoTareasEstudiantes[estIdx] = [];
        }
        
        // Asegurar que tenga tareas para todas las tareas configuradas
        while (nuevoTareasEstudiantes[estIdx].length < tareas.length) {
            nuevoTareasEstudiantes[estIdx].push({ puntos: 0 });
        }
    });
    
    // Reemplazar el array original
    tareasEstudiantes = nuevoTareasEstudiantes;
    
    guardarTareas();
}

// Eliminada la redefinición problemática de inicializarAplicacion

// ===== FUNCIONES DE TRABAJO COTIDIANO =====
function renderTrabajoCotidiano() {
    const container = document.getElementById('trabajo-cotidiano-app');
    if (!container) {
        return;
    }
    
    // Si no hay días de trabajo configurados, mostrar mensaje
    if (diasTrabajo.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; background: #f9f9f9; border-radius: 8px; margin: 20px 0;"><h3>📋 No hay indicadores de trabajo cotidiano configurados</h3><p>Agregue al menos un indicador para comenzar a evaluar a los estudiantes.</p><p><em>Los estudiantes se ocultarán automáticamente cuando no haya indicadores disponibles.</em></p><br><button onclick="agregarDiaTrabajo()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px;">➕ Agregar Primer Indicador</button></div>';
        return;
    }
    
    let html = '<table class="trabajo-cotidiano-table">';
    
    // Encabezado
    html += '<thead><tr>';
    html += '<th>Estudiante</th>';
    
    if (diasTrabajo.length === 0) {
        html += '<th colspan="1">No hay días configurados</th>';
    } else {
        diasTrabajo.forEach((dia, idx) => {
            html += `<th colspan="1">Indicador ${idx + 1}${idx === diasTrabajo.length - 1 ? ' <button onclick="agregarDiaTrabajo();" class="btn-agregar-dia" title="Agregar indicador" style="margin-left:8px;padding:2px 6px;font-size:0.7em;background:#3b82f6;color:white;border:none;border-radius:4px;cursor:pointer;">+ Indicador</button>' : ''}</th>`;
        });
    }
    
    html += '<th colspan="1">TOTAL</th>';
    html += '</tr><tr>';
    html += '<th></th>';
    
    if (diasTrabajo.length > 0) {
        diasTrabajo.forEach(dia => {
            html += '<th>FECHA</th>';
        });
    } else {
        html += '<th>FECHA</th>';
    }
    
    html += '<th>% FINAL</th>';
    html += '</tr></thead>';
    
    // Fila de configuración
    html += '<tbody>';
    html += '<tr class="config-row">';
    html += '<td class="student-name">CONFIGURACIÓN</td>';
    
    if (diasTrabajo.length > 0) {
        diasTrabajo.forEach((dia, idx) => {
            // Forzar formato de fecha
            const fechaFormateada = dia.fecha || new Date().toISOString().split('T')[0];
            
            html += `<td class="editable" style="position:relative;">
                <input type="date" value="${fechaFormateada}" onchange="actualizarFechaTrabajo(${idx}, this.value)" title="Fecha del día" style="padding-right:40px;width:150px;font-size:1.1em;">
                <button onclick="eliminarDiaTrabajo(${idx})" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#dc2626;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar día">🗑️</button>
            </td>`;
        });
    } else {
        html += '<td class="editable"><input type="date" value="" disabled title="Agregue un día primero"></td>';
    }
    
    html += `<td class="calculated">${valorTotalTrabajo}.0%</td>`;
    html += '</tr>';
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return; // Saltar estudiantes vacíos
        
        html += '<tr>';
        html += `<td class="student-name">${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}</td>`;
        
        if (diasTrabajo.length > 0) {
            diasTrabajo.forEach((dia, diaIdx) => {
                // Obtener nota directamente con validación robusta
                let nota = null;
                if (trabajoCotidianoEstudiantes && 
                    trabajoCotidianoEstudiantes[estIdx] && 
                    trabajoCotidianoEstudiantes[estIdx][diaIdx] && 
                    trabajoCotidianoEstudiantes[estIdx][diaIdx].nota !== null && 
                    trabajoCotidianoEstudiantes[estIdx][diaIdx].nota !== undefined) {
                    nota = trabajoCotidianoEstudiantes[estIdx][diaIdx].nota;
                }
                
                // Crear input con ID único
                const inputId = `nota_${estIdx}_${diaIdx}`;
                const inputValue = nota !== null && nota !== undefined ? nota : '';
                html += `<td class="editable">
                    <input id="${inputId}" type="number" value="${inputValue}" min="0" max="${escalaMaxima}" step="0.1" 
                           title="Nota del estudiante (0-${escalaMaxima})" 
                           style="width: 80px; padding: 8px; border: 2px solid #ff9800; border-radius: 6px; text-align: center; background: #fff; color: #333;">
                </td>`;
            });
        } else {
            html += '<td class="editable"><input type="number" value="" disabled title="Agregue un día primero" style="width: 80px; padding: 8px; border: 2px solid #ccc; border-radius: 6px; text-align: center; background: #f5f5f5; color: #999;"></td>';
        }
        
        // Calcular porcentaje final con validación robusta
        let totalNotas = 0;
        
        diasTrabajo.forEach((dia, diaIdx) => {
            if (trabajoCotidianoEstudiantes && 
                trabajoCotidianoEstudiantes[estIdx] && 
                trabajoCotidianoEstudiantes[estIdx][diaIdx]) {
                const nota = trabajoCotidianoEstudiantes[estIdx][diaIdx].nota;
                if (nota !== null && nota !== undefined && !isNaN(Number(nota))) {
                    totalNotas += Number(nota);
                }
            }
        });
        
        // Cálculo original pero con validaciones robustas
        let porcentajeFinal = 0;
        if (diasTrabajo.length > 0) {
            const totalNotasNum = Number(totalNotas) || 0;
            const diasTrabajoNum = Number(diasTrabajo.length) || 1;
            const escalaMaximaNum = Number(escalaMaxima) || 10;
            const valorTotalTrabajoNum = Number(valorTotalTrabajo) || 30;
            
            if (!isNaN(totalNotasNum) && !isNaN(diasTrabajoNum) && !isNaN(escalaMaximaNum) && !isNaN(valorTotalTrabajoNum) && escalaMaximaNum > 0) {
                porcentajeFinal = (totalNotasNum / (diasTrabajoNum * escalaMaximaNum)) * valorTotalTrabajoNum;
            }
        }
        

        
        html += `<td class="calculated">${porcentajeFinal.toFixed(1) + '%'}</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
    

    
    // Agregar eventos a los inputs después del renderizado
    setTimeout(() => {
        const inputs = container.querySelectorAll('input[type="number"]');
        
        inputs.forEach((input, index) => {
            const id = input.id;
            const parts = id.split('_');
            if (parts.length === 3) {
                const estIdx = parseInt(parts[1]);
                const diaIdx = parseInt(parts[2]);
                
                // Remover eventos anteriores para evitar duplicados
                input.removeEventListener('input', input._inputHandler);
                input.removeEventListener('change', input._changeHandler);
                input.removeEventListener('blur', input._blurHandler);
                
                // Crear nuevos handlers
                input._inputHandler = function() {
                    debounce(() => actualizarNotaTrabajo(estIdx, diaIdx, this.value), 300);
                };
                
                input._changeHandler = function() {
                    actualizarNotaTrabajo(estIdx, diaIdx, this.value);
                };
                
                input._blurHandler = function() {
                    actualizarNotaTrabajo(estIdx, diaIdx, this.value);
                    preservarDatosInputs();
                    guardarTrabajoCotidiano();
                };
                
                input.addEventListener('input', input._inputHandler);
                input.addEventListener('change', input._changeHandler);
                input.addEventListener('blur', input._blurHandler);
            }
        });
        
        // Forzar actualización de todos los cálculos al cargar
        actualizarCalculosTrabajoCotidiano();
        
        // Restaurar valores de inputs después del render
        setTimeout(() => {
            // Restaurar valores de inputs numéricos
            const numberInputs = container.querySelectorAll('input[type="number"]');
            numberInputs.forEach((input) => {
                const id = input.id;
                if (id && id.startsWith('nota_')) {
                    const parts = id.split('_');
                    if (parts.length === 3) {
                        const estIdx = parseInt(parts[1]);
                        const diaIdx = parseInt(parts[2]);
                        
                        if (trabajoCotidianoEstudiantes && 
                            trabajoCotidianoEstudiantes[estIdx] && 
                            trabajoCotidianoEstudiantes[estIdx][diaIdx] && 
                            trabajoCotidianoEstudiantes[estIdx][diaIdx].nota !== null && 
                            trabajoCotidianoEstudiantes[estIdx][diaIdx].nota !== undefined) {
                            input.value = trabajoCotidianoEstudiantes[estIdx][diaIdx].nota;
                        }
                    }
                }
            });
            
            // Forzar actualización de fechas después del render
            const dateInputs = container.querySelectorAll('input[type="date"]');
            dateInputs.forEach((input, idx) => {
                if (diasTrabajo[idx] && diasTrabajo[idx].fecha) {
                    const fechaAplicar = diasTrabajo[idx].fecha;
                    input.value = fechaAplicar;
                    input.setAttribute('value', fechaAplicar);
                }
            });
        }, 100);
    }, 50);
}

function obtenerNotaTrabajo(estIdx, diaIdx) {
    if (!trabajoCotidianoEstudiantes[estIdx]) {
        trabajoCotidianoEstudiantes[estIdx] = [];
    }
    if (!trabajoCotidianoEstudiantes[estIdx][diaIdx]) {
        trabajoCotidianoEstudiantes[estIdx][diaIdx] = { nota: 0 };
    }
    return trabajoCotidianoEstudiantes[estIdx][diaIdx];
}

function actualizarFechaTrabajo(diaIdx, fecha) {
    // Preservar datos antes de re-renderizar
    preservarDatosInputs();
    diasTrabajo[diaIdx].fecha = fecha;
    guardarTrabajoCotidiano();
    renderTrabajoCotidiano();
}

function actualizarNotaTrabajo(estIdx, diaIdx, valor) {
    // Mejorar el parsing para manejar valores vacíos y ceros correctamente
    let nota = 0;
    if (valor !== '' && valor !== null && valor !== undefined) {
        const parsedValue = parseFloat(valor);
        if (!isNaN(parsedValue)) {
            nota = parsedValue;
        }
    }
    
    // Asegurar que existe la estructura de datos
    if (!trabajoCotidianoEstudiantes[estIdx]) {
        trabajoCotidianoEstudiantes[estIdx] = [];
    }
    if (!trabajoCotidianoEstudiantes[estIdx][diaIdx]) {
        trabajoCotidianoEstudiantes[estIdx][diaIdx] = { nota: 0 };
    }
    
    // Guardar la nota
    trabajoCotidianoEstudiantes[estIdx][diaIdx].nota = nota;
    
    // Actualizar inmediatamente los cálculos
    actualizarCalculosTrabajoCotidiano();
    
    // Guardar datos
    guardarTrabajoCotidiano();
    
    // Forzar actualización visual inmediata
    setTimeout(() => {
        actualizarCalculosTrabajoCotidiano();
    }, 50);
    
    // Actualizar resumen SEA automáticamente
    actualizarResumenSeaPeriodo();
}

function preservarDatosInputs() {
    const container = document.getElementById('trabajo-cotidiano-app');
    if (!container) {
        return;
    }
    
    const inputs = container.querySelectorAll('input[type="number"]');
    
    inputs.forEach((input) => {
        const id = input.id;
        if (!id) {
            return;
        }
        
        const parts = id.split('_');
        if (parts.length === 3) {
            const estIdx = parseInt(parts[1]);
            const diaIdx = parseInt(parts[2]);
            
            // Mejorar el parsing para manejar valores vacíos y ceros correctamente
            let valor = 0;
            if (input.value !== '' && input.value !== null && input.value !== undefined) {
                const parsedValue = parseFloat(input.value);
                if (!isNaN(parsedValue)) {
                    valor = parsedValue;
                }
            }
            
            // Asegurar que existe la estructura de datos
            if (!trabajoCotidianoEstudiantes[estIdx]) {
                trabajoCotidianoEstudiantes[estIdx] = [];
            }
            if (!trabajoCotidianoEstudiantes[estIdx][diaIdx]) {
                trabajoCotidianoEstudiantes[estIdx][diaIdx] = { nota: 0 };
            }
            
            // Guardar el valor del input
            trabajoCotidianoEstudiantes[estIdx][diaIdx].nota = valor;
        }
    });
    
    guardarTrabajoCotidiano();
}

function actualizarCalculosTrabajoCotidiano() {
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        let totalNotas = 0;
        
        diasTrabajo.forEach((dia, diaIdx) => {
            if (trabajoCotidianoEstudiantes && 
                trabajoCotidianoEstudiantes[estIdx] && 
                trabajoCotidianoEstudiantes[estIdx][diaIdx]) {
                const nota = trabajoCotidianoEstudiantes[estIdx][diaIdx].nota;
                if (nota !== null && nota !== undefined && !isNaN(Number(nota))) {
                    totalNotas += Number(nota);
                }
            }
        });
        
        // Cálculo original pero con validaciones robustas
        let porcentajeFinal = 0;
        if (diasTrabajo.length > 0) {
            const totalNotasNum = Number(totalNotas) || 0;
            const diasTrabajoNum = Number(diasTrabajo.length) || 1;
            const escalaMaximaNum = Number(escalaMaxima) || 10;
            const valorTotalTrabajoNum = Number(valorTotalTrabajo) || 30;
            
            if (!isNaN(totalNotasNum) && !isNaN(diasTrabajoNum) && !isNaN(escalaMaximaNum) && !isNaN(valorTotalTrabajoNum) && escalaMaximaNum > 0) {
                porcentajeFinal = (totalNotasNum / (diasTrabajoNum * escalaMaximaNum)) * valorTotalTrabajoNum;
            }
        }
        
        // Buscar la fila del estudiante y actualizar inmediatamente
        const container = document.getElementById('trabajo-cotidiano-app');
        if (!container) {
            return;
        }
        
        const rows = container.querySelectorAll('tbody tr');
        const studentRow = rows[estIdx + 1]; // +1 por la fila de configuración
        
        if (studentRow) {
            const cells = studentRow.querySelectorAll('td');
            
            // La última celda es el % Final
            const porcentajeCell = cells[cells.length - 1];
            
            if (porcentajeCell) {
                const valorPorcentaje = porcentajeFinal.toFixed(1) + '%';
                porcentajeCell.textContent = valorPorcentaje;
                porcentajeCell.className = 'calculated'; // Asegurar que mantiene la clase
            }
        }
        
        // También actualizar el resumen SEA PERIÓDO si está visible
        setTimeout(() => {
            if (document.getElementById('sea-periodo-app')) {
                renderSeaPeriodo();
            }
        }, 100);
    });
}

function actualizarAsistenciaTrabajo(estIdx, diaIdx, valor) {
    const asistencia = valor === 'true' || valor === true;
    obtenerNotaTrabajo(estIdx, diaIdx);
    trabajoCotidianoEstudiantes[estIdx][diaIdx].asistencia = asistencia;
    guardarTrabajoCotidiano();
    renderTrabajoCotidiano();
}

function agregarDiaTrabajo() {
    // Preservar datos de inputs antes de re-renderizar
    preservarDatosInputs();
    
    const fechaActual = new Date().toISOString().split('T')[0];
    diasTrabajo.push({
        fecha: fechaActual
    });
    // Agregar un objeto vacío para cada estudiante en el nuevo día
    trabajoCotidianoEstudiantes.forEach(est => {
        est.push({ nota: 0 });
    });
    // Si hay menos estudiantes que trabajoCotidianoEstudiantes, agregar arrays vacíos
    while (trabajoCotidianoEstudiantes.length < estudiantes.length) {
        const nuevo = Array(diasTrabajo.length).fill().map(() => ({ nota: 0 }));
        trabajoCotidianoEstudiantes.push(nuevo);
    }
    guardarTrabajoCotidiano();
    renderTrabajoCotidiano();
    mostrarAlerta(`Día ${diasTrabajo.length} agregado`, 'exito');
}

function eliminarDiaTrabajo(diaIdx) {
    const confirmacion = confirm(`¿Está seguro de que desea eliminar el día ${diaIdx + 1}?`);
    if (!confirmacion) return;
    preservarDatosInputs();
    diasTrabajo.splice(diaIdx, 1);
    // Eliminar la columna correspondiente en todos los estudiantes
    trabajoCotidianoEstudiantes.forEach(est => {
        if (est.length > diaIdx) est.splice(diaIdx, 1);
    });
    guardarTrabajoCotidiano();
    renderTrabajoCotidiano();
    
    // Actualizar resumen SEA I PERIÓDO automáticamente
    actualizarResumenSeaPeriodo();
    
    mostrarAlerta(`Día ${diaIdx + 1} eliminado`, 'exito');
}

function configurarEscalaMaxima() {
    const input = document.getElementById('escalaMaximaInput');
    if (input) {
        input.value = escalaMaxima;
        input.onchange = function() {
            // Preservar datos antes de cambiar
            preservarDatosInputs();
            escalaMaxima = parseInt(this.value) || 3;
            guardarTrabajoCotidiano();
            // Solo actualizar cálculos, no re-renderizar toda la tabla
            actualizarCalculosTrabajoCotidiano();
        };
    }
    
    const inputValorTotal = document.getElementById('valorTotalTrabajoInput');
    if (inputValorTotal) {
        inputValorTotal.value = valorTotalTrabajo;
        inputValorTotal.onchange = function() {
            // Preservar datos antes de cambiar
            preservarDatosInputs();
            valorTotalTrabajo = parseInt(this.value) || 35;
            guardarTrabajoCotidiano();
            // Solo actualizar cálculos, no re-renderizar toda la tabla
            actualizarCalculosTrabajoCotidiano();
        };
    }
}

function exportarTrabajoCotidiano() {
    const wb = XLSX.utils.book_new();
    
    // Hoja de configuración
    const configData = [
        ['CONFIGURACIÓN DE TRABAJO COTIDIANO'],
        ['Escala máxima', escalaMaxima],
        ['Valor total', valorTotalTrabajo],
        [''],
        ['Día', 'Fecha']
    ];
    
    diasTrabajo.forEach((dia, idx) => {
        configData.push([`Día ${idx + 1}`, dia.fecha]);
    });
    
    const wsConfig = XLSX.utils.aoa_to_sheet(configData);
    XLSX.utils.book_append_sheet(wb, wsConfig, 'Configuración');
    
    // Hoja de resultados
    const datos = [
        ['Estudiante', ...diasTrabajo.flatMap((dia, idx) => [`Indicador Fecha`]), '% Final']
    ];
    
    // Fila de configuración
    const configRow = ['CONFIGURACIÓN'];
    diasTrabajo.forEach(dia => {
        configRow.push(dia.fecha, '-------');
    });
    configRow.push(valorTotalTrabajo);
    datos.push(configRow);
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        const row = [`${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`];
        let totalNotas = 0;
        
        diasTrabajo.forEach((dia, diaIdx) => {
            const datosEstudiante = obtenerNotaTrabajo(estIdx, diaIdx);
            const nota = datosEstudiante.nota;
            
            if (nota !== null && nota !== undefined) {
                totalNotas += nota;
            }
            
            row.push(dia.fecha);
        });
        
        const porcentajeFinal = diasTrabajo.length > 0 ? (totalNotas / (diasTrabajo.length * escalaMaxima)) * valorTotalTrabajo : 0;
        row.push(porcentajeFinal.toFixed(1) + '%');
        datos.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Trabajo Cotidiano');
    
    XLSX.writeFile(wb, 'trabajo_cotidiano.xlsx');
    mostrarAlerta('Trabajo cotidiano exportado correctamente', 'exito');
}

function guardarTrabajoCotidiano() {
    const datos = {
        diasTrabajo: diasTrabajo,
        trabajoCotidianoEstudiantes: trabajoCotidianoEstudiantes,
        escalaMaxima: escalaMaxima,
        valorTotalTrabajo: valorTotalTrabajo
    };
    localStorage.setItem('trabajoCotidiano', JSON.stringify(datos));
}

function cargarTrabajoCotidiano() {
    const datos = localStorage.getItem('trabajoCotidiano');
    if (datos) {
        try {
            const parsed = JSON.parse(datos);
            diasTrabajo = parsed.diasTrabajo || [];
            trabajoCotidianoEstudiantes = parsed.trabajoCotidianoEstudiantes || [];
            escalaMaxima = parsed.escalaMaxima || 3;
            valorTotalTrabajo = parsed.valorTotalTrabajo || 30;
            
            // Asegurar que los datos están en el formato correcto
            if (trabajoCotidianoEstudiantes && Array.isArray(trabajoCotidianoEstudiantes)) {
                trabajoCotidianoEstudiantes.forEach((estudiante, estIdx) => {
                    if (Array.isArray(estudiante)) {
                        estudiante.forEach((dia, diaIdx) => {
                            if (dia && typeof dia === 'object') {
                                // Asegurar que la nota sea un número o 0
                                if (dia.nota !== null && dia.nota !== undefined) {
                                    const parsedNota = parseFloat(dia.nota);
                                    dia.nota = isNaN(parsedNota) ? 0 : parsedNota;
                                } else {
                                    dia.nota = 0;
                                }
                            }
                        });
                    }
                });
            }
        } catch (error) {
            // Si hay error, inicializar con valores por defecto
            diasTrabajo = [];
            trabajoCotidianoEstudiantes = [];
            escalaMaxima = 3;
            valorTotalTrabajo = 30;
        }
    }
}

function sincronizarEstudiantesTrabajoCotidiano() {
    // Asegura que cada estudiante tenga un array alineado con diasTrabajo
    trabajoCotidianoEstudiantes = estudiantes.map((_, estIdx) => {
        const prev = trabajoCotidianoEstudiantes[estIdx] || [];
        const nuevo = [];
        for (let i = 0; i < diasTrabajo.length; i++) {
            nuevo[i] = prev[i] && typeof prev[i] === 'object' ? { nota: prev[i].nota ?? 0 } : { nota: 0 };
        }
        return nuevo;
    });
    guardarTrabajoCotidiano();
}

function verificarIntegridadDatosTrabajoCotidiano() {
    // Verificar que todos los datos estén en el formato correcto
    if (!trabajoCotidianoEstudiantes || !Array.isArray(trabajoCotidianoEstudiantes)) {
        trabajoCotidianoEstudiantes = [];
    }
    
    estudiantes.forEach((estudiante, estIdx) => {
        if (!trabajoCotidianoEstudiantes[estIdx] || !Array.isArray(trabajoCotidianoEstudiantes[estIdx])) {
            trabajoCotidianoEstudiantes[estIdx] = [];
        }
        
        diasTrabajo.forEach((dia, diaIdx) => {
            if (!trabajoCotidianoEstudiantes[estIdx][diaIdx] || typeof trabajoCotidianoEstudiantes[estIdx][diaIdx] !== 'object') {
                trabajoCotidianoEstudiantes[estIdx][diaIdx] = { nota: 0 };
            }
            
            // Validar que la nota sea un número válido o 0
            const diaData = trabajoCotidianoEstudiantes[estIdx][diaIdx];
            if (diaData.nota !== null && diaData.nota !== undefined) {
                const parsedNota = parseFloat(diaData.nota);
                if (isNaN(parsedNota)) {
                    diaData.nota = 0;
                } else {
                    diaData.nota = parsedNota;
                }
            } else {
                diaData.nota = 0;
            }
        });
    });
    
    guardarTrabajoCotidiano();
}

// ===== INICIALIZACIÓN =====
esperarDOMListo();

// ===== SECCIÓN PROYECTO =====

// Función para renderizar proyecto
function renderProyecto() {
    const container = document.getElementById('proyecto-app');
    if (!container) return;
    
    if (proyectos.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; background: #f9f9f9; border-radius: 8px; margin: 20px 0;"><h3>🔬 No hay proyectos configurados</h3><p>Agregue al menos un proyecto para comenzar a evaluar a los estudiantes.</p><p><em>Los estudiantes se ocultarán automáticamente cuando no haya proyectos disponibles.</em></p><br><button onclick="agregarProyecto()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px;">➕ Agregar Primer Proyecto</button></div>';
        return;
    }
    
    let html = '<table class="proyecto-table">';
    
    // Encabezado
    html += '<thead><tr>';
    html += '<th>Estudiante</th>';
    proyectos.forEach(proyecto => {
        html += `<th colspan="3">${proyecto.nombre}</th>`;
    });
    html += '<th>TOTAL</th>';
    html += '</tr><tr>';
    html += '<th></th>';
    proyectos.forEach(proyecto => {
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
    proyectos.forEach((proyecto, idx) => {
        html += `<td class="editable"><input type="number" value="${proyecto.puntosMaximos}" min="0" step="1" onchange="actualizarPuntosMaximosProyecto(${idx}, this.value)" title="Puntos máximos del proyecto"></td>`;
        html += '<td class="calculated">-------</td>';
        
        // Celda de peso con botón eliminar integrado
        html += `<td class="editable" style="position:relative;">
            <input type="number" value="${proyecto.peso}" min="0" max="100" step="1" onchange="actualizarPesoProyecto(${idx}, this.value)" title="% de peso del proyecto" style="padding-right:40px;width:80px;">
            <button onclick="eliminarProyecto(${idx})" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#dc2626;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar proyecto">🗑️</button>
        </td>`;
    });
    
    // Calcular la suma total de los pesos
    const totalPeso = proyectos.reduce((sum, proyecto) => sum + proyecto.peso, 0);
    const totalClass = totalPeso > 100 ? 'total-excedido' : '';
    html += `<td class="calculated ${totalClass}">${totalPeso}%</td>`;
    html += '</tr>';
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return; // Saltar estudiantes vacíos
        
        html += '<tr>';
        html += `<td class="student-name">${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}</td>`;
        
        let totalPorcentaje = 0;
        
        proyectos.forEach((proyecto, proyectoIdx) => {
            const evaluacion = obtenerProyecto(estIdx, proyectoIdx);
            const nota = calcularNota(evaluacion.puntos, proyecto.puntosMaximos);
            const porcentaje = calcularPorcentaje(evaluacion.puntos, proyecto.puntosMaximos);
            const porcentajePonderado = (nota * proyecto.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            html += `<td class="editable"><input type="number" value="${evaluacion.puntos}" min="0" max="${proyecto.puntosMaximos}" step="0.1" onchange="actualizarPuntosProyecto(${estIdx}, ${proyectoIdx}, this.value)" title="Puntos obtenidos"></td>`;
            html += `<td class="calculated">${nota.toFixed(1)}</td>`;
            html += `<td class="calculated">${porcentajePonderado.toFixed(1)}%</td>`;
        });
        
        html += `<td class="calculated">${totalPorcentaje.toFixed(1)}%</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Función para obtener evaluación de proyecto
function obtenerProyecto(estIdx, proyectoIdx) {
    if (!proyectosEstudiantes[estIdx] || !proyectosEstudiantes[estIdx][proyectoIdx]) {
        return { puntos: 0 };
    }
    return proyectosEstudiantes[estIdx][proyectoIdx];
}

// Función para actualizar puntos máximos de proyecto
function actualizarPuntosMaximosProyecto(proyectoIdx, valor) {
    proyectos[proyectoIdx].puntosMaximos = parseFloat(valor) || 30;
    guardarProyecto();
    renderProyecto();
}

// Función para actualizar peso de proyecto
function actualizarPesoProyecto(proyectoIdx, valor) {
    proyectos[proyectoIdx].peso = parseFloat(valor) || 10;
    guardarProyecto();
    renderProyecto();
}

// Función para actualizar puntos de proyecto
function actualizarPuntosProyecto(estIdx, proyectoIdx, valor) {
    if (!proyectosEstudiantes[estIdx]) {
        proyectosEstudiantes[estIdx] = [];
    }
    if (!proyectosEstudiantes[estIdx][proyectoIdx]) {
        proyectosEstudiantes[estIdx][proyectoIdx] = { puntos: 0 };
    }
    proyectosEstudiantes[estIdx][proyectoIdx].puntos = parseFloat(valor) || 0;
    guardarProyecto();
    renderProyecto();
    actualizarResumenSeaPeriodo();
}

// Función para obtener nombre de proyecto
function obtenerNombreProyecto(posicion) {
    return `Proyecto ${posicion}`;
}

// Función para actualizar nombres de todos los proyectos
function actualizarNombresProyectos() {
    proyectos.forEach((proyecto, index) => {
        proyecto.nombre = obtenerNombreProyecto(index + 1);
    });
}

// Función para agregar nuevo proyecto
function agregarProyecto() {
    proyectos.push({
        nombre: '', // Se actualizará automáticamente
        puntosMaximos: 30,
        peso: 10
    });
    
    // Actualizar nombres de todos los proyectos
    actualizarNombresProyectos();
    
    // Agregar evaluaciones para todos los estudiantes existentes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!proyectosEstudiantes[estIdx]) {
            proyectosEstudiantes[estIdx] = [];
        }
        proyectosEstudiantes[estIdx].push({ puntos: 0 });
    });
    
    guardarProyecto();
    renderProyecto();
    
    // Actualizar resumen SEA I PERIÓDO
    actualizarResumenSeaPeriodo();
    
    mostrarAlerta(`Proyecto "${proyectos[proyectos.length - 1].nombre}" agregado`, 'exito');
}

// Función para eliminar proyecto
function eliminarProyecto(proyectoIdx) {
    const nombreProyecto = proyectos[proyectoIdx].nombre;
    
    if (confirm(`¿Seguro que deseas eliminar el proyecto "${nombreProyecto}"? Esta acción no se puede deshacer.`)) {
        proyectos.splice(proyectoIdx, 1);
        
        // Eliminar evaluaciones de ese proyecto para todos los estudiantes
        proyectosEstudiantes.forEach(estudiante => {
            if (estudiante && estudiante[proyectoIdx]) {
                estudiante.splice(proyectoIdx, 1);
            }
        });
        
        // Actualizar nombres de todos los proyectos
        actualizarNombresProyectos();
        
        guardarProyecto();
        renderProyecto();
        
        // Actualizar resumen SEA I PERIÓDO automáticamente
        actualizarResumenSeaPeriodo();
        
        // Verificar si se eliminó el último proyecto
        if (proyectos.length === 0) {
            mostrarAlerta(`Proyecto "${nombreProyecto}" eliminado. No quedan proyectos configurados. Los estudiantes se han ocultado.`, 'info');
        } else {
            mostrarAlerta(`Proyecto "${nombreProyecto}" eliminado`, 'info');
        }
    }
}

// Función para exportar proyecto
function exportarProyecto() {
    const wb = XLSX.utils.book_new();
    
    // Preparar datos para exportar
    const datos = [];
    
    // Fila de configuración
    const configRow = ['CONFIGURACIÓN'];
    const totalPeso = proyectos.reduce((sum, proyecto) => sum + proyecto.peso, 0);
    proyectos.forEach(proyecto => {
        configRow.push(proyecto.puntosMaximos, '-------', proyecto.peso);
    });
    configRow.push(`${totalPeso}%`);
    datos.push(configRow);
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        const row = [`${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`];
        let totalPorcentaje = 0;
        
        proyectos.forEach((proyecto, proyectoIdx) => {
            const evaluacion = obtenerProyecto(estIdx, proyectoIdx);
            const nota = calcularNota(evaluacion.puntos, proyecto.puntosMaximos);
            const porcentajePonderado = (nota * proyecto.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            row.push(evaluacion.puntos, nota.toFixed(1), porcentajePonderado.toFixed(1) + '%');
        });
        
        row.push(totalPorcentaje.toFixed(1) + '%');
        datos.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Proyecto');
    
    XLSX.writeFile(wb, 'evaluacion_proyectos.xlsx');
    mostrarAlerta('Proyecto exportado correctamente', 'exito');
}

// Función para guardar proyecto
function guardarProyecto() {
    const datos = {
        proyectos: proyectos,
        proyectosEstudiantes: proyectosEstudiantes
    };
    localStorage.setItem('proyectoData', JSON.stringify(datos));
}

// Función para cargar proyecto
function cargarProyecto() {
    try {
        const datosGuardados = localStorage.getItem('proyectoData');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            proyectos = datos.proyectos || [];
            proyectosEstudiantes = datos.proyectosEstudiantes || [];
            
            // Actualizar nombres de proyectos
            actualizarNombresProyectos();
            
            // Sincronizar estudiantes después de cargar
            sincronizarEstudiantesProyecto();
        }
    } catch (error) {
        console.error('Error al cargar proyecto:', error);
        proyectos = [];
        proyectosEstudiantes = [];
    }
}

// Función para sincronizar estudiantes en proyecto
function sincronizarEstudiantesProyecto() {
    // Crear un nuevo array que mantenga el orden correcto
    const nuevoProyectosEstudiantes = [];
    
    // Agregar proyectos para todos los estudiantes en el orden correcto
    estudiantes.forEach((estudiante, estIdx) => {
        // Si ya existe una entrada para este estudiante, mantenerla
        if (proyectosEstudiantes[estIdx]) {
            nuevoProyectosEstudiantes[estIdx] = proyectosEstudiantes[estIdx];
        } else {
            // Crear nueva entrada para el estudiante
            nuevoProyectosEstudiantes[estIdx] = [];
        }
        
        // Agregar evaluaciones faltantes
        while (nuevoProyectosEstudiantes[estIdx].length < proyectos.length) {
            nuevoProyectosEstudiantes[estIdx].push({ puntos: 0 });
        }
    });
    
    // Reemplazar el array original
    proyectosEstudiantes = nuevoProyectosEstudiantes;
    
    guardarProyecto();
}

// ===== SECCIÓN PORTAFOLIO =====

// Función para renderizar portafolio
function renderPortafolio() {
    const container = document.getElementById('portafolio-app');
    if (!container) return;
    
    if (portafolios.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; background: #f9f9f9; border-radius: 8px; margin: 20px 0;"><h3>📁 No hay portafolios configurados</h3><p>Agregue al menos un portafolio para comenzar a evaluar a los estudiantes.</p><p><em>Los estudiantes se ocultarán automáticamente cuando no haya portafolios disponibles.</em></p><br><button onclick="agregarPortafolio()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px;">➕ Agregar Primer Portafolio</button></div>';
        return;
    }
    
    let html = '<table class="portafolio-table">';
    
    // Encabezado
    html += '<thead><tr>';
    html += '<th>Estudiante</th>';
    portafolios.forEach(portafolio => {
        html += `<th colspan="3">${portafolio.nombre}</th>`;
    });
    html += '<th>TOTAL</th>';
    html += '</tr><tr>';
    html += '<th></th>';
    portafolios.forEach(portafolio => {
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
    portafolios.forEach((portafolio, idx) => {
        html += `<td class="editable"><input type="number" value="${portafolio.puntosMaximos}" min="0" step="1" onchange="actualizarPuntosMaximosPortafolio(${idx}, this.value)" title="Puntos máximos del portafolio"></td>`;
        html += '<td class="calculated">-------</td>';
        
        // Celda de peso con botón eliminar integrado
        html += `<td class="editable" style="position:relative;">
            <input type="number" value="${portafolio.peso}" min="0" max="100" step="1" onchange="actualizarPesoPortafolio(${idx}, this.value)" title="% de peso del portafolio" style="padding-right:40px;width:80px;">
            <button onclick="eliminarPortafolio(${idx})" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#dc2626;color:white;border:none;border-radius:4px;padding:2px 6px;font-size:0.7em;cursor:pointer;" title="Eliminar portafolio">🗑️</button>
        </td>`;
    });
    
    // Calcular la suma total de los pesos
    const totalPeso = portafolios.reduce((sum, portafolio) => sum + portafolio.peso, 0);
    const totalClass = totalPeso > 100 ? 'total-excedido' : '';
    html += `<td class="calculated ${totalClass}">${totalPeso}%</td>`;
    html += '</tr>';
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return; // Saltar estudiantes vacíos
        
        html += '<tr>';
        html += `<td class="student-name">${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}</td>`;
        
        let totalPorcentaje = 0;
        
        portafolios.forEach((portafolio, portafolioIdx) => {
            const evaluacion = obtenerPortafolio(estIdx, portafolioIdx);
            const nota = calcularNota(evaluacion.puntos, portafolio.puntosMaximos);
            const porcentaje = calcularPorcentaje(evaluacion.puntos, portafolio.puntosMaximos);
            const porcentajePonderado = (nota * portafolio.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            html += `<td class="editable"><input type="number" value="${evaluacion.puntos}" min="0" max="${portafolio.puntosMaximos}" step="0.1" onchange="actualizarPuntosPortafolio(${estIdx}, ${portafolioIdx}, this.value)" title="Puntos obtenidos"></td>`;
            html += `<td class="calculated">${nota.toFixed(1)}</td>`;
            html += `<td class="calculated">${porcentajePonderado.toFixed(1)}%</td>`;
        });
        
        html += `<td class="calculated">${totalPorcentaje.toFixed(1)}%</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Función para obtener evaluación de portafolio
function obtenerPortafolio(estIdx, portafolioIdx) {
    if (!portafoliosEstudiantes[estIdx] || !portafoliosEstudiantes[estIdx][portafolioIdx]) {
        return { puntos: 0 };
    }
    return portafoliosEstudiantes[estIdx][portafolioIdx];
}

// Función para actualizar puntos máximos de portafolio
function actualizarPuntosMaximosPortafolio(portafolioIdx, valor) {
    portafolios[portafolioIdx].puntosMaximos = parseFloat(valor) || 30;
    guardarPortafolio();
    renderPortafolio();
}

// Función para actualizar peso de portafolio
function actualizarPesoPortafolio(portafolioIdx, valor) {
    portafolios[portafolioIdx].peso = parseFloat(valor) || 10;
    guardarPortafolio();
    renderPortafolio();
}

// Función para actualizar puntos de portafolio
function actualizarPuntosPortafolio(estIdx, portafolioIdx, valor) {
    if (!portafoliosEstudiantes[estIdx]) {
        portafoliosEstudiantes[estIdx] = [];
    }
    if (!portafoliosEstudiantes[estIdx][portafolioIdx]) {
        portafoliosEstudiantes[estIdx][portafolioIdx] = { puntos: 0 };
    }
    portafoliosEstudiantes[estIdx][portafolioIdx].puntos = parseFloat(valor) || 0;
    guardarPortafolio();
    renderPortafolio();
    actualizarResumenSeaPeriodo();
}

// Función para obtener nombre de portafolio
function obtenerNombrePortafolio(posicion) {
    return `Portafolio ${posicion}`;
}

// Función para actualizar nombres de todos los portafolios
function actualizarNombresPortafolios() {
    portafolios.forEach((portafolio, index) => {
        portafolio.nombre = obtenerNombrePortafolio(index + 1);
    });
}

// Función para agregar nuevo portafolio
function agregarPortafolio() {
    portafolios.push({
        nombre: '', // Se actualizará automáticamente
        puntosMaximos: 30,
        peso: 10
    });
    
    // Actualizar nombres de todos los portafolios
    actualizarNombresPortafolios();
    
    // Agregar evaluaciones para todos los estudiantes existentes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!portafoliosEstudiantes[estIdx]) {
            portafoliosEstudiantes[estIdx] = [];
        }
        portafoliosEstudiantes[estIdx].push({ puntos: 0 });
    });
    
    guardarPortafolio();
    renderPortafolio();
    
    // Actualizar resumen SEA I PERIÓDO
    actualizarResumenSeaPeriodo();
    
    mostrarAlerta(`Portafolio "${portafolios[portafolios.length - 1].nombre}" agregado`, 'exito');
}

// Función para eliminar portafolio
function eliminarPortafolio(portafolioIdx) {
    const nombrePortafolio = portafolios[portafolioIdx].nombre;
    
    if (confirm(`¿Seguro que deseas eliminar el portafolio "${nombrePortafolio}"? Esta acción no se puede deshacer.`)) {
        portafolios.splice(portafolioIdx, 1);
        
        // Eliminar evaluaciones de ese portafolio para todos los estudiantes
        portafoliosEstudiantes.forEach(estudiante => {
            if (estudiante && estudiante[portafolioIdx]) {
                estudiante.splice(portafolioIdx, 1);
            }
        });
        
        // Actualizar nombres de todos los portafolios
        actualizarNombresPortafolios();
        
        guardarPortafolio();
        renderPortafolio();
        
        // Actualizar resumen SEA I PERIÓDO automáticamente
        actualizarResumenSeaPeriodo();
        
        // Verificar si se eliminó el último portafolio
        if (portafolios.length === 0) {
            mostrarAlerta(`Portafolio "${nombrePortafolio}" eliminado. No quedan portafolios configurados. Los estudiantes se han ocultado.`, 'info');
        } else {
            mostrarAlerta(`Portafolio "${nombrePortafolio}" eliminado`, 'info');
        }
    }
}

// Función para exportar portafolio
function exportarPortafolio() {
    const wb = XLSX.utils.book_new();
    
    // Preparar datos para exportar
    const datos = [];
    
    // Fila de configuración
    const configRow = ['CONFIGURACIÓN'];
    const totalPeso = portafolios.reduce((sum, portafolio) => sum + portafolio.peso, 0);
    portafolios.forEach(portafolio => {
        configRow.push(portafolio.puntosMaximos, '-------', portafolio.peso);
    });
    configRow.push(`${totalPeso}%`);
    datos.push(configRow);
    
    // Filas de estudiantes
    estudiantes.forEach((estudiante, estIdx) => {
        if (!estudiante.nombre && !estudiante.apellido1) return;
        
        const row = [`${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`];
        let totalPorcentaje = 0;
        
        portafolios.forEach((portafolio, portafolioIdx) => {
            const evaluacion = obtenerPortafolio(estIdx, portafolioIdx);
            const nota = calcularNota(evaluacion.puntos, portafolio.puntosMaximos);
            const porcentajePonderado = (nota * portafolio.peso) / 100;
            totalPorcentaje += porcentajePonderado;
            
            row.push(evaluacion.puntos, nota.toFixed(1), porcentajePonderado.toFixed(1) + '%');
        });
        
        row.push(totalPorcentaje.toFixed(1) + '%');
        datos.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Portafolio');
    
    XLSX.writeFile(wb, 'evaluacion_portafolios.xlsx');
    mostrarAlerta('Portafolio exportado correctamente', 'exito');
}

// Función para guardar portafolio
function guardarPortafolio() {
    const datos = {
        portafolios: portafolios,
        portafoliosEstudiantes: portafoliosEstudiantes
    };
    localStorage.setItem('portafolioData', JSON.stringify(datos));
}

// Función para cargar portafolio
function cargarPortafolio() {
    try {
        const datosGuardados = localStorage.getItem('portafolioData');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            portafolios = datos.portafolios || [];
            portafoliosEstudiantes = datos.portafoliosEstudiantes || [];
            
            // Actualizar nombres de portafolios
            actualizarNombresPortafolios();
            
            // Sincronizar estudiantes después de cargar
            sincronizarEstudiantesPortafolio();
        }
    } catch (error) {
        console.error('Error al cargar portafolio:', error);
        portafolios = [];
        portafoliosEstudiantes = [];
    }
}

// Función para sincronizar estudiantes en portafolio
function sincronizarEstudiantesPortafolio() {
    // Crear un nuevo array que mantenga el orden correcto
    const nuevoPortafoliosEstudiantes = [];
    
    // Agregar portafolios para todos los estudiantes en el orden correcto
    estudiantes.forEach((estudiante, estIdx) => {
        // Si ya existe una entrada para este estudiante, mantenerla
        if (portafoliosEstudiantes[estIdx]) {
            nuevoPortafoliosEstudiantes[estIdx] = portafoliosEstudiantes[estIdx];
        } else {
            // Crear nueva entrada para el estudiante
            nuevoPortafoliosEstudiantes[estIdx] = [];
        }
        
        // Agregar evaluaciones faltantes
        while (nuevoPortafoliosEstudiantes[estIdx].length < portafolios.length) {
            nuevoPortafoliosEstudiantes[estIdx].push({ puntos: 0 });
        }
    });
    
    // Reemplazar el array original
    portafoliosEstudiantes = nuevoPortafoliosEstudiantes;
    
    guardarPortafolio();
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Efecto visual de resaltado
        section.style.transition = 'box-shadow 0.3s ease';
        section.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5)';
        
        setTimeout(() => {
            section.style.boxShadow = '';
        }, 2000);
        
        // Mostrar alerta de navegación
        const sectionNames = {
            'asistencia': 'Asistencia',
            'indicadores': 'Indicadores',
            'sea-periodo-app': 'SEA I Período',
            'trabajo-cotidiano': 'Trabajo Cotidiano',
            'tareas': 'Tareas',
            'evaluacion': 'Evaluación',
            'proyecto': 'Proyecto',
            'portafolio': 'Portafolio'
        };
        
        // Forzar actualización del SEA I Período si se navega a esa sección
        if (sectionId === 'sea-periodo-app') {
            setTimeout(() => {
                renderSeaPeriodo();
            }, 100);
        }
        
        mostrarAlerta(`Navegando a: ${sectionNames[sectionId]}`, 'info');
    }
}

function scrollToMenu() {
    const menu = document.querySelector('.menu-navegacion');
    if (menu) {
        // Calcular la posición del menú con un offset para que sea visible
        const menuPosition = menu.offsetTop - 100; // 100px de margen superior
        
        window.scrollTo({
            top: menuPosition,
            behavior: 'smooth'
        });
        
        // Efecto visual de resaltado
        menu.style.transition = 'box-shadow 0.3s ease';
        menu.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5)';
        
        setTimeout(() => {
            menu.style.boxShadow = '';
        }, 2000);
        
        mostrarAlerta('Volviendo al menú principal', 'info');
    }
}

// Función para agregar navegación con teclado
function configurarNavegacionTeclado() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + número para navegar rápidamente
        if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '6') {
            event.preventDefault();
            const sections = ['asistencia', 'trabajo-cotidiano', 'tareas', 'evaluacion', 'proyecto', 'portafolio'];
            const index = parseInt(event.key) - 1;
            if (sections[index]) {
                scrollToSection(sections[index]);
            }
        }
        
        // Escape para volver al menú
        if (event.key === 'Escape') {
            scrollToMenu();
        }
    });
}

// Función para agregar indicadores de navegación
function agregarIndicadoresNavegacion() {
            // Agregar indicador de sección actual en el scroll
        window.addEventListener('scroll', function() {
            const sections = ['asistencia', 'indicadores', 'sea-periodo-app', 'trabajo-cotidiano', 'tareas', 'evaluacion', 'proyecto', 'portafolio'];
            const scrollPosition = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Resaltar botón del menú correspondiente
                    const menuBtn = document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`);
                    if (menuBtn) {
                        menuBtn.style.transform = 'scale(1.05)';
                        menuBtn.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)';
                    }
                } else {
                    const menuBtn = document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`);
                    if (menuBtn) {
                        menuBtn.style.transform = '';
                        menuBtn.style.boxShadow = '';
                    }
                }
            }
        });
    });
}

// ===== FUNCIÓN DE RESUMEN DE SECCIONES ACTIVAS =====
function mostrarResumenSeccionesActivas() {
    const secciones = [
        { nombre: 'Pruebas', activa: pruebas.length > 0, cantidad: pruebas.length, icono: '📝' },
        { nombre: 'Tareas', activa: tareas.length > 0, cantidad: tareas.length, icono: '📚' },
        { nombre: 'Trabajo Cotidiano', activa: diasTrabajo.length > 0, cantidad: diasTrabajo.length, icono: '📋' },
        { nombre: 'Proyectos', activa: proyectos.length > 0, cantidad: proyectos.length, icono: '🔬' },
        { nombre: 'Portafolios', activa: portafolios.length > 0, cantidad: portafolios.length, icono: '📁' }
    ];
    
    const seccionesActivas = secciones.filter(s => s.activa);
    const seccionesInactivas = secciones.filter(s => !s.activa);
    
    let mensaje = '';
    
    if (seccionesActivas.length > 0) {
        mensaje += `<div style="margin-bottom: 15px;"><strong>✅ Secciones activas (${seccionesActivas.length}):</strong><br>`;
        seccionesActivas.forEach(s => {
            mensaje += `${s.icono} ${s.nombre}: ${s.cantidad} ${s.cantidad === 1 ? 'elemento' : 'elementos'}<br>`;
        });
        mensaje += '</div>';
    }
    
    if (seccionesInactivas.length > 0) {
        mensaje += `<div><strong>⚠️ Secciones inactivas (${seccionesInactivas.length}):</strong><br>`;
        mensaje += '<em>Los estudiantes se ocultan automáticamente en estas secciones</em><br>';
        seccionesInactivas.forEach(s => {
            mensaje += `${s.icono} ${s.nombre}<br>`;
        });
        mensaje += '</div>';
    }
    
    return mensaje;
}

// Función para mostrar resumen de evaluaciones en un modal
function mostrarResumenEvaluaciones() {
    const resumen = mostrarResumenSeccionesActivas();
    
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <h2 style="margin-top: 0; color: #333; text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 15px;">
            📊 Resumen de Evaluaciones
        </h2>
        <div style="line-height: 1.6; color: #555;">
            ${resumen}
        </div>
        <div style="margin-top: 25px; text-align: center;">
            <button onclick="this.closest('.modal-overlay').remove()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
            ">Cerrar</button>
        </div>
    `;
    
    modal.className = 'modal-overlay';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// ===== INICIALIZACIÓN =====
esperarDOMListo();

// ===== FUNCIONES DE SINCRONIZACIÓN MEJORADAS =====
function sincronizarOrdenEstudiantes(ordenAnterior) {
    console.log('🔄 Sincronizando orden de estudiantes en todas las secciones...');
    
    // Crear un mapa del nuevo orden
    const nuevoOrden = estudiantes.map((est, nuevoIndex) => {
        const ordenAnteriorIndex = ordenAnterior.findIndex(item => 
            item.estudiante.cedula === est.cedula &&
            item.estudiante.nombre === est.nombre &&
            item.estudiante.apellido1 === est.apellido1 &&
            item.estudiante.apellido2 === est.apellido2
        );
        return {
            nuevoIndex: nuevoIndex,
            anteriorIndex: ordenAnteriorIndex >= 0 ? ordenAnterior[ordenAnteriorIndex].index : nuevoIndex
        };
    });
    
    // Reordenar datos de evaluaciones
    if (evaluacionesEstudiantes && evaluacionesEstudiantes.length > 0) {
        const evaluacionesReordenadas = [];
        nuevoOrden.forEach(({ nuevoIndex, anteriorIndex }) => {
            evaluacionesReordenadas[nuevoIndex] = evaluacionesEstudiantes[anteriorIndex] || [];
        });
        evaluacionesEstudiantes = evaluacionesReordenadas;
        guardarEvaluacion();
    }
    
    // Reordenar datos de tareas
    if (tareasEstudiantes && tareasEstudiantes.length > 0) {
        const tareasReordenadas = [];
        nuevoOrden.forEach(({ nuevoIndex, anteriorIndex }) => {
            tareasReordenadas[nuevoIndex] = tareasEstudiantes[anteriorIndex] || [];
        });
        tareasEstudiantes = tareasReordenadas;
        guardarTareas();
    }
    
    // Reordenar datos de trabajo cotidiano
    if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes.length > 0) {
        const trabajoReordenado = [];
        nuevoOrden.forEach(({ nuevoIndex, anteriorIndex }) => {
            trabajoReordenado[nuevoIndex] = trabajoCotidianoEstudiantes[anteriorIndex] || [];
        });
        trabajoCotidianoEstudiantes = trabajoReordenado;
        guardarTrabajoCotidiano();
    }
    
    // Reordenar datos de proyectos
    if (proyectosEstudiantes && proyectosEstudiantes.length > 0) {
        const proyectosReordenados = [];
        nuevoOrden.forEach(({ nuevoIndex, anteriorIndex }) => {
            proyectosReordenados[nuevoIndex] = proyectosEstudiantes[anteriorIndex] || [];
        });
        proyectosEstudiantes = proyectosReordenados;
        guardarProyecto();
    }
    
    // Reordenar datos de portafolios
    if (portafoliosEstudiantes && portafoliosEstudiantes.length > 0) {
        const portafoliosReordenados = [];
        nuevoOrden.forEach(({ nuevoIndex, anteriorIndex }) => {
            portafoliosReordenados[nuevoIndex] = portafoliosEstudiantes[anteriorIndex] || [];
        });
        portafoliosEstudiantes = portafoliosReordenados;
        guardarPortafolio();
    }
    
    console.log('✅ Orden de estudiantes sincronizado en todas las secciones');
}

function sincronizarTodasLasSecciones() {
    // Sincronizar evaluaciones
    sincronizarEstudiantesEvaluacion();
    
    // Sincronizar tareas
    sincronizarEstudiantesTareas();
    
    // Sincronizar trabajo cotidiano
    sincronizarEstudiantesTrabajoCotidiano();
    
    // Sincronizar proyectos
    sincronizarEstudiantesProyecto();
    
    // Sincronizar portafolios
    sincronizarEstudiantesPortafolio();
    
    // Renderizar todas las secciones para actualizar las listas
    setTimeout(() => {
        renderEvaluacion();
        renderTareas();
        renderTrabajoCotidiano();
        renderProyecto();
        renderPortafolio();
        renderIndicadores();
        renderSeaPeriodo();
    }, 100);
}

// ===== FUNCIONES PARA INDICADORES =====
function cargarIndicadoresGuardados() {
    const indicadoresGuardados = localStorage.getItem(STORAGE_KEY_INDICADORES);
    if (indicadoresGuardados) {
        try {
            indicadores = JSON.parse(indicadoresGuardados);
        } catch (e) {
            console.error('Error al cargar indicadores:', e);
            // Mantener indicadores por defecto si hay error
        }
    }
}

function guardarIndicadores() {
    try {
        localStorage.setItem(STORAGE_KEY_INDICADORES, JSON.stringify(indicadores));
    } catch (e) {
        console.error('Error al guardar indicadores:', e);
        mostrarAlerta('Error al guardar los indicadores', 'error');
    }
}

function renderIndicadores() {
    const container = document.getElementById('indicadores-app');
    if (!container) return;

    let html = '<table class="indicadores-table">';
    html += '<thead><tr>';
    html += '<th style="width: 80px;">Número</th>';
    html += '<th>Indicador</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    indicadores.forEach((indicador, index) => {
        html += '<tr>';
        html += `<td class="numero-indicador">${indicador.id}</td>`;
        html += `<td><input type="text" value="${indicador.nombre}" onchange="actualizarIndicador(${index}, this.value)" placeholder="Ingrese el indicador"></td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function actualizarIndicador(index, valor) {
    if (index >= 0 && index < indicadores.length) {
        indicadores[index].nombre = valor;
        guardarIndicadores();
        mostrarAlerta('Indicador actualizado correctamente', 'exito');
    }
}

function agregarIndicador() {
    const nuevoId = indicadores.length > 0 ? Math.max(...indicadores.map(i => i.id)) + 1 : 1;
    indicadores.push({
        id: nuevoId,
        nombre: `Indicador ${nuevoId}`
    });
    
    // Ordenar indicadores por número
    ordenarIndicadores();
    
    guardarIndicadores();
    renderIndicadores();
    
    // LIMPIEZA RADICAL AL AGREGAR INDICADOR
    console.log('=== LIMPIEZA RADICAL AL AGREGAR INDICADOR ===');
    
    // LIMPIEZA RADICAL DEL LOCALSTORAGE
    localStorage.removeItem('trabajoCotidianoEstudiantes');
    localStorage.removeItem('diasTrabajo');
    
    // Reinicializar arrays
    trabajoCotidianoEstudiantes = [];
    diasTrabajo = [];
    
    // Regenerar estructura básica desde cero
    if (estudiantes.length > 0) {
        trabajoCotidianoEstudiantes = estudiantes.map(() => []);
        diasTrabajo = [];
        
        // Agregar un día por defecto
        diasTrabajo.push({
            fecha: new Date().toISOString().split('T')[0],
            lecciones: 1
        });
        
        // Inicializar datos para cada estudiante con indicadores VACÍOS
        trabajoCotidianoEstudiantes.forEach((estudiante, estIdx) => {
            estudiante[0] = {
                fecha: diasTrabajo[0].fecha,
                nota: 0,
                asistencia: false,
                indicadores: {} // VACÍO - sin datos previos
            };
            
            console.log(`REGENERADO AL AGREGAR: Estudiante ${estIdx} con indicadores VACÍOS`);
        });
        
        guardarTrabajoCotidiano();
        renderTrabajoCotidiano();
    }
    
    mostrarAlerta(`Indicador ${nuevoId} agregado. Todos los datos de indicadores han sido limpiados.`, 'exito');
}

function eliminarIndicador() {
    const inputEliminar = document.getElementById('inputEliminarIndicador');
    const numeroEliminar = parseInt(inputEliminar.value);
    
    // Validar que se haya ingresado un número
    if (!numeroEliminar || isNaN(numeroEliminar)) {
        mostrarAlerta('Por favor ingrese un número válido de indicador', 'error');
        return;
    }
    
    // Buscar el indicador por número
    const indexEliminar = indicadores.findIndex(ind => ind.id === numeroEliminar);
    
    if (indexEliminar === -1) {
        mostrarAlerta(`No se encontró un indicador con el número ${numeroEliminar}`, 'error');
        return;
    }
    
    if (indicadores.length <= 1) {
        mostrarAlerta('Debe mantener al menos un indicador', 'error');
        return;
    }
    
    // Obtener información del indicador a eliminar
    const indicadorAEliminar = indicadores[indexEliminar];
    
    // Mostrar confirmación
    const confirmacion = confirm(`¿Está seguro que desea eliminar el indicador ${indicadorAEliminar.id}?\n\n"${indicadorAEliminar.nombre}"\n\n⚠️ ADVERTENCIA: Esta acción no se puede deshacer.`);
    
    if (!confirmacion) {
        return; // Usuario canceló la eliminación
    }
    
    // Eliminar el indicador específico
    const indicadorEliminado = indicadores.splice(indexEliminar, 1)[0];
    
    // Usar la función existente para eliminar el día de trabajo cotidiano
    // Esto asegura que se elimine correctamente sin problemas de índices
    if (diasTrabajo && Array.isArray(diasTrabajo) && diasTrabajo.length > indexEliminar) {
        // Preservar datos de inputs antes de re-renderizar
        preservarDatosInputs();
        
        // Eliminar el día de la lista
        diasTrabajo.splice(indexEliminar, 1);
        
        // Sincronizar estudiantes después de eliminar el día
        sincronizarEstudiantesTrabajoCotidiano();
        
        guardarTrabajoCotidiano();
    }
    
    // Ordenar indicadores por número después de eliminar
    ordenarIndicadores();
    
    guardarIndicadores();
    renderIndicadores();
    
    // CRÍTICO: Renderizar trabajo cotidiano para actualizar la interfaz
    renderTrabajoCotidiano();
    
    // Limpiar el input
    inputEliminar.value = '';
    
    mostrarAlerta(`Indicador ${indicadorEliminado.id} eliminado y datos relacionados limpiados correctamente`, 'exito');
}

function exportarIndicadores() {
    try {
        const workbook = XLSX.utils.book_new();
        
        // Crear datos para exportar
        const datos = indicadores.map(indicador => ({
            'Número': indicador.id,
            'Indicador': indicador.nombre
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(datos);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Indicadores');
        
        // Generar archivo
        const nombreArchivo = `Indicadores_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, nombreArchivo);
        
        mostrarAlerta('Indicadores exportados correctamente', 'exito');
    } catch (error) {
        console.error('Error al exportar indicadores:', error);
        mostrarAlerta('Error al exportar los indicadores', 'error');
    }
}

function importarIndicadores() {
    document.getElementById('inputIndicadores').click();
}

function cargarIndicadores(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Procesar datos importados
            const nuevosIndicadores = jsonData.map((row, index) => ({
                id: row['Número'] || index + 1,
                nombre: row['Indicador'] || `Indicador ${index + 1}`
            }));

            if (nuevosIndicadores.length > 0) {
                indicadores = nuevosIndicadores;
                
                // Ordenar indicadores por número
                ordenarIndicadores();
                
                guardarIndicadores();
                renderIndicadores();
                mostrarAlerta('Indicadores importados y ordenados correctamente', 'exito');
            } else {
                mostrarAlerta('No se encontraron datos válidos en el archivo', 'error');
            }
        } catch (error) {
            console.error('Error al importar indicadores:', error);
            mostrarAlerta('Error al importar los indicadores', 'error');
        }
    };
    reader.readAsArrayBuffer(file);
    
    // Limpiar input
    event.target.value = '';
}

// Función para obtener el nombre de un indicador por ID
function obtenerNombreIndicador(id) {
    const indicador = indicadores.find(i => i.id === id);
    return indicador ? indicador.nombre : `Indicador ${id}`;
}

// Función para obtener todos los indicadores
function obtenerIndicadores() {
    return indicadores;
}

// Función para ordenar indicadores por número
function ordenarIndicadores() {
    // Ordenar por ID/número - NO reasignar IDs para mantener la integridad de los datos
    indicadores.sort((a, b) => a.id - b.id);
    
    // NO renumerar secuencialmente para evitar desalineación de datos
    // Los IDs deben mantenerse estables para preservar los datos de trabajo cotidiano
    console.log('Indicadores ordenados por ID:', indicadores.map(i => i.id));
}

// Función para descargar plantilla de indicadores
function descargarPlantillaIndicadores() {
    try {
        const workbook = XLSX.utils.book_new();
        
        // Crear plantilla con 16 indicadores por defecto
        const plantillaIndicadores = [];
        for (let i = 1; i <= 16; i++) {
            plantillaIndicadores.push({
                'Número': i,
                'Indicador': `Indicador ${i}`
            });
        }
        
        const worksheet = XLSX.utils.json_to_sheet(plantillaIndicadores);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla Indicadores');
        
        // Generar archivo
        const nombreArchivo = `Plantilla_Indicadores_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, nombreArchivo);
        
        mostrarAlerta('Plantilla de indicadores descargada correctamente', 'exito');
    } catch (error) {
        console.error('Error al descargar plantilla de indicadores:', error);
        mostrarAlerta('Error al descargar la plantilla de indicadores', 'error');
    }
}

// ===== FUNCIONES PARA SEA I PERIÓDO =====

// Funciones para verificar si hay datos activos en cada sección
function hayDatosActivosTrabajoCotidiano() {
    // Verificar si la sección está activa y tiene datos
    const resultado = diasTrabajo && Array.isArray(diasTrabajo) && diasTrabajo.length > 0 &&
           trabajoCotidianoEstudiantes && Array.isArray(trabajoCotidianoEstudiantes) && trabajoCotidianoEstudiantes.length > 0;
    console.log('DEBUG hayDatosActivosTrabajoCotidiano:', {
        diasTrabajo: diasTrabajo,
        esArray: Array.isArray(diasTrabajo),
        length: diasTrabajo ? diasTrabajo.length : 'N/A',
        trabajoCotidianoEstudiantes: trabajoCotidianoEstudiantes,
        esArray2: Array.isArray(trabajoCotidianoEstudiantes),
        length2: trabajoCotidianoEstudiantes ? trabajoCotidianoEstudiantes.length : 'N/A',
        resultado: resultado
    });
    return resultado;
}

function hayDatosActivosTareas() {
    // Verificar si la sección está activa y tiene datos
    const resultado = tareas && Array.isArray(tareas) && tareas.length > 0 &&
           tareasEstudiantes && Array.isArray(tareasEstudiantes) && tareasEstudiantes.length > 0;
    console.log('DEBUG hayDatosActivosTareas:', {
        tareas: tareas,
        esArray: Array.isArray(tareas),
        length: tareas ? tareas.length : 'N/A',
        tareasEstudiantes: tareasEstudiantes,
        esArray2: Array.isArray(tareasEstudiantes),
        length2: tareasEstudiantes ? tareasEstudiantes.length : 'N/A',
        resultado: resultado
    });
    return resultado;
}

function hayDatosActivosPruebas() {
    // Verificar si la sección está activa y tiene datos
    const resultado = pruebas && Array.isArray(pruebas) && pruebas.length > 0 &&
           evaluacionesEstudiantes && Array.isArray(evaluacionesEstudiantes) && evaluacionesEstudiantes.length > 0;
    console.log('DEBUG hayDatosActivosPruebas:', {
        pruebas: pruebas,
        esArray: Array.isArray(pruebas),
        length: pruebas ? pruebas.length : 'N/A',
        evaluacionesEstudiantes: evaluacionesEstudiantes,
        esArray2: Array.isArray(evaluacionesEstudiantes),
        length2: evaluacionesEstudiantes ? evaluacionesEstudiantes.length : 'N/A',
        resultado: resultado
    });
    return resultado;
}

function hayDatosActivosAsistencia() {
    // Verificar si hay estudiantes y días con datos
    return estudiantes && Array.isArray(estudiantes) && estudiantes.length > 0 && 
           dias && Array.isArray(dias) && dias.length > 0;
}

function hayDatosActivosProyecto() {
    // Verificar si la sección está activa y tiene datos
    return proyectos && Array.isArray(proyectos) && proyectos.length > 0 &&
           proyectosEstudiantes && Array.isArray(proyectosEstudiantes) && proyectosEstudiantes.length > 0;
}

function hayDatosActivosPortafolio() {
    // Verificar si la sección está activa y tiene datos
    return portafolios && Array.isArray(portafolios) && portafolios.length > 0 &&
           portafoliosEstudiantes && Array.isArray(portafoliosEstudiantes) && portafoliosEstudiantes.length > 0;
}

function renderSeaPeriodo() {
    console.log('=== INICIANDO RENDERIZACIÓN SEA I PERIÓDO ===');
    
    // Buscar el contenedor correcto
    const container = document.getElementById('sea-periodo-content');
    console.log('Contenedor encontrado:', !!container);
    
    if (!container) {
        console.log('ERROR: No se encontró el contenedor sea-periodo-content');
        alert('ERROR: No se encontró el contenedor sea-periodo-content');
        return;
    }

    console.log('=== RENDERIZANDO SEA I PERIÓDO ===');
    console.log('Estudiantes encontrados:', estudiantes.length);

    // Verificar si hay estudiantes
    if (estudiantes.length === 0) {
        container.innerHTML = '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center;"><p style="color: #92400e; font-weight: bold;">📚 No hay estudiantes registrados para mostrar el resumen.</p></div>';
        console.log('No hay estudiantes para mostrar');
        return;
    }

    // Determinar qué secciones están activas
    const seccionesActivas = {
        trabajoCotidiano: hayDatosActivosTrabajoCotidiano(),
        tareas: hayDatosActivosTareas(),
        pruebas: hayDatosActivosPruebas(),
        asistencia: hayDatosActivosAsistencia(),
        proyecto: hayDatosActivosProyecto(),
        portafolio: hayDatosActivosPortafolio()
    };

    console.log('Secciones activas:', seccionesActivas);

    // Crear tabla simple y directa
    let html = '<div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;"><h4 style="color: #1e40af; margin: 0;">📊 RESUMEN SEA I PERIÓDO</h4></div>';
    
    html += '<table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">';
    html += '<thead><tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">';
    html += '<th style="padding: 12px; text-align: center; font-weight: bold;">👤 ESTUDIANTE</th>';
    
    // Solo mostrar columnas de secciones activas
    if (seccionesActivas.trabajoCotidiano) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">📚 TRABAJO COTIDIANO</th>';
    }
    if (seccionesActivas.tareas) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">📝 TAREAS</th>';
    }
    if (seccionesActivas.pruebas) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">🧪 PRUEBAS</th>';
    }
    if (seccionesActivas.asistencia) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">📅 ASISTENCIA</th>';
    }
    if (seccionesActivas.proyecto) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">📋 PROYECTO</th>';
    }
    if (seccionesActivas.portafolio) {
        html += '<th style="padding: 12px; text-align: center; font-weight: bold;">📁 PORTAFOLIO</th>';
    }
    html += '<th style="padding: 12px; text-align: center; font-weight: bold;">🏆 NOTA FINAL</th>';
    html += '</tr></thead><tbody>';

    // Generar filas de estudiantes con datos reales
    estudiantes.forEach((estudiante, index) => {
        const nombreCompleto = `${estudiante.apellido1 || ''} ${estudiante.apellido2 || ''} ${estudiante.nombre || ''}`.trim();
        
        // Calcular porcentajes reales
        const trabajoCotidiano = Number(obtenerPorcentajeTrabajoCotidianoDirecto(estudiante)) || 0;
        const tareas = Number(obtenerPorcentajeTareasDirecto(estudiante)) || 0;
        const pruebas = Number(obtenerPorcentajePruebasDirecto(estudiante)) || 0;
        const asistencia = Number(calcularNotaAsistencia(estudiante)) || 0;
        const proyecto = Number(obtenerPorcentajeProyectoDirecto(estudiante)) || 0;
        const portafolio = Number(obtenerPorcentajePortafolioDirecto(estudiante)) || 0;
        const notaFinal = Number(calcularNotaFinal(estudiante)) || 0;
        
        console.log(`Estudiante ${index + 1}:`, {
            trabajoCotidiano,
            tareas,
            pruebas,
            asistencia,
            proyecto,
            portafolio,
            notaFinal
        });
        
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        
        // Nombre del estudiante
        html += `<td style="padding: 10px; text-align: left; font-weight: bold; background: #f8fafc;">${nombreCompleto || `Estudiante ${index + 1}`}</td>`;
        
        // Solo mostrar columnas de secciones activas
        if (seccionesActivas.trabajoCotidiano) {
            const trabajoCotidianoFormateado = Number(trabajoCotidiano).toFixed(1).replace('.', ',');
            html += `<td style="padding: 10px; text-align: center; background-color: #fef3c7; color: #92400e;">${trabajoCotidianoFormateado}%</td>`;
        }
        
        if (seccionesActivas.tareas) {
            const tareasFormateado = Number(tareas).toFixed(1).replace('.', ',');
            html += `<td style="padding: 10px; text-align: center; background-color: #dbeafe; color: #1e40af;">${tareasFormateado}%</td>`;
        }
        
        if (seccionesActivas.pruebas) {
            const pruebasFormateado = Number(pruebas).toFixed(1).replace('.', ',');
            html += `<td style="padding: 10px; text-align: center; background-color: #d1fae5; color: #065f46;">${pruebasFormateado}%</td>`;
        }
        
        if (seccionesActivas.asistencia) {
            // Asistencia sin decimales - usar Math.round()
            const asistenciaFormateado = Math.round(asistencia).toString();
            html += `<td style="padding: 10px; text-align: center; background-color: #fef3c7; color: #92400e;">${asistenciaFormateado}%</td>`;
        }
        
        if (seccionesActivas.proyecto) {
            const proyectoFormateado = Number(proyecto).toFixed(1).replace('.', ',');
            html += `<td style="padding: 10px; text-align: center; background-color: #dbeafe; color: #1e40af;">${proyectoFormateado}%</td>`;
        }
        
        if (seccionesActivas.portafolio) {
            const portafolioFormateado = Number(portafolio).toFixed(1).replace('.', ',');
            html += `<td style="padding: 10px; text-align: center; background-color: #d1fae5; color: #065f46;">${portafolioFormateado}%</td>`;
        }
        
        // Nota Final
        const notaFinalFormateado = Number(notaFinal).toFixed(1).replace('.', ',');
        const estadoNota = notaFinal >= 70 ? 'APROBADO' : 'REPROBADO';
        const colorNota = notaFinal >= 70 ? '#bbf7d0' : '#fecaca';
        const colorTexto = notaFinal >= 70 ? '#166534' : '#dc2626';
        
        html += `<td style="padding: 10px; text-align: center; background-color: ${colorNota}; color: ${colorTexto}; font-weight: bold;">
            <strong>${notaFinalFormateado}%</strong><br>
            <span style="font-size: 0.8em; opacity: 0.8;">${estadoNota}</span>
        </td>`;
        
        html += '</tr>';
    });

    html += '</tbody></table>';
    
    // Insertar en el contenedor
    container.innerHTML = html;
    console.log('=== FIN RENDERIZACIÓN SEA I PERIÓDO ===');
    console.log('✅ Tabla generada correctamente');
    console.log('📍 Contenedor donde se insertó:', container);
    console.log('📏 Tamaño del HTML generado:', html.length, 'caracteres');
    
    // Verificar que la tabla se insertó correctamente
    const tablaGenerada = container.querySelector('table');
    if (tablaGenerada) {
        console.log('✅ Tabla encontrada en el DOM');
        console.log('📊 Filas en la tabla:', tablaGenerada.querySelectorAll('tbody tr').length);
        // NO mostrar alerta automáticamente - solo cuando se presione el botón
    } else {
        console.log('❌ No se encontró la tabla en el DOM');
        // NO mostrar alerta automáticamente - solo cuando se presione el botón
    }
}

// Funciones auxiliares para el SEA
function obtenerIconoColumna(columna) {
    const iconos = {
        'ESTUDIANTE': '👤',
        'TRABAJO COTIDIANO': '📚',
        'TAREAS': '📝',
        'PRUEBAS': '🧪',
        'ASISTENCIA': '📅',
        'PROYECTO': '📋',
        'PORTAFOLIO': '📁',
        'NOTA FINAL': '🏆'
    };
    return iconos[columna] || '📊';
}

function obtenerEstiloNota(nota) {
    if (nota >= 90) return 'background-color: #dcfce7; color: #166534;';
    if (nota >= 80) return 'background-color: #dbeafe; color: #1e40af;';
    if (nota >= 70) return 'background-color: #fef3c7; color: #92400e;';
    if (nota >= 60) return 'background-color: #fed7aa; color: #ea580c;';
    return 'background-color: #fecaca; color: #dc2626;';
}

function obtenerEstiloNotaFinal(nota) {
    if (nota >= 90) return 'background-color: #bbf7d0; color: #166534; font-weight: bold;';
    if (nota >= 80) return 'background-color: #bfdbfe; color: #1e40af; font-weight: bold;';
    if (nota >= 70) return 'background-color: #fde68a; color: #92400e; font-weight: bold;';
    if (nota >= 60) return 'background-color: #fdba74; color: #ea580c; font-weight: bold;';
    return 'background-color: #fca5a5; color: #dc2626; font-weight: bold;';
}

function obtenerEstadoNota(nota) {
    return nota >= 70 ? 'APROBADO' : 'REPROBADO';
}



// Funciones de cálculo para cada rubro
function calcularNotaTrabajoCotidiano(estudiante) {
    console.log('=== CALCULANDO NOTA TRABAJO COTIDIANO ===');
    console.log('Estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // Verificar si las variables están definidas
    if (typeof trabajoCotidianoEstudiantes === 'undefined' || 
        typeof diasTrabajo === 'undefined') {
        console.log('Variables no definidas - trabajoCotidianoEstudiantes:', trabajoCotidianoEstudiantes);
        console.log('Variables no definidas - diasTrabajo:', diasTrabajo);
        return 0.0;
    }
    
    console.log('trabajoCotidianoEstudiantes:', trabajoCotidianoEstudiantes);
    console.log('diasTrabajo:', diasTrabajo);
    
    // Buscar el estudiante por índice (mismo orden que estudiantes)
    const estIndex = estudiantes.findIndex(e => 
        e.apellido1 === estudiante.apellido1 && 
        e.apellido2 === estudiante.apellido2 && 
        e.nombre === estudiante.nombre
    );
    
    console.log('Índice encontrado:', estIndex);
    
    if (estIndex === -1 || !diasTrabajo || diasTrabajo.length === 0) {
        console.log('No se encontró estudiante o no hay días');
        return 0.0;
    }
    
    // Verificar si existe el estudiante en trabajo cotidiano
    if (!trabajoCotidianoEstudiantes[estIndex]) {
        console.log('Estudiante no encontrado en trabajo cotidiano');
        return 0.0;
    }
    
    // Calcular nota promedio
    let totalNotas = 0;
    let contadorNotas = 0;
    
    trabajoCotidianoEstudiantes[estIndex].forEach((notaDia, diaIdx) => {
        if (notaDia && notaDia.nota !== undefined && !isNaN(parseFloat(notaDia.nota))) {
            totalNotas += parseFloat(notaDia.nota) || 0;
            contadorNotas++;
        }
    });
    
    if (contadorNotas === 0) return 0.0;
    
    // Calcular promedio (ya está en escala de 10)
    const promedio = totalNotas / contadorNotas;
    return promedio;
}

function calcularNotaTareas(estudiante) {
    console.log('=== CALCULANDO NOTA TAREAS ===');
    console.log('Estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // Verificar si las variables están definidas
    if (typeof tareasEstudiantes === 'undefined' || 
        typeof tareas === 'undefined') {
        console.log('Variables no definidas - tareasEstudiantes:', tareasEstudiantes);
        console.log('Variables no definidas - tareas:', tareas);
        return 0.0;
    }
    
    console.log('tareasEstudiantes:', tareasEstudiantes);
    console.log('tareas:', tareas);
    
    // Buscar el estudiante por índice (mismo orden que estudiantes)
    const estIndex = estudiantes.findIndex(e => 
        e.apellido1 === estudiante.apellido1 && 
        e.apellido2 === estudiante.apellido2 && 
        e.nombre === estudiante.nombre
    );
    
    console.log('Índice encontrado en tareas:', estIndex);
    
    if (estIndex === -1 || !tareas || tareas.length === 0) {
        console.log('No se encontró estudiante en tareas o no hay tareas');
        return 0.0;
    }
    
    // Verificar si existe el estudiante en tareas
    if (!tareasEstudiantes[estIndex]) {
        console.log('Estudiante no encontrado en tareas');
        return 0.0;
    }
    
    // Calcular nota promedio
    let totalPuntos = 0;
    let totalMaximo = 0;
    
    tareasEstudiantes[estIndex].forEach((tareaEst, tareaIdx) => {
        if (tareaEst && tareaEst.puntos !== undefined) {
            totalPuntos += parseFloat(tareaEst.puntos) || 0;
            totalMaximo += parseFloat(tareas[tareaIdx].puntosMaximos) || 0;
        }
    });
    
    if (totalMaximo === 0) return 0.0;
    
    // Calcular nota en escala de 10
    const nota = (totalPuntos / totalMaximo) * 10;
    return nota;
}

function calcularNotaPruebas(estudiante) {
    console.log('=== CALCULANDO NOTA PRUEBAS ===');
    console.log('Estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // Verificar si las variables están definidas
    if (typeof evaluacionesEstudiantes === 'undefined' || 
        typeof pruebas === 'undefined') {
        console.log('Variables no definidas - evaluacionesEstudiantes:', evaluacionesEstudiantes);
        console.log('Variables no definidas - pruebas:', pruebas);
        return 0.0;
    }
    
    console.log('evaluacionesEstudiantes:', evaluacionesEstudiantes);
    console.log('pruebas:', pruebas);
    
    // Buscar el estudiante por índice (mismo orden que estudiantes)
    const estIndex = estudiantes.findIndex(e => 
        e.apellido1 === estudiante.apellido1 && 
        e.apellido2 === estudiante.apellido2 && 
        e.nombre === estudiante.nombre
    );
    
    console.log('Índice encontrado en pruebas:', estIndex);
    
    if (estIndex === -1 || !pruebas || pruebas.length === 0) {
        console.log('No se encontró estudiante en pruebas o no hay pruebas');
        return 0.0;
    }
    
    // Verificar si existe el estudiante en pruebas
    if (!evaluacionesEstudiantes[estIndex]) {
        console.log('Estudiante no encontrado en pruebas');
        return 0.0;
    }
    
    // Calcular nota promedio
    let totalPuntos = 0;
    let totalMaximo = 0;
    
    evaluacionesEstudiantes[estIndex].forEach((pruebaEst, pruebaIdx) => {
        if (pruebaEst && pruebaEst.puntos !== undefined) {
            totalPuntos += parseFloat(pruebaEst.puntos) || 0;
            totalMaximo += parseFloat(pruebas[pruebaIdx].puntosMaximos) || 0;
        }
    });
    
    if (totalMaximo === 0) return 0.0;
    
    // Calcular nota en escala de 10
    const nota = (totalPuntos / totalMaximo) * 10;
    return nota;
}

function calcularNotaAsistencia(estudiante) {
    // Implementar cálculo basado en asistencia
    const totales = calcularTotalesEstudiante(estudiante);
    const notaAsistencia = calcularPorcentajeAsistencia(totales);
    
    // La función calcularPorcentajeAsistencia ya retorna una nota de 0-10
    // basada en el porcentaje de ausencia según las reglas del sistema
    return notaAsistencia;
}

function calcularNotaProyecto(estudiante) {
    // Verificar si las variables están definidas
    if (typeof proyectosEstudiantes === 'undefined' || 
        typeof proyectos === 'undefined') {
        return 0.0;
    }
    
    // Buscar el estudiante por índice (mismo orden que estudiantes)
    const estIndex = estudiantes.findIndex(e => 
        e.apellido1 === estudiante.apellido1 && 
        e.apellido2 === estudiante.apellido2 && 
        e.nombre === estudiante.nombre
    );
    
    if (estIndex === -1 || !proyectos || proyectos.length === 0) {
        return 0.0;
    }
    
    // Verificar si existe el estudiante en proyectos
    if (!proyectosEstudiantes[estIndex]) {
        console.log('Estudiante no encontrado en proyectos');
        return 0.0;
    }
    
    // Calcular nota promedio
    let totalPuntos = 0;
    let totalMaximo = 0;
    
    proyectosEstudiantes[estIndex].forEach((proyectoEst, proyectoIdx) => {
        if (proyectoEst && proyectoEst.puntos !== undefined) {
            totalPuntos += parseFloat(proyectoEst.puntos) || 0;
            totalMaximo += parseFloat(proyectos[proyectoIdx].puntosMaximos) || 0;
        }
    });
    
    if (totalMaximo === 0) return 0.0;
    
    // Calcular nota en escala de 10
    const nota = (totalPuntos / totalMaximo) * 10;
    return nota;
}

function calcularNotaPortafolio(estudiante) {
    // Verificar si las variables están definidas
    if (typeof portafoliosEstudiantes === 'undefined' || 
        typeof portafolios === 'undefined') {
        return 0.0;
    }
    
    // Buscar el estudiante por índice (mismo orden que estudiantes)
    const estIndex = estudiantes.findIndex(e => 
        e.apellido1 === estudiante.apellido1 && 
        e.apellido2 === estudiante.apellido2 && 
        e.nombre === estudiante.nombre
    );
    
    if (estIndex === -1 || !portafolios || portafolios.length === 0) {
        return 0.0;
    }
    
    // Verificar si existe el estudiante en portafolios
    if (!portafoliosEstudiantes[estIndex]) {
        console.log('Estudiante no encontrado en portafolios');
        return 0.0;
    }
    
    // Calcular nota promedio
    let totalPuntos = 0;
    let totalMaximo = 0;
    
    portafoliosEstudiantes[estIndex].forEach((portafolioEst, portafolioIdx) => {
        if (portafolioEst && portafolioEst.puntos !== undefined) {
            totalPuntos += parseFloat(portafolioEst.puntos) || 0;
            totalMaximo += parseFloat(portafolios[portafolioIdx].puntosMaximos) || 0;
        }
    });
    
    if (totalMaximo === 0) return 0.0;
    
    // Calcular nota en escala de 10
    const nota = (totalPuntos / totalMaximo) * 10;
    return nota;
}

function calcularNotaFinal(estudiante) {
    let sumaTotal = 0;
    let contador = 0;
    
    console.log('=== CALCULANDO NOTA FINAL PARA:', estudiante.nombre || 'Estudiante', '===');
    
    // Usar porcentajes directos de cada sección (sin recalcular)
    if (hayDatosActivosTrabajoCotidiano()) {
        const trabajoCotidiano = obtenerPorcentajeTrabajoCotidianoDirecto(estudiante);
        console.log('✓ Trabajo Cotidiano (directo):', trabajoCotidiano);
        sumaTotal += trabajoCotidiano;
        contador++;
    } else {
        console.log('❌ Trabajo Cotidiano: No activo');
    }
    
    if (hayDatosActivosTareas()) {
        const tareas = obtenerPorcentajeTareasDirecto(estudiante);
        console.log('✓ Tareas (directo):', tareas);
        sumaTotal += tareas;
        contador++;
    } else {
        console.log('❌ Tareas: No activo');
    }
    
    if (hayDatosActivosPruebas()) {
        const pruebas = obtenerPorcentajePruebasDirecto(estudiante);
        console.log('✓ Pruebas (directo):', pruebas);
        sumaTotal += pruebas;
        contador++;
    } else {
        console.log('❌ Pruebas: No activo');
    }
    
    // Asistencia NO se incluye en la nota final (solo los 5 rubros principales)
    if (hayDatosActivosAsistencia()) {
        const asistencia = calcularNotaAsistencia(estudiante);
        console.log('✓ Asistencia (no incluida en nota final):', asistencia);
    } else {
        console.log('❌ Asistencia: No activo');
    }
    
    if (hayDatosActivosProyecto()) {
        const proyecto = obtenerPorcentajeProyectoDirecto(estudiante);
        console.log('✓ Proyecto (directo):', proyecto);
        sumaTotal += proyecto;
        contador++;
    } else {
        console.log('❌ Proyecto: No activo');
    }
    
    if (hayDatosActivosPortafolio()) {
        const portafolio = obtenerPorcentajePortafolioDirecto(estudiante);
        console.log('✓ Portafolio (directo):', portafolio);
        sumaTotal += portafolio;
        contador++;
    } else {
        console.log('❌ Portafolio: No activo');
    }
    
    // La nota final es la SUMA DIRECTA de los 5 rubros principales (sin asistencia)
    const notaFinal = sumaTotal;
    console.log('📊 Suma total de 5 rubros:', sumaTotal, '| Contador:', contador, '| Nota final:', notaFinal);
    console.log('=== FIN CÁLCULO NOTA FINAL ===');
    
    return notaFinal;
}

function actualizarResumenSeaPeriodo(mostrarNotificacion = false) {
    renderSeaPeriodo();
    
    // Verificar si la tabla se generó correctamente
    const container = document.getElementById('sea-periodo-content');
    const tablaGenerada = container ? container.querySelector('table') : null;
    
    if (mostrarNotificacion) {
        if (tablaGenerada) {
            mostrarAlerta('📊 Resumen del SEA actualizado correctamente', 'exito');
        } else {
            mostrarAlerta('❌ Error: No se pudo generar el resumen del SEA', 'error');
        }
    }
}

function exportarSeaPeriodo() {
    try {
        const workbook = XLSX.utils.book_new();
        
        // Crear datos para exportar
        const datos = [];
        
        estudiantes.forEach((estudiante, index) => {
            const nombreCompleto = `${estudiante.apellido1 || ''} ${estudiante.apellido2 || ''} ${estudiante.nombre || ''}`.trim();
            const row = {
                'Estudiante': nombreCompleto || `Estudiante ${index + 1}`
            };
            
            // Agregar solo las columnas que tienen datos activos
            if (hayDatosActivosTrabajoCotidiano()) {
                row['Trabajo Cotidiano'] = calcularNotaTrabajoCotidiano(estudiante).toFixed(1).replace('.', ',');
            }
            
            if (hayDatosActivosTareas()) {
                row['Tareas'] = calcularNotaTareas(estudiante).toFixed(1).replace('.', ',');
            }
            
            if (hayDatosActivosPruebas()) {
                row['Pruebas'] = calcularNotaPruebas(estudiante).toFixed(1).replace('.', ',');
            }
            
            if (hayDatosActivosAsistencia()) {
                row['Asistencia'] = Math.round(calcularNotaAsistencia(estudiante)).toString();
            }
            
            if (hayDatosActivosProyecto()) {
                row['Proyecto'] = calcularNotaProyecto(estudiante).toFixed(1).replace('.', ',');
            }
            
            if (hayDatosActivosPortafolio()) {
                row['Portafolio'] = calcularNotaPortafolio(estudiante).toFixed(1).replace('.', ',');
            }
            
            row['Nota Final'] = calcularNotaFinal(estudiante).toFixed(1).replace('.', ',');
            
            datos.push(row);
        });
        
        const worksheet = XLSX.utils.json_to_sheet(datos);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SEA I PERIÓDO');
        
        // Generar archivo
        const nombreArchivo = `SEA_I_PERIODO_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, nombreArchivo);
        
        mostrarAlerta('Resumen SEA I PERIÓDO exportado correctamente', 'exito');
    } catch (error) {
        console.error('Error al exportar SEA I PERIÓDO:', error);
        mostrarAlerta('Error al exportar el resumen', 'error');
    }
}









// ===== FUNCIÓN PARA LIMPIAR Y REGENERAR DATOS =====
function limpiarYRegenerarDatos() {
    console.log('🧹 === LIMPIANDO Y REGENERANDO DATOS ===');
    
    // Limpiar datos existentes
    console.log('🧹 Limpiando datos existentes...');
    
    // Limpiar trabajo cotidiano
    if (trabajoCotidianoEstudiantes) {
        trabajoCotidianoEstudiantes = trabajoCotidianoEstudiantes.map(estudiante => {
            return estudiante.map(dia => ({
                nota: 0,
                asistencia: 0
            }));
        });
    }
    
    // Limpiar tareas
    if (tareasEstudiantes) {
        tareasEstudiantes = tareasEstudiantes.map(estudiante => {
            return estudiante.map(tarea => ({
                puntos: 0
            }));
        });
    }
    
    // Limpiar pruebas
    if (evaluacionesEstudiantes) {
        evaluacionesEstudiantes = evaluacionesEstudiantes.map(estudiante => {
            return estudiante.map(prueba => ({
                puntos: 0
            }));
        });
    }
    
    // Limpiar proyectos
    if (proyectosEstudiantes) {
        proyectosEstudiantes = proyectosEstudiantes.map(estudiante => {
            return estudiante.map(proyecto => ({
                puntos: 0
            }));
        });
    }
    
    // Limpiar portafolios
    if (portafoliosEstudiantes) {
        portafoliosEstudiantes = portafoliosEstudiantes.map(estudiante => {
            return estudiante.map(portafolio => ({
                puntos: 0
            }));
        });
    }
    
    console.log('✅ Datos limpiados');
    
    // Ahora generar nuevos datos
    console.log('📝 Generando nuevos datos...');
    
    // Generar datos de trabajo cotidiano con notas más altas
    if (diasTrabajo && diasTrabajo.length > 0) {
        trabajoCotidianoEstudiantes = estudiantes.map((estudiante, estIdx) => {
            return diasTrabajo.map((dia, diaIdx) => {
                // Generar notas realistas entre 7 y 10 (más altas)
                const nota = Math.floor(Math.random() * 4) + 7; // 7-10
                return {
                    nota: nota,
                    asistencia: Math.random() > 0.1 ? 1 : 0
                };
            });
        });
    }
    
    // Generar datos de tareas con puntos más altos
    if (tareas && tareas.length > 0) {
        tareasEstudiantes = estudiantes.map((estudiante, estIdx) => {
            return tareas.map((tarea, tareaIdx) => {
                // Generar puntos realistas (80-100% del máximo)
                const porcentaje = 0.8 + (Math.random() * 0.2); // 80-100%
                const puntos = Math.round(tarea.puntosMaximos * porcentaje);
                return { puntos: puntos };
            });
        });
    }
    
    // Generar datos de pruebas con puntos más altos
    if (pruebas && pruebas.length > 0) {
        evaluacionesEstudiantes = estudiantes.map((estudiante, estIdx) => {
            return pruebas.map((prueba, pruebaIdx) => {
                // Generar puntos realistas (75-100% del máximo)
                const porcentaje = 0.75 + (Math.random() * 0.25); // 75-100%
                const puntos = Math.round(prueba.puntosMaximos * porcentaje);
                return { puntos: puntos };
            });
        });
    }
    
    // Generar datos de proyectos con puntos más altos
    if (proyectos && proyectos.length > 0) {
        proyectosEstudiantes = estudiantes.map((estudiante, estIdx) => {
            return proyectos.map((proyecto, proyectoIdx) => {
                // Generar puntos realistas (80-100% del máximo)
                const porcentaje = 0.8 + (Math.random() * 0.2); // 80-100%
                const puntos = Math.round(proyecto.puntosMaximos * porcentaje);
                return { puntos: puntos };
            });
        });
    }
    
    // Generar datos de portafolios con puntos más altos
    if (portafolios && portafolios.length > 0) {
        portafoliosEstudiantes = estudiantes.map((estudiante, estIdx) => {
            return portafolios.map((portafolio, portafolioIdx) => {
                // Generar puntos realistas (80-100% del máximo)
                const porcentaje = 0.8 + (Math.random() * 0.2); // 80-100%
                const puntos = Math.round(portafolio.puntosMaximos * porcentaje);
                return { puntos: puntos };
            });
        });
    }
    
    // Guardar todos los datos
    console.log('💾 Guardando datos...');
    guardarTrabajoCotidiano();
    guardarTareas();
    guardarEvaluacion();
    guardarProyecto();
    guardarPortafolio();
    
    // Actualizar la tabla
    renderSeaPeriodo();
    
    mostrarAlerta('Datos limpiados y regenerados correctamente', 'exito');
    console.log('🧹 === FIN LIMPIEZA Y REGENERACIÓN ===');
}

// ===== FUNCIÓN PARA RESTAURAR DATOS ORIGINALES =====
function restaurarDatosOriginales() {
    console.log('🔄 === RESTAURANDO DATOS ORIGINALES ===');
    
    // Intentar restaurar desde localStorage
    console.log('🔍 Intentando restaurar datos desde localStorage...');
    
    // Recargar todos los datos guardados
    cargarEvaluacion();
    cargarTareas();
    cargarTrabajoCotidiano();
    cargarProyecto();
    cargarPortafolio();
    
    console.log('📊 Datos restaurados:');
    console.log('- evaluacionesEstudiantes:', evaluacionesEstudiantes);
    console.log('- tareasEstudiantes:', tareasEstudiantes);
    console.log('- trabajoCotidianoEstudiantes:', trabajoCotidianoEstudiantes);
    console.log('- proyectosEstudiantes:', proyectosEstudiantes);
    console.log('- portafoliosEstudiantes:', portafoliosEstudiantes);
    
    // Actualizar la tabla
    renderSeaPeriodo();
    
    mostrarAlerta('Datos originales restaurados desde localStorage', 'exito');
    console.log('🔄 === FIN RESTAURACIÓN ===');
}

// ===== FUNCIÓN PARA INGRESAR DATOS MANUALMENTE =====
function ingresarDatosManualmente() {
    console.log('✏️ === INGRESO MANUAL DE DATOS ===');
    
    // Mostrar instrucciones
    const instrucciones = `
📝 **INSTRUCCIONES PARA INGRESAR DATOS MANUALMENTE:**

1. **TRABAJO COTIDIANO**: Ve a la sección "Trabajo Cotidiano" e ingresa las notas para cada día
2. **TAREAS**: Ve a la sección "Tareas" e ingresa los puntos obtenidos
3. **PRUEBAS**: Ve a la sección "Evaluación" e ingresa los puntos obtenidos
4. **PROYECTO**: Ve a la sección "Proyecto" e ingresa los puntos obtenidos
5. **PORTAFOLIO**: Ve a la sección "Portafolio" e ingresa los puntos obtenidos

💡 **CONSEJO**: Después de ingresar los datos, usa "🔄 Sincronizar Datos" para actualizar la tabla SEA Período.
    `;
    
    alert(instrucciones);
    
    // Navegar a la primera sección (Trabajo Cotidiano)
    scrollToSection('trabajo-cotidiano');
    
    console.log('✏️ === FIN INSTRUCCIONES ===');
}

// ===== FUNCIÓN PARA VERIFICAR DATOS EXISTENTES =====
function verificarDatosExistentes() {
    console.log('🔍 === VERIFICANDO DATOS EXISTENTES ===');
    
    let datosExistentes = false;
    let detalles = [];
    
    // Verificar trabajo cotidiano
    if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes.length > 0) {
        const tieneNotas = trabajoCotidianoEstudiantes.some(estudiante => 
            estudiante.some(dia => dia && dia.nota && dia.nota > 0)
        );
        if (tieneNotas) {
            datosExistentes = true;
            detalles.push('✓ Trabajo Cotidiano: Tiene notas');
        } else {
            detalles.push('❌ Trabajo Cotidiano: Sin notas');
        }
    } else {
        detalles.push('❌ Trabajo Cotidiano: No configurado');
    }
    
    // Verificar tareas
    if (tareasEstudiantes && tareasEstudiantes.length > 0) {
        const tienePuntos = tareasEstudiantes.some(estudiante => 
            estudiante.some(tarea => tarea && tarea.puntos && tarea.puntos > 0)
        );
        if (tienePuntos) {
            datosExistentes = true;
            detalles.push('✓ Tareas: Tiene puntos');
        } else {
            detalles.push('❌ Tareas: Sin puntos');
        }
    } else {
        detalles.push('❌ Tareas: No configurado');
    }
    
    // Verificar pruebas
    if (evaluacionesEstudiantes && evaluacionesEstudiantes.length > 0) {
        const tienePuntos = evaluacionesEstudiantes.some(estudiante => 
            estudiante.some(prueba => prueba && prueba.puntos && prueba.puntos > 0)
        );
        if (tienePuntos) {
            datosExistentes = true;
            detalles.push('✓ Pruebas: Tiene puntos');
        } else {
            detalles.push('❌ Pruebas: Sin puntos');
        }
    } else {
        detalles.push('❌ Pruebas: No configurado');
    }
    
    // Mostrar resultado
    const mensaje = datosExistentes 
        ? '✅ Se encontraron datos existentes en el sistema'
        : '❌ No se encontraron datos existentes';
    
    console.log(mensaje);
    detalles.forEach(detalle => console.log(detalle));
    
    mostrarAlerta(`${mensaje}\n\n${detalles.join('\n')}`, datosExistentes ? 'exito' : 'info');
    
    console.log('🔍 === FIN VERIFICACIÓN ===');
}

// ===== FUNCIÓN PARA DIAGNOSTICAR DATOS ESPECÍFICOS =====
function diagnosticarEstudianteEspecifico() {
    console.log('🔍 === DIAGNÓSTICO DETALLADO DE ESTUDIANTE ===');
    
    if (!estudiantes || estudiantes.length === 0) {
        console.log('❌ No hay estudiantes registrados');
        return;
    }
    
    // Mostrar el primer estudiante como ejemplo
    const estudiante = estudiantes[0];
    console.log('📋 Analizando estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // 1. Verificar datos de trabajo cotidiano
    console.log('\n📚 === TRABAJO COTIDIANO ===');
    if (diasTrabajo && diasTrabajo.length > 0) {
        console.log('✅ Días de trabajo disponibles:', diasTrabajo.length);
        console.log('📅 Días:', diasTrabajo);
        
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes[estIndex]) {
            console.log('✅ Datos del estudiante encontrados');
            console.log('📊 Notas del estudiante:', trabajoCotidianoEstudiantes[estIndex]);
            
            let totalNotas = 0;
            let contadorNotas = 0;
            
            trabajoCotidianoEstudiantes[estIndex].forEach((notaDia, diaIdx) => {
                if (notaDia && notaDia.nota !== null && notaDia.nota !== undefined) {
                    const nota = parseFloat(notaDia.nota) || 0;
                    totalNotas += nota;
                    contadorNotas++;
                    console.log(`  Día ${diaIdx}: ${nota} puntos`);
                } else {
                    console.log(`  Día ${diaIdx}: Sin datos`);
                }
            });
            
            if (contadorNotas > 0) {
                const promedio = totalNotas / contadorNotas;
                console.log(`📈 Total notas: ${totalNotas}, Contador: ${contadorNotas}, Promedio: ${promedio}`);
            } else {
                console.log('❌ No hay notas válidas');
            }
        } else {
            console.log('❌ No se encontraron datos del estudiante en trabajo cotidiano');
        }
    } else {
        console.log('❌ No hay días de trabajo configurados');
    }
    
    // 2. Verificar datos de tareas
    console.log('\n📝 === TAREAS ===');
    if (tareas && tareas.length > 0) {
        console.log('✅ Tareas configuradas:', tareas.length);
        console.log('📋 Configuración tareas:', tareas);
        
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (tareasEstudiantes && tareasEstudiantes[estIndex]) {
            console.log('✅ Datos del estudiante encontrados');
            console.log('📊 Puntos del estudiante:', tareasEstudiantes[estIndex]);
            
            let totalPuntos = 0;
            let totalMaximo = 0;
            
            tareasEstudiantes[estIndex].forEach((tareaEst, tareaIdx) => {
                if (tareaEst && tareaEst.puntos !== undefined) {
                    const puntos = parseFloat(tareaEst.puntos) || 0;
                    const maximo = parseFloat(tareas[tareaIdx].puntosMaximos) || 0;
                    totalPuntos += puntos;
                    totalMaximo += maximo;
                    console.log(`  Tarea ${tareaIdx}: ${puntos}/${maximo} puntos`);
                } else {
                    console.log(`  Tarea ${tareaIdx}: Sin datos`);
                }
            });
            
            if (totalMaximo > 0) {
                const porcentaje = (totalPuntos / totalMaximo) * 100;
                const nota = (totalPuntos / totalMaximo) * 10;
                console.log(`📈 Total puntos: ${totalPuntos}, Total máximo: ${totalMaximo}`);
                console.log(`📊 Porcentaje: ${porcentaje.toFixed(2)}%, Nota: ${nota.toFixed(2)}`);
            } else {
                console.log('❌ No hay puntos máximos configurados');
            }
        } else {
            console.log('❌ No se encontraron datos del estudiante en tareas');
        }
    } else {
        console.log('❌ No hay tareas configuradas');
    }
    
    // 3. Verificar datos de pruebas
    console.log('\n🧪 === PRUEBAS ===');
    if (pruebas && pruebas.length > 0) {
        console.log('✅ Pruebas configuradas:', pruebas.length);
        console.log('📋 Configuración pruebas:', pruebas);
        
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (evaluacionesEstudiantes && evaluacionesEstudiantes[estIndex]) {
            console.log('✅ Datos del estudiante encontrados');
            console.log('📊 Puntos del estudiante:', evaluacionesEstudiantes[estIndex]);
            
            let totalPuntos = 0;
            let totalMaximo = 0;
            
            evaluacionesEstudiantes[estIndex].forEach((pruebaEst, pruebaIdx) => {
                if (pruebaEst && pruebaEst.puntos !== undefined) {
                    const puntos = parseFloat(pruebaEst.puntos) || 0;
                    const maximo = parseFloat(pruebas[pruebaIdx].puntosMaximos) || 0;
                    totalPuntos += puntos;
                    totalMaximo += maximo;
                    console.log(`  Prueba ${pruebaIdx}: ${puntos}/${maximo} puntos`);
                } else {
                    console.log(`  Prueba ${pruebaIdx}: Sin datos`);
                }
            });
            
            if (totalMaximo > 0) {
                const porcentaje = (totalPuntos / totalMaximo) * 100;
                const nota = (totalPuntos / totalMaximo) * 10;
                console.log(`📈 Total puntos: ${totalPuntos}, Total máximo: ${totalMaximo}`);
                console.log(`📊 Porcentaje: ${porcentaje.toFixed(2)}%, Nota: ${nota.toFixed(2)}`);
            } else {
                console.log('❌ No hay puntos máximos configurados');
            }
        } else {
            console.log('❌ No se encontraron datos del estudiante en pruebas');
        }
    } else {
        console.log('❌ No hay pruebas configuradas');
    }
    
    // 4. Calcular nota final
    console.log('\n🎯 === NOTA FINAL ===');
    const notaFinal = calcularNotaFinal(estudiante);
    console.log(`📊 Nota final calculada: ${notaFinal.toFixed(2)}`);
    
    console.log('🔍 === FIN DIAGNÓSTICO ===');
}

// ===== FUNCIÓN PARA DIAGNOSTICAR TRABAJO COTIDIANO ESPECÍFICAMENTE =====
function diagnosticarTrabajoCotidiano() {
    console.log('🔍 === DIAGNÓSTICO ESPECÍFICO TRABAJO COTIDIANO ===');
    
    if (!estudiantes || estudiantes.length === 0) {
        console.log('❌ No hay estudiantes registrados');
        return;
    }
    
    const estudiante = estudiantes[0];
    console.log('📋 Analizando estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // Verificar datos de trabajo cotidiano
    console.log('\n📚 === DATOS DE TRABAJO COTIDIANO ===');
    if (diasTrabajo && diasTrabajo.length > 0) {
        console.log('✅ Días de trabajo disponibles:', diasTrabajo.length);
        console.log('📅 Días:', diasTrabajo);
        
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes[estIndex]) {
            console.log('✅ Datos del estudiante encontrados');
            console.log('📊 Array completo del estudiante:', trabajoCotidianoEstudiantes[estIndex]);
            
            let totalNotas = 0;
            let contadorNotas = 0;
            
            trabajoCotidianoEstudiantes[estIndex].forEach((notaDia, diaIdx) => {
                console.log(`\n🔍 Día ${diaIdx}:`);
                console.log(`  Objeto completo:`, notaDia);
                console.log(`  Tipo de nota:`, typeof notaDia?.nota);
                console.log(`  Valor de nota:`, notaDia?.nota);
                
                if (notaDia && notaDia.nota !== null && notaDia.nota !== undefined) {
                    const nota = parseFloat(notaDia.nota) || 0;
                    totalNotas += nota;
                    contadorNotas++;
                    console.log(`  ✅ Nota válida: ${nota} (sumada al total)`);
                } else {
                    console.log(`  ❌ Nota inválida o vacía`);
                }
            });
            
            console.log(`\n📊 RESUMEN DE CÁLCULO:`);
            console.log(`  Total notas: ${totalNotas}`);
            console.log(`  Contador notas válidas: ${contadorNotas}`);
            
            if (contadorNotas > 0) {
                const promedio = totalNotas / contadorNotas;
                console.log(`  Promedio calculado: ${promedio}`);
                console.log(`  Promedio con 1 decimal: ${promedio.toFixed(1)}`);
                
                // Verificar si hay división por 10 en algún lugar
                const promedioDividido10 = promedio / 10;
                console.log(`  Promedio dividido por 10: ${promedioDividido10}`);
                console.log(`  Promedio dividido por 10 con 1 decimal: ${promedioDividido10.toFixed(1)}`);
                
                console.log(`\n🎯 RESULTADO FINAL:`);
                console.log(`  Valor que debería mostrar: ${promedio.toFixed(1)}`);
                console.log(`  Si muestra ${promedioDividido10.toFixed(1)}, entonces SÍ está dividiendo por 10`);
            } else {
                console.log('❌ No hay notas válidas para calcular');
            }
        } else {
            console.log('❌ No se encontraron datos del estudiante en trabajo cotidiano');
        }
    } else {
        console.log('❌ No hay días de trabajo configurados');
    }
    
    console.log('🔍 === FIN DIAGNÓSTICO TRABAJO COTIDIANO ===');
}

// ===== FUNCIÓN PARA DIAGNOSTICAR PRUEBAS ESPECÍFICAMENTE =====
function diagnosticarPruebas() {
    console.log('🔍 === DIAGNÓSTICO ESPECÍFICO PRUEBAS ===');
    
    if (!estudiantes || estudiantes.length === 0) {
        console.log('❌ No hay estudiantes registrados');
        return;
    }
    
    const estudiante = estudiantes[0];
    console.log('📋 Analizando estudiante:', estudiante.nombre, estudiante.apellido1, estudiante.apellido2);
    
    // Verificar datos de pruebas
    console.log('\n🧪 === DATOS DE PRUEBAS ===');
    if (pruebas && pruebas.length > 0) {
        console.log('✅ Pruebas configuradas:', pruebas.length);
        console.log('📋 Configuración pruebas:', pruebas);
        
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (evaluacionesEstudiantes && evaluacionesEstudiantes[estIndex]) {
            console.log('✅ Datos del estudiante encontrados');
            console.log('📊 Array completo del estudiante:', evaluacionesEstudiantes[estIndex]);
            
            let totalPuntos = 0;
            let totalMaximo = 0;
            
            evaluacionesEstudiantes[estIndex].forEach((pruebaEst, pruebaIdx) => {
                console.log(`\n🔍 Prueba ${pruebaIdx}:`);
                console.log(`  Objeto completo:`, pruebaEst);
                console.log(`  Tipo de puntos:`, typeof pruebaEst?.puntos);
                console.log(`  Valor de puntos:`, pruebaEst?.puntos);
                console.log(`  Puntos máximos de la prueba:`, pruebas[pruebaIdx]?.puntosMaximos);
                
                if (pruebaEst && pruebaEst.puntos !== undefined) {
                    const puntos = parseFloat(pruebaEst.puntos) || 0;
                    const maximo = parseFloat(pruebas[pruebaIdx].puntosMaximos) || 0;
                    totalPuntos += puntos;
                    totalMaximo += maximo;
                    console.log(`  ✅ Puntos válidos: ${puntos}/${maximo} (sumados al total)`);
                } else {
                    console.log(`  ❌ Puntos inválidos o vacíos`);
                }
            });
            
            console.log(`\n📊 RESUMEN DE CÁLCULO:`);
            console.log(`  Total puntos obtenidos: ${totalPuntos}`);
            console.log(`  Total puntos máximos: ${totalMaximo}`);
            
            if (totalMaximo > 0) {
                const porcentaje = (totalPuntos / totalMaximo) * 100;
                const nota = (totalPuntos / totalMaximo) * 10;
                console.log(`  Porcentaje: ${porcentaje.toFixed(2)}%`);
                console.log(`  Nota en escala de 10: ${nota.toFixed(2)}`);
                
                console.log(`\n🎯 RESULTADO FINAL:`);
                console.log(`  Valor que debería mostrar: ${nota.toFixed(1)}`);
            } else {
                console.log('❌ No hay puntos máximos configurados');
            }
        } else {
            console.log('❌ No se encontraron datos del estudiante en pruebas');
        }
    } else {
        console.log('❌ No hay pruebas configuradas');
    }
    
    console.log('🔍 === FIN DIAGNÓSTICO PRUEBAS ===');
}

// ===== FUNCIÓN PARA DIAGNOSTICAR DATOS ESPECÍFICOS =====

// ===== FUNCIÓN PARA SINCRONIZAR PORCENTAJES FINALES =====
function sincronizarPorcentajesFinales() {
    console.log('🔄 === SINCRONIZANDO PORCENTAJES FINALES ===');
    
    // Sincronizar trabajo cotidiano - multiplicar por 10 para convertir a porcentaje
    if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes.length > 0) {
        console.log('📚 Sincronizando trabajo cotidiano...');
        trabajoCotidianoEstudiantes.forEach((estudiante, estIdx) => {
            estudiante.forEach((dia, diaIdx) => {
                if (dia && dia.nota !== null && dia.nota !== undefined) {
                    // Convertir de escala 0-10 a escala 0-100 (multiplicar por 10)
                    const valorOriginal = parseFloat(dia.nota) || 0;
                    const valorPorcentaje = valorOriginal * 10;
                    dia.nota = valorPorcentaje;
                    console.log(`  Estudiante ${estIdx}, Día ${diaIdx}: ${valorOriginal} → ${valorPorcentaje}`);
                }
            });
        });
    }
    
    // Sincronizar tareas - ya están en porcentaje correcto
    console.log('📝 Tareas ya están en porcentaje correcto');
    
    // Sincronizar pruebas - ya están en porcentaje correcto
    console.log('🧪 Pruebas ya están en porcentaje correcto');
    
    // Sincronizar proyectos - ya están en porcentaje correcto
    console.log('📋 Proyectos ya están en porcentaje correcto');
    
    // Sincronizar portafolios - ya están en porcentaje correcto
    console.log('📁 Portafolios ya están en porcentaje correcto');
    
    // Guardar los datos sincronizados
    console.log('💾 Guardando datos sincronizados...');
    guardarTrabajoCotidiano();
    
    // Actualizar la tabla
    renderSeaPeriodo();
    
    mostrarAlerta('Porcentajes finales sincronizados correctamente', 'exito');
    console.log('🔄 === FIN SINCRONIZACIÓN PORCENTAJES ===');
}

// ===== FUNCIONES PARA OBTENER PORCENTAJES DIRECTOS =====
function obtenerPorcentajeTrabajoCotidianoDirecto(estudiante) {
    try {
        // Buscar el estudiante por índice
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (estIndex === -1 || !trabajoCotidianoEstudiantes || !trabajoCotidianoEstudiantes[estIndex]) {
            return 0.0;
        }
        
        // Usar la misma fórmula que actualizarCalculosTrabajoCotidiano()
        let totalNotas = 0;
        
        diasTrabajo.forEach((dia, diaIdx) => {
            if (trabajoCotidianoEstudiantes[estIndex] && 
                trabajoCotidianoEstudiantes[estIndex][diaIdx]) {
                const nota = trabajoCotidianoEstudiantes[estIndex][diaIdx].nota;
                if (nota !== null && nota !== undefined && !isNaN(Number(nota))) {
                    totalNotas += Number(nota);
                }
            }
        });
        
        // Cálculo consistente con la sección de Trabajo Cotidiano
        let porcentajeFinal = 0;
        if (diasTrabajo.length > 0) {
            const totalNotasNum = Number(totalNotas) || 0;
            const diasTrabajoNum = Number(diasTrabajo.length) || 1;
            const escalaMaximaNum = Number(escalaMaxima) || 10;
            const valorTotalTrabajoNum = Number(valorTotalTrabajo) || 30;
            
            if (!isNaN(totalNotasNum) && !isNaN(diasTrabajoNum) && !isNaN(escalaMaximaNum) && !isNaN(valorTotalTrabajoNum) && escalaMaximaNum > 0) {
                porcentajeFinal = (totalNotasNum / (diasTrabajoNum * escalaMaximaNum)) * valorTotalTrabajoNum;
            }
        }
        
        return porcentajeFinal;
    } catch (error) {
        console.error('Error en obtenerPorcentajeTrabajoCotidianoDirecto:', error);
        return 0.0;
    }
}

function obtenerPorcentajeTareasDirecto(estudiante) {
    try {
        // Buscar el estudiante por índice
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (estIndex === -1 || !tareasEstudiantes || !tareasEstudiantes[estIndex]) {
            return 0.0;
        }
        
        // Calcular como en la sección de TAREAS: suma de porcentajes individuales
        let totalPorcentaje = 0;
        
        tareasEstudiantes[estIndex].forEach((tareaEst, tareaIdx) => {
            if (tareaEst && tareaEst.puntos !== undefined && tareas && tareas[tareaIdx]) {
                const puntos = Number(tareaEst.puntos) || 0;
                const puntosMaximos = Number(tareas[tareaIdx].puntosMaximos) || 0;
                const peso = Number(tareas[tareaIdx].peso) || 0;
                
                if (puntosMaximos > 0 && !isNaN(puntos) && !isNaN(puntosMaximos) && !isNaN(peso)) {
                    const porcentajeIndividual = (puntos / puntosMaximos) * peso;
                    totalPorcentaje += porcentajeIndividual;
                }
            }
        });
        
        return totalPorcentaje;
    } catch (error) {
        console.error('Error en obtenerPorcentajeTareasDirecto:', error);
        return 0.0;
    }
}

function obtenerPorcentajePruebasDirecto(estudiante) {
    try {
        // Buscar el estudiante por índice
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (estIndex === -1 || !evaluacionesEstudiantes || !evaluacionesEstudiantes[estIndex]) {
            return 0.0;
        }
        
        // Calcular como en la sección de PRUEBAS: suma de porcentajes individuales
        let totalPorcentaje = 0;
        
        evaluacionesEstudiantes[estIndex].forEach((evaluacion, pruebaIdx) => {
            if (evaluacion && evaluacion.puntos !== undefined && pruebas && pruebas[pruebaIdx]) {
                const puntos = Number(evaluacion.puntos) || 0;
                const puntosMaximos = Number(pruebas[pruebaIdx].puntosMaximos) || 0;
                const peso = Number(pruebas[pruebaIdx].peso) || 0;
                
                if (puntosMaximos > 0 && !isNaN(puntos) && !isNaN(puntosMaximos) && !isNaN(peso)) {
                    const porcentajeIndividual = (puntos / puntosMaximos) * peso;
                    totalPorcentaje += porcentajeIndividual;
                }
            }
        });
        
        return totalPorcentaje;
    } catch (error) {
        console.error('Error en obtenerPorcentajePruebasDirecto:', error);
        return 0.0;
    }
}

function obtenerPorcentajeProyectoDirecto(estudiante) {
    try {
        // Buscar el estudiante por índice
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (estIndex === -1 || !proyectosEstudiantes || !proyectosEstudiantes[estIndex]) {
            return 0.0;
        }
        
        // Calcular como en la sección de PROYECTO: suma de porcentajes individuales
        let totalPorcentaje = 0;
        
        proyectosEstudiantes[estIndex].forEach((proyecto, proyectoIdx) => {
            if (proyecto && proyecto.puntos !== undefined && proyectos && proyectos[proyectoIdx]) {
                const puntos = Number(proyecto.puntos) || 0;
                const puntosMaximos = Number(proyectos[proyectoIdx].puntosMaximos) || 0;
                const peso = Number(proyectos[proyectoIdx].peso) || 0;
                
                if (puntosMaximos > 0 && !isNaN(puntos) && !isNaN(puntosMaximos) && !isNaN(peso)) {
                    const porcentajeIndividual = (puntos / puntosMaximos) * peso;
                    totalPorcentaje += porcentajeIndividual;
                }
            }
        });
        
        return totalPorcentaje;
    } catch (error) {
        console.error('Error en obtenerPorcentajeProyectoDirecto:', error);
        return 0.0;
    }
}

function obtenerPorcentajePortafolioDirecto(estudiante) {
    try {
        // Buscar el estudiante por índice
        const estIndex = estudiantes.findIndex(e => 
            e.apellido1 === estudiante.apellido1 && 
            e.apellido2 === estudiante.apellido2 && 
            e.nombre === estudiante.nombre
        );
        
        if (estIndex === -1 || !portafoliosEstudiantes || !portafoliosEstudiantes[estIndex]) {
            return 0.0;
        }
        
        // Calcular como en la sección de PORTAFOLIO: suma de porcentajes individuales
        let totalPorcentaje = 0;
        
        portafoliosEstudiantes[estIndex].forEach((portafolio, portafolioIdx) => {
            if (portafolio && portafolio.puntos !== undefined && portafolios && portafolios[portafolioIdx]) {
                const puntos = Number(portafolio.puntos) || 0;
                const puntosMaximos = Number(portafolios[portafolioIdx].puntosMaximos) || 0;
                const peso = Number(portafolios[portafolioIdx].peso) || 0;
                
                if (puntosMaximos > 0 && !isNaN(puntos) && !isNaN(puntosMaximos) && !isNaN(peso)) {
                    const porcentajeIndividual = (puntos / puntosMaximos) * peso;
                    totalPorcentaje += porcentajeIndividual;
                }
            }
        });
        
        return totalPorcentaje;
    } catch (error) {
        console.error('Error en obtenerPorcentajePortafolioDirecto:', error);
        return 0.0;
    }
}

// ===== FUNCIÓN PARA DIAGNOSTICAR DATOS ESPECÍFICOS =====

// ===== FUNCIÓN PARA SINCRONIZAR PORCENTAJES FINALES =====
function sincronizarPorcentajesFinales() {
    console.log('🔄 === SINCRONIZANDO PORCENTAJES FINALES ===');
    
    // Sincronizar trabajo cotidiano - multiplicar por 10 para convertir a porcentaje
    if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes.length > 0) {
        console.log('📚 Sincronizando trabajo cotidiano...');
        trabajoCotidianoEstudiantes.forEach((estudiante, estIdx) => {
            estudiante.forEach((dia, diaIdx) => {
                if (dia && dia.nota !== null && dia.nota !== undefined) {
                    // Convertir de escala 0-10 a escala 0-100 (multiplicar por 10)
                    const valorOriginal = parseFloat(dia.nota) || 0;
                    const valorPorcentaje = valorOriginal * 10;
                    dia.nota = valorPorcentaje;
                    console.log(`  Estudiante ${estIdx}, Día ${diaIdx}: ${valorOriginal} → ${valorPorcentaje}`);
                }
            });
        });
    }
    
    // Sincronizar tareas - ya están en porcentaje correcto
    console.log('📝 Tareas ya están en porcentaje correcto');
    
    // Sincronizar pruebas - ya están en porcentaje correcto
    console.log('🧪 Pruebas ya están en porcentaje correcto');
    
    // Sincronizar proyectos - ya están en porcentaje correcto
    console.log('📋 Proyectos ya están en porcentaje correcto');
    
    // Sincronizar portafolios - ya están en porcentaje correcto
    console.log('📁 Portafolios ya están en porcentaje correcto');
    
    // Guardar los datos sincronizados
    console.log('💾 Guardando datos sincronizados...');
    guardarTrabajoCotidiano();
    
    // Actualizar la tabla
    renderSeaPeriodo();
    
    mostrarAlerta('Porcentajes finales sincronizados correctamente', 'exito');
    console.log('🔄 === FIN SINCRONIZACIÓN PORCENTAJES ===');
}

// ===== FUNCIONES DE DIAGNÓSTICO PARA INDICADORES =====

// Función de diagnóstico específica para indicadores
function diagnosticarIndicadores() {
    console.log('=== DIAGNÓSTICO DE INDICADORES ===');
    console.log('Indicadores actuales:', indicadores);
    console.log('Número de indicadores:', indicadores.length);
    
    if (trabajoCotidianoEstudiantes && trabajoCotidianoEstudiantes.length > 0) {
        console.log('Datos de trabajo cotidiano encontrados');
        trabajoCotidianoEstudiantes.forEach((estudiante, estIdx) => {
            if (estudiante) {
                console.log(`Estudiante ${estIdx}:`, estudiante.length, 'días');
                diasTrabajo.forEach((dia, diaIdx) => {
                    if (estudiante[diaIdx] && estudiante[diaIdx].indicadores) {
                        console.log(`  Día ${diaIdx}:`, estudiante[diaIdx].indicadores);
                    }
                });
            }
        });
    } else {
        console.log('No hay datos de trabajo cotidiano');
    }
}



// Inicializar la aplicación cuando el DOM esté listo
esperarDOMListo();
