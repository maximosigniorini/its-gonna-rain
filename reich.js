let wavesurfer = []
let region = []

for (let i = 0; i < 2; i++) {
    wavesurfer[i] = WaveSurfer.create({
        container: document.querySelector(`#waveform${i + 1}`),
        backend: 'MediaElementWebAudio',
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
    })

    wavesurfer[i].load('rain.mp3');
    wavesurfer[i].panner = wavesurfer[i].backend.ac.createStereoPanner();

    if (i === 1) {
        wavesurfer[1].setPlaybackRate(1.01)
        wavesurfer[1].panner.pan.value = -1
    } else {
        wavesurfer[0].panner.pan.value = 1
    }

    wavesurfer[i].backend.setFilter(wavesurfer[i].panner)

    region.push(Object.values(wavesurfer[i].regions.list)[0]);

    wavesurfer[i].on('ready', function () {
        region[i].play();
    });
}









