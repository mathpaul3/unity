import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
// import video from "../자신.mp4";

const Video = (props) => {
    console.log("words: ", props.word)
    const [isWindow, setIsWindow] = useState(false);
    const [playIndex, setPlayIndex] = useState(0);
    const [links, setLinks] = useState();

    useEffect(() => {
        setIsWindow(true);
        if (props) {
            setLinks(props.word)
        }
    }, [links, props])

    const handleNextVideo = () => {
        if (!props) return;
        if(playIndex === props.word.length - 1){
            setPlayIndex(0);
        } else {
            setPlayIndex(playIndex + 1);
            // setLink(props.word[playIndex])
        }
    }


    return (
        <>
            {isWindow && props.length!==0 &&
                <ReactPlayer
                    className='react-player'
                    // url={process.env.PUBLIC_URL + '/팀.mp4'}    // 플레이어 url
                    // url={`${process.env.PUBLIC_URL}/tmp_video/${props.word}.mp4`}
                    url=
                    {links ? links[playIndex] : undefined}

                    // url={`http://localhost:8000/tmp_video/${props.word}`}
                    // url={`http://localhost:8000/tmp_video/?words=${props.word}`}    // 플레이어 url
                    width='700px'         // 플레이어 크기 (가로)
                    height='466px'        // 플레이어 크기 (세로)
                    playing={true}        // 자동 재생 on
                    muted={true}          // 음소거 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    pip={true}            // pip 모드 설정 여부
                    onEnded={() => {handleNextVideo()}}
                    // onEnded={() => console.log("ending")}  // 플레이어 끝났을 때 이벤트
                />
            }
        </>
    )
}

export default Video;