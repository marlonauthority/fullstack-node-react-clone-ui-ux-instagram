import React, {useState} from 'react';
import api from '../services/api';
import './New.css';

export default function New({history}) {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  async function handleSubmit(e){
    e.preventDefault()
    const data = new FormData();

    data.append('image', image)
    data.append('author', author)
    data.append('place', place)
    data.append('description', description)
    data.append('hashtags', hashtags)

    await api.post('posts', data);
    history.push('/')
  }

  return (
   <form id="new-post" onSubmit={handleSubmit}>
     <input type="file" onChange={event => setImage(event.target.files[0])} />
     <input type="text" name="author" placeholder="Author do post" onChange={event => setAuthor(event.target.value)} value={author} />
     <input type="text" name="place" placeholder="Local" onChange={event => setPlace(event.target.value)} value={place} />
     <input type="text" name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)} value={description} />
     <input type="text" name="hashtags" placeholder="Hashtags do post" onChange={event => setHashtags(event.target.value)} value={hashtags} />
    <button type="submit">Enviar</button>
   </form>
  );
}
