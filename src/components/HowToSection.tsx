import FrostedContainer from './FrostedContainer'

interface HowToSectionProps {
  title: string
  icon: string
  items: string[]
  titleColor?: string
}

export default function HowToSection({
  title,
  icon,
  items,
  titleColor = 'text-pink-800',
}: HowToSectionProps) {
  return (
    <FrostedContainer>
      <h2 className={`text-xl font-bold mb-4 ${titleColor}`}>
        {icon} {title}
      </h2>
      <ul className="list-disc pl-6 text-sm text-gray-800">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </FrostedContainer>
  )
}
