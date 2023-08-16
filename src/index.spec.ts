// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Pyramid, computePyramidSlideDownNumber } from ".";

expect.extend(matchers);

test("Basic pyramid with 3", () => {
  // GIVEN
  const pyramid: Pyramid = {
    type: "BottomPyramidLevel",
    values: [3],
  };

  // WHEN
  const sum = computePyramidSlideDownNumber(pyramid);

  // THEN
  expect(sum).toEqual(3);
});

test("Basic pyramid with 5", () => {
  // GIVEN
  const pyramid: Pyramid = {
    type: "BottomPyramidLevel",
    values: [5],
  };

  // WHEN
  const sum = computePyramidSlideDownNumber(pyramid);

  // THEN
  expect(sum).toEqual(5);
});

test("2 levels", () => {
  // GIVEN
  const pyramid: Pyramid = {
    type: "PyramidLevel",
    values: [5],
    floorBelow: {
      type: "BottomPyramidLevel",
      values: [1, 3],
    },
  };

  // WHEN
  const sum = computePyramidSlideDownNumber(pyramid);

  // THEN
  expect(sum).toEqual(8);
});

test("3 levels", () => {
  // GIVEN
  const pyramid: Pyramid = {
    type: "PyramidLevel",
    values: [5],
    floorBelow: {
      type: "PyramidLevel",
      values: [1, 3],
      floorBelow: {
        type: "BottomPyramidLevel",
        values: [18, 3, 5],
      },
    },
  };

  // WHEN
  const sum = computePyramidSlideDownNumber(pyramid);

  // THEN
  expect(sum).toEqual(24);
});

test("3 levels", () => {
  // GIVEN
  const pyramid: Pyramid = {
    type: "PyramidLevel",
    values: [5],
    floorBelow: {
      type: "PyramidLevel",
      values: [1, 3],
      floorBelow: {
        type: "BottomPyramidLevel",
        values: [2, 3, 5],
      },
    },
  };

  // WHEN
  const sum = computePyramidSlideDownNumber(pyramid);

  // THEN
  expect(sum).toEqual(13);
});

