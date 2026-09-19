# Checklist de lanzamiento — Sitio web

**Uso:** revisa bloque por bloque antes de publicar. Lo marcado como 🔴 bloquea el lanzamiento; 🟡 se puede cerrar en la primera semana post-launch.

---

## 1. Legal y cumplimiento 🔴

- [ ] Política de privacidad publicada, con fecha de última actualización y datos del responsable
- [ ] Términos de servicio / condiciones de uso accesibles desde el footer en todas las páginas
- [ ] Cláusula de arbitraje redactada en los ToS: sede, reglas aplicables, idioma, quién cubre costos, plazo de opt-out
- [ ] Cláusula de ley aplicable y jurisdicción alineada con la de arbitraje (que no se contradigan)
- [ ] Aviso de que el uso continuado implica aceptación de cambios + mecanismo de notificación de cambios
- [ ] Banner de cookies con consentimiento real (no solo informativo): aceptar, rechazar y configurar por categoría
- [ ] Ningún script de analítica o marketing se dispara antes del consentimiento
- [ ] Política de reembolsos/cancelación si hay cobro
- [ ] Datos de contacto reales y verificables (no placeholder): correo, teléfono, domicilio si aplica
- [ ] Año del copyright generado dinámicamente, no hardcodeado

> ⚠️ La cláusula de arbitraje con consumidores tiene límites de validez según el país (en México, PROFECO y la LFPC acotan la renuncia a jurisdicción). Que la revise un abogado antes de publicar — esto es una guía operativa, no asesoría legal.

## 2. Declaración de uso de inteligencia artificial 🔴

- [ ] Sección o página pública "Uso de IA" enlazada desde el footer y desde la política de privacidad
- [ ] Declarar **qué** hace la IA en el producto: funciones concretas, no genérico
- [ ] Declarar **qué modelos/proveedores** se usan y si los datos salen a terceros
- [ ] Declarar si los datos del usuario se usan para entrenamiento (y cómo optar por no participar)
- [ ] Etiquetar visiblemente el contenido generado por IA dentro del producto
- [ ] Indicar límites conocidos: la salida puede ser incorrecta, no sustituye asesoría profesional
- [ ] Ruta humana de apelación/contacto cuando la IA toma o influye una decisión sobre el usuario
- [ ] Botón de reporte de contenido generado por IA que sea ofensivo o incorrecto
- [ ] Retención de logs de prompts definida y declarada (cuánto tiempo, quién accede)

## 3. Seguridad 🔴

**Cabeceras y transporte**
- [ ] Certificado SSL válido + redirección forzada a HTTPS
- [ ] HSTS activo
- [ ] Cabeceras de seguridad: CSP, X-Content-Type-Options, X-Frame-Options / frame-ancestors, Referrer-Policy
- [ ] CORS restringido a los orígenes propios, nunca `*` en endpoints con sesión
- [ ] Cookies con `Secure`, `HttpOnly` y `SameSite`

**Autenticación y sesión**
- [ ] Contraseñas hasheadas (bcrypt/argon2), nunca en texto plano ni reversible
- [ ] Tokens CSRF en todos los formularios que mutan estado
- [ ] Sesión se regenera al iniciar sesión y se invalida al cerrar
- [ ] Enlaces de recuperación con caducidad corta y un solo uso
- [ ] Límite de intentos de login y bloqueo tras fallos repetidos
- [ ] Sin enumeración de usuarios: mensajes de error idénticos para correo inexistente y contraseña mala
- [ ] Protección anti-bots en registro, login y formularios públicos

**Datos y backend**
- [ ] Claves API fuera del código cliente y fuera del repositorio (variables de entorno)
- [ ] Historial de Git limpio de secretos ya expuestos (rotarlos, no solo borrarlos)
- [ ] Solo la clave pública/anon de la base de datos llega al navegador
- [ ] Row-level security o equivalente activo en cada tabla
- [ ] Consultas parametrizadas — cero concatenación de SQL
- [ ] Validación y sanitización de toda entrada en servidor, no solo en cliente
- [ ] Escapado de contenido de usuario al renderizar (anti-XSS)
- [ ] Bloqueo de manipulación de campos: el cliente no decide rol, precio ni estado
- [ ] Precios y montos calculados y fijados en servidor
- [ ] Restricción de tipo, tamaño y destino de archivos subidos
- [ ] Rate limiting por IP y por cuenta en API y endpoints costosos
- [ ] Webhooks con verificación de firma
- [ ] Listado de directorios deshabilitado y rutas admin fuera de patrones adivinables
- [ ] Registro de eventos de seguridad (login, cambios de rol, errores 4xx/5xx repetidos)

**Si hay IA expuesta al usuario**
- [ ] Defensa contra prompt injection (separación de instrucciones y contenido del usuario)
- [ ] Límite de uso por usuario y por sesión para controlar costo y abuso
- [ ] Filtro de entrada y de salida antes de mostrar respuestas

## 4. Privacidad y datos 🔴

- [ ] Inventario de qué datos se recogen, para qué y dónde se almacenan
- [ ] Minimización: nada que no se use se guarda
- [ ] Datos sensibles cifrados en reposo y en tránsito
- [ ] Ruta de exportación y de eliminación de cuenta accesible al usuario
- [ ] Lista de subprocesadores/terceros declarada
- [ ] Analítica configurada con anonimización de IP donde aplique

## 5. Contenido inapropiado y moderación 🔴

- [ ] Reglas de contenido publicadas: qué está prohibido, en lenguaje claro
- [ ] Bloqueo en subida: filtro automático de imágenes/texto antes de publicar
- [ ] Botón de reporte visible en todo contenido generado por usuarios o por IA
- [ ] Función de bloquear/silenciar a otros usuarios si hay interacción social
- [ ] Cola de moderación con responsable asignado y SLA de revisión
- [ ] Capacidad de retirar contenido y suspender cuentas, con registro de la acción
- [ ] Procedimiento de apelación para el usuario sancionado
- [ ] Protocolo de escalamiento para contenido ilegal grave (CSAM, amenazas): reporte a autoridad y preservación de evidencia
- [ ] Sin subida anónima sin límites: requerir cuenta verificada para publicar

## 6. Pruebas automatizadas 🔴

- [ ] Pipeline de CI que corre en cada push y bloquea el merge si falla
- [ ] Unitarias sobre la lógica de negocio crítica (cobros, permisos, cálculos)
- [ ] Integración sobre los endpoints de API principales
- [ ] End-to-end sobre los 3 flujos que no pueden romperse: registro, login, conversión/compra
- [ ] Pruebas negativas de autorización: usuario A no puede leer ni editar datos de usuario B
- [ ] Validación de formularios probada en caso de éxito y de error
- [ ] Linter y type-check en CI
- [ ] Escaneo de dependencias vulnerables y de secretos en el repo
- [ ] Prueba automática de enlaces rotos y de 404
- [ ] Lighthouse/CI de performance con umbral mínimo definido
- [ ] Pruebas de accesibilidad automatizadas (axe o similar)
- [ ] Verificación cross-browser (Chrome, Safari, Firefox) y en móvil real, no solo emulador
- [ ] Smoke test post-deploy que verifique que producción responde

## 7. SEO e indexación 🟡

- [ ] `sitemap.xml` generado y enviado a Search Console
- [ ] `robots.txt` correcto — verificar que no esté bloqueando el sitio entero
- [ ] Título único y descriptivo por página (nada de "Home" o el nombre del framework)
- [ ] Meta description única por página
- [ ] Open Graph e imagen para redes configurados y probados en el previsualizador
- [ ] Texto ALT en todas las imágenes
- [ ] Enlaces internos entre páginas relevantes
- [ ] Migas de pan en secciones profundas
- [ ] Datos estructurados / schema (local business, producto, FAQ según el caso)
- [ ] URLs limpias y canónicas definidas

## 8. UX/UI 🟡

**Navegación**
- [ ] Menú responsive / hamburguesa funcional en móvil
- [ ] Logo clicable que regresa al inicio
- [ ] Cabecera fija si el scroll es largo
- [ ] Botón "volver arriba"
- [ ] Buscador del sitio si hay volumen de contenido
- [ ] Cero scroll horizontal en móvil; revisar overflow
- [ ] Teléfono clicable (`tel:`) y correo clicable (`mailto:`)
- [ ] Enlaces del footer completos y sin rotos
- [ ] Página 404 personalizada con salida al inicio

**Estado e interacción**
- [ ] Estados hover en botones y enlaces
- [ ] Estados de carga: skeleton o spinner, nunca pantalla en blanco
- [ ] Transiciones y animaciones de scroll moderadas (respetar `prefers-reduced-motion`)
- [ ] Mensajes de éxito y de error diferenciados y visibles
- [ ] Validación de formulario en tiempo real con mensajes útiles
- [ ] Mostrar/ocultar contraseña
- [ ] Botón de copiar en códigos, links o datos
- [ ] Modales con cierre por Escape y por clic fuera
- [ ] Favicon personalizado
- [ ] Modo oscuro si el producto lo amerita
- [ ] Selector de idioma si hay más de un mercado
- [ ] Cero texto placeholder ("Lorem ipsum", "Tu texto aquí") en producción
- [ ] Cero elementos de navegación que no llevan a ningún lado

**Rendimiento**
- [ ] Imágenes comprimidas y en formato moderno (WebP/AVIF)
- [ ] Carga diferida de imágenes fuera de pantalla
- [ ] Tiempos de carga medidos en 4G, no solo en wifi de oficina

## 9. Confianza y conversión 🟡

- [ ] CTA principal visible antes del primer scroll y repetido a lo largo de la página
- [ ] CTA fijo en móvil
- [ ] "Sobre nosotros" real: personas, historia, sin texto genérico
- [ ] Foto del equipo
- [ ] Testimonios y reseñas reales, atribuibles
- [ ] Casos de estudio con resultados concretos
- [ ] Sección de FAQs desplegable
- [ ] Tabla comparativa contra alternativas
- [ ] Certificaciones y sellos de confianza
- [ ] Formulario de contacto simple (máximo campos indispensables)
- [ ] Compromiso de tiempo de respuesta declarado
- [ ] Página de agradecimiento tras conversión
- [ ] Newsletter con incentivo claro
- [ ] Botón de compartir y redes sociales enlazadas (verificar que los perfiles existan)
- [ ] Video de presentación si el producto necesita explicación
- [ ] Mapa e indicaciones si hay presencia física
- [ ] Historial de versiones / changelog si es producto técnico

## 10. Medición y post-lanzamiento 🟡

- [ ] Analítica instalada y verificada con un evento de prueba real
- [ ] Eventos de conversión definidos antes de lanzar, no después
- [ ] Parámetros UTM en todas las campañas
- [ ] Monitoreo de errores en producción (Sentry o equivalente)
- [ ] Alertas de caída del sitio
- [ ] Backups automáticos con restauración probada al menos una vez
- [ ] Responsable y canal definidos para incidentes

---

## Revisión final — 5 minutos antes de publicar

1. Abre el sitio en un móvil real, con datos móviles, en modo incógnito.
2. Haz el flujo completo de registro → uso → contacto.
3. Envía un formulario con datos inválidos y con datos válidos.
4. Revisa la consola del navegador: cero errores rojos.
5. Busca "lorem", "TODO", "example.com" y "localhost" en todo el código.