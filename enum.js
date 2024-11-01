export default class Enum {
	#enumItems;
	#valuesType;
	keys = [];
	values = [];
	length;

	#checkKey(key) {
		if (key === undefined ||
			key === null ||
			key === "" ||
			typeof key !== "string") throw new Error(`Key ${key} must be not null string`);
	}

	#checkValue(value) {
		const valueType = typeof value;

		if (!this.#valuesType) this.#valuesType = valueType;

		if (value === undefined ||
			value === null ||
			value === "" ||
			valueType !== "string" &&
			valueType !== "number") throw new Error(`Value ${value} must be not null or undefined, string or number`);

		if (valueType !== this.#valuesType) throw new Error(`All values must be of the same type ${this.#valuesType}`);
	}

	#checkKeyExisting(keysSet, key) {
		if (keysSet.has(key)) throw new Error(`Key ${key} already exists`);
	}

	#checkValuesAndGetEnumItems(values) {
		const keysSet = new Set();
		const enumItems = [];

		if (Array.isArray(values)) {
			values.forEach(value => {
				this.#checkValue(value);

				const key = value.toString();
				this.#checkKey(key);
				this.#checkKeyExisting(keysSet, key);

				keysSet.add(key);
				enumItems.push({ key, value });
			});
		} else if (typeof values === "object") {
			Object.entries(values).forEach(([key, value]) => {
				this.#checkKey(key);
				this.#checkValue(value);
				this.#checkKeyExisting(keysSet, key);

				keysSet.add(key);
				enumItems.push({ key, value });
			});
		} else throw new Error("Values must be array or object with string keys, and values, which will be converted to string");

		if (enumItems.length === 0) throw new Error("Empty enum");

		return enumItems;
	}

	constructor(values) {
		this.#enumItems = this.#checkValuesAndGetEnumItems(values);

		for (const { key, value } of this) {
			this[key] = value;
			this.keys.push(key);
			this.values.push(value);
		}

		this.length = this.#enumItems.length;

		Object.freeze(this);
	}

	toString() {
		return "[Enum]";
	}

	toJSON() {
		return Object.fromEntries(this.#enumItems.map(({ key, value }) => [key, value]));
	}

	[Symbol.iterator]() {
		return this.#enumItems[Symbol.iterator]();
	}
};
