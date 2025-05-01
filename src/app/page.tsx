import GameGrid from '@/components/GameCard'

const dummyGames = [
  {
    title: 'Password Game',
    description: 'A fun word guessing game where you give one-word clues to guess the secret password.',
    slug: 'password-game',
    tags: ['word', 'team', 'deduction'],
    imgSrc: '/static/images/find-my-password.png',
  },
  {
    title: 'Categories',
    description: 'Pick a category and challenge your teammates to come up with answers that fit!',
    slug: 'categories',
    tags: ['quiz', 'team', 'fast'],
    imgSrc: '/static/images/categories.png',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Pick a Game to Start Playing
      </h1>
      <GameGrid games={dummyGames} />
    </div>
  )
}
