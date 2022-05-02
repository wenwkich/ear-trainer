import { Range, Scale } from "@tonaljs/tonal";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import PianoKey from "./PianoKey";

interface Props {
  scale: string;
  onNote?: (note: any) => void;
}
export default function Piano({ onNote, scale }: Props) {
  return (
    <PianoWrapper>
      {_.map(Range.chromatic(["C4", "C6"]), (note, index) => (
        <PianoKey
          onClick={() => onNote && onNote(note)}
          scale={scale}
          key={index}
          index={index}
          note={note}
        />
      ))}
    </PianoWrapper>
  );
}

const PianoWrapper = styled.div`
  width: 100%;
  height: 150px;
  max-width: 600px;
  position: relative;
`;
