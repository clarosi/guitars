export const delay3sec = 3000;

// TODO fetch from mongoDB
export const frets = [
    {"_id": 20, name: "20"},
    {"_id": 21, name: "21"},
    {"_id": 22, name: "22"},
    {"_id": 24, name: "24"}
];

// TODO fetch from mongoDB
export const prices = [
    {"_id": 0, name: "Any", array: []},
    {"_id": 1, name: "$1 to $299", array: [1, 299]},
    {"_id": 2, name: "$300 to $599", array: [300, 599]},
    {"_id": 3, name: "$600 to 999", array: [600, 999]},
    {"_id": 4, name: "$1000 to 1499", array: [1000, 1499]},
    {"_id": 5, name: "1500 to 1999", array: [1500, 1999]},
    {"_id": 6, name: "2000 or more", array: [2000, 100000]}
];