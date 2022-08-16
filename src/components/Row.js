import axios from '../axios';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Modal from 'react-modal/lib/components/Modal';

const baseURL = "https://image.tmdb.org/t/p/original/"
const Row = ({ title, fetchUrl, isLarageRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies)
    const opts = {
        height: "550",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    };
    const handelClick = (movie) => {


        setIsOpen(true);
        movieTrailer(movie?.name || "")
            .then((url) => {
                console.log(url);
                if (url === null) {
                    alert("Invalid movie url...")
                    setIsOpen(false);
                }
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))


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
        <div className="row">
            <h2 className='row__title'>{title}</h2>


            <div className="row__posters">
                {
                    movies?.map((movie, index) => (
                        <img onClick={() => handelClick(movie)} key={index} className={`row__poster ${isLarageRow && "row__poster__large"} `} src={`${baseURL}${isLarageRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    ))
                }

            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

            </Modal>
        </div>
    )
}

export default Row
