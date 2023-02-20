export default class Core {
	constructor({rows, columns}) {
		Object.assign(this, {rows, columns})
		this.matchMap = {}
		this.cards = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
	}

	createGameElements(rows = this.rows, columns = this.columns){
		this.rows = rows;
		this.columns = columns;

		const gameItems = this.createGameItems(rows, columns);

		this.matchMap = this.createMatchMap(gameItems)

		return this.createGameBoard(gameItems, columns)
	}

	checkMatch(index1, index2){
		const match = this.matchMap[index1] === this.matchMap[index2]
		if(match){
			delete this.matchMap[index2]
			delete this.matchMap[index1]
		}
		return match
	}

	checkWin(){
		return Object.keys(this.matchMap).length === 0
	}

	createGameItems(rows, columns){
		const picks = this.pickRandom(this.cards, (rows * columns) / 2)
		return this.shuffle([...picks, ...picks])
	}

	createMatchMap(items){
		const matchObj = {}
		items.forEach((item, index) => {
			matchObj[`i_${index}`] = item
		})

		return matchObj
	}

	pickRandom(array, items) {
		const clonedArray = [...array]
		const randomPicks = []

		for (let index = 0; index < items; index++) {
			const randomIndex = Math.floor(Math.random() * clonedArray.length)

			randomPicks.push(clonedArray[randomIndex])
			clonedArray.splice(randomIndex, 1)
		}

		return randomPicks
	}

	shuffle(array) {
		const clonedArray = [...array]

		for (let index = clonedArray.length - 1; index > 0; index--) {
			const randomIndex = Math.floor(Math.random() * (index + 1))
			const original = clonedArray[index]

			clonedArray[index] = clonedArray[randomIndex]
			clonedArray[randomIndex] = original
		}

		return clonedArray
	}

	createGameBoard(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}
}
