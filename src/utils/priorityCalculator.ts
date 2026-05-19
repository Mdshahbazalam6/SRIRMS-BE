const calculatePriority = (category: string): number => {
    switch (category) {
        case "ELECTRICITY":
            return 9;

        case "WATER":
            return 8;

        case "ROAD":
            return 7;

        case "SANITATION":
            return 6;

        default:
            return 5;
    }
};

module.exports = calculatePriority;