# Requerimientos: Plataforma Interna CECyTE Maker

Este documento define la estructura técnica para el portal web que funcionará como eje administrativo del programa, el cual será alojado en la infraestructura existente (`cecyteo.edu.mx`).

## 1. Arquitectura General
- **Ubicación Sugerida:** Subdominio (ej. `maker.cecyteo.edu.mx` o una sección dentro del portal principal `cecyteo.edu.mx/maker`).
- **Stack Tecnológico:** A definir por el área de sistemas del colegio.
- **Base de Datos:** Base de datos relacional SQL server para gestionar las relaciones entre: Alumnos -> Equipos -> Planteles -> Proyectos.

## 2. Módulos Principales (MVP)

### A. Módulo de Identidad y Registro
- **Login Institucional:** Validación por matrícula de alumno.
- **Perfiles de Usuario:**
  - **Estudiante:** Nombre completo, Plantel (Seleccionable de la lista de 106), Semestre, Sexo.
  - **Docente Enlace:** Plantel asignado, equipos a su cargo, facultad de aprobar registros.

### B. Módulo de Gestión de Equipos (Rumbo al Hackathon)
- **Creación de Equipos:** Un alumno con rol de "Líder" puede crear un equipo nuevo.
- **Estructura del Equipo:** Límite estricto de **4 estudiantes y 1 tutor**. El líder enviará invitaciones (vía matrícula) a sus compañeros.
- **Asignación de Tutor:** El equipo debe seleccionar a su `@Docente Enlace`, quien recibirá una notificación para validar y dar de alta oficialmente al equipo ante la Dirección.

### C. Módulo de Portafolio y Proyectos
- **Ficha del Proyecto:** Interfaz donde los equipos subirán la evidencia de su desarrollo:
  - Título y Descripción del proyecto.
  - Categoría del Hackathon (Ej. Inteligencia Artificial, Domótica, Impacto Social Sustentable).
  - Repositorio (Enlace a GitHub/GitLab).
  - Galería multimedia (Fotos/Videos del prototipo en funcionamiento).

### D. Panel de Administración
- **Dashboard Institucional:** 
  - Contador de alumnos y equipos activos inscritos en tiempo real.
  - Gráficos de participación por plantel y por región.
- **Gestión de Convocatorias:** Interfaz para abrir y cerrar ventanas de registro para eventos específicos (ej. "Registro Abierto: Hackathon Estatal 2026").
- **Exportación de Datos:** Capacidad de exportar la base de equipos a Excel/CSV para logística de gafetes y certificados.
