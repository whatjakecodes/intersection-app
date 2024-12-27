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
  tick: number = 0;

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

  updateTicks(tickCount: number) {
    this.tick += tickCount;
    
    const range = Math.floor(this.tick / 30);
    if (range % 2 === 0) {
      this.northRoad.middleTrafficLight = "green";
      this.southRoad.middleTrafficLight = "green";
      this.westRoad.middleTrafficLight = "red";
      this.eastRoad.middleTrafficLight = "red";
    } else {
      this.northRoad.middleTrafficLight = "red";
      this.southRoad.middleTrafficLight = "red";
      this.westRoad.middleTrafficLight = "green";
      this.eastRoad.middleTrafficLight = "green";
    }
    
  }
}