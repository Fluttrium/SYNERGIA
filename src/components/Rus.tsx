/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Rus() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center py-32">
          Буклеты на русском языке
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="space-y-6">
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="qr/рус1.png"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="qr/рус2.png"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="qr/рус3.png"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="qr/рус4.png"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="qr/рус5.png"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Column 2 */}
        </div>
      </div>
    </section>
  );
}