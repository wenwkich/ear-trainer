import { ChakraProvider, Checkbox, Select } from "@chakra-ui/react";
import _ from "lodash";
import { useState } from "react";
import styled from "styled-components";
import PianoComp from "./components/Piano";
import { SCALES } from "./constants/scales";
import WebMidi from "webmidi";
import { Note } from "@tonaljs/tonal";
import Question from "./components/Question";
import { audioContext, piano } from "./constants/sounds";

function App() {
  const [currNote, setCurrNote] = useState("");
  const [currScale, setCurrScale] = useState("C4 major");
  const [numNotes, setNumNotes] = useState(1);
  const [mode, setMode] = useState("sequential");

  WebMidi.enable(onEnabled);

  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      alert("No device detected.");
    } else {
      WebMidi.inputs.forEach((device, index) => {
        console.log(device);
      });
      const synth = WebMidi.inputs[0];

      synth.addListener("noteon", "all", (e) => {
        const note = Note.fromMidi(e.note.number);
        setCurrNote(note);
        piano.keyDown({ note, time: "+0" });
        piano.keyUp({ note, time: "+1" });
      });

      return (err?: Error) => alert(err);
    }
  }

  return (
    <ChakraProvider>
      <AppWrapper>
        Current Note is {currNote}
        <div>
          <Select
            placeholder="Select scale"
            onChange={(e) => {
              setCurrScale(e.target.value);
            }}
          >
            {_.map(SCALES, (scale, idx) => (
              <option value={scale}>{scale}</option>
            ))}
          </Select>
        </div>
        <PianoComp
          scale={currScale}
          onNote={(note) => {
            audioContext.resume();
            setCurrNote(note);
            piano.keyDown({ note, time: "+0" });
            piano.keyUp({ note, time: "+1" });
          }}
        />
        <div>
          <Select
            placeholder="Select number of Notes"
            onChange={(e) => {
              setNumNotes(+e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
        </div>
        <Checkbox
          isChecked={mode === "together"}
          onChange={() =>
            setMode((mode) => (mode === "together" ? "sequential" : "together"))
          }
        >
          Play tgt?
        </Checkbox>
        <Question scale={currScale} numNotes={numNotes} mode={mode} />
      </AppWrapper>
    </ChakraProvider>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  gap: 1rem;
`;

export default App;
