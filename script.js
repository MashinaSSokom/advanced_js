// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
//     { title: 'Shoes', price: 250 },
//     { title: 'Shoes', price: 250 },
// ];
//
// const $goodsList = document.querySelector('.goods-list');
//
// const renderGoodsItem = ({ title, price }) => {
//     return `<div class="goods-item card m-1"><h3>${title}</h3><p>Цена: ${price} руб</p></div>`;
// };
//
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//             (item) =>  {
//                 return renderGoodsItem(item)
//             }
//         ).join('');
//
//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
//
// renderGoodsList();



class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item card m-1"><h3>${this.title}</h3><p>Цена: ${this.price} руб</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', listHtml);

        // Для наглядности отрендерим цену на экране
        let fullPrice = this.getFullPrice()
        let fullPriceHtml = fullPrice?`<div class="full-price"><h3>Суммарная цена всех товаров: ${fullPrice}руб</p></div>`:``
        document.querySelector('.goods-list').insertAdjacentHTML('beforebegin', fullPriceHtml);
    }

    // #2 Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    getFullPrice() {
        if (this.goods.length >0) {
            return this.goods.reduce((acc, curr) => {
                return acc += curr.price
            }, 0)
        }
        return null
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();


// #1 Добавьте пустые классы для Корзины товаров и Элемента корзины товаров.
// Продумайте, какие методы понадобятся для работы с этими сущностями.

class Basket {
    constructor() {

    }

    fetchBasketItems() {
        // Логика получения списка текущих элементов корзины
    }

    clearBasket() {
        // Логика очищения корзины
    }

    createOrder() {
        // Логика создания заказа из элементов корзины
    }

    render() {
        // Логика генерации и отрисовки html-шаблона корзины на экране
    }
}
class BasketItem {
    constructor() {

    }

    removeFromBasket () {
        // Логика удаление элемента из корзины
    }

    addCount() {
        // Логика увеличения кол-ва данного элемента в корзине
    }

    subCount() {
        // Логика уменьшения кол-ва данного элемента в корзине
    }

    render () {
        // Логика генерации html-шаблона элемента
    }
}


// #3 Некая сеть фастфуда предлагает несколько видов гамбургеров:
// a. Маленький (50 рублей, 20 калорий).
// b. Большой (100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// a. С сыром (+10 рублей, +20 калорий).
// b. С салатом (+20 рублей, +5 калорий).
// c. С картофелем (+15 рублей, +10 калорий).
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.