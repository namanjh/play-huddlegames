import GameGrid from '@/components/GameCard'
import { supabase } from '@/lib/supabaseClient' // Import supabase

async function getGames() {
  const { data: games, error } = await supabase
    .from('games')
    .select('*')

  if (error) {
    console.error('Error fetching games:', error)
    return []
  }
  return games
}

export default async function Home() { // Make the component async
  const games = await getGames() // Fetch games

  // Map the fetched games to the format expected by GameGrid
  const formattedGames = games.map(game => ({
    title: game.name,
    description: game.description,
    slug: game.slug,
    tags: game.tags,
    imgSrc: `/static/images/${game.slug}.png`, // Assuming image names match slugs
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Pick a Game to Start Playing
      </h1>
      <GameGrid games={formattedGames} />
    </div>
  )
}