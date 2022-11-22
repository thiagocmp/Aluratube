import React from "react"
import config from "..//config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { videoService } from "../src/services/videoService"

function HomePage() {
    const service = videoService()
    const [valorDoFiltro, setValorDoFiltro] = React.useState("")
    const[playlists, setPlaylist] = React.useState({})

    React.useEffect(() => {
        console.log("useEffect")
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data)
                const novasPlaylists = {...playlists}
                dados.data.forEach((Videos) => {
                    if(!novasPlaylists[Videos.playlist]) novasPlaylists[Videos.playlist] = []
                    novasPlaylists[video.playlist].push(Videos)
                    })
                setPlaylist({...novasPlaylists})
            })
    }, [])

    return (
        <>
            <div style={{
                display: "flex",    
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} /> 
                <Header /> 
                <Timeline searchValue={valorDoFiltro} playlist={config.playlist} /> 
            </div>
        </>
    )
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>       
//     )
// }

const StyleHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px; 
    }
`

const StyledBanner = styled.div`
    /* background-image: url(${({bg}) =>bg}); */
    background-image: url(${config.bg});
    background-color: blue;
    height: 230px;   
`
function Header() {
    return (
        <StyleHeader>
            {/* <StyledBanner bg={config.bg} /> */}
            <StyledBanner />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>              
                </div>
            </section>
        </StyleHeader>
    )
}

function Timeline({searchValue, ...propriedades}) {
    // console.log("Dentro do componente", props.playlist)
    const playlistNames = Object.keys(propriedades.playlist)

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlist[playlistName]
                // console.log(playlistName)
                // console.log(videos)
                
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase()
                                    const searchvalueNormalized = searchValue.toLowerCase()
                                    return titleNormalized.includes(searchvalueNormalized)
                                })
                                .map((videos) => {
                                    return (
                                        <a key={videos.url} href={videos.url}>
                                            <img src={videos.thumb} />
                                            <span>
                                                {videos.title}
                                            </span>
                                        </a>
                                    )
                                })}                            
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}