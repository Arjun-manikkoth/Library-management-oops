"use strict";
class Item {
    constructor(id, title, isBorrowed = false) {
        this.id = id;
        this.title = title;
        this.isBorrowed = isBorrowed;
    }
    borrowItem() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`${this.title} has been borrowed.`);
        }
        else {
            console.log(`${this.title} is already borrowed.`);
        }
    }
    returnItem() {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            console.log(`${this.title} has been returned.`);
        }
        else {
            console.log(`${this.title} was not borrowed.`);
        }
    }
}
class Book extends Item {
    constructor(id, title, author, pages) {
        super(id, title);
        this.author = author;
        this.pages = pages;
    }
    borrowItem() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Book: "${this.title}" by ${this.author} has been borrowed.`);
        }
        else {
            console.log(`Book: "${this.title}" by ${this.author} is already borrowed.`);
        }
    }
}
class User {
    constructor(name) {
        this.name = name;
        this.borrowedItems = [];
    }
    borrow(item) {
        if (!item.isBorrowed) {
            item.borrowItem();
            this.borrowedItems.push(item);
        }
        else {
            console.log(`${item.title} is already borrowed by someone else.`);
        }
    }
    return(item) {
        const index = this.borrowedItems.indexOf(item);
        if (index > -1) {
            item.returnItem();
            this.borrowedItems.splice(index, 1);
        }
        else {
            console.log(`${this.name} did not borrow ${item.title}.`);
        }
    }
    listBorrowedItems() {
        console.log(`${this.name} has borrowed:`);
        this.borrowedItems.forEach(item => console.log(`- ${item.title}`));
    }
}
class Library {
    constructor() {
        this.items = [];
        this.users = [];
    }
    addItem(item) {
        this.items.push(item);
        console.log(`Added "${item.title}" to the library.`);
    }
    registerUser(user) {
        this.users.push(user);
        console.log(`Registered user: ${user.name}`);
    }
    findItemById(id) {
        return this.items.find(item => item.id === id);
    }
    findUserByName(name) {
        return this.users.find(user => user.name === name);
    }
    listAvailableItems() {
        console.log('Available items in the library:');
        this.items.filter(item => !item.isBorrowed).forEach(item => console.log(`- ${item.title}`));
    }
}
const myLibrary = new Library();
const book1 = new Book(1, "2024", "Arjun", 328);
const book2 = new Book(2, "Wings of fire", "D.R APJ Abdul Kalam", 214);
myLibrary.addItem(book1);
myLibrary.addItem(book2);
const user1 = new User("Aswin");
const user2 = new User("Anugrah");
myLibrary.registerUser(user1);
myLibrary.registerUser(user2);
user1.borrow(book1);
user1.borrow(book2);
user2.borrow(book1);
user1.listBorrowedItems();
user1.return(book1);
user2.borrow(book1);
myLibrary.listAvailableItems();
