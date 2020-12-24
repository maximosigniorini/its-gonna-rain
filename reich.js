var wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform1'),
    backend: 'MediaElement',
    plugins: [
        WaveSurfer.regions.create({
            regionsMinLength: 1,
            regions: [
                {
                    start: 3,
                    end: 4,
                    loop: true,
                    color: 'rgba(0, 100, 255, 0.5)'
                }
            ],
            dragSelection: {
                slop: 5
            }
        })
    ]
});

var wavesurfer2 = WaveSurfer.create({
    container: document.querySelector('#waveform2'),
    backend: 'MediaElement',
    plugins: [
        WaveSurfer.regions.create({
            regionsMinLength: 1,
            regions: [
                {
                    start: 3,
                    end: 4,
                    loop: true,
                    color: 'rgba(0, 100, 255, 0.5)'
                }
            ],
            dragSelection: {
                slop: 5
            }
        })
    ]
});

wavesurfer.load('rain.mp3');
wavesurfer2.load('rain.mp3');
wavesurfer2.setPlaybackRate(1.002)

wavesurfer.panner = wavesurfer.backend.ac.createStereoPanner();
wavesurfer2.panner = wavesurfer2.backend.ac.createStereoPanner();
wavesurfer.panner.pan.value = 1
wavesurfer2.panner.pan.value = -1
wavesurfer.backend.setFilter(wavesurfer.panner)

let region = Object.values(wavesurfer.regions.list)[0];
let region2 = Object.values(wavesurfer2.regions.list)[0];

wavesurfer.on('ready', function () {
    region.play();
});

wavesurfer2.on('ready', function () {
    //region2.play();
});





