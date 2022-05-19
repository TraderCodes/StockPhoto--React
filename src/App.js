import React, { useState, useEffect, useRef } from 'react';
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
   const [page, setPage] = useState(1);
   const [query, setQuery] = useState('');
   const mounted = useRef(false);
   // fetch api
   const fetchImage = async () => {
      setLoading(true);
      let url;
      // set up amount of page to show
      const urlPAGE = `&page=${page}`;
      // setting url for different usecase
      // set up search entry
      const urlQuery = `&query=${query}`;
      url = `${mainUrl}${clientID}${urlPAGE}`;
      if (query) {
         url = `${searchUrl}${clientID}${urlPAGE}${urlQuery}`;
      } else {
         url = `${mainUrl}${clientID}${urlPAGE}`;
      }
      try {
         const response = await fetch(url);
         const data = await response.json();
         setPhotos((oldPhotos) => {
            if (query && page === 1) {
               return data.results;
            } else if (query) {
               return [...oldPhotos, ...data.results];
            } else {
               return [...oldPhotos, ...data];
            }
         });
         //  console.log(data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchImage();
   }, [page]);
   useEffect(() => {
      if (!mounted.current) {
         mounted.current = true;
         return;
      }
   }, []);

   //  handleSubmit
   const handleSubmit = (e) => {
      e.preventDefault();
      // so everytime when submit it fetch and start with page one
      if (!query) return;
      if (page === 1) {
         fetchImage();
         return;
      }
      setPage(1);
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
                  // setup input field
                  value={query}
                  // set onchange everytime user enter value
                  onChange={(e) => setQuery(e.target.value)}
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
                  // console.log(image);
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
