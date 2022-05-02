import _ from "lodash";

export const basisCoef = (scale: string, midi: number) => {
  return (midi - 60) % 25 === 0
    ? 0
    : (midi - 60) % 25 === 2
    ? 1
    : (midi - 60) % 25 === 4
    ? 2
    : (midi - 60) % 25 === 5
    ? 3
    : (midi - 60) % 25 === 7
    ? 4
    : (midi - 60) % 25 === 9
    ? 5
    : (midi - 60) % 25 === 11
    ? 6
    : (midi - 60) % 25 === 12
    ? 7
    : (midi - 60) % 25 === 14
    ? 8
    : (midi - 60) % 25 === 16
    ? 9
    : (midi - 60) % 25 === 17
    ? 10
    : (midi - 60) % 25 === 19
    ? 11
    : (midi - 60) % 25 === 21
    ? 12
    : (midi - 60) % 25 === 23
    ? 13
    : (midi - 60) % 25 === 24
    ? 14
    : (midi - 60) % 25 === 1
    ? 0
    : (midi - 60) % 25 === 3
    ? 1
    : (midi - 60) % 25 === 6
    ? 3
    : (midi - 60) % 25 === 8
    ? 4
    : (midi - 60) % 25 === 10
    ? 5
    : (midi - 60) % 25 === 13
    ? 7
    : (midi - 60) % 25 === 15
    ? 8
    : (midi - 60) % 25 === 18
    ? 10
    : (midi - 60) % 25 === 20
    ? 11
    : (midi - 60) % 25 === 22
    ? 12
    : 13;
};

export const isBlackKey = (midi: number | undefined | null) =>
  midi && _.includes([1, 3, 6, 8, 10, 13, 15, 18, 20, 22], (midi - 60) % 12);
