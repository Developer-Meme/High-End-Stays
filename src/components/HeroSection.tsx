import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hero images optimized for mobile and desktop
const heroImages = [
{
  url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  mobileUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  alt: 'Luxury apartment exterior with stunning architecture'
},
{
  url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
  mobileUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  alt: 'Modern living room with contemporary design'
},
{
  url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  mobileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  alt: 'Beautiful home with inviting atmosphere'
},
{
  url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80',
  mobileUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  alt: 'Cozy bedroom with premium bedding'
}];


export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollToAmenities = () => {
    const element = document.getElementById('amenities');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section data-ev-id="ev_7645d8b9f3" id="home" className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
			{/* Background slideshow */}
			<div data-ev-id="ev_4530a1e7c8" className="absolute inset-0">
				{heroImages.map((image, index) =>
        <div data-ev-id="ev_460a2f6f17"
        key={index}
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`
        }>

						<img data-ev-id="ev_a1fae28f09"
          src={isMobile ? image.mobileUrl : image.url}
          alt={image.alt}
          className="w-full h-full object-cover object-center"
          loading={index === 0 ? 'eager' : 'lazy'} />

					</div>
        )}
				{/* Dark overlay */}
				<div data-ev-id="ev_5f5ce9fbf6" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
			</div>

			{/* Animated particles/bokeh effect */}
			<div data-ev-id="ev_96ae075f37" className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 15 }).map((_, i) =>
        <div data-ev-id="ev_d03c65d064"
        key={i}
        className="absolute w-1 h-1 md:w-2 md:h-2 bg-white/20 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }} />

        )}
			</div>

			{/* Slide navigation arrows - hidden on mobile */}
			<button data-ev-id="ev_640b81c911"
      onClick={prevSlide}
      className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
      aria-label="Previous slide">

				<ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
			</button>
			<button data-ev-id="ev_b97a3f6cc8"
      onClick={nextSlide}
      className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
      aria-label="Next slide">

				<ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
			</button>

			{/* Slide indicators */}
			<div data-ev-id="ev_ed0d09bde3" className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
				{heroImages.map((_, index) =>
        <button data-ev-id="ev_ae61c8d153"
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`h-1.5 rounded-full transition-all duration-500 ${
        index === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`
        }
        aria-label={`Go to slide ${index + 1}`} />

        )}
			</div>

			{/* Main content */}
			<div data-ev-id="ev_65e3397145" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* Script accent */}
				<p data-ev-id="ev_c01fc6473b" className="font-script text-3xl sm:text-4xl lg:text-5xl text-white/90 mb-3 md:mb-4 animate-fade-in-up">
					Welcome to Luxury
				</p>

				{/* Main headline */}
				<h1 data-ev-id="ev_72d92582b9" className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4 md:mb-6 tracking-tight animate-fade-in-up animation-delay-200">
					Premium BnB Living in
					<br data-ev-id="ev_ef30c8511b" />
					<span data-ev-id="ev_d77dee8299" className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400">
						Kenya's Finest Stays
					</span>
				</h1>

				{/* Subheadline */}
				<p data-ev-id="ev_4ede145cbc" className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/80 mb-8 md:mb-10 leading-relaxed animate-fade-in-up animation-delay-400 px-2">
					Sleek, modern, and fully equipped BnB spaces for business, family getaways, or luxury staycations.
				</p>

				{/* CTA Button */}
				<div data-ev-id="ev_0912abdafd" className="animate-fade-in-up animation-delay-600">
					<button data-ev-id="ev_8625c92457"
          onClick={scrollToAmenities}
          className="px-8 py-3.5 bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300">

						Explore Our Stays
					</button>
				</div>

				{/* Trust indicators */}
				<div data-ev-id="ev_e29c10c310" className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-white/70 animate-fade-in-up animation-delay-800">
					<div data-ev-id="ev_649ffff77a" className="flex items-center gap-2">
						<span data-ev-id="ev_6b25458c58" className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
						<span data-ev-id="ev_eb70f71978">24/7 Support</span>
					</div>
					<div data-ev-id="ev_212cec4e47" className="flex items-center gap-2">
						<span data-ev-id="ev_cbc517674e" className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400" />
						<span data-ev-id="ev_63a8a79090">Premium Locations</span>
					</div>
					<div data-ev-id="ev_e330a8466f" className="flex items-center gap-2">
						<span data-ev-id="ev_d4787ca4b6" className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400" />
						<span data-ev-id="ev_2c5ff6a559">Verified Properties</span>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div data-ev-id="ev_bf7009ef13" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20">
				<div data-ev-id="ev_cc4b1d5ed9" className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-white/40 flex justify-center pt-1.5 md:pt-2">
					<div data-ev-id="ev_5a20368c96" className="w-1 h-2 md:w-1.5 md:h-3 rounded-full bg-white/60 animate-scroll" />
				</div>
			</div>

			<style data-ev-id="ev_dbdf1bcfc7">{`
				@keyframes fade-in-up {
					from { opacity: 0; transform: translateY(30px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in-up {
					animation: fade-in-up 1s ease-out forwards;
					opacity: 0;
				}
				.animation-delay-200 { animation-delay: 0.2s; }
				.animation-delay-400 { animation-delay: 0.4s; }
				.animation-delay-600 { animation-delay: 0.6s; }
				.animation-delay-800 { animation-delay: 0.8s; }
				@keyframes scroll {
					0%, 100% { opacity: 0; transform: translateY(0); }
					50% { opacity: 1; transform: translateY(4px); }
				}
				.animate-scroll {
					animation: scroll 2s ease-in-out infinite;
				}
				@keyframes float {
					0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
					10% { opacity: 0.6; }
					50% { transform: translateY(-100px) translateX(20px); opacity: 0.3; }
					90% { opacity: 0.6; }
				}
				.animate-float {
					animation: float 10s ease-in-out infinite;
				}
			`}</style>
		</section>);

}