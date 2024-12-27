import {expect, test} from "vitest";
import {IntersectionModel} from "$lib/intersectionModel";

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

  subject.updateTicks(1);

  expectNorthSouthGreen(subject);

  subject.updateTicks(29);

  expectEastWestGreen(subject);

  subject.updateTicks(2);

  expectEastWestGreen(subject);

  subject.updateTicks(28);

  expectNorthSouthGreen(subject);
});

test("intersection left turn lanes alternate every 30 ticks", () => {
  const subject = new IntersectionModel();

  subject.updateTicks(1);

  expectNorthSouthLeftGreen(subject);

  subject.updateTicks(29);

  expectEastWestLeftGreen(subject);

  subject.updateTicks(2);

  expectEastWestLeftGreen(subject);

  subject.updateTicks(28);

  expectNorthSouthLeftGreen(subject);
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

test("intersection allows cars turn left from north to east", () => {
  const subject = new IntersectionModel();

  subject.northRoad.leftLane.cars = 2

  expect(subject.northRoad.leftLane.cars).toEqual(2);
  expect(subject.eastRoad.incomingLane.cars).toEqual(0);

  subject.updateTicks(1);

  expect(subject.northRoad.leftLane.cars).toEqual(1);
  expect(subject.eastRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.leftLane.cars).toEqual(0);
  expect(subject.eastRoad.incomingLane.cars).toEqual(1);

  subject.updateTicks(1);

  expect(subject.northRoad.leftLane.cars).toEqual(0);
  expect(subject.eastRoad.incomingLane.cars).toEqual(0);
});


function expectNorthSouthGreen(subject: IntersectionModel) {
  expect(subject.northRoad.middleTrafficLight).toEqual('green');
  expect(subject.southRoad.middleTrafficLight).toEqual('green');
  expect(subject.westRoad.middleTrafficLight).toEqual('red');
  expect(subject.eastRoad.middleTrafficLight).toEqual('red');
}


function expectNorthSouthLeftGreen(subject: IntersectionModel) {
  expect(subject.northRoad.leftTrafficLight).toEqual('green');
  expect(subject.southRoad.leftTrafficLight).toEqual('green');
  expect(subject.westRoad.leftTrafficLight).toEqual('red');
  expect(subject.eastRoad.leftTrafficLight).toEqual('red');
}

function expectEastWestGreen(subject: IntersectionModel) {
  expect(subject.northRoad.middleTrafficLight).toEqual('red');
  expect(subject.southRoad.middleTrafficLight).toEqual('red');
  expect(subject.westRoad.middleTrafficLight).toEqual('green');
  expect(subject.eastRoad.middleTrafficLight).toEqual('green');
}

function expectEastWestLeftGreen(subject: IntersectionModel) {
  expect(subject.northRoad.leftTrafficLight).toEqual('red');
  expect(subject.southRoad.leftTrafficLight).toEqual('red');
  expect(subject.westRoad.leftTrafficLight).toEqual('green');
  expect(subject.eastRoad.leftTrafficLight).toEqual('green');
}