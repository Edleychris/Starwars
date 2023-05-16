import React, { useEffect, useState } from "react";
import "./Readmore.css";
import img2 from "./Assets/yellow_logo.png";
import img1 from "./Assets/starwar logo.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Readmore = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async (urls) => {
    const results = await Promise.all(urls.map((url) => axios.get(url)));

    return results.map((Response) => Response.data);
  };

  useEffect(() => {
    const getMovieData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://swapi.dev/api/films/${id}`);
        const movie = response.data;

        console.log(movie);
        console.log(response);

        const [characters, planets, species, starships, vehicles] =
          await Promise.all([
            fetchData(movie.characters),
            fetchData(movie.planets),
            fetchData(movie.species),
            fetchData(movie.starships),
            fetchData(movie.vehicles),
          ]);

        setMovieData({
          ...movie,
          characters,
          planets,
          species,
          starships,
          vehicles,
        });
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, [id]);

  return (
    <>
      <div className="pageContainer">
        <img src={img1} alt="starwars_logo" className="app_logo" style={{ width: "83%", height: "50px" }} />
        {loading ? (
          <img
            src={img2}
            alt="loader_img"
            className="loader-img"
            style={{ width: "83%", height: "50px" }}
          />
        ) : (
          <div className="movieContainer">
            <Link to="/">← Back to List</Link>
            <div>
              <h2>{movieData.title}</h2>
              <span>Director: {movieData.director}</span>
              <span>Producer: {movieData.producer}</span>
            </div>

            <div>
              <h4>Description</h4>
              <span>{movieData.opening_crawl}</span>
            </div>

            <div>
              <h4>Characters</h4>
              {movieData && (
                <ul>
                  {movieData.characters?.map((character, index) => {
                    return <li key={index}>{character.name}</li>;
                  })}
                </ul>
              )}
            </div>

            <div>
              <h4>Planets</h4>
              {movieData && (
                <ul>
                  {movieData.planets?.map((planet, index) => (
                    <li key={index}>{planet.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4>Species</h4>
              {movieData && (
                <ul>
                  {movieData.species?.map((specie, index) => (
                    <li key={index}>{specie.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4>Starships</h4>
              {movieData && (
                <ul>
                  {movieData.starships?.map((starship, index) => (
                    <li key={index}>{starship.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4>Vehicles</h4>
              {movieData && (
                <ul>
                  {movieData.vehicles?.map((vehicle, index) => (
                  <li key={index}>{vehicle.name}</li>
                ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Readmore;