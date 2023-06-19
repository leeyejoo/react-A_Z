import React, {useEffect,useState} from 'react';
import axios from "../api/axios";
import "./Row.css";

export default function Row({isLargeRow, title, id, fetchUrl}) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);
  
  //async, await : 비동기 요청 시 사용.. 
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log('request', request);
    console.log('requestResult',request.data.results)
    setMovies(request.data.results);
  }
   
  return (
    <section className='row'>
      {/* props로 가져온 title */}
      <h2>{title}</h2> 
      <div className='slider'>

        <div className='slider_arrow-left'>
          <span 
            className='arrow' 
            onClick={()=>{
              document.getElementById(id).scrollLeft -= window.innerWidth -80
            }}
          >
            {"<"}
          </span> {/* 중괄호 없이 < 만 쓰면 태그와 구분할 수 없어 에러 발생 */}
        </div>

        {/* 각 영화들  */}
        <div className='row_posters' id={id}>
          {movies.map(movie => (
            <img
              key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}

        </div>

        <div className='slider_arrow-right'>
          <span 
            className='arrow'
            onClick={()=>{
              document.getElementById(id).scrollLeft += window.innerWidth -80
            }}
          >
            {">"}
          </span> {/* 중괄호 없이 > 만 쓰면 태그와 구분할 수 없어 에러 발생 */}
        </div>

      </div>
    </section>
  )
}
