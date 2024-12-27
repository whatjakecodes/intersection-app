import {expect, test} from "vitest";
import {IntersectionModel} from "$lib/intersectionModel";

test("intersection model can be created", () => {
  const subject = new IntersectionModel();
  
  expect(subject.northRoad.leftLane.cars).toHaveLength(0);
  expect(subject.northRoad.middleOutgoingLane.cars).toHaveLength(0);
  expect(subject.northRoad.middleIncomingLane.cars).toHaveLength(0);
  expect(subject.northRoad.rightLane.cars).toHaveLength(0);

  expect(subject.northRoad.leftTrafficLight).toEqual('red');
  expect(subject.northRoad.middleTrafficLight).toEqual('red');
  expect(subject.northRoad.rightTrafficLight).toEqual('red');

  expect(subject.southRoad.leftLane.cars).toHaveLength(0);
  expect(subject.southRoad.middleOutgoingLane.cars).toHaveLength(0);
  expect(subject.southRoad.middleIncomingLane.cars).toHaveLength(0);
  expect(subject.southRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.southRoad.leftTrafficLight).toEqual('red');
  expect(subject.southRoad.middleTrafficLight).toEqual('red');
  expect(subject.southRoad.rightTrafficLight).toEqual('red');

  expect(subject.eastRoad.leftLane.cars).toHaveLength(0);
  expect(subject.eastRoad.middleOutgoingLane.cars).toHaveLength(0);
  expect(subject.eastRoad.middleIncomingLane.cars).toHaveLength(0);
  expect(subject.eastRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.eastRoad.leftTrafficLight).toEqual('red');
  expect(subject.eastRoad.middleTrafficLight).toEqual('red');
  expect(subject.eastRoad.rightTrafficLight).toEqual('red');

  expect(subject.westRoad.leftLane.cars).toHaveLength(0);
  expect(subject.westRoad.middleOutgoingLane.cars).toHaveLength(0);
  expect(subject.westRoad.middleIncomingLane.cars).toHaveLength(0);
  expect(subject.westRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.westRoad.leftTrafficLight).toEqual('red');
  expect(subject.westRoad.middleTrafficLight).toEqual('red');
  expect(subject.westRoad.rightTrafficLight).toEqual('red');
});

test("intersection with cars moves through lanes", () => {
  const subject = new IntersectionModel();
  
});