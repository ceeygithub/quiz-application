// dark theme
let icon = document.querySelector('.moon');
let logo = document.querySelector('.logo');
// let timerIcon = document.querySelector('.timer-icon');

icon.addEventListener('click', () => {
    document.body.classList.toggle('darkTheme');
    if (document.body.classList.contains('darkTheme')) {

        icon.className = "fa-solid fa-sun sun"
        icon.style.color = 'white';
        logo.src = "./assets/Group 37018 (1).png";
        // timerIcon.style.color = 'white';

    }
    else {
        icon.className = "fa-solid fa-moon moon";
        icon.style.color = 'rgb(61,119,247)';
        logo.src = "./assets/Group 37018.png";
        // timerIcon.style.color = 'black';
    }
})

