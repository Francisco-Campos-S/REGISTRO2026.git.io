# 📊 Sistema de Registro de Asistencia 2026

Un sistema web profesional y moderno para el control de asistencia estudiantil, diseñado específicamente para instituciones educativas.

## ✨ Características Principales

- **🎯 Interfaz Moderna**: Diseño responsive y profesional con modo oscuro
- **📱 Totalmente Responsive**: Funciona perfectamente en dispositivos móviles y desktop
- **💾 Persistencia Local**: Los datos se guardan automáticamente en el navegador
- **📊 Cálculos Automáticos**: Porcentajes de asistencia y alertas tempranas
- **📥📤 Importación/Exportación**: Soporte completo para archivos Excel (.xlsx)
- **🔍 Búsqueda y Filtrado**: Herramientas avanzadas de gestión de datos
- **⚡ Rendimiento Optimizado**: Carga rápida y funcionamiento fluido

## 🚀 Funcionalidades

### Gestión de Estudiantes
- ✅ Agregar/eliminar estudiantes
- ✅ Edición en línea de datos personales
- ✅ Ordenamiento automático por apellidos
- ✅ Validación de datos en tiempo real

### Control de Asistencia
- ✅ Registro diario de asistencia
- ✅ Múltiples tipos: Presente, Ausente, Tardía, Escapada, Justificada
- ✅ Cálculo automático de porcentajes
- ✅ Sistema de alertas tempranas configurable

### Gestión de Días
- ✅ Agregar/eliminar días de clase
- ✅ Configuración de fechas y lecciones por día
- ✅ Ordenamiento automático por fecha

### Exportación de Datos
- ✅ Exportar a Excel con formato profesional
- ✅ Plantillas descargables
- ✅ Importación desde archivos Excel existentes

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
├── index.html          # Página principal
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
- Tabla con scroll horizontal inteligente

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

### Escala de Calificación
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

## 🔔 Sistema de Alertas

### Alerta Temprana
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

### Límites Configurables
```javascript
const maxEstudiantes = 50;  // Máximo de estudiantes
const maxDias = 100;        // Máximo de días
```

## 📈 Versiones

### v2.2 (Actual)
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
- **Comunidad**: Por el feedback y mejoras sugeridas
- **Educadores**: Por las necesidades específicas identificadas

---

**Desarrollado con ❤️ para la comunidad educativa**

*Sistema de Registro de Asistencia 2026 - Versión 2.2*
