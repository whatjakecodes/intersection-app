export interface Car {
}

export interface Lane {
  cars: number;
}

export type TrafficLightState = 'red' | 'green' | 'yellow' | 'orange' | 'gray';
export type Direction = 'north' | 'south' | 'east' | 'west';

export interface Road {
  middleTrafficLight: TrafficLightState;
  leftTrafficLight: TrafficLightState;
  rightTrafficLight: TrafficLightState;

  rightLane: Lane;
  incomingLane: Lane;
  outgoingLane: Lane;
  leftLane: Lane;
}

function createDefaultRoad(): Road {
  return {
    leftTrafficLight: "red",
    middleTrafficLight: "red",
    rightTrafficLight: "red",

    leftLane: {cars: 0},
    incomingLane: {cars: 0},
    outgoingLane: {cars: 0},
    rightLane: {cars: 0}
  };
}

export class IntersectionModel {
  northRoad: Road;
  southRoad: Road;
  eastRoad: Road;
  westRoad: Road;
  tick: number = 0;

  constructor() {
    this.northRoad = createDefaultRoad();
    this.southRoad = createDefaultRoad();
    this.eastRoad = createDefaultRoad();
    this.westRoad = createDefaultRoad();
  }

  resetTicks() {
    this.tick = 0;
    this.refreshState();
  }

  updateTicks(tickCount: number) {
    this.tick += tickCount;
    this.refreshState();
  }

  updateCars() {

  }

  private refreshState() {
    if (this.tick == 0) {
      this.northRoad.middleTrafficLight = "red";
      this.southRoad.middleTrafficLight = "red";
      this.westRoad.middleTrafficLight = "red";
      this.eastRoad.middleTrafficLight = "red";
      return;
    }
    this.moveIncomingLane(this.northRoad);
    this.moveIncomingLane(this.southRoad);
    this.moveIncomingLane(this.eastRoad);
    this.moveIncomingLane(this.westRoad);

    this.moveFromLane(this.northRoad, this.southRoad);
    this.moveFromLane(this.southRoad, this.northRoad);
    
    this.moveFromLane(this.eastRoad, this.westRoad);
    this.moveFromLane(this.westRoad, this.eastRoad);


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

  moveIncomingLane(road: Road) {
    if (road.incomingLane.cars > 0) {
      road.incomingLane.cars--;
    }
  }

  private moveFromLane(outgoingRoad: Road, incomingRoad: Road) {
    if (!['green', 'yellow'].includes(outgoingRoad.middleTrafficLight)){
      return;
    }
    
    let outCount = outgoingRoad.outgoingLane.cars;
    let inCount = incomingRoad.incomingLane.cars;
    if (outCount > 0) {
      outgoingRoad.outgoingLane.cars = outCount - 1
      incomingRoad.incomingLane.cars = inCount + 1;
    }
  }

  addCar(direction: Direction) {
    switch (direction) {
      case "north":
        this.northRoad.outgoingLane.cars++;
        break;
      case "south":
        this.southRoad.outgoingLane.cars++;
        break;
      case "east":
        this.eastRoad.outgoingLane.cars++;
        break;
      case "west":
        this.westRoad.outgoingLane.cars++;
        break;

    }
  }
}