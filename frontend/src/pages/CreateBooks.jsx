import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton';
import Spiner from '../components/Spiner';
import axios from 'axios'

function CreateBooks() {
  const [title,setTitle] = useState('');
  const [author,setauthor] = useState('');
  const [publishYear,setpublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSaveBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.post('http://localhost:5555/books',data)
    .then(()=>{
      setLoading(false)
      navigate('/')
    })
    .catch((error) =>{
      setLoading(false)
      alert('An error happened . please check console')
      console.log(error)
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spiner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl me-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label className='text-xl me-4 text-gray-500'>author</label>
          <input type="text" value={author} onChange={(e) =>setauthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label className='text-xl me-4 text-gray-500'>publishYeaar</label>
          <input type="text" value={publishYear} onChange={(e) =>setpublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8 ' onClick={handleSaveBook}>save</button>
      </div>
    </div>
  )
}

export default CreateBooks