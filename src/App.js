import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

// SETTING up API in .env file now accessing it after hiding in env
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
   const [loading, setLoading] = useState(false);
   const [photos, setPhotos] = useState([]);

   // fetch api
   const fetchImage = async () => {
      setLoading(true);
      let url;
      // setting url for different usecase
      url = `${mainUrl}${clientID}`;
      try {
         const response = await fetch(url);
         const data = await response.json();
         setPhotos(data);
         console.log(data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchImage();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <main>
         {/* search section */}
         <section className="search">
            <form className="search-form">
               <input
                  className="form-input"
                  type="text"
                  placeholder="Search..."
               />
               <button className="submit-btn" onClick={handleSubmit}>
                  <FaSearch />
               </button>
            </form>
         </section>

         {/* section for phtots */}
         <section className="photos">
            <div className="photos-center">
               {photos.map((image, index) => {
                  console.log(image);
                  return <Photo key={image.id} {...image} />;
               })}
            </div>

            {/* When loading image  */}
            {loading && <h2 className="loading">Loading</h2>}
         </section>
      </main>
   );
}

export default App;
