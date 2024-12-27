import {expect, test} from "vitest";
import {IntersectionModel} from "$lib/intersectionModel";

test("intersection model can be created", () => {
  const subject = new IntersectionModel();
  
  expect(subject.northRoad.leftLane.cars).toHaveLength(0);
  expect(subject.northRoad.midLeftLane.cars).toHaveLength(0);
  expect(subject.northRoad.midRightLane.cars).toHaveLength(0);
  expect(subject.northRoad.rightLane.cars).toHaveLength(0);

  expect(subject.northRoad.leftTrafficLight).toEqual('orange');
  expect(subject.northRoad.midLeftTrafficLight).toEqual('green');
  expect(subject.northRoad.midRightTrafficLight).toEqual('green');
  expect(subject.northRoad.rightTrafficLight).toEqual('red');

  expect(subject.southRoad.leftLane.cars).toHaveLength(0);
  expect(subject.southRoad.midLeftLane.cars).toHaveLength(0);
  expect(subject.southRoad.midRightLane.cars).toHaveLength(0);
  expect(subject.southRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.southRoad.leftTrafficLight).toEqual('orange');
  expect(subject.southRoad.midLeftTrafficLight).toEqual('green');
  expect(subject.southRoad.midRightTrafficLight).toEqual('green');
  expect(subject.southRoad.rightTrafficLight).toEqual('red');

  expect(subject.eastRoad.leftLane.cars).toHaveLength(0);
  expect(subject.eastRoad.midLeftLane.cars).toHaveLength(0);
  expect(subject.eastRoad.midRightLane.cars).toHaveLength(0);
  expect(subject.eastRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.eastRoad.leftTrafficLight).toEqual('orange');
  expect(subject.eastRoad.midLeftTrafficLight).toEqual('green');
  expect(subject.eastRoad.midRightTrafficLight).toEqual('green');
  expect(subject.eastRoad.rightTrafficLight).toEqual('red');

  expect(subject.westRoad.leftLane.cars).toHaveLength(0);
  expect(subject.westRoad.midLeftLane.cars).toHaveLength(0);
  expect(subject.westRoad.midRightLane.cars).toHaveLength(0);
  expect(subject.westRoad.rightLane.cars).toHaveLength(0);
  
  expect(subject.westRoad.leftTrafficLight).toEqual('orange');
  expect(subject.westRoad.midLeftTrafficLight).toEqual('green');
  expect(subject.westRoad.midRightTrafficLight).toEqual('green');
  expect(subject.westRoad.rightTrafficLight).toEqual('red');
});