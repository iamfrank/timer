import { soundEffect } from "./sound.js"

export function beepStart() {
  soundEffect(
    880,       //frequency
    0.1,         //attack
    0.4,          //decay
    "sine",       //waveform
    1,            //volume
    0.2,          //pan
    0,            //wait before playing
    0,          //pitch bend amount
    false,         //reverse
    50,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  )
}

export function beepEnd() {
  soundEffect(
    560,       //frequency
    0.1,         //attack
    0.4,          //decay
    "sine",       //waveform
    1,            //volume
    0.2,          //pan
    0,            //wait before playing
    0,          //pitch bend amount
    false,         //reverse
    50,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  )
}