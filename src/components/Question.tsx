import { Button } from "@chakra-ui/react";
import { Scale } from "@tonaljs/tonal";
import _ from "lodash";
import { useCallback, useState } from "react";
import { audioContext, piano } from "../constants/sounds";

interface Props {
  scale: string;
  numNotes: number;
  mode: string;
}
export default function Question({ scale, numNotes, mode }: Props) {
  const [randomNotes, setRandomNotes] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const play = useCallback(
    (notes: string[]) => {
      mode === "together" &&
        _.map(notes, (note) => {
          audioContext.resume();
          piano.keyDown({ note, time: "+0" });
          piano.keyUp({ note, time: "+1" });
        });

      mode === "sequential" &&
        _.reduce(
          notes,
          async (prev, note) => {
            await prev;
            piano.keyDown({ note, time: "+0" });
            piano.keyUp({ note, time: "+1" });
            return new Promise((r) => setTimeout(r, 800));
          },
          Promise.resolve()
        );
    },
    [mode]
  );

  return (
    <>
      <Button
        onClick={() => {
          const notes = _.sampleSize(Scale.get(scale).notes, numNotes);
          setRandomNotes(notes);
          setShowAnswer(false);
          play(notes);
        }}
      >
        Pick Random Notes
      </Button>
      <Button onClick={() => play(randomNotes)}>Play again</Button>
      <Button onClick={() => setShowAnswer(true)}>Show answer</Button>
      {showAnswer && <div>Answer: {_.join(randomNotes, ", ")}</div>}
    </>
  );
}
