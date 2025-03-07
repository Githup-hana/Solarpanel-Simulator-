import React, { useState } from "react";
import "./App.css";

const SolarPanelSimulator = () => {
  const [city, setCity] = useState("");
  const [panelPower, setPanelPower] = useState(300);
  const [sunHours, setSunHours] = useState("");
  const [energyOutput, setEnergyOutput] = useState("");
  const APikey = "20a219b25c8408423faad62c51b4b8bd";

  const fetchSunHours = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APikey}`
      );
      const data = await response.json();
      if (data && data.sys) {
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        const sunHoursCalc = (sunset - sunrise) / 3600;
        setSunHours(sunHoursCalc.toFixed(1));
        calculateEnergy(sunHoursCalc);
      } else {
        alert("Stadt nicht gefunden. Versuche es erneut.");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Wetterdaten", error);
    }
  };

  const calculateEnergy = (hours: number) => {
    const energy = (panelPower * hours) / 1000;
    setEnergyOutput(energy.toFixed(2));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handlePanelPowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPanelPower(Number(e.target.value));
  };

  return (
    <div className="solar-panel-simulator">
    <h2>🌞 Solarpanel-Simulator</h2>

    <div className="input-container">
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Gib eine Stadt ein..."
        className="input"
      />

      <input
        type="number"
        value={panelPower}
        onChange={handlePanelPowerChange}
        placeholder="Panel-Leistung (Watt)"
        className="input"
      />
    </div>

    <button onClick={fetchSunHours} className="calculate-button">
      Berechnen
    </button>

    {sunHours && (
      <div className="result">
        <h3>Sonnenstunden: {sunHours} Stunden</h3>
      </div>
    )}

    {energyOutput && (
      <div className="result">
        <h3>Berechnete Energieproduktion: {energyOutput} kWh</h3>
      </div>
    )}
  </div>

  );
};

export default SolarPanelSimulator;
