import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [github_username, setGitHubUserName] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGitHubUserName('');
    setTechs('');
  }

  return (
    <form action="" onSubmit={handleSubmit}>

      <div className="input-block">
        <label htmlFor="">Usuário do GitHub</label>
        <input 
          name="github_username" 
          id="github_username" 
          required 
          value={github_username} 
          onChange={e => setGitHubUserName(e.target.value)} 
        />
      </div>
      
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          required 
          value={techs} 
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            onChange={e => setLatitude(Number(e.target.value))} 
            required 
            value={latitude} 
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            onChange={e => setLongitude(Number(e.target.value))} 
            required 
            value={longitude} 
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  )

}

export default DevForm;