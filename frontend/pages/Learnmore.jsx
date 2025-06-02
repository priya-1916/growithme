import React from 'react';

const Learnmore = () => {
  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#1E3D32] px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Discover GroWithMe</h2>
        <p className="text-lg mb-8 leading-relaxed">
          GroWithMe is your companion in growing sustainably. Whether you're a home gardener, a farming enthusiast, 
          or an agricultural innovator, we offer smart tools to help you track, plan, and enhance your plant's growth journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
            <p>Get AI-driven recommendations for plant care, fertilizers, and soil optimization.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Track Your Growth</h3>
            <p>Maintain your own plant diary, monitor progress, and analyze results over time.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
            <p>Learn best farming and gardening techniques that conserve nature and promote health.</p>
          </div>
        </div>
        <div className="mt-12">
          <a
            href="/signup"
            className="inline-block px-8 py-3 bg-[#A3D9A5] text-[#1E3D32] text-lg font-semibold rounded-full shadow-md hover:bg-[#88C999] transition-all"
          >
            Join Us Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Learnmore;
