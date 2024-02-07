"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, cost, description) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._cost = cost;
        this._description = description;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get cost() { return this._cost; }
    set cost(value) { this._cost = value; }
    get description() { return this._description; }
    set description(value) { this._description = value; }
}
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._cart = [];
        this._name = name;
        this._age = age;
    }
    get cart() { return [...this._cart]; }
    get id() { return this._id; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get age() { return this._age; }
    ;
    set age(value) { this._age = value; }
    addToCart(item) {
        this._cart.push(item);
    }
    removeFromCart(itemId) {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }
    removeQuantityFromCart(itemId, quantity) {
        let count = 0;
        this._cart = this._cart.filter(item => {
            if (item.id === itemId && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }
    cartTotal() {
        return this._cart.reduce((total, item) => total + item.cost, 0);
    }
    printCart() {
        this._cart.forEach(item => console.log(`${item.name}: $${item.cost}`));
        console.log(`Total: $${this.cartTotal()}`);
    }
}
class Shop {
    constructor() {
        this._items = [];
        this._items.push(new Item("carrot", 3, "fresh"));
        this._items.push(new Item("apple", 4, "it is apple"));
        this._items.push(new Item("potatoe", 1, "grows in ground"));
    }
    get items() { return this._items; }
}
let shop = new Shop();
let user = new User("Ricardo", 24);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.removeQuantityFromCart(shop.items[1].id, 3);
user.printCart();
