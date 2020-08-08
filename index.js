const timerr = require('tiny-timer')
const notifier = require('node-notifier');

const timer = new timerr()

let round = 1;
let pause = false;

timer.on('tick', (ms) => {
    console.clear()
    console.log('round', round)
    if (pause) {
        console.log('pause')
    }
    console.log(msToMinutesAndSeconds(ms))
})

timer.on('done', () => {
    if (!pause) {
        if (round < 4) {
            pause = true
            notifier.notify(round + '. round has finished. Have a short break.');
            timer.start(1000 * 60 * 5)
        } else {
            notifier.notify(round + '. round has finished. Have a long break ☕️ and start over.');
        }
    } else {
        pause = false
        notifier.notify('Break is over, round ' + (round + 1) + '.');
        timer.start(1000 * 60 * 25)
        round++
    }
})

timer.start(1000 * 60 * 25)

function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}
