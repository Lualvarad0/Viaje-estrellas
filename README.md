# Viaje a las Estrellas 🌌

Sitio web de aniversario: un viaje interactivo por el universo dedicado a Daniela.

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion v12**
- **NASA Images API** (fondos espaciales, sin clave requerida)

## Secciones

| Sección | Descripción |
|---|---|
| Hero | Título animado con campo de estrellas |
| Planetas (×5) | Cada planeta orbita con lunas y muestra un recuerdo con foto |
| Razones | Grid de estrellas interactivas con partículas al hacer clic |
| Sol | Sección final con sol animado y foto de fondo |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Assets requeridos

### Fotos (`public/photos/`)

Coloca las fotos con estos nombres exactos:

```
memory-1.jpg   # Recuerdo 1
memory-2.jpg   # Recuerdo 2
memory-3.jpg   # Recuerdo 3
memory-4.jpg   # Recuerdo 4
memory-5.jpg   # Recuerdo 5
memory-6.jpg   # Foto para el fondo del Sol
```

Las fotos son opcionales — si no existen, las secciones usan fondos NASA de respaldo.

### Audio (`public/audio/`)

Coloca la canción con este nombre exacto:

```
eres-mi-sol.mp3
```

Sin el archivo, el botón de reproducción no tendrá audio.

## Deploy en Vercel

1. Importa el repositorio desde [vercel.com/new](https://vercel.com/new)
2. Vercel detecta Next.js automáticamente — no se necesita configuración adicional
3. Haz clic en **Deploy**

> No se requieren variables de entorno. La NASA Images API es pública.

## Estructura

```
app/
├── components/
│   ├── AudioPlayer.tsx       # Reproductor flotante de música
│   ├── HeroSection.tsx       # Sección inicial
│   ├── NasaBgLayer.tsx       # Capa de fondo NASA con fade-in
│   ├── NebulaBackground.tsx  # Nebulosas dinámicas según sección
│   ├── PlanetSection.tsx     # Sección de planeta + recuerdo
│   ├── RocketFixed.tsx       # Cohete fijo que sube con el scroll
│   ├── StarField.tsx         # Campo de estrellas parpadeantes
│   ├── StarsReasons.tsx      # Grid de razones interactivas
│   └── SunSection.tsx        # Sección final con sol animado
├── globals.css               # Tokens de diseño + keyframes CSS
├── layout.tsx
└── page.tsx                  # Orquesta secciones y fetches NASA
lib/
└── nasa.ts                   # Cliente NASA Images API
public/
├── audio/                    # eres-mi-sol.mp3 (agregar manualmente)
└── photos/                   # memory-1.jpg … memory-6.jpg
```
