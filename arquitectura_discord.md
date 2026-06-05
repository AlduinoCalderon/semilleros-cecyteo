# Arquitectura del Servidor Discord: CECyTE Maker

Este documento define la estructura oficial para la comunidad en Discord, administrada por la Dirección de Tecnologías.

## 1. Roles y Permisos (Gestionados por Sistemas)
- **`@Admin/Sistemas`**: Control total del servidor, configuración de bots de moderación y seguridad.
- **`@Coordinador Maker`**: Rol para el capacitador experto o enlaces directivos. Puede moderar canales, gestionar eventos y dar avisos.
- **`@Docente Enlace`**: Profesores responsables en los planteles. Tienen acceso a canales privados de coordinación.
- **`@Maker (Estudiante)`**: Rol base para todos los estudiantes registrados. Permisos básicos de texto y voz en canales públicos.
- **`@Hackathon Finalist`**: Rol especial temporal asignado a los equipos que pasan a la final estatal.

## 2. Categorías y Canales

### 📌 INFORMACIÓN OFICIAL (Solo lectura)
- `#anuncios`: Convocatorias, fechas de hackatones y avisos importantes.
- `#reglas`: Normativa de convivencia y uso adecuado de la plataforma educativa.
- `#recursos-oficiales`: Enlaces a tutoriales, guías de Arduino, y repositorios de código.

### 🌐 COMUNIDAD MAKER (Público general)
- `#general`: Chat principal para todos los planteles.
- `#dudas-técnicas`: Espacio para que alumnos pregunten sobre código o electrónica.
- `#showcase-proyectos`: Canal para compartir fotos o videos de lo que están construyendo en los talleres.

### 👥 PLANTELES PILOTO (Canales específicos para equipos locales)
- `#01-oaxaca`
- `#05-etla`
- `#16-mitla`
- `#25-san-pablo`
- `#29-xoxocotlan`

### 🎙️ ZONAS DE MENTORÍA (Canales de Voz/Video)
- `🔊 Mentoría Sala 1` (Límite: 15 usuarios)
- `🔊 Mentoría Sala 2` (Límite: 15 usuarios)
- `🔊 Trabajo en Equipo` (Creación de canales de voz dinámicos gestionados por bots)

### 🔒 COORDINACIÓN (Privado)
- `#staff-docentes`: Canal exclusivo para `@Docente Enlace` y directivos.

## 3. Bots y Automatización Recomendada
- **Carl-bot o Dyno**: Para autorroles (ej. que los alumnos seleccionen su plantel al entrar haciendo clic en un emoji) y moderación automática de vocabulario inadecuado.
- **Ticket Tool**: Para soporte técnico privado si un equipo tiene problemas con la plataforma web de registro o dudas confidenciales sobre sus proyectos.
