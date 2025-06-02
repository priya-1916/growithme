
// import React, { useState, useEffect } from 'react';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const slides = [
//     'https://media.istockphoto.com/id/956366756/photo/tree-growth-three-steps-in-nature-and-beautiful-morning-lighting.jpg?s=612x612&w=0&k=20&c=0RR1skhLmMxHxbVMClJAi3XOtQ1fnfjUNusssi_3La4=',
//     'https://www.shutterstock.com/image-photo/plant-tree-neutral-background-closeup-260nw-1150387082.jpg',
//     'https://media.istockphoto.com/id/915680272/photo/sprout-watered-from-a-watering-can-on-nature-background.jpg?s=612x612&w=0&k=20&c=Cz2is5xCGyCg30o2bcLl-802Ltbio3apLRVmhGyWpw4=',
//   ];

//   useEffect(() => {
//     setIsLoaded(true);
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background slideshow with enhanced transitions */}
//       <div className="absolute inset-0 w-full h-full">
//         {slides.map((slide, index) => (
//           <div 
//             key={index}
//             className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//             style={{
//               backgroundImage: `url(${slide})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat',
//               transitionDelay: `${index === currentSlide ? '0ms' : '300ms'}`
//             }}
//           />
//         ))}
//       </div>

//       {/* Gradient overlay with animated subtle changes */}
//       <div className={`absolute inset-0 z-10 transition-all duration-2000 ease-in-out ${isLoaded ? 'opacity-90' : 'opacity-0'}`}
//            style={{
//              background: 'linear-gradient(135deg, rgba(30, 61, 50, 0.85) 0%, rgba(30, 61, 50, 0.95) 100%)'
//            }}>
//       </div>

//       {/* Content container */}
//       <div className={`relative z-20 flex flex-col items-center justify-center h-full px-6 text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
//         {/* Logo and title with enhanced animation */}
//         <div className={`flex items-center mb-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
//           {/* Enhanced logo with subtle glow */}
//           <div className="mr-4 transform hover:rotate-6 transition-transform duration-500">
//             <svg 
//               className="w-16 h-16 text-white filter drop-shadow-lg" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path 
//                 d="M12 2L3 9L12 16L21 9L12 2Z" 
//                 fill="currentColor" 
//                 className="text-white opacity-90"
//               />
//               <path 
//                 d="M3 9L12 16L21 9" 
//                 stroke="#A3D9A5" 
//                 strokeWidth="2" 
//                 strokeLinejoin="round"
//               />
//               <path 
//                 d="M12 16V22" 
//                 stroke="#A3D9A5" 
//                 strokeWidth="2" 
//                 strokeLinecap="round"
//               />
//               <path 
//                 d="M8 12L16 12" 
//                 stroke="#A3D9A5" 
//                 strokeWidth="2" 
//                 strokeLinecap="round"
//               />
//               <path 
//                 d="M12 8L12 16" 
//                 stroke="#A3D9A5" 
//                 strokeWidth="2" 
//                 strokeLinecap="round"
//                 opacity="0.7"
//               />
//             </svg>
//           </div>
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-xl tracking-tight">
//             <span className="inline-block transform hover:scale-105 transition-transform duration-300">
//               GroWithMe
//             </span>
//           </h1>
//         </div>

//         {/* Tagline with staggered animation */}
//         <p className={`text-xl md:text-2xl lg:text-3xl text-[#D1F2D1] mb-12 max-w-2xl lg:max-w-3xl mx-auto drop-shadow-lg leading-relaxed ${isLoaded ? 'animate-fade-in-up-delay' : 'opacity-0'}`}>
//           Cultivate your green thumb with our intelligent plant care companion
//         </p>

//         {/* Buttons with enhanced hover effects */}
//         <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 ${isLoaded ? 'animate-fade-in-up-delay-more' : 'opacity-0'}`}>
//           <a
//             href="/signup"
//             className="relative px-10 py-4 bg-[#A3D9A5] hover:bg-[#88C999] text-[#1E3D32] text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden group"
//           >
//             <span className="relative z-10 flex items-center">
//               Get Started
//               <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </span>
//             <span className="absolute inset-0 bg-gradient-to-r from-[#A3D9A5] to-[#88C999] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
//           </a>
//           <a
//             href="/learn-more"
//             className="relative px-10 py-4 border-2 border-[#A3D9A5] hover:border-[#88C999] text-[#D1F2D1] hover:text-[#1E3D32] text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden group"
//           >
//             <span className="relative z-10">Learn More</span>
//             <span className="absolute inset-0 bg-[#A3D9A5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
//           </a>
//         </div>

//         {/* Enhanced scroll indicator with animation */}
//         <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isLoaded ? 'animate-bounce-slow' : 'opacity-0'}`}>
//           <div className="flex flex-col items-center">
//             <span className="text-xs text-[#D1F2D1] mb-1 tracking-widest">SCROLL</span>
//             <svg className="w-6 h-6 text-[#D1F2D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Custom styles for animations - could also be in a CSS file */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes bounceSlow {
//           0%, 100% {
//             transform: translateY(0) translateX(-50%);
//           }
//           50% {
//             transform: translateY(-10px) translateX(-50%);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
//         .animate-fade-in-up-delay {
//           animation: fadeInUp 0.8s ease-out 0.3s forwards;
//         }
//         .animate-fade-in-up-delay-more {
//           animation: fadeInUp 0.8s ease-out 0.6s forwards;
//         }
//         .animate-bounce-slow {
//           animation: bounceSlow 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { FiCalendar, FiBook, FiDroplet, FiSun, FiClipboard } from 'react-icons/fi';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const slides = [
    'https://media.istockphoto.com/id/956366756/photo/tree-growth-three-steps-in-nature-and-beautiful-morning-lighting.jpg?s=612x612&w=0&k=20&c=0RR1skhLmMxHxbVMClJAi3XOtQ1fnfjUNusssi_3La4=',
    'https://www.shutterstock.com/image-photo/plant-tree-neutral-background-closeup-260nw-1150387082.jpg',
    'https://media.istockphoto.com/id/915680272/photo/sprout-watered-from-a-watering-can-on-nature-background.jpg?s=612x612&w=0&k=20&c=Cz2is5xCGyCg30o2bcLl-802Ltbio3apLRVmhGyWpw4=',
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const features = [
    {
      icon: <FiDroplet className="w-12 h-12" />,
      title: "Smart Watering Reminders",
      description: "Get personalized watering schedules based on plant type, season, and your local climate. Never over or under-water again."
    },
    {
      icon: <FiBook className="w-12 h-12" />,
      title: "Plant Care Blog",
      description: "Learn from expert articles and community posts. Share your own plant journey and tips with other gardening enthusiasts."
    },
    {
      icon: <FiCalendar className="w-12 h-12" />,
      title: "Complete Care Calendar",
      description: "Track all plant care activities in one place - fertilizing, pruning, repotting, and more with customizable reminders."
    }
  ];

  const popularGuides = [
    {
      title: "Beginner's Guide to Houseplants",
      excerpt: "Everything you need to know to start your indoor garden",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "How to Save an Overwatered Plant",
      excerpt: "Emergency care steps to rescue your drowning green friends",
      image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Seasonal Plant Care Checklist",
      excerpt: "Monthly guide to keeping your plants thriving year-round",
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const reminderFeatures = [
    {
      icon: <FiClipboard className="w-8 h-8" />,
      title: "Custom Tasks",
      description: "Create custom care tasks for your unique plants"
    },
    {
      icon: <FiSun className="w-8 h-8" />,
      title: "Light Tracking",
      description: "Monitor sunlight needs and get rotation reminders"
    },
    {
      icon: <FiDroplet className="w-8 h-8" />,
      title: "Water Tracking",
      description: "Log waterings and get smart future predictions"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              style={{
                backgroundImage: `url(${slide})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transitionDelay: `${index === currentSlide ? '0ms' : '300ms'}`
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className={`absolute inset-0 z-10 transition-all duration-2000 ${isLoaded ? 'opacity-90' : 'opacity-0'}`}
             style={{
               background: 'linear-gradient(135deg, rgba(30, 61, 50, 0.85) 0%, rgba(30, 61, 50, 0.95) 100%)'
             }}>
        </div>

        {/* Content */}
        <div className={`relative z-20 flex flex-col items-center justify-center h-full px-6 text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`flex items-center mb-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="mr-4 transform hover:rotate-6 transition-transform duration-500">
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 9L12 16L21 9L12 2Z" fill="currentColor" className="text-white opacity-90"/>
                <path d="M3 9L12 16L21 9" stroke="#A3D9A5" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 16V22" stroke="#A3D9A5" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12L16 12" stroke="#A3D9A5" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 8L12 16" stroke="#A3D9A5" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              GroWithMe
            </h1>
          </div>

          <p className={`text-xl md:text-2xl text-[#D1F2D1] mb-12 max-w-2xl mx-auto leading-relaxed ${isLoaded ? 'animate-fade-in-up-delay' : 'opacity-0'}`}>
            Your complete guide to growing healthy plants with personalized care reminders 
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fade-in-up-delay-more' : 'opacity-0'}`}>
            <a
              href="/signup"
              className="px-8 py-3 bg-[#A3D9A5] hover:bg-[#88C999] text-[#1E3D32] font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Start Growing
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-[#A3D9A5] text-[#D1F2D1] hover:bg-[#A3D9A5] hover:text-[#1E3D32] font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Explore Blog
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#F8FBF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D32] mb-4">Grow With Confidence</h2>
            <p className="text-lg text-[#5A7D6E] max-w-2xl mx-auto">
              Everything you need to nurture your plants from seedlings to thriving beauties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[#A3D9A5] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1E3D32] mb-2">{feature.title}</h3>
                <p className="text-[#5A7D6E]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Guides Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D32] mb-4">Popular Plant Guides</h2>
            <p className="text-lg text-[#5A7D6E] max-w-2xl mx-auto">
              Learn from our community of plant experts and enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {popularGuides.map((guide, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover"/>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-[#1E3D32] mb-2">{guide.title}</h3>
                  <p className="text-[#5A7D6E] mb-4">{guide.excerpt}</p>
                  <a href="#" className="text-[#A3D9A5] font-medium hover:text-[#1E3D32] transition-colors">
                    Read Guide →
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="/blog" className="inline-block px-6 py-3 bg-[#1E3D32] text-white font-medium rounded-full hover:bg-[#2D5A4A] transition-colors">
              View All Blog Posts
            </a>
          </div>
        </div>
      </section>

      {/* Reminder System Section */}
      <section className="py-16 px-6 bg-[#F1F8F1]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D32] mb-6">Never Forget Plant Care Again</h2>
              <p className="text-lg text-[#5A7D6E] mb-8">
                Our smart reminder system helps you stay on top of all your plant care tasks with:
              </p>
              
              <div className="space-y-6">
                {reminderFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-[#A3D9A5] mr-4 mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1E3D32]">{feature.title}</h3>
                      <p className="text-[#5A7D6E]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a href="/reminders" className="inline-block mt-8 px-6 py-3 bg-[#A3D9A5] text-[#1E3D32] font-medium rounded-full hover:bg-[#88C999] transition-colors">
                Set Up Reminders
              </a>
            </div>
            
            <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Plant care app interface" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#1E3D32] to-[#2D5A4A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Plant Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of plant lovers and grow your knowledge along with your plants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-3 bg-[#A3D9A5] hover:bg-[#88C999] text-[#1E3D32] font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Create Free Account
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-white hover:bg-white hover:text-[#1E3D32] font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-up-delay {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
        }
        .animate-fade-in-up-delay-more {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;