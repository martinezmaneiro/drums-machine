const App=()=> {

//useState hooks for volume and key tracking
    const [volume, setVolume] = React.useState(1);
    const [recording, setRecording] = React.useState('');

//Audio clips with their corresponding trigger key-code for each key
    const audioClips = [{
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        }, {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        }, {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        }, {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        }, {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        }, {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        }, {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        }, {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        }, {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
    ];

    return(
        <div className='text-center min-vh-100 text-white' id="display">
            <div className='text-center container'>
                <h2>Drum Machine</h2>
                {/*Setting up the drum pads in the render with each key's corresponding audio props*/}
                {audioClips.map( clip => (
                    <Pad
                        key = {clip.id}
                        clip = {clip}
                        volume={volume}
                        setRecording={setRecording}
                    />
                ))};
                <br/>
                <h3>Volume</h3>
                {/*Ranged volume input that triggers useState volume setter when an interaction is done*/}
                <label><input
                    type='range'
                    step='0.01'
                    value={volume}
                    max='1'
                    min='0'
                    className='w-50'
                    onChange= {(e) => setVolume(e.target.value)}
                />
                </label>
                {/*This h3 element will show the sequence of triggered keys*/}
                <h3>{recording}</h3>
                {/*Button element to reset the h3 above element's child by setting it's state to '' again*/}
                {recording && (
                    <>
                        <button onClick={() => setRecording('')} className='btn btn-danger'>clear</button>
                    </>
                )}
            </div>
        </div>
    )
};

const Pad =({clip, volume, setRecording})=> {
    {/*A state variable is used to temporarily change the display of our component combining && conditional rendering and Bootstrap classes*/}
    const [active, setActive] = React.useState(false);
    {/*Subscribing to the keydown event to trigger the handleKeyPress function and it's cleanup function*/}
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, []);
    {/*This function runs the sound of the triggered pad when the pressed key's code is strictly equal to a clip's key-code*/}
    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode){
            playSound();
        };
    };

    {/*This function integrates the volume and active/non-active state to the audio elements and also triggers the sound when called*/}
    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 200);
        audioTag.volume = volume;
        audioTag.play();
        {/*We save the key sequence in state to be dynamically displayed at the h3 element described above */}
        setRecording(prev => prev + clip.keyTrigger + '');
    };
    {/*Call audioClip data as props for the Pad elements*/}
    return (
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 col-3 drum-pad ${active && 'btn-warning'}`}>
            <audio className='clip' id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    )
};
{/*The use of ReactDOM.render has been deprecated since React 18 but I still consider it's good for my training to also make some projects using this version*/}
ReactDOM.render(<App />, document.getElementById('drum-machine'));