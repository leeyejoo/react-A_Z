import './App.css';
import requests from './api/requests';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      
      <Row 
        title="오직 넷플릭스에서"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title="지금 뜨는 콘텐츠" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="평단의 찬사를 받은 영화" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="액션 영화" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="코미디 영화" id="CM" fetchUrl={requests.fetchComedyMovies} />
      <Row title="공포 영화" id="HM" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="로맨스 영화" id="RM" fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
}

export default App;
