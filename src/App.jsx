import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'
import searchIcon from './assets/search.svg'

function App() {
  const API_URL = 'http://www.omdbapi.com/?apikey=258eb9a0'
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const movie1 = {
    Title: 'Avengers: Endgame',
    Year: '2019',
    imdbID: 'tt4154796',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
  }

  const searchMovies = async (title) => {
    try {
      const response = await axios.get(`${API_URL}&s=${title}`)
      setMovies(response.data.Search)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    searchMovies('Avengers')
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movie={movie}
              />
            )
          })
        ) : (
          <div className="empty">
            <h2>No Movie Found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
