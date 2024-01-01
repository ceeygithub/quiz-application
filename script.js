// dark theme
let icon = document.querySelector('.moon');
let timerIcon = document.querySelector('.timer-icon');

icon.addEventListener('click', () => {
    document.body.classList.toggle('darkTheme');
    if (document.body.classList.contains('darkTheme')) {

        icon.className = "fa-solid fa-sun sun"
        icon.style.color = 'white';
        timerIcon.style.color = 'white';

    }
    else {
        icon.className = "fa-solid fa-moon moon";
        icon.style.color = 'rgb(61,119,247)';
        timerIcon.style.color = 'black';
    }
})

