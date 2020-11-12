import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from "react-router-dom";
import { FiPlus, FiX, FiRefreshCcw } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface UserParams {
  id: string
}

export default function CreateOrphanage() {
  const history = useHistory();
  const params = useParams<UserParams>();
  
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpeningHours ] = useState('');
  const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
  const [ position, setPosition ] = useState({ lat: 0, lng: 0});
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);

  const [ authToken, setAuthToken ] = useState('');

  const [ loadingSubmit, setLoadingSubmit ] = useState(false);

  const [ mapError, setMapError ] = useState(false);
  const [ nameError, setNameError ] = useState(false);
  const [ aboutError, setAboutError ] = useState(false);
  const [ instructionsError, setInstructionsError ] = useState(false);
  const [ openingError, setOpeningError ] = useState(false);

  let token = '';

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition(event.latlng);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleDeleteImage(event: any, index: number) {
    event.preventDefault();
    // console.log(index);

    const editedPreviewImages = previewImages.splice(index, 1);
    const editedImages = images.splice(index, 1);

    const selectedImagesPreview = [...previewImages];
    const selectedImages = [...images];
    
    setPreviewImages(selectedImagesPreview);
    setImages(selectedImages);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { lat, lng } = position;

    setLoadingSubmit(true);

    console.log(position)
    
    setMapError(false);
    setOpeningError(false);
    setInstructionsError(false);
    setAboutError(false);
    setNameError(false);

    if (position.lat === 0 || position.lng === 0) {
      setMapError(true);
    } if (name === '') {
      setNameError(true);
      setLoadingSubmit(false)
    } if (about === '') {
      setAboutError(true);
      setLoadingSubmit(false)
    } if (instructions === '') {
      setInstructionsError(true);
      setLoadingSubmit(false)
    } if (opening_hours === '') {
      setOpeningError(true);
      setLoadingSubmit(false)
    }

    if (mapError || nameError || aboutError || instructionsError || openingError) return;

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('latitude', String(lat));
      data.append('longitude', String(lng));
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('user_id', params.id);

      images.forEach(image => {
        data.append('images', image)
      })
      await api.post('/orphanages', data, { 
        headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authToken}`
      }});
      history.push('/success');

      setLoadingSubmit(false);
    } catch (error) {
        console.log(error);
        setLoadingSubmit(false)
    }
  }

  useEffect(() => {
    token = localStorage.getItem('@token') as string;
    setAuthToken(token);
    token = '';
  }, [token]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-20.386439,-43.5117524]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
              className={mapError === true ? 'errorMap' : ''}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {
                position.lat !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.lat,position.lng]} />
              }
            </Map>

            <div className={nameError ? 'input-block error-block' : 'input-block'}>
              <label 
                htmlFor="name">Nome</label>
              <input 
                id="name"
                maxLength={150}
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>

            <div className={aboutError === true ? 'input-block error-block' : 'input-block'}>
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map((image, index) => {
                    return (
                      <div className="preview" key={index}>
                        <button onClick={e => handleDeleteImage(e, index)} ><FiX size={20} /></button>
                        <img key={image} src={image} alt="Imagem do orfanato" />
                      </div>
                    );
                  })
                }
                <label className="new-image" htmlFor="image[]" >
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                type="file" 
                multiple 
                name="image" 
                id="image[]"
                onChange={handleSelectImages}
                />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className={instructionsError === true ? 'input-block error-block' : 'input-block'}>
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                maxLength={500}
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                />
            </div>

            <div className={openingError === true ? 'input-block error-block' : 'input-block'}>
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                maxLength={150}
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
                className={openingError === true ? 'error-input' : ''}
                />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active': ''}
                  onClick={() => setOpenOnWeekends(true)}
                  >Sim</button>
                <button 
                  type="button"
                  className={open_on_weekends ? '': 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                  >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit" onClick={handleSubmit} >
            {
              loadingSubmit === true ? (
                <FiRefreshCcw size={26} color="#fff" className="loading-sign" />
              ) : 'Confirmar'
            }
          </button>
        </form>
      </main>
    </div>
  );
}