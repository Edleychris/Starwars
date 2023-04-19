import React, { useState, useEffect } from "react";
import img1 from "./Assets/starwar logo.png";
import styles from "./style.module.css";
import img2 from "./Assets/yellow_logo.png";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is a HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData.results);
        setError(null);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data]);

  const ColoredLine = ({ color }) => <hr style={{ borderColor: color }} />;

  return (
    <div className={styles.homepage}>
      <img
        src={img1}
        alt="starwar logo"
        style={{ width: "83%", height: "50px" }}
      />
      {loading && (
        <div className={styles.image}>
          <img
            src={img2}
            alt="starwar logo"
            style={{ width: "83%", height: "50px" }}
          />
        </div>
      )}
      {error && <div> {error} </div>}
      {data && (
        <div className={styles.movies}>
          {data.map((movie) => {
            return (
              <ul key={movie.episode_id}>
                <li>
                  <div className={styles.movie_group}>
                    <h2>{movie.title}</h2>
                    <p className={styles.date}>{movie.release_date}</p>
                    <div>
                      <p>{movie.opening_crawl.substring(0, 260)}...</p>
                      <ColoredLine color="brown" />
                      <a href="http://">More Info</a>
                    </div>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Homepage;
