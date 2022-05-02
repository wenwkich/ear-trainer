import { Note, Scale } from "@tonaljs/tonal";
import React, { useMemo } from "react";
import styled from "styled-components";
import _ from "lodash";
import { basisCoef, isBlackKey } from "../utils/keys";

interface Props {
  note: string;
  scale: string;
  index: number;
  onClick: () => void;
}
export default function PianoKey({ onClick, scale, note, index }: Props) {
  const midi = useMemo(() => Note.midi(note), [note]);
  const scaleNotes = useMemo(() => Scale.get(scale).notes, [scale]);
  const degree = useMemo(() => {
    const idx = _.findIndex(
      scaleNotes,
      (currNote) => Note.midi(currNote) === Note.midi(note)
    );
    return idx === -1 ? undefined : idx + 1;
  }, [scaleNotes, note]);
  return (
    <PianoKeyWrapper onClick={onClick} midi={midi} scale={scale}>
      {degree && <DegreeWrapper midi={midi}>{degree}</DegreeWrapper>}
    </PianoKeyWrapper>
  );
}

const PianoKeyWrapper = styled.div<{
  midi: number | undefined | null;
  scale: string;
}>`
  position: relative;
  border: 4px solid black;
  border-radius: 0.5rem;
  transition: all 0.07s ease;
  display: block;
  box-sizing: border-box;
  z-index: 2;

  left: ${(props) =>
    isBlackKey(props.midi)
      ? `${5 + basisCoef(props.scale, props.midi!) * 6.66666}%`
      : `${basisCoef(props.scale, props.midi!) * 6.66666}%`};

  ${(props) =>
    isBlackKey(props.midi)
      ? `
    position: absolute;
    width: 3.333333%;
    height: 60%;
    background: #000;
    color: #eee;
    top: 0;
    z-index: 3;
  `
      : `
    position: absolute;
    float: left;
    width: 6.66666%;
    height: 100%;
    background: rgba(255, 255, 255);
  `}
`;

const DegreeWrapper = styled.div<{
  midi: number | undefined | null;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  ${(props) =>
    isBlackKey(props.midi) ? `left: -100%; top: 70%;` : `left: 0%; top: 80%;`}
  background-color: #aaa;
  border-radius: 100%;
`;
