# 📊 Sistema Integral de Evaluación Educativa 2026

Un sistema web profesional y moderno para la gestión completa de evaluación estudiantil, diseñado específicamente para instituciones educativas. Incluye control de asistencia, evaluación de múltiples rubros y generación de reportes integrales.

## ✨ Características Principales

- **🎯 Sistema Integral**: Gestión completa de asistencia, evaluación y reportes
- **📱 Totalmente Responsive**: Funciona perfectamente en dispositivos móviles y desktop
- **💾 Persistencia Local**: Los datos se guardan automáticamente en el navegador
- **📊 Cálculos Automáticos**: Porcentajes, promedios y evaluaciones automáticas
- **📥📤 Importación/Exportación**: Soporte completo para archivos Excel (.xlsx)
- **🔍 Navegación Intuitiva**: Menú organizado por secciones funcionales
- **⚡ Rendimiento Optimizado**: Carga rápida y funcionamiento fluido
- **🌙 Modo Oscuro**: Interfaz adaptable con tema claro/oscuro

## 🚀 Módulos del Sistema

### 📊 Control de Asistencia
- ✅ Registro diario de asistencia por estudiante
- ✅ Múltiples tipos: Presente, Ausente, Tardía, Escapada, Justificada
- ✅ Cálculo automático de porcentajes de asistencia
- ✅ Sistema de alertas tempranas configurable
- ✅ Escala de calificación automática (0-10 puntos)
- ✅ Gestión de días de clase con fechas y lecciones

### 📋 Gestión de Indicadores
- ✅ Definición de indicadores por grupo
- ✅ Utilización en tareas y trabajo cotidiano
- ✅ Importación/exportación de indicadores
- ✅ Gestión completa (agregar, eliminar, editar)

### 📋 Trabajo Cotidiano
- ✅ Evaluación diaria por estudiante
- ✅ Escala configurable (0-3, 0-5, etc.)
- ✅ Valor total configurable para cálculo de porcentajes
- ✅ Gestión de fechas de evaluación
- ✅ Exportación de datos

### 📚 Evaluación de Tareas
- ✅ Múltiples tareas configurables
- ✅ Puntos máximos personalizables
- ✅ Porcentaje de peso configurable
- ✅ Cálculo automático de promedios
- ✅ Gestión completa de evaluaciones

### 📝 Evaluación de Pruebas
- ✅ Múltiples pruebas configurables
- ✅ Puntos máximos personalizables
- ✅ Porcentaje de peso configurable
- ✅ Cálculo automático de promedios
- ✅ Gestión completa de evaluaciones

### 🔬 Evaluación de Proyectos
- ✅ Múltiples proyectos configurables
- ✅ Puntos máximos personalizables
- ✅ Porcentaje de peso configurable
- ✅ Cálculo automático de promedios
- ✅ Gestión completa de evaluaciones

### 📁 Evaluación de Portafolio
- ✅ Múltiples portafolios configurables
- ✅ Puntos máximos personalizables
- ✅ Porcentaje de peso configurable
- ✅ Cálculo automático de promedios
- ✅ Gestión completa de evaluaciones

### 📊 SEA I Período (Resumen General)
- ✅ Resumen consolidado de todas las evaluaciones
- ✅ Cálculo automático de nota final
- ✅ Configuración de nota de aprobación
- ✅ Visualización de porcentajes por rubro
- ✅ Exportación de resumen completo
- ✅ Sistema de colores para notas finales

### 📋 Resumen de Evaluaciones
- ✅ Vista consolidada de todas las evaluaciones
- ✅ Comparación de rendimiento por estudiante
- ✅ Análisis de tendencias

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con variables CSS y animaciones
- **JavaScript ES6+**: Lógica robusta y modular
- **SheetJS**: Procesamiento de archivos Excel
- **LocalStorage**: Persistencia de datos local

## 📋 Instalación y Uso

### Para Usuarios Finales
1. **Acceso Directo**: Simplemente abre `index.html` en tu navegador
2. **GitHub Pages**: Accede a la versión online en tu repositorio
3. **Sin Instalación**: No requiere servidor ni configuración adicional

### Para Desarrolladores
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/REGISTRO2026git.io.git

# Navegar al directorio
cd REGISTRO2026git.io

# Abrir en el navegador
# Simplemente abre index.html o usa un servidor local
```

## 📁 Estructura del Proyecto

```
REGISTRO2026git.io/
├── index.html          # Página principal con todos los módulos
├── style.css           # Estilos CSS optimizados
├── script.js           # Lógica JavaScript modular
├── README.md           # Documentación
└── .gitignore          # Archivos ignorados por Git
```

## 🎨 Características de Diseño

### Modo Claro/Oscuro
- Cambio automático de tema
- Persistencia de preferencias
- Transiciones suaves

### Responsive Design
- Adaptable a cualquier tamaño de pantalla
- Navegación optimizada para móviles
- Tablas con scroll horizontal inteligente

### Accesibilidad
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores optimizado

## 📊 Sistema de Cálculos

### Porcentaje de Asistencia
El sistema calcula automáticamente el porcentaje basado en:
- **Ausencias injustificadas**: 100% de penalización
- **Tardías**: 50% de penalización
- **Escapadas**: 100% de penalización
- **Justificadas**: 0% de penalización

### Escala de Calificación de Asistencia
- **10 puntos**: 0% a <1% de ausencias
- **9 puntos**: 1% a <10% de ausencias
- **8 puntos**: 10% a <20% de ausencias
- **7 puntos**: 20% a <30% de ausencias
- **6 puntos**: 30% a <40% de ausencias
- **5 puntos**: 40% a <50% de ausencias
- **4 puntos**: 50% a <60% de ausencias
- **3 puntos**: 60% a <70% de ausencias
- **2 puntos**: 70% a <80% de ausencias
- **1 punto**: 80% a <90% de ausencias
- **0 puntos**: 90% a 100% de ausencias

### Cálculo de Evaluaciones
- **Trabajo Cotidiano**: (Puntos obtenidos / Puntos máximos) × Valor total
- **Tareas**: (Puntos obtenidos / Puntos máximos) × Porcentaje de peso
- **Pruebas**: (Puntos obtenidos / Puntos máximos) × Porcentaje de peso
- **Proyectos**: (Puntos obtenidos / Puntos máximos) × Porcentaje de peso
- **Portafolio**: (Puntos obtenidos / Puntos máximos) × Porcentaje de peso

### Nota Final SEA I Período
- Suma de los 5 rubros principales (sin asistencia)
- Configuración de nota de aprobación personalizable
- Sistema de colores para visualización rápida

## 🔔 Sistema de Alertas

### Alerta Temprana de Asistencia
- Configurable entre 0% y 10%
- Se activa cuando: `(10 - %Asistencia) ≥ ValorConfigurado`
- Visualización clara en la tabla
- Útil para seguimiento preventivo

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iOS, Android)
- ✅ Móviles (iOS, Android)

## 🔧 Configuración Avanzada

### Personalización de Colores
Edita las variables CSS en `style.css`:
```css
:root {
    --color-primario: #1976d2;
    --color-secundario: #1565c0;
    --color-exito: #43a047;
    --color-alerta: #fbc02d;
    --color-error: #e74c3c;
    /* ... más variables */
}
```

### Configuraciones del Sistema
```javascript
// Asistencia
const maxEstudiantes = 50;        // Máximo de estudiantes
const maxDias = 100;              // Máximo de días
const alertaTemprana = 2;         // Porcentaje para alerta temprana

// Trabajo Cotidiano
const escalaMaxima = 3;           // Escala de evaluación (0-3)
const valorTotalTrabajo = 35;     // Valor total para porcentaje

// Evaluación General
const notaAprobacion = 70;        // Nota mínima para aprobar (%)
```

## 📈 Versiones

### v3.0 (Actual) - Sistema Integral de Evaluación
- ✅ Sistema completo de evaluación educativa
- ✅ 8 módulos principales integrados
- ✅ Cálculos automáticos de notas finales
- ✅ Resumen consolidado SEA I Período
- ✅ Gestión de indicadores
- ✅ Exportación/importación Excel para todos los módulos

### v2.2
- ✅ Interfaz completamente rediseñada
- ✅ Modo oscuro mejorado
- ✅ Responsive design optimizado
- ✅ Código JavaScript modularizado
- ✅ Mejor manejo de errores

### v2.1
- ✅ Sistema de alertas tempranas
- ✅ Importación/exportación Excel
- ✅ Gestión de días mejorada

### v2.0
- ✅ Nueva estructura de datos
- ✅ Persistencia mejorada
- ✅ Interfaz moderna

## 🎯 Casos de Uso

### Para Docentes
- Control diario de asistencia
- Evaluación continua de estudiantes
- Generación de reportes de rendimiento
- Seguimiento de indicadores de aprendizaje

### Para Coordinadores
- Monitoreo de asistencia por grupos
- Análisis de tendencias de evaluación
- Generación de reportes institucionales
- Control de indicadores educativos

### Para Administradores
- Reportes consolidados de rendimiento
- Análisis de datos por períodos
- Exportación de datos para sistemas externos
- Control de calidad educativa

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes sugerencias:

1. **Issues**: Abre un issue en GitHub
2. **Documentación**: Revisa este README
3. **Contacto**: Usa los canales oficiales del proyecto

## 🙏 Agradecimientos

- **SheetJS**: Por la librería de procesamiento Excel
- **Comunidad Educativa**: Por las necesidades específicas identificadas
- **Educadores**: Por el feedback y mejoras sugeridas
- **Desarrolladores**: Por las contribuciones técnicas

---

**Desarrollado con ❤️ para la comunidad educativa**

*Sistema Integral de Evaluación Educativa 2026 - Versión 3.0*
