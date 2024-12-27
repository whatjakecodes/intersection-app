interface Car {
}

interface Lane {
  cars: Car[];
}

type TrafficLightState = 'red' | 'green' | 'yellow';
type LeftTrafficLightState = TrafficLightState | 'orange';

interface Road {
  middleTrafficLight: TrafficLightState;
  leftTrafficLight: LeftTrafficLightState;
  rightTrafficLight: TrafficLightState;

  rightLane: Lane;
  middleIncomingLane: Lane;
  middleOutgoingLane: Lane;
  leftLane: Lane;
}

export class IntersectionModel {
  northRoad: Road;
  southRoad: Road;
  eastRoad: Road;
  westRoad: Road;

  constructor() {

    const defaultRoad: Road = {
      leftTrafficLight: "red",
      middleTrafficLight: "red",
      rightTrafficLight: "red",

      leftLane: {cars: []},
      middleIncomingLane: {cars: []},
      middleOutgoingLane: {cars: []},
      rightLane: {cars: []}
    };

    this.northRoad = {...defaultRoad};
    this.southRoad = {...defaultRoad};
    this.eastRoad = {...defaultRoad};
    this.westRoad = {...defaultRoad};
  }
}