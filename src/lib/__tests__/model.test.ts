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


test("intersection left/right turn lanes alternate every 30 ticks", () => {
  const subject = new IntersectionModel();

  // 0 - 27 green
  subject.updateTicks(1);
  expectNorthSouthRight(subject, 'green');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');

  subject.updateTicks(28);
  expectNorthSouthRight(subject, 'yellow');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'red');

  // 28-30  yellow
  subject.updateTicks(1);
  expectNorthSouthRight(subject, 'yellow');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'red');

  // 31-38 is left green
  subject.updateTicks(1);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'green');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'red');

  // 38-40 is left yellow
  subject.updateTicks(7);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'yellow');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'red');

  // 41-70
  subject.updateTicks(2);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'green');
  expectEastWestLeft(subject, 'red');

  subject.updateTicks(28);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'yellow');
  expectEastWestLeft(subject, 'red');

  // 71-78 e/w left green
  subject.updateTicks(3);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'green');

  // 78-80 e/w left yellow
  subject.updateTicks(7);
  expectNorthSouthRight(subject, 'red');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'yellow');

  // 80 restarts cycle
  subject.updateTicks(2);
  expectNorthSouthRight(subject, 'green');
  expectNorthSouthLeft(subject, 'red');
  expectEastWestRight(subject, 'red');
  expectEastWestLeft(subject, 'red');
});

test("intersection N/S left turn lanes turn on from ticks 31-40", () => {
  const subject = new IntersectionModel();
  // 0 - 28 green
  // 29-30  yellow
  // 31-38 is left green
  // 38-40 is left yellow

  subject.updateTicks(30);
  expectNorthSouthLeft(subject, 'red');

  subject.updateTicks(1);
  expectNorthSouthLeft(subject, 'green');

  subject.updateTicks(7);
  expectNorthSouthLeft(subject, 'yellow');

  subject.updateTicks(1);
  expectNorthSouthLeft(subject, 'red');
})

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

function expectEastWestRight(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.westRoad.rightTrafficLight).toEqual(expectedLight);
  expect(subject.eastRoad.rightTrafficLight).toEqual(expectedLight);
}

function expectNorthSouth(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.southRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.westRoad.middleTrafficLight).toEqual('red');
  expect(subject.eastRoad.middleTrafficLight).toEqual('red');
}

function expectNorthSouthRight(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.rightTrafficLight).toEqual(expectedLight);
  expect(subject.southRoad.rightTrafficLight).toEqual(expectedLight);
}

function expectNorthSouthLeft(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.leftTrafficLight).toEqual(expectedLight);
  expect(subject.southRoad.leftTrafficLight).toEqual(expectedLight);
}

function expectEastWestGreen(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.northRoad.middleTrafficLight).toEqual('red');
  expect(subject.southRoad.middleTrafficLight).toEqual('red');
  expect(subject.westRoad.middleTrafficLight).toEqual(expectedLight);
  expect(subject.eastRoad.middleTrafficLight).toEqual(expectedLight);
}

function expectEastWestLeft(subject: IntersectionModel, expectedLight: TrafficLightState) {
  expect(subject.westRoad.leftTrafficLight).toEqual(expectedLight);
  expect(subject.eastRoad.leftTrafficLight).toEqual(expectedLight);
}