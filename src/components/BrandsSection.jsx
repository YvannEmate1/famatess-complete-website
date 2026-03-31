import React from 'react';

export default function Fleet() {
  return (
    <section className="bg-[#121214] text-white px-10 py-20">

      <div className="grid md:grid-cols-3 gap-8">
        {['Compact', 'SUV', 'Luxury'].map((type, i) => (
          <div key={i} className="bg-[#26262A] p-6 rounded-2xl">
          </div>
        ))}
      </div>
    </section>
  );
}
