// REF: https://www.codespot.org/building-a-countdown-timer-with-javascript/
const finaleTime = new Date("December 29, 2021 00:00:00").getTime();

const timer = () => {
    const currentTime = new Date().getTime();
    let difference = finaleTime - currentTime;
    // Displaying the alert when the timer finishes.
    if (difference < 0) {
        document.querySelector('.count-down-over').style.display = 'block';
        document.querySelector('.count-down').style.display = 'none';
    } else {
        document.querySelector('.count-down-over').style.display = 'none';
        document.querySelector('.count-down').style.display = 'block';
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
    let seconds = Math.floor(difference % (1000 * 60) / 1000);
    // Adding the zeros.
    days <= 99 ? days = `0${days}` : days;
    days <= 9 ? days = `00${days}` : days;
    hours <= 9 ? hours = `0${hours}` : hours;
    minutes <= 9 ? minutes = `0${minutes}` : minutes;
    seconds <= 9 ? seconds = `0${seconds}` : seconds;

    document.querySelector('#days').textContent = days;
    // document.querySelector('#hours').textContent = hours;
    // document.querySelector('#minutes').textContent = minutes;
    // document.querySelector('#seconds').textContent = seconds;

}
timer();
// Calling the function every 1000 milliseconds.
setInterval(timer, 1000);
