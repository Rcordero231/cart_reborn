import { v4 as uuidv4 } from 'uuid';

class Item {
    private _id: string = uuidv4();
    private _name: string;
    private _cost: number;
    private _description: string;

    constructor(name: string, cost: number, description: string) {
        this._name = name;
        this._cost = cost;
        this._description = description;
    }
    get id(): string {return this._id;}
    get name(): string {return this._name;}
    set name(value: string) {this._name = value;}
    get cost(): number {return this._cost;}
    set cost(value: number) {this._cost = value;}
    get description(): string {return this._description;}
    set description(value: string) {this._description = value;}
}


class User {
    private _id: string = uuidv4();
    private _name: string;
    private _age: number;
    private _cart: Item[] = [];

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }
    get cart(): Item[] {return [...this._cart];}
    get id(): string {return this._id;}
    get name(): string {return this._name;}
    set name(value: string) {this._name = value;}
    get age(): number {return this._age};
    set age(value: number) {this._age = value}

    addToCart(item: Item): void {
        this._cart.push(item);
    }

    removeFromCart(itemId: string): void {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }

    removeQuantityFromCart(itemId: string, quantity: number): void {
        let count = 0;
        this._cart = this._cart.filter(item => {
            if (item.id === itemId && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }

    cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.cost, 0);
    }

    printCart(): void {
        this._cart.forEach(item => console.log(`${item.name}: $${item.cost}`));
        console.log(`Total: $${this.cartTotal()}`);
    }
}



class Shop {
    private _items: Item[] = [];

    constructor() {
        this._items.push(new Item("carrot", 3, "fresh"));
        this._items.push(new Item("apple", 4, "it is apple"));
        this._items.push(new Item("potatoe", 1, "grows in ground"));
    }
    get items(): Item[] {return this._items;}
}

let shop = new Shop();
let user = new User("Ricardo", 24);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.removeQuantityFromCart(shop.items[1].id, 3);
user.printCart();