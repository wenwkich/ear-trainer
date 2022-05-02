import { Piano } from "@tonejs/piano";

export const piano = new Piano({
  velocities: 2,
});
piano.toDestination();

piano.load().then(() => {
  console.log("loaded!");
});

export const audioContext = new AudioContext();
