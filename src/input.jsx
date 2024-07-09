import React, { useState } from "react";
import axios from "axios";
import clear from "./assets/clear.png";
import clouds from "./assets/clouds.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";

function Input() {
  const [imgsrc, setImgsrc] = useState(clear);
  const [deg, setDeg] = useState(0);
  const [city, setCity] = useState("");
  const [list, setList] = useState("");

  const ask = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?", {
        params: {
          q: city,
          appid: "0ec7da1f0fc652dbae2984a1481fa631",
        },
      })
      .then(function (response) {
        setDeg(response.data.main.temp - 273.15);
        setList(response.data.weather[0].description);
        if (response.data.weather[0].main == "Clouds") {
          setImgsrc(clouds);
        } else if (response.data.weather[0].main == "Rain") {
          setImgsrc(rain);
        } else if (response.data.weather[0].main == "Clear") {
          setImgsrc(clear);
        } else if (response.data.weather[0].main == "snow") {
          setImgsrc(snow);
        }
      })
      .catch(function (error) {
        console.error("There was an error fetching the weather data!", error);
      });
  };

  return (
    <>
      <div className="inputs">
        <input
          type="text"
          placeholder="Enter your city name ... "
          id="cityName"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <button onClick={ask} className="but">
          Search
        </button>
        <div className="inputimg">
          <img className="imginpu" src={imgsrc} />
        </div>

        <h2>{deg.toFixed(2)}°C</h2>
        <h2>{list}</h2>
      </div>
    </>
  );
}

export default Input;
