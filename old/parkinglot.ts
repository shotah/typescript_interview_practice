// Design an application to run a parking lot. Here are the requirements:
// * A parking lot contains spaces of increasing size: small, regular and oversized
// * Vehicles come in increasing size of: motorcycle, car, truck
// * The lot adheres to the following rules
//     * A motorcycle can park in any spot
//     * A car can park in a regular or oversized spot
//     * A truck can only park in an oversized spot

// Additional Requirements:
// * Spots increase in cost so it's important to optimize for revenue (i.e. better to have a motorcycle in a small than in an oversized)
// * It's optimal to park vehicles in spaces nearest the entrance for customer satisfaction

// structure: Classes where init calls, call function,
// inputs: vehicle
// Returns: spot 1-100

// Take aways and things to learn:
// 1. define a class
// 2. define a enum
// 3. Filter
// 4. Find
// 5. Sort

enum ParkinglotSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const CarTranslation: {[key: string]: ParkinglotSize[]} = {
  motorcycle: [
    ParkinglotSize.small,
    ParkinglotSize.medium,
    ParkinglotSize.large,
  ],
  car: [ParkinglotSize.medium, ParkinglotSize.large],
  truck: [ParkinglotSize.large],
};

class ParkingSpot {
  size: string;
  location: number;
  price: number;
  distance: number;
  available: boolean;

  constructor(
    spotSize: string,
    spotLocation: number,
    spotPrice: number,
    spotDistance: number
  ) {
    this.size = spotSize;
    this.location = spotLocation;
    this.price = spotPrice;
    this.distance = spotDistance;
    this.available = true;
  }
}

class Parkinglot {
  availableParkingSpots: ParkingSpot[];
  constructor() {
    this.availableParkingSpots = this.buildParkingSpots();
  }

  buildParkingSpots(): ParkingSpot[] {
    const newSpots: ParkingSpot[] = [];
    let distanceTracker = 0;
    for (const spotSize in ParkinglotSize) {
      console.log(`doing for size: ${spotSize}`);
      [...Array(5)].forEach((_, i) => {
        newSpots.push(new ParkingSpot(spotSize, i, i, distanceTracker));
        distanceTracker++;
      });
    }
    return newSpots;
  }

  findSpotBySize(
    availableParkingSpot: ParkingSpot,
    vehicleSizes: ParkinglotSize[]
  ) {
    return vehicleSizes.find(
      vehicleSize =>
        availableParkingSpot.size === vehicleSize &&
        availableParkingSpot.available
    );
  }

  getParkingSpot(vehicle: string): ParkingSpot {
    const vehicleSizes = CarTranslation[vehicle];
    const nextAvailableSpotIndex: number = this.availableParkingSpots.findIndex(
      (availableParkingSpot: ParkingSpot) =>
        this.findSpotBySize(availableParkingSpot, vehicleSizes)
    )!;
    if (nextAvailableSpotIndex !== undefined) {
      const nextAvailableSpot: ParkingSpot =
        this.availableParkingSpots[nextAvailableSpotIndex]!;
      nextAvailableSpot.available = false;
      return nextAvailableSpot;
    }
    throw 'No Spot found!';
  }
}

const currentLot: Parkinglot = new Parkinglot();
let vehicle = 'car';
console.log(`Searching for ${vehicle}`);
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));

vehicle = 'motorcycle';
console.log(`Searching for ${vehicle}`);
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));

vehicle = 'truck';
console.log(`Searching for ${vehicle}`);
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));
console.log(currentLot.getParkingSpot(vehicle));
