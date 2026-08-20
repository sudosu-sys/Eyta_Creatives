'use client'

export default function Gallery() {
  const media = [
    // Top row
    { span: 'md:col-span-2', height: 'h-[300px] md:h-[500px]', videoSrc: '/aya.mp4', poster: '/aya.jpg' },
    { span: 'md:col-span-1', height: 'h-[300px] md:h-[500px]', videoSrc: '/damat.mp4', poster: '/damat.jpg' },
    // Middle row
    { span: 'md:col-span-1', height: 'h-[300px] md:h-[400px]', videoSrc: '/ag_palace.mp4', poster: '/ag_palace.PNG' },
    { span: 'md:col-span-1', height: 'h-[300px] md:h-[400px]', videoSrc: '/beka_burger.mp4', poster: '/beka_burger.PNG' },
    { span: 'md:col-span-1', height: 'h-[300px] md:h-[400px]', videoSrc: '/about.mp4', poster: '/about.png' },
  ]

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-[#F0F1F3]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <h2 
          className="text-6xl md:text-8xl tracking-tight text-black"
          style={{ fontFamily: 'var(--font-zodiak), serif' }}
        >
          Proof
        </h2>
        <p className="text-black/80 text-sm md:text-base max-w-[250px] md:text-right leading-relaxed md:pb-3">
          Captured moments from our desert trips and scenic routes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {media.map((item, idx) => (
          <div 
            key={idx} 
            className={`relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center border border-black/5 ${item.span} ${item.height} group`}
          >
            {item.videoSrc ? (
              <>
                <video
                  src={item.videoSrc}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                />
                <img 
                  src={item.poster}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0 pointer-events-none"
                />
              </>
            ) : (
              <span className="text-black/30 font-medium text-sm">Video {idx + 1}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}