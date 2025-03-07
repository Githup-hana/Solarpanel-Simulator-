import React, { useState } from "react";

const SolarPanelSimulator = () => {
  const [city, setCity] = useState("");
  const [panelPower, setPanelPower] = useState(0);
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
    <div>
      <h2>🌞 Solarpanel-Simulator</h2>

      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Gib eine Stadt ein..."
      />

      <input
        type="number"
        value={panelPower}
        onChange={handlePanelPowerChange}
        placeholder="Panel-Leistung (Watt)"
      />

      <button onClick={fetchSunHours}>Berechnen</button>

      {sunHours && (
        <div>
          <h3>Sonnenstunden: {sunHours} Stunden</h3>
        </div>
      )}

      {energyOutput && (
        <div>
          <h3>Berechnete Energieproduktion: {energyOutput} kWh</h3>
        </div>
      )}
    </div>
  );
};

export default SolarPanelSimulator;
