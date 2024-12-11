export class PuzzlesDatabase {
    db: string =
        `1,1..5.37..6.3..8.9......98...1.......8761..........6...........7.8.9.76.47...6.312,198543726643278591527619843914735268876192435235486179462351987381927654759864312,27,2.2
2,...81.....2........1.9..7...7..25.934.2............5...975.....563.....4......68.,934817256728653419615942738176425893452398167389176542897564321563281974241739685,23,0.0`;

    easyBefore: number = 3;
    mediumBefore: number = 5;
    hardAfter: number = 5;



    getEasy(): string {
        var easyPuzzles = this.db.split('\n').map(line => line.split(',')).filter(line => parseFloat(line[4]) < this.easyBefore);
        if (easyPuzzles.length == 0) throw "zero easy problems";

        return easyPuzzles[this.getRandomArbitrary(0, easyPuzzles.length)][0];
    }
    getMedium(): string {
        var easyPuzzles = this.db.split('\n').map(line => line.split(',')).filter(line => parseFloat(line[4]) < this.mediumBefore && parseFloat(line[4]) > this.easyBefore);
        if (easyPuzzles.length == 0) throw "zero easy problems";

        return easyPuzzles[this.getRandomArbitrary(0, easyPuzzles.length)][0];
    }
    getHard(): string {
        var easyPuzzles = this.db.split('\n').map(line => line.split(',')).filter(line => parseFloat(line[4]) > this.hardAfter);
        if (easyPuzzles.length == 0) throw "zero easy problems";

        return easyPuzzles[this.getRandomArbitrary(0, easyPuzzles.length)][0];
    }

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
} 