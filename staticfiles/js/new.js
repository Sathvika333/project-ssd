const music = new Audio('/static/audio/1.mp3');
// music.play();

const songs = [
    {
        id: 1,
        songName: 'On my way <br><div class="subtitle">Alan Walker</div>',
        poster: "/static/images/songs_img/1.jpg"
    },
    {
        id: 2,
        songName: 'Perfect<br> <div class="subtitle">Ed Sheeran</div>',
        poster: "/static/images/songs_img/2.jpg"



    },
    {
        id: 3,
        songName: 'Ram siya ram<br> <div class="subtitle">Adipursh</div>',
        poster: "/static/images/songs_img/3.jpg"
    },
    {
        id: 4,
        songName: 'chandsifarsih<br> <div class="subtitle">Fana</div>',
        poster: "/static/images/songs_img/4.jpg"
    },
    {
        id: 5,
        songName: 'Dil tu Jaan tu<br> <div class="subtitle">Private</div>',
        poster: "/static/images/songs_img/5.jpg"
    },
    {
        id: 6,
        songName: 'Enemy<br> <div class="subtitle">Imagine Dragon</div>',
        poster: "/static/images/songs_img/6.jpg"
    },
    {
        id: 7,
        songName: 'Heeriye<br> <div class="subtitle">Dulqur</div>',
        poster: "/static/images/songs_img/7.jpg"
    },
    {
        id: 8,
        songName: 'Inthandham<br><div class="subtitle">Sita Ramam</div>',
        poster: "/static/images/songs_img/8.jpg"
    },
    {
        id: 9,
        songName: 'June Pothey<br><div class="subtitle">nuvela nuvela</div>',
        poster: "/static/images/songs_img/9.jpg"
    },
    {
        id: 10,
        songName: 'sirivennela<br><div class="subtitle">Shyam singha roy</div>',
        poster: "/static/images/songs_img/10.jpg"
    },
    {
        id: 11,
        songName: 'Yetu pone<br><div class="subtitle">Dear Comrade</div>',
        poster: "/static/images/songs_img/11.jpg"
    },
    {
        id: 12,
        songName: 'Mama choodaro<br><div class="subtitle">Dear comrade</div>',
        poster: "/static/images/songs_img/11.jpg"
    },
    {
        id: 13,
        songName: 'Gira Gira<br><div class="subtitle">Dear comrade</div>',
        poster: "/static/images/songs_img/11.jpg"
    },
    {
        id: 14,
        songName: 'Kadallale<br><div class="subtitle">Dear comrade</div>',
        poster: "/static/images/songs_img/11.jpg"
    }
]


Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});

// search data start
// let search_results = document.getElementsByClassName('search_results')[0];

// songs.forEach(element => {
//     const { id, songName, poster } = element;
//     // console.log(poster);
//     let card = document.createElement('a');
//     card.classList.add('card');

//     card.innerHTML = `
//         <img src="${poster}" alt="${songName}">
//         <div class="content">
//             <p class="song-title">${songName}</p>
//             <p class="subtitle">Subtitle or other info</p> <!-- Optional subtitle for styling -->
//         </div>
//     `;
//     search_results.appendChild(card);
// });

// search data end


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave')

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
    }
})



const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, .0)';
    })
}

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playPlaylist')).forEach((el) => {
        el.classList.add("bi-play-circle-fill");
        el.classList.remove("bi-pause-circle-fill");
    })
}



let index = 0;

let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playPlaylist')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `/static/audio/${index}.mp3`;
        poster_master_play.src = `/static/images/songs_img/${index}.jpg`
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        download_music.href = `/static/audio/${index}.mp3`;

        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });



})


let currentstart = document.getElementById('currentstart');
let currentend = document.getElementById('currentend');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_dur);

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    // console.log(min1);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentend.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }

    currentstart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    // console.log(seek.value);

    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');


vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');


    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});


let back = document.getElementById('back');
let next = document.getElementById('next');
index = Array.from(document.getElementsByClassName('songItem')).length;
// console.log(index)


back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;

    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/images/songs_img/${index}.jpg`
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})


next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/images/songs_img/${index}.jpg`
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});
















let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];



pop_song_right.addEventListener('click', () => {

    pop_song.scrollLeft += 330;
});


pop_song_left.addEventListener('click', () => {

    pop_song.scrollLeft -= 330;
});


let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Artists_bx = document.getElementsByClassName('Artists_bx')[0];



pop_art_right.addEventListener('click', () => {

    Artists_bx.scrollLeft += 330;
});


pop_art_left.addEventListener('click', () => {

    Artists_bx.scrollLeft -= 330;
});




let pop_mood_left = document.getElementById('pop_mood_left');
let pop_mood_right = document.getElementById('pop_mood_right');
let mood_bx = document.getElementsByClassName('mood_bx')[0];



pop_mood_right.addEventListener('click', () => {

    mood_bx.scrollLeft += 330;
});


pop_mood_left.addEventListener('click', () => {

    mood_bx.scrollLeft -= 330;
});



let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;

        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});




const next_music = () => {
    if (index == songs.length) {
        index = 1
    } else {
        index++;
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/images/songs_img/${index}.jpg`
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    download_music.href = `/static/audio/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}



const repeat_music = () => {
    index;
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/images/songs_img/${index}.jpg`
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    download_music.href = `static/audio/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}


const random_music = () => {
    if (index == songs.length) {
        index = 1
    } else {
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/images/songs_img/${index}.jpg`
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    download_music.href = `/static/audio/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)"
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}


music.addEventListener('ended', () => {
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;

    }
})

// Existing music player code
// (Your previous code here)

// New user image click event listener
document.getElementById("user-icon").addEventListener("click", function () {
    let dropdown = document.getElementById("user-details-dropdown");
    dropdown.classList.toggle("show");
});

window.addEventListener("click", function (event) {
    if (!event.target.matches('#user-icon')) {
        let dropdowns = document.getElementsByClassName("user-details");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});
