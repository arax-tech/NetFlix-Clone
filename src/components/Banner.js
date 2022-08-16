import axios from '../axios';
import React, { useEffect, useState } from 'react'
import requests from '../requests';
import movieTrailer from 'movie-trailer';
import Modal from 'react-modal/lib/components/Modal';
import YouTube from 'react-youtube';

const baseURL = "https://image.tmdb.org/t/p/original/"

const Banner = () => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }


    const [trailerUrl, setTrailerUrl] = useState("");

    // console.log(movies)
    const opts = {
        height: "550",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    };
    const handelClick = (movie) => {

        if (trailerUrl) {
            setTrailerUrl("");
            setIsOpen(false);
        } else {
            setIsOpen(true);
            movieTrailer(movie?.name || "")
                .then((url) => {
                    if (url === null) {
                        alert("Invalid movie url...")
                        setIsOpen(false);
                    }
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error))
        }

    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);



    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("${baseURL}${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className="banner__contents">
                <h2 className='banner__title'>{movie?.title || movie?.name || movie?.orignal_name}</h2>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => handelClick(movie && movie)}>Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h4 className="banner__description">{truncate(movie?.overview, 150)}</h4>

            </div>
            <div className="banner__fade__bottom"></div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

            </Modal>
        </header>
    )
}

export default Banner
