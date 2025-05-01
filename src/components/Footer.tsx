import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
      <div className="mb-2">© {new Date().getFullYear()} HuddleGames</div>
      <Link href="/" className="hover:underline">
        play.huddlegames.com
      </Link>
    </footer>
  )
}
