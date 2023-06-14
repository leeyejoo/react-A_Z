import axios from "axios";

const instance = axios.create({
  baseURL : "https://api.themoviedb.org/3",
  params  : {
    api_key : "787ac6b5432b19218806375d0c08915e",
    language : "ko-KR"
  }
});

//해당 파일 밖에서도 사용할 수 있도록 export 
export default instance;