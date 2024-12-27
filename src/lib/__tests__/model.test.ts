import {expect, test} from "vitest";
import {IntersectionModel, type TrafficLightState} from "$lib/intersectionModel";

test("intersection model can be created", () => {
  const subject = new IntersectionModel();

  expect(subject.tick).toEqual(0);

  expect(subject.northRoad.leftLane.cars).toEqual(0);
  expect(subject.northRoad.outgoingLane.cars).toEqual(0);
  expect(subject.northRoad.incomingLane.cars).toEqual(0);
  expect(subject.northRoad.rightLane.cars).toEqual(0);

  expect(subject.northRoad.leftTrafficLight).toEqual('red');
  expect(subject.northRoad.middleTrafficLight).toEqual('red');
  expect(subject.northRoad.rightTrafficLight).toEqual('red');

  expect(subject.southRoad.leftLane.cars).toEqual(0);
  expect(subject.southRoad.outgoingLane.cars).toEqual(0);
  expect(subject.southRoad.incomingLane.cars).toEqual(0);
  expect(subject.southRoad.rightLane.cars).toEqual(0);

  expect(subject.southRoad.leftTrafficLight).toEqual('red');
  expect(subject.southRoad.middleTrafficLight).toEqual('red');
  expect(subject.southRoad.rightTrafficLight).toEqual('red');

  expect(subject.eastRoad.leftLane.cars).toEqual(0);
  expect(subject.eastRoad.outgoingLane.cars).toEqual(0);
  expect(subject.eastRoad.incomingLane.cars).toEqual(0);
  expect(subject.eastRoad.rightLane.cars).toEqual(0);

  expect(subject.eastRoad.leftTrafficLight).toEqual('red');
  expect(subject.eastRoad.middleTrafficLight).toEqual('red');
  expect(subject.eastRoad.rightTrafficLight).toEqual('red');

  expect(subject.westRoad.leftLane.cars).toEqual(0);
  expect(subject.westRoad.outgoingLane.cars).toEqual(0);
  expect(subject.westRoad.incomingLane.cars).toEqual(0);
  expect(subject.westRoad.rightLane.cars).toEqual(0);

  expect(subject.westRoad.leftTrafficLight).toEqual('red');
  expect(subject.westRoad.middleTrafficLight).toEqual('red');
  expect(subject.westRoad.rightTrafficLight).toEqual('red');
});

test("intersection straight lanes alternate every 30 ticks", () => {
  const subject = new IntersectionModel();
  // 0 - 28 green
  // 29-30  yellow
  subject.updateTicks(1);
  expectNorthSouth(subject, 'green');

  subject.updateTicks(28);
  expectNorthSouth(subject, 'yellow');

  subject.updateTicks(1);
  expectNorthSouth(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestGreen(subject, 'green');

  subject.updateTicks(28);
  expectEastWestGreen(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestGreen(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestGreen(subject, 'yellow');
  subject.updateTicks(1);
  expectNorthSouth(subject, "green");
});

test("intersection right turn lanes alternate every 30 ticks", () => {
  const subject = new IntersectionModel();
  // 0 - 28 green
  // 29-30  yellow
  subject.updateTicks(1);
  expectNorthSouthRight(subject, 'green');

  subject.updateTicks(28);
  expectNorthSouthRight(subject, 'yellow');

  subject.updateTicks(1);
  expectNorthSouthRight(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestRight(subject, 'green');

  subject.updateTicks(28);
  expectEastWestRight(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestRight(subject, 'yellow');

  subject.updateTicks(1);
  expectEastWestRight(subject, 'yellow');

  subject.updateTicks(1);
  expectNorthSouthRight(subject, "green");
});

test("intersection allows cars through from north to south", () => {
  const subject = new IntersectionModel();

  subject.northRoad.outgoingLane.cars = 2

  expect(subject.northRoad.outgoingLane.cars).toEqual(2);
  expect(subject.southRoad.incomingLane.cars).toEqual(0);

  subject.updateTicks(1);

  expect(subject.northRoad.outgoingLane.cars).toEqual(1);
  expect(subject.southRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.outgoingLane.cars).toEqual(0);
  expect(subject.southRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.outgoingLane.cars).toEqual(0);
  expect(subject.southRoad.incomingLane.cars).toEqual(0);
});

test("intersection allows cars turn right from north to west", () => {
  const subject = new IntersectionModel();

  subject.northRoad.rightLane.cars = 2

  expect(subject.northRoad.rightLane.cars).toEqual(2);
  expect(subject.westRoad.incomingLane.cars).toEqual(0);

  subject.updateTicks(1);

  expect(subject.northRoad.rightLane.cars).toEqual(1);
  expect(subject.westRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.rightLane.cars).toEqual(0);
  expect(subject.westRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.rightLane.cars).toEqual(0);
  expect(subject.westRoad.incomingLane.cars).toEqual(0);
});

function expectNorthSouth(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.southRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.westRoad.middleTrafficLight).toEqual('red');
  expect(subject.eastRoad.middleTrafficLight).toEqual('red');
}

function expectNorthSouthRight(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.rightTrafficLight).toEqual(expectedLight);
  expect(subject.southRoad.rightTrafficLight).toEqual(expectedLight);
  expect(subject.westRoad.rightTrafficLight).toEqual('red');
  expect(subject.eastRoad.rightTrafficLight).toEqual('red');
}

function expectEastWestGreen(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.middleTrafficLight).toEqual('red');
  expect(subject.southRoad.middleTrafficLight).toEqual('red');
  expect(subject.westRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.eastRoad.middleTrafficLight).toEqual(expectedLight);
}

function expectEastWestRight(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.rightTrafficLight).toEqual('red');
  expect(subject.southRoad.rightTrafficLight).toEqual('red');
  expect(subject.westRoad.rightTrafficLight).toEqual(expectedLight);
  expect(subject.eastRoad.rightTrafficLight).toEqual(expectedLight);
}