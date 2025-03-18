'use client'; // Marks this as a Client Component for useEffect

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the component
export default function Home() {
  // State for songs and loading status
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://shazam-core7.p.rapidapi.com/search', {
          params: {
            term: 'top', // Default term
            limit: 10,
          },
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'x-rapidapi-host': 'shazam-core7.p.rapidapi.com',
          },
        });
        // Extract tracks from the response
        setSongs(response.data.data.tracks.hits || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []); // Empty dependency array means it runs once on mount

  // Render the UI
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Top Songs</h1>

      {/* Conditional loading state */}
      {loading ? (
        <p className="text-center text-xl">Loading songs...</p>
      ) : (
        // List of songs
        <ul className="max-w-2xl mx-auto space-y-4">
          {songs.map((song) => (
            <li
              key={song.key}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition shadow-md"
            >
              <span className="text-lg font-semibold">{song.heading.title}</span>
              <span className="block text-sm text-gray-400">{song.heading.subtitle}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}