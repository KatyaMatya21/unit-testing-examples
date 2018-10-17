const { TodoList } = require('./TodoList');
const { expect } = require('chai');

it('можно добавлять элементы', function() {
    // подготовка
    let list = new TodoList();

    // действие
    list.addItem('test');

    // проверка
    expect(list.items.map(i => i.name)).to.include('test');
});

it('можно чекать элементы по индексу', function() {
    // подготовка
    let list = new TodoList(['item1', 'item2']);

    // действие
    list.done(1);

    // проверка
    expect(list.items[1].isDone).to.be.true;
});

it('можно загружать элементы с бэкенда', async () => {
    // подготовка
    let list = new TodoList();

    list.fetch = () => {
        return Promise.resolve(['item1', 'item2']);
    };

    // действие
    await list.load();

    // проверка
    expect(list.items.map(i => i.name)).to.eql(['item1', 'item2']);
});

it('можно сохранять элементы на сервер', () => {
    // подготовка
    let list = new TodoList(['item1', 'item2']);
    let result;

    list.fetch = (...args) => {
        result = args;
        return Promise.resolve();
    };

    // действие
    list.save();

    // проверка
    expect(result[0]).to.eql('http://localhost:3000/save');
});