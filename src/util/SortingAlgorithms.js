const improvedBubbleSort = (array) => {
  const algorithmSteps = [];
  let lastPosition = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    let cntSwaps = 0;
    for (let j = 0; j < lastPosition; j++) {
      if (array[j].height > array[j + 1].height) {
        [array[j], array[j + 1]] = [{ ...array[j + 1] }, { ...array[j] }];
        cntSwaps += 1;
      }

      array[j] = {
        height: array[j].height,
        style: "sample__left__pointer",
      };

      if (j + 1 < lastPosition) {
        array[j + 1] = {
          height: array[j + 1].height,
          style: "sample__right__pointer",
        };
      }

      algorithmSteps.push([
        ...array.map((sample) => {
          return {
            ...sample,
          };
        }),
      ]);

      array[j] = {
        height: array[j].height,
        style: "",
      };

      if (j + 1 < lastPosition) {
        array[j + 1] = {
          height: array[j + 1].height,
          style: "",
        };
      }
    }

    if (cntSwaps == 0) break;
    lastPosition -= 1;
  }

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);
  return algorithmSteps;
};

const selectionSort = (array) => {
  const algorithmSteps = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].height > array[j].height)
        [array[i], array[j]] = [{ ...array[j] }, { ...array[i] }];

      array[i] = {
        height: array[i].height,
        style: "sample__left__pointer",
      };

      array[j] = {
        height: array[j].height,
        style: "sample__right__pointer",
      };

      algorithmSteps.push([
        ...array.map((sample) => {
          return {
            ...sample,
          };
        }),
      ]);

      array[i] = {
        height: array[i].height,
        style: "",
      };

      array[j] = {
        height: array[j].height,
        style: "",
      };
    }
  }

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);

  return algorithmSteps;
};

const insertionSort = (array) => {
  const algorithmSteps = [];
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let key = array[i].height;
    array[i] = {
      height: array[i].height,
      style: "sample__left__pointer",
    };
    while (j >= 0 && key < array[j].height) {
      array[j + 1] = { ...array[j] };

      array[i] = {
        height: array[i].height,
        style: "sample__left__pointer",
      };

      array[j] = {
        height: array[j].height,
        style: "sample__right__pointer",
      };

      algorithmSteps.push([
        ...array.map((sample) => {
          return {
            ...sample,
          };
        }),
      ]);

      array[i] = {
        height: array[i].height,
        style: "",
      };

      array[j] = {
        height: array[j].height,
        style: "",
      };
      j -= 1;
    }

    array[j + 1].height = key;

    algorithmSteps.push([
      ...array.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);

    array[i] = {
      height: array[i].height,
      style: "",
    };
  }

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);

  return algorithmSteps;
};

const left = (i) => {
  return i * 2;
};

const right = (i) => {
  return i * 2 + 1;
};

const heapify = (heap, i, heapSize, algorithmSteps) => {
  let largest = i;
  let l = left(i + 1) - 1;
  let r = right(i + 1) - 1;
  if (l < heapSize && heap[l].height > heap[largest].height) largest = l;
  if (r < heapSize && heap[r].height > heap[largest].height) largest = r;

  if (largest != i) {
    [heap[largest], heap[i]] = [{ ...heap[i] }, { ...heap[largest] }];
    algorithmSteps.push([
      ...heap.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);
    heapify(heap, largest, heapSize, algorithmSteps);
  }
};

const heapSort = (array) => {
  const algorithmSteps = [];
  for (let i = array.length - 1; i >= 0; i--) {
    array[i] = {
      height: array[i].height,
      style: "sample__inside__heap",
    };
    heapify(array, i, array.length, algorithmSteps);

    algorithmSteps.push([
      ...array.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);
  }

  let heapSize = array.length;
  for (let i = array.length - 1; i >= 0; i--) {
    [array[0], array[i]] = [{ ...array[i] }, { ...array[0] }];
    heapSize -= 1;
    heapify(array, 0, heapSize, algorithmSteps);
    array[i] = {
      height: array[i].height,
      style: "",
    };

    algorithmSteps.push([
      ...array.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);
  }

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);

  return algorithmSteps;
};

const mergeSort = (array) => {
  const algorithmSteps = [];
  mergeSortHelper(array, 0, array.length - 1, algorithmSteps);

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);
  return algorithmSteps;
};

const mergeSortHelper = (array, l, r, algorithmSteps) => {
  if (l == r) return;

  let mid = Math.floor((l + r) / 2);
  mergeSortHelper(array, l, mid, algorithmSteps);
  mergeSortHelper(array, mid + 1, r, algorithmSteps);

  const mergedArray = [];
  let i = l;
  let j = mid + 1;
  for (let k = l; k <= r; k++) {
    if (i <= mid && j > r) {
      mergedArray.push({ ...array[i] });
      i += 1;
    } else if (j <= r && i > mid) {
      mergedArray.push({ ...array[j] });
      j += 1;
    } else if (array[i].height < array[j].height) {
      mergedArray.push({ ...array[i] });
      i += 1;
    } else {
      mergedArray.push({ ...array[j] });
      j += 1;
    }
  }

  for (let k = l; k <= r; k++) {
    array[k] = { ...mergedArray[k - l] };

    array[k] = {
      height: array[k].height,
      style: "sample__pivot__pointer",
    };

    array[l] = {
      height: array[l].height,
      style: "sample__left__pointer",
    };

    array[r] = {
      height: array[r].height,
      style: "sample__right__pointer",
    };

    algorithmSteps.push([
      ...array.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);

    array[k] = {
      height: array[k].height,
      style: "",
    };

    array[l] = {
      height: array[l].height,
      style: "",
    };

    array[r] = {
      height: array[r].height,
      style: "",
    };
  }
};

const quickSort = (array) => {
  const algorithmSteps = [];
  quickSortHelper(array, 0, array.length - 1, algorithmSteps);
  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);

  return algorithmSteps;
};

const quickSortHelper = (array, l, r, algorithmSteps) => {
  if (l < r) {
    let mid = partition(array, l, r, algorithmSteps);
    quickSortHelper(array, l, mid - 1, algorithmSteps);
    quickSortHelper(array, mid + 1, r, algorithmSteps);
  }
};

const partition = (array, l, r, algorithmSteps) => {
  let pivot = array[r].height;
  let i = l - 1;
  for (let j = l; j < r; j++) {
    if (array[j].height <= pivot) {
      i += 1;
      [array[i], array[j]] = [{ ...array[j] }, { ...array[i] }];
    }

    array[l] = {
      height: array[l].height,
      style: "sample__left__pointer",
    };

    array[r] = {
      height: array[r].height,
      style: "sample__right__pointer",
    };

    array[j] = {
      height: array[j].height,
      style: "sample__pivot__pointer",
    };

    if (i >= 0) {
      array[i] = {
        height: array[i].height,
        style: "sample__pivot__pointer",
      };
    }

    algorithmSteps.push([
      ...array.map((sample) => {
        return {
          ...sample,
        };
      }),
    ]);

    array[l] = {
      height: array[l].height,
      style: "",
    };

    array[r] = {
      height: array[r].height,
      style: "",
    };

    array[j] = {
      height: array[j].height,
      style: "",
    };

    if (i >= 0) {
      array[i] = {
        height: array[i].height,
        style: "",
      };
    }
  }

  [array[i + 1], array[r]] = [{ ...array[r] }, { ...array[i + 1] }];

  algorithmSteps.push([
    ...array.map((sample) => {
      return {
        ...sample,
      };
    }),
  ]);

  return i + 1;
};

export const getAlgorithmSteps = [
  improvedBubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
];
