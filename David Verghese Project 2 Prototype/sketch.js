var osc;
var playing = false;
var keyboard;
var whitenotes = [];
var blacknotes = [];
var keys = [];
var keys2 = [];
var c4;
var d4;
var e4;
var f4;
var g4;
var a4;
var b4;
var c5;

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.01 // this is supposed to change the attack and decay of the note. 
var decayTime = 0.005;
var susPercent = 0.2;
var releaseTime = 0.5;

var env, reverb;


// this is a chromatic keyboard

//if I was going to use some kind of visual method to trigger votes (instead of just pressing keys)
//I would probably have to work out a bunch of scales
//like this: http://www.earslap.com/page/otomata.html (you can select different scales, instead of choosing the notes yourself)

function preload() {

  keyboard = loadImage("piano.png");
  square = loadImage("data/Square.png");
  sine = loadImage("data/Sine.png");
  sawtooth = loadImage("data/Sawtooth.png");
  trianglewave = loadImage("data/Triangle.png");

}

function setup() {
  createCanvas(600, 600);
  background(255);
  textAlign(CENTER);

  osc = new p5.Oscillator(); // the keyboard uses 3 oscilators
  osc.setType('sawtooth');
  //osc.freq(480);
  osc.amp(env);
  osc.start();
  osc.disconnect(); 

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  reverb = new p5.Reverb();
  reverb.process(osc, 3, 2);

  env2 = new p5.Env();
  env2.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env2.setRange(attackLevel, releaseLevel);

  reverb2 = new p5.Reverb();


  osc2 = new p5.Oscillator();
  osc2.setType('sawtooth');
  //osc2.freq(480);
  osc2.amp(env2);
  osc2.start();
  //reverb2.process(osc2, 3, 2);
  //osc2.disconnect();

  env3 = new p5.Env();
  env3.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env3.setRange(attackLevel, releaseLevel);

  reverb3 = new p5.Reverb();


  osc3 = new p5.Oscillator();
  osc3.setType('sawtooth');
  //osc3.freq(480);
  osc3.amp(env2);
  osc3.start();
  reverb3.process(osc2, 3, 2);
  osc3.disconnect();


  whitenotes[0] = 261.63; // these are the frequencies of the white keys
  whitenotes[1] = 293.66;
  whitenotes[2] = 329.63;
  whitenotes[3] = 349.23;
  whitenotes[4] = 392;
  whitenotes[5] = 440;
  whitenotes[6] = 493.88;
  whitenotes[7] = 523.25;
  whitenotes[8] = 587.33;

  blacknotes[0] = 277.18; // these are the frequencies of the black keys
  blacknotes[1] = 311.13;
  blacknotes[2] = 369.99;
  blacknotes[3] = 415.3;
  blacknotes[4] = 466.16;

  keys[0] = 'a'; //c4
  keys[1] = 's';
  keys[2] = 'd'; //e4
  keys[3] = 'f';
  keys[4] = 'g'; //g4
  keys[5] = 'h';
  keys[6] = 'j'; //b4
  keys[7] = 'k'; //c5
  keys[8] = 'l';

  keys2[0] = 'w'; //c#4
  keys2[1] = 'e'; //d#4
  keys2[2] = 't'; //#f4
  keys2[3] = 'y'; //g#4
  keys2[4] = 'u'; //a#4

  image(keyboard, 0, 100, 500, 300);
  //image(square, 100, 300, 100, 50);
  //image(sawtooth, 100, 350, 100, 50);
  //image(sine, 100, 400, 100, 50);
  //image(trianglewave, 100, 450, 100, 50);

  c4 = new Whitenote(whitenotes[0], keys[0]);
  d4 = new Whitenote(whitenotes[1], keys[1]);
  e4 = new Whitenote(whitenotes[2], keys[2]);
  f4 = new Whitenote(whitenotes[3], keys[3]);
  g4 = new Whitenote(whitenotes[4], keys[4]);
  a4 = new Whitenote(whitenotes[5], keys[5]);
  b4 = new Whitenote(whitenotes[6], keys[6]);
  c5 = new Whitenote(whitenotes[7], keys[7]);

  csharp4 = new Blacknote(blacknotes[0], keys2[0]);
  dsharp4 = new Blacknote(blacknotes[1], keys2[1]);
  fsharp4 = new Blacknote(blacknotes[2], keys2[2]);
  gsharp4 = new Blacknote(blacknotes[3], keys2[3]);
  asharp4 = new Blacknote(blacknotes[4], keys2[4]);

}

function draw() {
  c4.sound();
  d4.sound();
  e4.sound();
  f4.sound();
  g4.sound();
  a4.sound();
  b4.sound();
  c5.sound();

  csharp4.sound();
  dsharp4.sound();
  fsharp4.sound();
  gsharp4.sound();
  asharp4.sound();


}

function Whitenote(freq, button) {


  this.sound = function() {
    if (keyIsPressed === true) {
      if (key == button) {
        if (!playing) {
          // ramp amplitude to 0.5 over 0.1 seconds
          osc.amp(0.1, 0.5);
          osc.setType('triangle');
          osc.freq(freq);
          playing = true;

          osc2.amp(0.1, 0.5);
          osc2.setType('square');
          osc2.freq(freq);
          playing = true;

          osc3.amp(0.1, 0.5);
          osc3.setType('sawtooth');
          osc3.freq(freq);
          playing = true;

        } else {
          // ramp amplitude to 0 over 0.5 seconds
          osc.amp(0, 0.5);
          playing = false;

        }



      }


    }
  }
}


function Blacknote(freq, button) {


  this.sound = function() {
    if (keyIsPressed === true) {
      if (key == button) {
        if (!playing) {
          // ramp amplitude to 0.5 over 0.1 seconds
          osc.amp(0.1, 0.5);
          osc.setType('triangle');
          osc.freq(freq);
          playing = true;

          osc2.amp(0.1, 0.5);
          osc2.setType('square');
          osc2.freq(freq);
          playing = true;

          osc3.amp(0.1, 0.5);
          osc3.setType('sawtooth');
          osc3.freq(freq);
          playing = true;

        } else {
          // ramp amplitude to 0 over 0.5 seconds
          osc.amp(0, 0.5);
          playing = false;

        }



      } else {
        // ramp amplitude to 0 over 0.5 seconds
        osc.amp(0, 0.5);
        playing = false;


      }
    }
  }}