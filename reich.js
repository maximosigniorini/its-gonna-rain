let wavesurfer = []
let region = []
let btn = document.querySelector('button')
let botones = document.querySelector('body')
let avanzar = 0
let retroceder = 0;
let flag = false

function importFile(files) {
    var file = files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (evt) {
            // Create a Blob providing as first argument a typed array with the file buffer
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);

            // Load the blob into Wavesurfer
            for (let i = 0; i < 2; i++) {
                wavesurfer[i].loadBlob(blob);
            }
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    }
}



for (let i = 0; i < 2; i++) {
    wavesurfer[i] = WaveSurfer.create({
        container: document.querySelector(`#waveform${i + 1}`),
        //backend: 'MediaElementWebAudio',
        plugins: [
            WaveSurfer.regions.create({
                regionsMinLength: 1,
                regions: [
                    {
                        start: 3,
                        end: 4,
                        loop: true,
                        color: 'rgba(0, 100, 255, 0.5)',
                        resize: false
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
        wavesurfer[1].setPlaybackRate(1.002)
        wavesurfer[1].panner.pan.value = -1
    } else {
        wavesurfer[0].panner.pan.value = 1
    }

    wavesurfer[i].backend.setFilter(wavesurfer[i].panner)

    region.push(Object.values(wavesurfer[i].regions.list)[0]);
}

btn.addEventListener('click', () => {
    flag = !flag;

    if (flag) {
        for (let j = 0; j < 2; j++) {
            region[j].play();
            btn.innerHTML = 'Pause'
        }
    } else {
        for (let k = 0; k < 2; k++) {
            wavesurfer[k].pause()
            btn.innerHTML = 'Start'
        }
    }
})

let regionStyle = document.querySelectorAll('.wavesurfer-region')

botones.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        avanzar += 1

        for (let i = 0; i < 2; i++) {
            region[i].start = avanzar
            region[i].end = avanzar + 1

            //20 - 630
            regionStyle[i].style.left = `${(avanzar * 50)}px`
        }
    }

    if (e.key == 'ArrowLeft') {
        avanzar -= 1

        for (let i = 0; i < 2; i++) {
            region[i].start = avanzar
            region[i].end = avanzar + 1

            //20 - 630
            regionStyle[i].style.left = `${(avanzar * 50)}px`
        }
    }

    if (e.key == " ") {
        flag = !flag;

        if (flag) {
            for (let j = 0; j < 2; j++) {
                region[j].play();
                btn.innerHTML = 'Pause'
            }
        } else {
            for (let k = 0; k < 2; k++) {
                wavesurfer[k].pause()
                btn.innerHTML = 'Start'
            }
        }
    }

    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
})








