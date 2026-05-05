import { existsSync } from 'fs'
import path from 'path'

import { fetchNasaImage } from '@/lib/nasa'
import StarField        from './components/StarField'
import NebulaBackground from './components/NebulaBackground'
import RocketFixed      from './components/RocketFixed'
import AudioPlayer      from './components/AudioPlayer'
import HeroSection      from './components/HeroSection'
import PlanetSection    from './components/PlanetSection'
import StarsReasons     from './components/StarsReasons'
import SunSection       from './components/SunSection'

/** Returns /photos/<name> only when the file exists in public/photos/. */
function localPhoto(name: string): string | undefined {
  return existsSync(path.join(process.cwd(), 'public', 'photos', name))
    ? `/photos/${name}`
    : undefined
}

const PLANETS = [
  {
    id: 'planet-1',
    planetNumber: 1,
    variant: 'blue' as const,
    color: '#60a5fa',
    title: 'Nuestro primer plan',
    description:
      'Esa tarde nos arreglamos, salimos y el mundo dejó de existir. Solo éramos tú y yo, descubriendo que queríamos seguir así para siempre.',
    imageSrc: localPhoto('memory-1.jpg'),
    imageAlt: 'el primer plan',
    align: 'left' as const,
  },
  {
    id: 'planet-2',
    planetNumber: 2,
    variant: 'purple' as const,
    color: '#c084fc',
    title: 'La aventura que nos unió',
    description:
      'Subimos a ese barco y el mar nos prestó su horizonte. Ahí entendí que contigo cualquier aventura vale la pena.',
    imageSrc: localPhoto('memory-2.jpg'),
    imageAlt: 'la aventura del barco',
    align: 'right' as const,
  },
  {
    id: 'planet-3',
    planetNumber: 3,
    variant: 'blue' as const,
    color: '#60a5fa',
    title: 'Bajo el mismo cielo',
    description:
      'Entre el viento y las piedras antiguas, tu sonrisa fue lo más hermoso del paisaje. Siempre lo será.',
    imageSrc: localPhoto('memory-3.jpg'),
    imageAlt: 'bajo el mismo cielo',
    align: 'left' as const,
  },
  {
    id: 'planet-4',
    planetNumber: 4,
    variant: 'purple' as const,
    color: '#c084fc',
    title: 'Explorando nuestro universo',
    description:
      'Cada lugar nuevo que visitamos juntos se convierte en parte de nuestra historia. Y con cada paso, me enamoro más.',
    imageSrc: localPhoto('memory-4.jpg'),
    imageAlt: 'explorando juntos',
    align: 'right' as const,
  },
  {
    id: 'planet-5',
    planetNumber: 5,
    variant: 'blue' as const,
    color: '#60a5fa',
    title: 'Los días que más te amo',
    description:
      'No son los grandes momentos, son estos: tú, yo, la calma, la naturaleza. Contigo la vida ordinaria se vuelve extraordinaria.',
    imageSrc: localPhoto('memory-5.jpg'),
    imageAlt: 'los días de calma',
    align: 'left' as const,
  },
]

export default async function Home() {
  // NASA backgrounds para los planetas (opacionales, degradan graciosamente)
  const [p1Img, p2Img, p3Img, p4Img, p5Img] = await Promise.all([
    fetchNasaImage('blue nebula galaxy'),
    fetchNasaImage('purple violet nebula space'),
    fetchNasaImage('blue galaxy deep space'),
    fetchNasaImage('purple nebula cosmos'),
    fetchNasaImage('blue star cluster'),
  ])

  const planetImages = [p1Img, p2Img, p3Img, p4Img, p5Img]

  // Foto de Daniela como fondo del Sol
  const sunLocalPhoto = localPhoto('memory-6.jpg')

  return (
    <main className="relative bg-space overflow-x-hidden">
      {/* Capas fijas */}
      <StarField count={280} />
      <NebulaBackground />
      <RocketFixed />
      <AudioPlayer />

      <HeroSection />

      {PLANETS.map((planet, i) => (
        <PlanetSection
          key={planet.id}
          {...planet}
          imageUrl={planetImages[i] ?? undefined}
        />
      ))}

      <StarsReasons />

      <SunSection imageUrl={sunLocalPhoto ?? undefined} />
    </main>
  )
}
