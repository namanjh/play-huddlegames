'use client'

import Link from 'next/link'
import Image from 'next/image'

type Game = {
  title: string
  description: string
  slug: string
  tags: string[]
  imgSrc: string
}

type Props = {
  games: Game[]
}

const GameGrid = ({ games }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {games.map((game, idx) => (
          <Link key={idx} href={`${game.slug}`} className="block">
            <div className="flex h-full flex-col gap-6 rounded-xl bg-white/30 p-6 shadow-lg ring-1 ring-white/20 backdrop-blur-xl transition hover:shadow-xl lg:flex-row dark:bg-white/10">
              {/* Image */}
              <div className="h-40 w-full flex-shrink-0 lg:h-32 lg:w-40">
                <Image
                  alt={game.title}
                  src={game.imgSrc}
                  className="h-full w-full rounded-lg object-cover"
                  width={160}
                  height={128}
                />
              </div>

              {/* Text Section */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 text-xl font-semibold text-[color:var(--foreground)]">
                  {game.title}
                </h3>
                <p className="text-md mb-4 break-words text-[color:var(--foreground)]">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default GameGrid
