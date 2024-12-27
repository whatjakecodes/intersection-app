export interface Car {
}

export interface Lane {
  cars: Car[];
}

export type TrafficLightState = 'red' | 'green' | 'yellow' | 'orange' | 'gray';

export interface Road {
  middleTrafficLight: TrafficLightState;
  leftTrafficLight: TrafficLightState;
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
  resetTicks() {
    this.tick = 0;
    this.refreshState();
  }

  updateTicks(tickCount: number) {
    this.tick += tickCount;
    this.refreshState();
  }

  private refreshState() {
    if (this.tick == 0) {
      this.northRoad.middleTrafficLight = "red";
      this.southRoad.middleTrafficLight = "red";
      this.westRoad.middleTrafficLight = "red";
      this.eastRoad.middleTrafficLight = "red";
      return;
    }
    
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