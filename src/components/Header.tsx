import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-6 sm:px-20 bg-transparent">
      <Link href="/" aria-label="HuddleGames">
        <div className="flex items-center space-x-2">
          <Image
            src="/static/images/main-logo.png"
            alt="HuddleGames"
            width={120}
            height={40}
            priority
          />
        </div>
      </Link>
    </header>
  )
}
