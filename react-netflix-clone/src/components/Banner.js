import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import axios from '../api/axios';
import "./Banner.css"

export default function Banner() {
  
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();

  }, []);


  const fetchData = async() => {
    // async와 await : 비동기로 api로 요청하고, 처리한 정보들을 받음
    // 1. 현재 상영중인 영화 정보들을 가져오기
    const request = await axios.get(requests.fetchNowPlaying);

    // 2. 현재 상영중인 영화 중 랜덤으로 하나의 id를 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 3. 특정 영화의 상세정보 가져오기 (비디오 정보 포함)
    /* 자바스크립트 구조분해 할당.. 
       const response = await axios.get("")
       const data = response.data;
       위의 두 줄을 const { data } = await axios.get("");  로 합칠 수가 있음.
      
       {data: movieDetail } 은 data라는 상수 이름보다 movieDetail이라는 이름이 
      더 잘 어울리기 때문에 movieDetail이란 이름으로 새로 할당을 해준다.
    */
    const {data: movieDetail} = await axios.get(`movie/${movieId}`,{
      params : {append_to_reponse: "videos"}, //비디오 정보도 포함하기 위해서는 param도 같이 보내줘야함.
    });

    setMovie(movieDetail);
    console.log(movie)

  }

  // 영화설명이 너무 길 경우 말 줄임표로 줄여주는 함수
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0,n -1) + "..." : str 
  }


  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>
          {movie.title || movie.name || movie.original_name} 
          {/* movie.title 이 있으면 넣어주고 없으면 movie.name, movie.name이 없으면 movie.original_name을 넣어줌 */}
        </h1>

        <div className='banner_buttons'>
          <button className='banner_button play'>play</button>
          <button className='banner_button info'>More Information</button>
        </div>

        <h1 className='banner_description'>{truncate(movie.overview,100)}</h1>
      </div>
      
      <div className='banner_fadeBottom'/>
      
    </header>
  )
}
