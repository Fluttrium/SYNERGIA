/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Uzbek() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center py-32">
          Буклеты на узбекском языке (бо забони точики)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="/qr/Uz_blank.png"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="/qr/UzbekReal.png"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="arch bg-white p-4 shadow-lg">
              <img
                src="/qr/UzbekReal2.png"
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
