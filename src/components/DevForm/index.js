import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm(props) {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    await props.onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.error(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do Github</label>
        <input 
          name="username_github" 
          id="username_github"
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
        name="techs"
        id="techs"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number" 
            name="latitude" 
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number" 
            name="longitude" 
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
