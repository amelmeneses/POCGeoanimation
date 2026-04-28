# ESS — You Are Here

POC de un logo 3D geo-animado construido con **Three.js** y **GSAP**. Un modelo GLB rota en función de coordenadas geográficas, mostrando información de ubicación con estética espacial oscura y tipografía monoespaciada.

## Vista general

La aplicación presenta un logo 3D que reacciona a diferentes ubicaciones geográficas. Al seleccionar una ubicación, el modelo rota suavemente hacia una orientación derivada de sus coordenadas (latitud/longitud), mientras un panel muestra datos como Declinación, Ascensión Recta, y coordenadas DMS.

## Tech Stack

| Herramienta | Uso |
|---|---|
| **Three.js** (v0.183) | Renderizado 3D, carga de modelos GLB (GLTFLoader) |
| **GSAP** (v3.14) | Animaciones fluidas de rotación |
| **TypeScript** (v6) | Tipado estático |
| **Vite** (v8) | Bundler y dev server |

## Estructura del proyecto

```
src/
├── main.ts                  # Entry point
├── app.ts                   # Orquestador principal de la aplicación
├── styles.css               # Estilos globales (dark UI, responsive)
├── geo/
│   ├── geoTypes.ts          # Interfaces: GeoLocation, Rotation3D
│   ├── geoConfig.ts         # Ubicación del usuario (mock) + ubicaciones preset
│   └── geoToRotation.ts     # Mapeo artístico lat/lng → rotación 3D
├── three/
│   ├── scene.ts             # Inicialización de escena, renderer y render loop
│   ├── camera.ts            # Configuración de cámara perspectiva
│   ├── lights.ts            # Setup de iluminación (ambient + 3 directional)
│   └── logoRenderer.ts      # Carga del GLB, material, animación con GSAP
├── ui/
│   ├── state.ts             # Estado global reactivo (pub/sub)
│   ├── headerInfo.ts        # Actualización del panel "YOU ARE HERE"
│   └── locationsList.ts     # Accordion de ubicaciones con canvas 3D embebido
└── utils/
    ├── constants.ts          # Config del modelo, límites de rotación, cámara, animación
    └── formatters.ts         # Conversores: decimal→DMS, lat→Dec, lng→RA

public/
└── models/
    └── logo.glb             # Modelo 3D del logo
```

## Cómo funciona

1. **Carga inicial**: Se inicializa la escena Three.js en el header y se carga el modelo `logo.glb`.
2. **Geolocalización mock**: La ubicación del usuario viene hardcodeada (Cuenca, Ecuador). Diseñado para reemplazar con un servicio Geo-IP real.
3. **Mapeo geo → rotación**: `latLngToRotation()` convierte coordenadas a rotaciones 3D dentro de límites legibles (±36° pitch, ±60° yaw, ±22.5° roll).
4. **Accordion de ubicaciones**: Al hacer click en una ubicación (Tokyo, Barcelona, The Moon, Mars), se crea una escena 3D independiente y ambos logos (header + accordion) animan hacia la nueva orientación.
5. **Panel de info**: Muestra Declinación, Ascensión Recta (pseudo-astronómicas), latitud/longitud en formato DMS, y un breadcrumb de ubicación.

## Ubicaciones disponibles

| Ubicación | Coordenadas | Breadcrumb |
|---|---|---|
| Cuenca (default) | -2.90, -79.00 | CUENCA / ECUADOR / SOUTH AMERICA |
| Tokyo | 35.69, 139.69 | TOKYO / JAPAN / ASIA |
| Barcelona | 41.39, 2.17 | BARCELONA / SPAIN / EUROPE |
| The Moon | 0.69, 23.43 | SEA OF TRANQUILITY / THE MOON |
| Mars | 18.65, -133.80 | OLYMPUS MONS / MARS |

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
tsc && npm run build

# Preview del build
npm run preview
```

## Notas técnicas

- **Fallback**: Si el modelo GLB no carga, se renderiza un TorusKnot como placeholder.
- **Debug**: Existe un flag `DEBUG_ORBIT` en `app.ts` para habilitar OrbitControls y explorar la escena libremente.
- **Responsive**: El layout se adapta a pantallas menores de 720px con reorganización vertical.
- **Renderer**: Usa `alpha: true` para fondo transparente, ACES Filmic tone mapping, y pixel ratio limitado a 2x.
- **Estado**: Implementación pub/sub minimalista en `ui/state.ts` sin dependencias externas.
