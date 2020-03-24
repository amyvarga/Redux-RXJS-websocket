import {
  compareBusTimes,
  sortByDate,
  limitToTimeFrame
} from "./index";
const item1 = {expectedArrival: "2020-03-24T16:35:36Z" };
const item2 = {expectedArrival: "2020-03-24T16:30:36Z" };
const item3 = { expectedArrival: "2020-03-24T16:29:36Z" };
const item4 = { expectedArrival: "2020-03-24T16:28:36Z" };

describe('compareBusTimes', () => {

  it('will return 1 when timeA is later than timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:45:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(1);
  });
  it('will return -1 when timeA is earlier than timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:15:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(-1);

  });
  it('will return 0 when timeA is equal to timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(0);
  });
});

describe('sortByDate', () => {
  it('will order an array of dates', () => {
    const times = [item1, item2, item3, item4];
    expect(sortByDate(times)).toEqual([item4, item3, item2, item1]);
  });
});

describe('limitToTimeFrame', () => {
  it('should only include times that are within the stated time frame', () => {
    const times = [item1, item2, item3, item4];
    expect(limitToTimeFrame(15)(times)).toEqual([item1, item2, item3, item4]);
  });
});