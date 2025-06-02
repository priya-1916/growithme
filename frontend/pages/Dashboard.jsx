// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import { PlantContext } from "../src/context/PlantContext";

// const Dashboard = () => {
//   const [plants, setPlants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPlants, setFilteredPlants] = useState([]);
//   const { 
//     favorites, 
//     bookmarks, 
//     addFavorite, 
//     addBookmark, 
//     removeFavorite, 
//     removeBookmark 
//   } = useContext(PlantContext);

//   useEffect(() => {
//     fetch('/plant_data.json')
//       .then(res => res.json())
//       .then(data => {
//         console.log('Plant data loaded:', data);
//         setPlants(data);
//       })
//       .catch(err => console.error('Error loading data:', err));
//   }, []);

//   const handleSearch = () => {
//     const term = searchTerm.trim().toLowerCase();
//     if (term === '') {
//       setFilteredPlants([]);
//       return;
//     }
    
//     const matches = plants.filter(p =>
//       p.plant_name.toLowerCase().includes(term)
//     );
//     console.log('Search results:', matches);
//     setFilteredPlants(matches);
//   };

//   const isFavorited = (plant) => {
//     return favorites.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
//   };

//   const isBookmarked = (plant) => {
//     return bookmarks.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
//   };

//   const handleFavoriteClick = (plant, e) => {
//     e.stopPropagation();
//     if (isFavorited(plant)) {
//       removeFavorite(plant._id || plant.plant_name);
//     } else {
//       addFavorite({
//         _id: plant._id || plant.plant_name,
//         plant_name: plant.plant_name,
//         botanical_name: plant.botanical_name,
//         description: plant.description || '',
//         how_to_grow: plant.how_to_grow || []
//       });
//     }
//   };

//   const handleBookmarkClick = (plant, e) => {
//     e.stopPropagation();
//     if (isBookmarked(plant)) {
//       removeBookmark(plant._id || plant.plant_name);
//     } else {
//       addBookmark({
//         _id: plant._id || plant.plant_name,
//         plant_name: plant.plant_name,
//         botanical_name: plant.botanical_name,
//         description: plant.description || '',
//         how_to_grow: plant.how_to_grow || []
//       });
//     }
//   };

  
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-green-800 mb-6">Plant Finder</h1>
//       <div className="flex space-x-2 mb-8">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search for plants..."
//           className="flex-grow border-2 border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-200 shadow-md"
//         >
//           Search
//         </button>
//       </div>

//       {filteredPlants.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredPlants.map((plant) => (
//             <div key={plant._id || plant.plant_name} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-3">
//                   <h2 className="text-2xl font-bold text-gray-800">{plant.plant_name}</h2>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={(e) => handleFavoriteClick(plant, e)}
//                       className={`p-2 rounded-full ${isFavorited(plant) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-50 transition`}
//                       aria-label={isFavorited(plant) ? 'Remove from favorites' : 'Add to favorites'}
//                     >
//                       {isFavorited(plant) ? (
//                         <span className="text-red-500">❤️</span>
//                       ) : (
//                         <span className="text-gray-500">🤍</span>
//                       )}
//                     </button>
//                     <button
//                       onClick={(e) => handleBookmarkClick(plant, e)}
//                       className={`p-2 rounded-full ${isBookmarked(plant) ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'} hover:bg-yellow-50 transition`}
//                       aria-label={isBookmarked(plant) ? 'Remove from bookmarks' : 'Add to bookmarks'}
//                     >
//                       {isBookmarked(plant) ? (
//                         <span className="text-yellow-500">🔖</span>
//                       ) : (
//                         <span className="text-gray-500">📖</span>
//                       )}
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2 text-gray-600">
//                   {plant.botanical_name && (
//                     <p className="italic text-green-700">{plant.botanical_name}</p>
//                   )}
//                   <div className="flex flex-wrap gap-2 my-3">
//                     <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//                       {plant.category}
//                     </span>
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                       {plant.sunlight}
//                     </span>
//                     <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
//                       {plant.water_needs}
//                     </span>
//                   </div>
                  
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-green-700 mb-2">Growing Guide:</h4>
//                     <ul className="list-disc pl-5 space-y-1">
//                       {plant.how_to_grow.map((tip, index) => (
//                         <li key={index} className="text-sm">{tip}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : searchTerm ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500 text-lg">No plants found matching "{searchTerm}"</p>
//         </div>
//       ) : (
//         <div className="text-center py-10">
//           <p className="text-gray-500 text-lg">Search for plants to see growing instructions</p>
//           <p className="text-gray-400">Try searching for "rose", "basil", or "fern"</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import { PlantContext } from "../src/context/PlantContext";

// const Dashboard = () => {
//   const [plants, setPlants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPlants, setFilteredPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);
//   const { 
//     favorites, 
//     bookmarks, 
//     addFavorite, 
//     addBookmark, 
//     removeFavorite, 
//     removeBookmark 
//   } = useContext(PlantContext);

//   useEffect(() => {
//     fetch('/plant_data.json')
//       .then(res => res.json())
//       .then(data => {
//         console.log('Plant data loaded:', data);
//         setPlants(data);
//       })
//       .catch(err => console.error('Error loading data:', err));
//   }, []);

//   const handleSearch = () => {
//     const term = searchTerm.trim().toLowerCase();
//     if (term === '') {
//       setFilteredPlants([]);
//       setSelectedPlant(null);
//       return;
//     }
    
//     const matches = plants.filter(p =>
//       p.plant_name.toLowerCase().includes(term)
//     );
//     console.log('Search results:', matches);
//     setFilteredPlants(matches);
//     setSelectedPlant(null);
//   };

//   const isFavorited = (plant) => {
//     return favorites.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
//   };

//   const isBookmarked = (plant) => {
//     return bookmarks.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
//   };

//   const handleFavoriteClick = (plant, e) => {
//     e.stopPropagation();
//     if (isFavorited(plant)) {
//       removeFavorite(plant._id || plant.plant_name);
//     } else {
//       addFavorite({
//         _id: plant._id || plant.plant_name,
//         plant_name: plant.plant_name,
//         botanical_name: plant.botanical_name,
//         description: plant.description || '',
//         how_to_grow: plant.how_to_grow || []
//       });
//     }
//   };

//   const handleBookmarkClick = (plant, e) => {
//     e.stopPropagation();
//     if (isBookmarked(plant)) {
//       removeBookmark(plant._id || plant.plant_name);
//     } else {
//       addBookmark({
//         _id: plant._id || plant.plant_name,
//         plant_name: plant.plant_name,
//         botanical_name: plant.botanical_name,
//         description: plant.description || '',
//         how_to_grow: plant.how_to_grow || []
//       });
//     }
//   };

//   const openPlantDetail = (plant) => {
//     setSelectedPlant(plant);
//   };

//   const closePlantDetail = () => {
//     setSelectedPlant(null);
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto min-h-screen">
//       <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">🌿 Plant Care Dashboard</h1>
      
//       {/* Search Section */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-green-50 rounded-xl shadow-inner">
//         <div className="flex-grow relative">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search for plants (e.g., jasmine, rose, basil)..."
//             className="w-full border-2 border-green-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           />
//           <svg 
//             className="absolute right-3 top-4 h-6 w-6 text-green-400" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <button
//           onClick={handleSearch}
//           className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//           Search
//         </button>
//       </div>

//       {/* Results Section */}
//       {filteredPlants.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           {filteredPlants.map((plant) => (
//             <div 
//               key={plant._id || plant.plant_name} 
//               className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
//               onClick={() => openPlantDetail(plant)}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">{plant.plant_name}</h2>
//                     <p className="italic text-green-700">{plant.botanical_name}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={(e) => handleFavoriteClick(plant, e)}
//                       className={`p-2 rounded-full ${isFavorited(plant) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-50 transition`}
//                       aria-label={isFavorited(plant) ? 'Remove from favorites' : 'Add to favorites'}
//                     >
//                       <svg className="w-5 h-5" fill={isFavorited(plant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={(e) => handleBookmarkClick(plant, e)}
//                       className={`p-2 rounded-full ${isBookmarked(plant) ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'} hover:bg-yellow-50 transition`}
//                       aria-label={isBookmarked(plant) ? 'Remove from bookmarks' : 'Add to bookmarks'}
//                     >
//                       <svg className="w-5 h-5" fill={isBookmarked(plant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-2 my-4">
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {plant.category}
//                   </span>
//                   <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {plant.sunlight}
//                   </span>
//                   <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {plant.water_needs}
//                   </span>
//                 </div>
                
//                 <div className="mt-4">
//                   <p className="text-gray-600 line-clamp-3">{plant.description || 'No description available'}</p>
//                 </div>
                
//                 <div className="mt-6">
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openPlantDetail(plant);
//                     }}
//                     className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
//                   >
//                     View Details
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : searchTerm ? (
//         <div className="text-center py-16 bg-white rounded-xl shadow-sm">
//           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-700">No plants found</h3>
//           <p className="mt-1 text-gray-500">No results for "{searchTerm}"</p>
//           <button
//             onClick={() => setSearchTerm('')}
//             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
//           >
//             Clear search
//           </button>
//         </div>
//       ) : (
//         <div className="text-center py-16 bg-white rounded-xl shadow-sm">
//           <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-700">Discover Plants</h3>
//           <p className="mt-1 text-gray-500">Search for plants to see growing instructions</p>
//           <p className="mt-2 text-gray-400 text-sm">Try searching for "jasmine", "rose", or "basil"</p>
//         </div>
//       )}

//       {/* Plant Detail Modal */}
//       {selectedPlant && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-gray-800">{selectedPlant.plant_name}</h2>
//               <button 
//                 onClick={closePlantDetail}
//                 className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div className="md:col-span-2">
//                   <h3 className="text-xl font-semibold text-green-800 mb-4">Plant Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-medium text-gray-700">Botanical Name</h4>
//                       <p className="italic text-green-700">{selectedPlant.botanical_name}</p>
//                     </div>
                   
//                   </div>
//                 </div>
                
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <h3 className="text-xl font-semibold text-green-800 mb-4">Quick Facts</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <h4 className="font-medium text-gray-700">Category</h4>
//                       <p className="text-gray-600">{selectedPlant.category}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Sunlight</h4>
//                       <p className="text-gray-600">{selectedPlant.sunlight}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Water Needs</h4>
//                       <p className="text-gray-600">{selectedPlant.water_needs}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Soil Type</h4>
//                       <p className="text-gray-600">{selectedPlant.soil_type}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Climate</h4>
//                       <p className="text-gray-600">{selectedPlant.climate}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Growth Time</h4>
//                       <p className="text-gray-600">{selectedPlant.growth_time}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">Growing Guide</h3>
//                   <ul className="space-y-2">
//                     {selectedPlant.how_to_grow.map((tip, index) => (
//                       <li key={index} className="flex items-start">
//                         <span className="flex-shrink-0 mt-1 mr-2 text-blue-500">•</span>
//                         <p className="text-gray-700">{tip}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="bg-yellow-50 p-4 rounded-lg">
//                   <h3 className="text-xl font-semibold text-yellow-800 mb-4">Maintenance Tips</h3>
//                   <ul className="space-y-2">
//                     {selectedPlant.maintenance_tips.map((tip, index) => (
//                       <li key={index} className="flex items-start">
//                         <span className="flex-shrink-0 mt-1 mr-2 text-yellow-500">•</span>
//                         <p className="text-gray-700">{tip}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
              
//               <div className="mt-6 bg-purple-50 p-4 rounded-lg">
//                 <h3 className="text-xl font-semibold text-purple-800 mb-4">Fertilization</h3>
//                 <p className="text-gray-700">{selectedPlant.fertilizer}</p>
//               </div>
              
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   onClick={(e) => {
//                     handleFavoriteClick(selectedPlant, e);
//                   }}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isFavorited(selectedPlant) ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'} hover:bg-red-50 transition`}
//                 >
//                   <svg className="w-5 h-5" fill={isFavorited(selectedPlant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                   {isFavorited(selectedPlant) ? 'Favorited' : 'Add to Favorites'}
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     handleBookmarkClick(selectedPlant, e);
//                   }}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isBookmarked(selectedPlant) ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'} hover:bg-yellow-50 transition`}
//                 >
//                   <svg className="w-5 h-5" fill={isBookmarked(selectedPlant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                   </svg>
//                   {isBookmarked(selectedPlant) ? 'Bookmarked' : 'Add to Bookmarks'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


'use client';
import React, { useState, useEffect, useContext } from 'react';
import { PlantContext } from "../src/context/PlantContext";

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { 
    favorites, 
    bookmarks, 
    addFavorite, 
    addBookmark, 
    removeFavorite, 
    removeBookmark 
  } = useContext(PlantContext);

  useEffect(() => {
    fetch('/plant_data.json')
      .then(res => res.json())
      .then(data => {
        console.log('Plant data loaded:', data);
        setPlants(data);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === '') {
      setFilteredPlants([]);
      setSelectedPlant(null);
      return;
    }
    
    const matches = plants.filter(p =>
      p.plant_name.toLowerCase().includes(term)
    );
    console.log('Search results:', matches);
    setFilteredPlants(matches);
    setSelectedPlant(null);
  };

  const isFavorited = (plant) => {
    return favorites.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
  };

  const isBookmarked = (plant) => {
    return bookmarks.some(p => p._id === plant._id || p.plant_name === plant.plant_name);
  };

  const handleFavoriteClick = (plant, e) => {
    e.stopPropagation();
    if (isFavorited(plant)) {
      removeFavorite(plant._id || plant.plant_name);
    } else {
      addFavorite({
        _id: plant._id || plant.plant_name,
        plant_name: plant.plant_name,
        botanical_name: plant.botanical_name,
        how_to_grow: plant.how_to_grow || []
      });
    }
  };

  const handleBookmarkClick = (plant, e) => {
    e.stopPropagation();
    if (isBookmarked(plant)) {
      removeBookmark(plant._id || plant.plant_name);
    } else {
      addBookmark({
        _id: plant._id || plant.plant_name,
        plant_name: plant.plant_name,
        botanical_name: plant.botanical_name,
        how_to_grow: plant.how_to_grow || []
      });
    }
  };

  const openPlantDetail = (plant) => {
    setSelectedPlant(plant);
  };

  const closePlantDetail = () => {
    setSelectedPlant(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
    <h1 className="text-4xl font-bold text-center mb-6 text-[#2F855A]">
  🌿 Plant Finder
</h1>

      
      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-green-50 rounded-xl shadow-inner">
        <div className="flex-grow relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for plants (e.g., jasmine, rose, basil)..."
            className="w-full border-2 border-green-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <svg 
            className="absolute right-3 top-4 h-6 w-6 text-green-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </div>

      {/* Results Section */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredPlants.map((plant) => (
            <div 
              key={plant._id || plant.plant_name} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => openPlantDetail(plant)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{plant.plant_name}</h2>
                    <p className="italic text-green-700">{plant.botanical_name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleFavoriteClick(plant, e)}
                      className={`p-2 rounded-full ${isFavorited(plant) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-50 transition`}
                      aria-label={isFavorited(plant) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg className="w-5 h-5" fill={isFavorited(plant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleBookmarkClick(plant, e)}
                      className={`p-2 rounded-full ${isBookmarked(plant) ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-500'} hover:bg-yellow-50 transition`}
                      aria-label={isBookmarked(plant) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    >
                      <svg className="w-5 h-5" fill={isBookmarked(plant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 my-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {plant.category}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {plant.sunlight}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {plant.water_needs}
                  </span>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openPlantDetail(plant);
                    }}
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-700">No plants found</h3>
          <p className="mt-1 text-gray-500">No results for "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-700">Discover Plants</h3>
          <p className="mt-1 text-gray-500">Search for plants to see growing instructions</p>
          <p className="mt-2 text-gray-400 text-sm">Try searching for "jasmine", "rose", or "basil"</p>
        </div>
      )}

      {/* Plant Detail Modal - Updated CSS */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedPlant.plant_name}</h2>
                <p className="italic text-green-600 text-lg">{selectedPlant.botanical_name}</p>
              </div>
              <button 
                onClick={closePlantDetail}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                  {/* Growing Guide */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-blue-800">Growing Guide</h3>
                    </div>
                    <ol className="space-y-4 pl-2">
                      {selectedPlant.how_to_grow.map((tip, index) => (
                        <li key={index} className="flex">
                          <span className="flex-shrink-0 h-7 w-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-4 font-medium">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Maintenance Tips */}
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-yellow-800">Maintenance Tips</h3>
                    </div>
                    <ul className="space-y-3 pl-2">
                      {selectedPlant.maintenance_tips.map((tip, index) => (
                        <li key={index} className="flex">
                          <span className="flex-shrink-0 h-6 w-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center mr-4 mt-0.5">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <p className="text-gray-700 leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fertilization */}
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-purple-800">Fertilization</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-2">{selectedPlant.fertilizer}</p>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Facts */}
                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800">Quick Facts</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Category</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.category}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Sunlight</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.sunlight}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Water Needs</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.water_needs}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Soil Type</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.soil_type}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Climate</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.climate}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 uppercase text-sm tracking-wider mb-1">Growth Time</h4>
                        <p className="text-gray-600 font-medium">{selectedPlant.growth_time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={(e) => handleFavoriteClick(selectedPlant, e)}
                      className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-3 transition ${
                        isFavorited(selectedPlant) 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isFavorited(selectedPlant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-medium">
                        {isFavorited(selectedPlant) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </span>
                    </button>
                    <button
                      onClick={(e) => handleBookmarkClick(selectedPlant, e)}
                      className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-3 transition ${
                        isBookmarked(selectedPlant) 
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isBookmarked(selectedPlant) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="font-medium">
                        {isBookmarked(selectedPlant) ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;