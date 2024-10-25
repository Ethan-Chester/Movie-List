'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

interface MovieDetails {
  desc: string;
  rating: string;
  runtime: string;
}

interface MovieData {
  [movieName: string]: MovieDetails;
}

export default function Movies() {
  const [data, setData] = useState<MovieData | null>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<boolean[]>([]); // Track visibility for each movie

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Response = await fetch('/movies.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch a response: ${response.statusText}`);
        }
        const jsonData: MovieData = await response.json();
        console.log('Fetched data:', jsonData);

        setData(jsonData);
        setVisibleIndexes(Array(Object.keys(jsonData).length).fill(false)); // Initialize visibility array
      } catch (error) {
        console.error('Error fetching JSON: ', error);
      }
    };

    fetchData();
  }, []);

  const toggleVisibility = (index: number) => {
    setVisibleIndexes(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Link href='/' className="text-2xl m-5 bg-red-500 p-4 rounded-xl">Back</Link>
      <div className="flex justify-center text-5xl">
        <h1 className="underline">Movie List</h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen mt-7">
        {Object.entries(data).map(([movieName, details], index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center mb-8 p-4 border border-gray-300 rounded-lg shadow-md w-80 cursor-pointer hover:p-7 transition-all"
            onClick={() => toggleVisibility(index)}>

            <h2 className="text-xl font-bold">{movieName}</h2>

            {visibleIndexes[index] && ( 
              <>
                <h3 className="m-3">Description: {details.desc}</h3>
                <h3 className="m-3">Rating: {details.rating}</h3>
                <h3 className="m-3">Runtime: {details.runtime}</h3>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
