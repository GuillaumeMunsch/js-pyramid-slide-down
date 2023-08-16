type AbstractPyramidLevel<T> = {
  type: T;
  values: number[];
};

type BottomPyramidLevel = AbstractPyramidLevel<"BottomPyramidLevel">;

type PyramidLevel = AbstractPyramidLevel<"PyramidLevel"> & {
  floorBelow: Pyramid;
};

export type Pyramid = PyramidLevel | BottomPyramidLevel;

type DeepnessLevel = number;
type Index = number;

type MemoizedNodeValues = Record<`${DeepnessLevel}-${Index}`, number>;

const isBottomPyramidLevel = (pyramid: Pyramid): pyramid is BottomPyramidLevel => pyramid.type === "BottomPyramidLevel";

const biggestInArray = (numbers: number[]) => numbers.sort((a, b) => b - a)[0];

export const computePyramidSlideDownNumber = (
  pyramid: Pyramid,
  memoizedNodeValues: MemoizedNodeValues = {},
  deepnessLevel = 0,
  currentValueIndex = 0
) => {
  if (memoizedNodeValues[`${deepnessLevel}-${currentValueIndex}`]) {
    console.log(`${deepnessLevel}-${currentValueIndex} is memoized`);

    return memoizedNodeValues[`${deepnessLevel}-${currentValueIndex}`];
  }

  const accessibleSubNodes = pyramid.values.slice(currentValueIndex, currentValueIndex + 2);

  if (isBottomPyramidLevel(pyramid)) return biggestInArray(accessibleSubNodes);

  const bothSubNodes = [
    computePyramidSlideDownNumber(pyramid.floorBelow, memoizedNodeValues, deepnessLevel + 1, currentValueIndex),
    computePyramidSlideDownNumber(pyramid.floorBelow, memoizedNodeValues, deepnessLevel + 1, currentValueIndex + 1),
  ];

  memoizedNodeValues[`${deepnessLevel + 1}-${currentValueIndex}`] = bothSubNodes[0];
  memoizedNodeValues[`${deepnessLevel + 1}-${currentValueIndex + 1}`] = bothSubNodes[1];

  return biggestInArray(bothSubNodes) + pyramid.values[currentValueIndex];
};
