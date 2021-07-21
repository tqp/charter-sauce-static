const now = new Date();
const date = new Date('January 1, 2022 00:00:00');
// console.log('Current Time', now);
if(now.getTime() > date.getTime()){
    window.location.replace("https://customyachtcharter.com");
}
