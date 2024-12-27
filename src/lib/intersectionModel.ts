interface Car {
}

interface Lane {
  cars: Car[];
}

type TrafficLightState = 'red' | 'green' | 'yellow';
type LeftTrafficLightState = TrafficLightState | 'orange';

interface Road {
  midLeftTrafficLight: TrafficLightState;
  midRightTrafficLight: TrafficLightState;
  leftTrafficLight: LeftTrafficLightState;
  rightTrafficLight: TrafficLightState;

  rightLane: Lane;
  midRightLane: Lane;
  midLeftLane: Lane;
  leftLane: Lane;
}

export class IntersectionModel {
  northRoad: Road;
  southRoad: Road;
  eastRoad: Road;
  westRoad: Road;

  constructor() {

    const defaultRoad: Road = {
      leftTrafficLight: "orange",
      midLeftTrafficLight: "green",
      midRightTrafficLight: "green",
      rightTrafficLight: "red",

      leftLane: {cars: []},
      midRightLane: {cars: []},
      midLeftLane: {cars: []},
      rightLane: {cars: []}
    };

    this.northRoad = {...defaultRoad};
    this.southRoad = {...defaultRoad};
    this.eastRoad = {...defaultRoad};
    this.westRoad = {...defaultRoad};
  }
}