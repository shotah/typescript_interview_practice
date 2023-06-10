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


class Parkingspot {
    constructor(spotSize, spotLocation, spotPrice) {
        this.size = spotSize;
        this.location = spotLocation;
        this.price = spotPrice
        this.distance
    }
}

class Parkinglot {
    constructor() {
        this.availableParkingspots = {
            "small": [
                [1..10].map(n => new Parkingspot("small", n, '2'))
            ],
            "medium": [
                [11. .90].map(n => new Parkingspot("medium", n, '4'))
            ],
            "large": [
                [100. .91].map(n => new Parkingspot("medium", n, '6'))
            ];
        };
        this.sizes = ["small", "medium", "large"];
        // TODO: flip carsize to vehicle: size vs size: vehicle array.
        this.carSize = {
            "small": ["motorcycle"],
            "medium": ["car"],
            "large": ["truck"]
        }
        this.usedParkingspots = {
            "small": [],
            "medium": [],
            "large": []
        };
    }

    getParkingSpot(vehicle) {
        // TODO: flip carsize to vehicle: size vs size: vehicle array.
        const carSize = this.carSize[vehicle];

        let nextAvaiblespot = this.availableParkingspots[carSize].shift;
        while (!nextAvaiblespot) {
            this.sizes[this.sizes.indexOf(carSize) + 1]
            nextAvaiblespot = this.availableParkingspots[carSize].shift;
            // TODO: Handle when no spots are availble
        };
        if (!nextAvailableSpot)
            this.usedParkingspots[carSize].push(nextAvailableSpot);
        return nextAvailableSpot.location;
    }
}


const currentLot = new Parkinglot()
let vehicle = "car"
console.log(
    currentlot.getParkingSpot(vehicle)
);