import React from 'react';

export default function Fleet() {
  return (
    <section className="bg-[#121214] text-white px-10 py-20">
      <h2 className="text-4xl font-bold mb-12">Our Fleet</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {['Compact', 'SUV', 'Luxury'].map((type, i) => (
          <div key={i} className="bg-[#26262A] p-6 rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8"
              className="rounded-lg mb-4"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
