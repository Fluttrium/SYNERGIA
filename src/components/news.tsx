"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string; // Base64-encoded image
  link: string;
}

interface NewsProps {
  initialBlogs: NewsItem[];
}

export default function News({ initialBlogs }: NewsProps) {
  const blogs = initialBlogs;
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="overflow-hidden h-64 w-64">
                <a href={blog.link}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ borderRadius: "10px" }}
                  />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a
                    href={blog.link}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {blog.title}
                  </a>
                </h3>
                <p className="text-gray-700 text-base">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
