import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import requests from '../requests'

const Home = () => {

    return (
        <React.Fragment>

            <Header />
            <Banner />
            <Row title="NetFlix Originals" fetchUrl={requests.fetchNetflixOriginals} isLarageRow />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </React.Fragment>
    )
}

export default Home
