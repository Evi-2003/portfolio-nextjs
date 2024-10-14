'use client';

import React, { useEffect, useState } from 'react';

export default function DarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };
  useEffect(() => {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightMediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const checkNightTime = () => {
      const now = new Date();
      return now.getHours() > 18 || now.getHours() < 6;
    };

    const updateTheme = () => {
      if (darkMediaQuery.matches) {
        document.body.classList.add('dark');
        setIsDarkMode(true);
      } else if (lightMediaQuery.matches || (!darkMediaQuery.matches && !checkNightTime())) {
        document.body.classList.remove('dark');
        setIsDarkMode(false);
      } else if (!darkMediaQuery.matches && !lightMediaQuery.matches && checkNightTime()) {
        document.body.classList.add('dark');
        setIsDarkMode(true);
      }
    };
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
    if (savedTheme === 'light') {
      document.body.classList.remove('dark');
      setIsDarkMode(false);
    }
    if (!(savedTheme === 'dark' || savedTheme === 'light')) {
      updateTheme();
    }

    darkMediaQuery.addEventListener('change', updateTheme);
    lightMediaQuery.addEventListener('change', updateTheme);

    return () => {
      darkMediaQuery.removeEventListener('change', updateTheme);
      lightMediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);
  return (
    <button
      onClick={toggleTheme}
      className="text-1xl mt-5 w-auto rounded-xl bg-yellow-500 px-3 py-2 font-bold shadow-lg hover:bg-gray-950 sm:mt-0
        sm:w-auto dark:bg-black dark:hover:bg-yellow-400"
      aria-label="Verander van kleur thema"
    >
      <svg
        fill="#000000"
        className="h-6 w-6 fill-white"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 489.242 489.242"
      >
        <g>
          <g>
            <path
              d="M416.321,171.943c0-97.8-82.2-176.9-181-171.7c-89.5,5.2-160.3,79.1-162.4,168.6c0,44.7,16.6,86.3,45.8,118.6
                      c47.7,51.1,41.6,110.3,41.6,110.3c0,11.4,9.4,20.8,20.8,20.8h126.9c11.4,0,20.8-9.4,21.8-20.8c0,0-7-57.7,40.6-109.2
                      C399.621,257.243,416.321,215.643,416.321,171.943z M288.321,377.943h-87.4c-2.1-42.7-20.8-84.3-51-116.5
                      c-22.9-25-34.3-57.2-34.3-90.5c1-68.7,54.1-124.8,122.8-129c74.9-4.2,137.3,56.2,137.3,130c0,32.3-12.5,64.5-35.4,88.4
                      C309.121,293.643,290.421,335.243,288.321,377.943z"
            />
            <path
              d="M281.021,447.643h-73.9c-11.4,0-20.8,9.4-20.8,20.8s9.4,20.8,20.8,20.8h73.9c11.4,0,20.8-9.4,20.8-20.8
                      C301.821,457.043,292.521,447.643,281.021,447.643z"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}
