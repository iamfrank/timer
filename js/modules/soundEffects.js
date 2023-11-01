import { soundEffect } from "./sound.js"

export function beepStart() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    1,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  )
}

export function beepEnd() {
  soundEffect(
    440,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    1,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    false,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  )
}