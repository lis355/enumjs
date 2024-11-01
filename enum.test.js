import { expect, test } from "@jest/globals";

import Enum from "./enum.js";

test("enum", () => {
	let e = new Enum({
		ONE: 1,
		TWO: 2,
		THREE: 3
	});

	expect(e.ONE).toEqual(1);
	expect(e.TWO).toEqual(2);
	expect(e.THREE).toEqual(3);

	expect(e.keys).toEqual(["ONE", "TWO", "THREE"]);
	expect(e.values).toEqual([1, 2, 3]);
	expect(e.length).toEqual(3);

	let items = [];
	for (const item of e) items.push(item);
	expect(items).toEqual([{ key: "ONE", value: 1 }, { key: "TWO", value: 2 }, { key: "THREE", value: 3 }]);

	expect(e.toString()).toEqual("[Enum]");
	expect(e.toJSON()).toEqual({ "ONE": 1, "TWO": 2, "THREE": 3 });

	e = new Enum([
		"MESSAGE_ONE",
		"MESSAGE_TWO",
		"MESSAGE_THREE"
	]);

	expect(e.MESSAGE_ONE).toEqual("MESSAGE_ONE");
	expect(e.MESSAGE_TWO).toEqual("MESSAGE_TWO");
	expect(e.MESSAGE_THREE).toEqual("MESSAGE_THREE");

	expect(e.keys).toEqual(["MESSAGE_ONE", "MESSAGE_TWO", "MESSAGE_THREE"]);
	expect(e.values).toEqual(["MESSAGE_ONE", "MESSAGE_TWO", "MESSAGE_THREE"]);
	expect(e.length).toEqual(3);

	items = [];
	for (const item of e) items.push(item);
	expect(items).toEqual([{ key: "MESSAGE_ONE", value: "MESSAGE_ONE" }, { key: "MESSAGE_TWO", value: "MESSAGE_TWO" }, { key: "MESSAGE_THREE", value: "MESSAGE_THREE" }]);

	expect(e.toString()).toEqual("[Enum]");
	expect(e.toJSON()).toEqual({ "MESSAGE_ONE": "MESSAGE_ONE", "MESSAGE_TWO": "MESSAGE_TWO", "MESSAGE_THREE": "MESSAGE_THREE" });
});

test("errors", () => {
	expect(() => {
		new Enum();
	}).toThrow("Values must be array or object with string keys, and values, which will be converted to string");

	expect(() => {
		new Enum({});
	}).toThrow("Empty enum");

	expect(() => {
		new Enum([]);
	}).toThrow("Empty enum");

	expect(() => {
		new Enum([
			"ONE",
			"TWO",
			"ONE"
		]);
	}).toThrow("Key ONE already exists");

	expect(() => {
		new Enum([
			"ONE",
			"",
			"TWO"
		]);
	}).toThrow("Value  must be not null or undefined, string or number");

	expect(() => {
		new Enum({
			ONE: 1,
			"": 2,
			ONE: 3
		});
	}).toThrow("Key  must be not null string");

	expect(() => {
		new Enum({
			ONE: null
		});
	}).toThrow("Value null must be not null or undefined, string or number");

	expect(() => {
		new Enum({
			ONE: {}
		});
	}).toThrow("Value [object Object] must be not null or undefined, string or number");

	expect(() => {
		new Enum({
			ONE: true
		});
	}).toThrow("Value true must be not null or undefined, string or number");

	expect(() => {
		new Enum({
			ONE: 1,
			TWO: "two"
		});
	}).toThrow("All values must be of the same type number");

	expect(() => {
		new Enum([
			"one",
			2
		]);
	}).toThrow("All values must be of the same type string");
});