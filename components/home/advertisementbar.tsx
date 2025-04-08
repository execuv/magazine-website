import Link from "next/link"

interface AdvertisementBarProps {
  width: number
  height: number
  link?: string
  className?: string
  imageUrl?: string
}

export default function AdvertisementBar({
  width,
  height,
  link = "#",
  className = "",
  imageUrl,
}: AdvertisementBarProps) {
  const content = (
    <div
      className={`relative border border-gray-300 flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
    >
      {imageUrl ? (
        <img src={imageUrl || "/placeholder.svg"} alt="Advertisement" className="w-full h-full object-cover" />
      ) : (
        <div className="bg-muted border border-dashed border-gray-300 flex items-center justify-center w-full h-full">
          <p className="text-muted-foreground text-sm font-medium">
            Advertisement Space {width}x{height}
          </p>
        </div>
      )}
      <div className="absolute top-1 right-1 bg-black/50 text-white text-[10px] px-1 py-0.5 rounded">Ad</div>
    </div>
  )

  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
