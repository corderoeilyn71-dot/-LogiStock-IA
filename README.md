# LogiStock IA

## 1) Título y Descripción General

LogiStock IA es un proyecto de control de inventarios enfocado en mejorar la visibilidad, la toma de decisiones y la operatividad logística de un almacén o negocio con stock variable. El sistema permite monitorear productos en tiempo real, identificar niveles críticos, detectar quiebres de stock y sugerir reabastecimientos inteligentes mediante una simulación de inteligencia artificial.

El propósito principal del proyecto es resolver la necesidad de:

- Control del inventario en una sola vista centralizada.
- Visualización en tiempo real del estado de cada producto.
- Prevención de quiebres de stock mediante alertas visuales y métricas de riesgo.
- Simulación de IA para proponer reabastecimientos y priorizar pedidos urgentes.
- Mejorar la organización de productos, proveedores y niveles mínimos recomendados.

La solución está diseñada como una interfaz web ligera y funcional, ideal para demostraciones, actividades académicas o prototipos de gestión logística con enfoque operativo y visual.

---

## 2) Tecnologías y Librerías

El proyecto utiliza las siguientes tecnologías y recursos:

- HTML5: estructura base de la interfaz y componentes de la aplicación.
- CSS3: diseño visual, layout, responsividad, estilos pastel y alertas visuales.
- JavaScript: lógica del negocio, manipulación del DOM, validaciones, métricas y simulación de IA.
- JSON: almacenamiento de datos estructurados del inventario en un archivo local.

Estas tecnologías permiten que la aplicación sea completamente estática, fácil de ejecutar y compatible con navegadores modernos sin requerir dependencias complejas ni frameworks adicionales.

---

## 3) Estructura del Repositorio (3 Capas + Datos)

El proyecto está organizado en tres capas principales más el conjunto de datos del inventario.

### 3.1 Capa de Presentación

Archivos principales:

- `index.html`
- `style.css`

La capa de presentación se encarga de la experiencia del usuario y de la visualización del sistema. En `index.html` se define la estructura principal del dashboard, incluyendo:

- panel de resumen general,
- métricas del inventario,
- formulario para registrar productos,
- tabla de productos,
- alertas visuales,
- sección de predicción IA.

En `style.css` se diseña la interfaz con una estética moderna y amigable, utilizando una paleta pastel compuesta principalmente por tonos rosados y azules. También se aplican estilos para:

- alertas de stock bajo,
- estados de salud del inventario,
- tarjetas métricas,
- botones de acción,
- diseño responsive para distintas pantallas.

Esta capa busca ofrecer una experiencia cómoda, clara y de fácil lectura para usuarios de logística, administración o atención comercial.

### 3.2 Capa de Lógica

Archivo principal:

- `app.js`

La capa de lógica es la encargada de gestionar la funcionalidad completa del sistema. En `app.js` se implementan los procesos clave del inventario, tales como:

- carga del inventario desde datos locales,
- cálculo instantáneo de productos activos,
- conteo de stock bajo y unidades totales,
- validación de formularios para registrar nuevos productos,
- renderizado dinámico de la tabla de inventario,
- activación de alertas visuales y mensajes de notificación,
- detección de productos con stock crítico,
- simulación de recomendación de reabastecimiento basada en reglas de negocio,
- bloqueo de entradas inválidas o excedentes para proteger la integridad de la información.

Esta capa permite que la app funcione como un panel operativo dinámico, sin necesidad de bases de datos ni procesos complejos del lado del servidor.

### 3.3 Capa de Datos

Archivo principal:

- `data.json`

La capa de datos contiene la información ordenada de los productos disponibles. Cada registro incluye datos como:

- nombre del producto,
- SKU,
- categoría,
- stock actual,
- stock mínimo,
- proveedor.

Este archivo actúa como base inicial del inventario, permitiendo cargar datos de forma estructurada y simular un almacén real con productos clasificados y niveles de stock definidos.

### 3.4 Estructura resumida del repositorio

```text
LogiStock-IA/
├── index.html              # Interfaz principal del dashboard
├── style.css               # Estilos visuales y diseño pastel
├── app.js                  # Lógica de inventario, alertas y simulación IA
├── data.json               # Datos base de productos
├── README.md               # Documentación del proyecto
└── assets/                 # (si aplica) recursos adicionales o archivos complementarios
```

---

## 4) Instrucciones de Instalación y Configuración

### Requisitos

- Navegador moderno (Chrome, Edge, Firefox o similar).
- Conexión a internet opcional para cargar fuentes externas.
- Un entorno local o servidor web simple para ejecutar la app.

### Opción A: Ejecución local directa

1. Descarga o clona el proyecto en tu equipo.
2. Asegúrate de que los archivos `index.html`, `style.css`, `app.js` y `data.json` estén en la misma carpeta raíz.
3. Abre `index.html` directamente en el navegador.
4. Verifica que la aplicación cargue correctamente el inventario desde `data.json`.

> Nota: si el navegador bloquea algunas funciones por seguridad, es recomendable ejecutar la app desde un servidor local.

### Opción B: Servidor web local

Puedes ejecutar el proyecto con Python desde la terminal:

```bash
cd ruta/del/proyecto
python -m http.server 8000
```

Luego abre en tu navegador:

```text
http://localhost:8000
```

Con ello se garantiza que el archivo JSON y la lógica del frontend se carguen de manera correcta.

### Configuración recomendada

- Mantén todos los archivos en el mismo directorio raíz del proyecto.
- Verifica que el nombre del archivo `data.json` no haya sido modificado.
- Si trabajas con un entorno más realista, puedes sustituir la fuente de datos local por un backend o una API.

---

## 5) Guía Rápida de Uso

A continuación se presenta un instructivo paso a paso para ejecutar las funciones principales del software.

### Paso 1: Abrir la aplicación

Al iniciar la aplicación, se mostrará un panel principal con:

- resumen general del inventario,
- número de productos activos,
- stock bajo,
- unidades en almacén,
- indicador de salud del inventario.

### Paso 2: Revisar el estado del inventario

La interfaz presenta de forma inmediata:

- productos activos,
- alertas de stock bajo,
- productos cercanos a agotarse,
- un texto resumido del estado general del almacén.

Esto permite detectar de un vistazo si el inventario está saludable o requiere atención.

### Paso 3: Registrar un nuevo producto

1. Dirígete a la sección de "Registrar producto".
2. Completa los campos requeridos:
   - nombre,
   - SKU,
   - categoría,
   - stock,
   - stock mínimo,
   - proveedor.
3. Verifica que los datos sean válidos.
4. Haz clic en el botón de registro.
5. El producto se agregará al inventario y aparecerá en la tabla principal.

Si algún dato es incorrecto, la aplicación mostrará mensajes de validación para corregirlo antes de guardar.

### Paso 4: Analizar alertas de stock

Cuando uno o varios productos tienen un nivel igual o inferior al mínimo definido, la aplicación marca la condición como "Stock bajo" y genera alertas visuales. Esto ayuda a:

- detectar faltantes,
- prevenir quiebres de stock,
- priorizar pedidos de reabastecimiento.

### Paso 5: Consultar la simulación de IA

La sección de predicción o recomendación IA muestra productos prioritarios para reabastecer. El sistema evalúa:

- nivel de inventario actual,
- stock mínimo,
- urgencia del pedido,
- cantidades sugeridas de compra.

Esto simula una lógica de decisiones inteligentes para apoyar la gestión logística.

### Paso 6: Mantener el inventario actualizado

Se recomienda:

- registrar nuevos productos con SKU únicos,
- actualizar stocks regularmente,
- revisar alertas al menos al final de cada turno,
- corroborar proveedores y niveles mínimos.

Con estas acciones, LogiStock IA funciona como una herramienta práctica para contener pérdidas por falta de producto y evitar exceso de inventario.

---

## Conclusión

LogiStock IA es una solución ligera y funcional orientada a la gestión de inventarios en tiempo real, con enfoque visual, analítico y de prevención. Su estructura modular facilita su comprensión, mantenimiento y ampliación para futuras versiones con mayor complejidad, integración con APIs o conexión a sistemas reales de almacenamiento y logística.

Esta documentación proporciona una visión clara del proyecto y del uso práctico de cada una de sus capas, permitiendo ejecutar y extender la aplicación de forma ordenada y profesional.
