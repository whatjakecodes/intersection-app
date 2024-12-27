export interface Car {
}

export interface Lane {
  laneType: LaneType;
  cars: number;
}

export type TrafficLightState = 'red' | 'green' | 'yellow' | 'orange' | 'gray';
export type Direction = 'north' | 'south' | 'east' | 'west';
export type LaneType = 'left' | 'middle' | 'right';

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

    leftLane: {cars: 0, laneType: 'left'},
    incomingLane: {cars: 0, laneType: 'middle'},
    outgoingLane: {cars: 0, laneType: 'middle'},
    rightLane: {cars: 0, laneType: 'right'}
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

    resetCars(this.northRoad);
    resetCars(this.eastRoad);
    resetCars(this.southRoad);
    resetCars(this.westRoad);
    this.refreshState();
  }

  updateTicks(tickCount: number) {
    this.tick += tickCount;
    this.refreshState();
  }

  private refreshState() {
    if (this.tick == 0) {
      this.northRoad.middleTrafficLight = "red";
      this.northRoad.leftTrafficLight = "red";
      this.northRoad.rightTrafficLight = "red";
      this.southRoad.middleTrafficLight = "red";
      this.southRoad.leftTrafficLight = "red";
      this.southRoad.rightTrafficLight = "red";
      this.westRoad.middleTrafficLight = "red";
      this.westRoad.leftTrafficLight = "red";
      this.westRoad.rightTrafficLight = "red";
      this.eastRoad.middleTrafficLight = "red";
      this.eastRoad.leftTrafficLight = "red";
      this.eastRoad.rightTrafficLight = "red";
      return;
    }

    const range = Math.floor(this.tick / 40);
    const tickInCycle = this.tick % 40;
    const isLeftTurnPhase = tickInCycle >= 31 && tickInCycle <= 38;
    const isNorthSouthTurn = range % 2 === 0;
    if (isNorthSouthTurn) {
      if (isLeftTurnPhase) {
        const isYellowPhase = tickInCycle >= 38;
        const northSouthColor = isYellowPhase ? "yellow" : "green";
        this.northRoad.middleTrafficLight = 'red';
        this.northRoad.rightTrafficLight = 'red';
        this.southRoad.middleTrafficLight = 'red';
        this.southRoad.rightTrafficLight = 'red';

        this.northRoad.leftTrafficLight = northSouthColor;
        this.southRoad.leftTrafficLight = northSouthColor;
      } else {
        const isYellowPhase = tickInCycle >= 28;
        const northSouthColor = isYellowPhase ? "yellow" : "green";
        this.northRoad.middleTrafficLight = northSouthColor;
        this.northRoad.rightTrafficLight = northSouthColor;
        this.southRoad.middleTrafficLight = northSouthColor;
        this.southRoad.rightTrafficLight = northSouthColor;

        this.northRoad.leftTrafficLight = 'red';
        this.southRoad.leftTrafficLight = 'red';
      }

      this.westRoad.middleTrafficLight = "red";
      this.westRoad.rightTrafficLight = "red";
      this.westRoad.leftTrafficLight = 'red';
      this.eastRoad.middleTrafficLight = "red";
      this.eastRoad.rightTrafficLight = "red";
      this.eastRoad.leftTrafficLight = 'red';
    } else {
      // east/west turn
      this.northRoad.middleTrafficLight = "red";
      this.northRoad.rightTrafficLight = "red";
      this.northRoad.leftTrafficLight = "red";
      this.southRoad.middleTrafficLight = "red";
      this.southRoad.rightTrafficLight = "red";
      this.southRoad.leftTrafficLight = "red";

      if (isLeftTurnPhase) {
        const isYellowPhase = tickInCycle >= 38;
        const eastWestColor = isYellowPhase ? "yellow" : "green";
        this.eastRoad.middleTrafficLight = 'red';
        this.eastRoad.rightTrafficLight = 'red';
        this.westRoad.middleTrafficLight = 'red';
        this.westRoad.rightTrafficLight = 'red';

        this.eastRoad.leftTrafficLight = eastWestColor;
        this.westRoad.leftTrafficLight = eastWestColor;
      } else {
        const isYellowPhase = tickInCycle >= 28;
        const eastWestColor = isYellowPhase ? "yellow" : "green";
        this.eastRoad.middleTrafficLight = eastWestColor;
        this.eastRoad.rightTrafficLight = eastWestColor;
        this.westRoad.middleTrafficLight = eastWestColor;
        this.westRoad.rightTrafficLight = eastWestColor;

        this.eastRoad.leftTrafficLight = 'red';
        this.westRoad.leftTrafficLight = 'red';
      }

    }


    this.moveIncomingLane(this.northRoad);
    this.moveIncomingLane(this.southRoad);
    this.moveIncomingLane(this.eastRoad);
    this.moveIncomingLane(this.westRoad);

    this.moveFromLane(this.northRoad, this.southRoad);
    this.moveFromRightLane(this.northRoad, this.westRoad);
    this.moveFromLeftLane(this.northRoad, this.eastRoad);

    this.moveFromLane(this.southRoad, this.northRoad);
    this.moveFromRightLane(this.southRoad, this.eastRoad);
    this.moveFromLeftLane(this.southRoad, this.westRoad);

    this.moveFromLane(this.eastRoad, this.westRoad);
    this.moveFromRightLane(this.eastRoad, this.northRoad);
    this.moveFromLeftLane(this.eastRoad, this.southRoad);

    this.moveFromLane(this.westRoad, this.eastRoad);
    this.moveFromRightLane(this.westRoad, this.southRoad);
    this.moveFromLeftLane(this.westRoad, this.northRoad);
  }

  moveIncomingLane(road: Road) {
    if (road.incomingLane.cars > 0) {
      road.incomingLane.cars--;
    }
  }

  private moveFromLane(outgoingRoad: Road, incomingRoad: Road) {
    if (!['green', 'yellow'].includes(outgoingRoad.middleTrafficLight)) {
      return;
    }

    let outCount = outgoingRoad.outgoingLane.cars;
    let inCount = incomingRoad.incomingLane.cars;
    if (outCount > 0) {
      outgoingRoad.outgoingLane.cars = outCount - 1
      incomingRoad.incomingLane.cars = inCount + 1;
    }
  }

  private moveFromRightLane(outgoingRoad: Road, incomingRoad: Road) {
    if (!['green', 'yellow'].includes(outgoingRoad.rightTrafficLight)) {
      return;
    }

    let outCount = outgoingRoad.rightLane.cars;
    let inCount = incomingRoad.incomingLane.cars;
    if (outCount > 0) {
      outgoingRoad.rightLane.cars = outCount - 1
      incomingRoad.incomingLane.cars = inCount + 1;
    }
  }

  private moveFromLeftLane(outgoingRoad: Road, incomingRoad: Road) {
    if (!['green', 'yellow'].includes(outgoingRoad.leftTrafficLight)) {
      return;
    }

    let outCount = outgoingRoad.leftLane.cars;
    let inCount = incomingRoad.incomingLane.cars;
    if (outCount > 0) {
      outgoingRoad.leftLane.cars = outCount - 1
      incomingRoad.incomingLane.cars = inCount + 1;
    }
  }

  addCar(direction: Direction, lane: Lane) {

    let road = this.northRoad;
    switch (direction) {
      case "north":
        road = this.northRoad;
        break;
      case "south":
        road = this.southRoad;
        break;
      case "east":
        road = this.eastRoad;
        break;
      case "west":
        road = this.westRoad;
        break;
    }

    let laneToUpdate = road.outgoingLane;
    switch (lane.laneType) {
      case "left":
        laneToUpdate = road.leftLane;
        break;
      case "middle":
        laneToUpdate = road.outgoingLane;
        break;
      case "right":
        laneToUpdate = road.rightLane;
        break;
    }

    laneToUpdate.cars++;
  }
}

function resetCars(road: Road) {
  road.leftLane.cars = 0;
  road.rightLane.cars = 0;
  road.outgoingLane.cars = 0;
  road.incomingLane.cars = 0;
}
