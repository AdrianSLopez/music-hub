import React, {useRef, useState, useEffect} from "react"

export default function AudioControls(props) {
    const volumeSlider = useRef()
    const [volume, setVolume] = useState(50);
    const [prevVolume, setPrevVolume] = useState(50)
    const [volIcon, setVolIcon] = useState('fa fa-volume-up')
    const [play, setPlay] = useState(false);
    const [btnIcon, setBtnIcon] = useState('fa fa-play')
    const [muted, setMuted] = useState(false)
    
    const playPause = () => {
        setPlay(!play)
        play? setBtnIcon('fa fa-play'): setBtnIcon('fa fa-pause')
    }

    const updateVol = () => {
        setPrevVolume(volume)
        setVolume(volumeSlider.current.value)

        if(volumeSlider.current.value === '0') {
            setVolIcon('fa fa-volume-off')
            setMuted(true)
        }else{
            volumeSlider.current.value > 35? setVolIcon('fa fa-volume-up'):setVolIcon('fa fa-volume-down')
            setMuted(false)
        }
    };

    const volClick = () => {
        if(!muted){
            setVolIcon('fa fa-volume-off')
            setVolume(0)
            volumeSlider.current.value = 0
        }else{
            setVolIcon('fa fa-volume-up')
            setVolume(prevVolume)
            volumeSlider.current.value = prevVolume
        }
        setMuted(!muted)
    }

    useEffect(() => {
        props.audioSrc.current.volume = volume/100
    
        if(play){
            props.audioSrc.current.play()
        }else{
            props.audioSrc.current.pause()
        }
    })

    return (
        <div className="audio-controls-container">
            <div className="audio-play-container">
                <button onClick={playPause} className={"audio-play-btn " + btnIcon}></button>
            </div>
            <div className="audio-volume-container">
                <div className="audio-vol-icon-container" onClick={volClick}><i className={volIcon} aria-hidden="true"></i></div>
                <input ref={volumeSlider} onChange={updateVol} type="range" min="0" max="100" defaultValue="50" className="audio-volume-slide" />
            </div>
        </div>
    )
}