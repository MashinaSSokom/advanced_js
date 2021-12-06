// https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
// /catalogData.json – получить список товаров;
// /getBasket.json – получить содержимое корзины;
// /addToBasket.json – добавить товар в корзину;
// /deleteFromBasket.json – удалить товар из корзины.

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id
    }

    render() {
        let item = this

        return `<div class="goods-item card m-1 p-2">
                    <h3>${this.title}</h3>
                    <p>Цена: ${this.price} руб</p>
                    <button class="goods-item__button cart-button btn btn-outline-primary w-50"
                            type="button"
                            data-id="${this.id}"
                            onclick=""
                    >
                        Добавить в корзину
                    </button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = request.map(good => ({title: good.product_name, price: good.price, id: good.id_product}))
                this.render(this.goods);
            })
            .catch((err) => {
                console.log(err.text)
            })
    }

    render(items) {
        let listHtml = '';
        items.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', listHtml);

        // let fullPrice = this.getFullPrice()
        // let fullPriceHtml = fullPrice ? `<div class="full-price"><h3>Суммарная цена всех товаров: ${fullPrice}руб</p></div>` : ``
        // document.querySelector('.goods-list').insertAdjacentHTML('beforebegin', fullPriceHtml);
    }

    getFullPrice() {
        if (this.goods.length > 0) {
            return this.goods.reduce((acc, curr) => {
                return acc += curr.price
            }, 0)
        }
        return null
    }
}

class BasketItem extends GoodsItem {
    constructor(title, price, id, quantity) {
        super(title, price, id)
        this.quantity = quantity
    }

    render() {
        return `<div class="basket-item">
                    <span>Название: ${this.title}</span>
                    <span>Цена: ${this.price}</span>
                    <span>Количество:  ${this.quantity}</span>
                    <button class="btn btn-outline-danger basket-item__remove"
                            data-id="${this.id}"
                    >
                        x
                    </button>
                </div>`;
    }

    addCount() {
        // Логика увеличения кол-ва данного элемента в корзине
    }

    subCount() {
        // Логика уменьшения кол-ва данного элемента в корзине
    }
}

class Basket {
    constructor() {
        this.items = []
        this.fullPrice = 0
        this.$basket = document.querySelector('.basket')
    }

    fetchBasketItems() {
        //получение текущих предметов в корзине
        fetch(`${API_URL}getBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.items = request.contents
                this.fullPrice = request.amount
                this.render(this.items);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // clearBasket() {
    //     // условно полное очищение корзины
    //     fetch(`${API_URL}deleteFromBasket.json`)
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data)
    //             this.items = []
    //             this.amount = 0
    //
    //             // this.render();
    //         })
    //         .catch((err) => {
    //             console.log(err.text)
    //         })
    // }

    addToBasket(event) {

        // fetch(`${API_URL}addToBasket.json`)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         this.items = this.items.filter(el => el!==item)
        //         this.amount -= item.price
        //
        //         // this.render();
        //     })
        //     .catch((err) => {
        //         console.log(err.text)
        //     })

    }

    removeFromBasket(event) {
        let product_id = parseInt(event.target.dataset.id)
        this.items = this.items.filter(item => item.id_product !== product_id)
        fetch(`${API_URL}deleteFromBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.render()
            })
            .catch((err) => {
                console.log(err)
            })
        // Логика удаление элемента из корзины
    }

    createOrder() {
        // Логика создания заказа из элементов корзины
    }

    render(items) {
        let listHtml = '';
        items.forEach(item => {
            const basketItem = new BasketItem(item.product_name, item.price, item.id_product, item.quantity);
            listHtml += basketItem.render();
        });
        this.$basket.innerHTML = listHtml
        let $delete_buttons = document.querySelectorAll(`.basket-item__remove`)
        $delete_buttons.forEach(btn => {
            btn.addEventListener('click', this.removeFromBasket.bind(this))
        })
    }
}


let goodsList = new GoodsList();
let basket = new Basket()


goodsList.fetchGoods();
basket.fetchBasketItems()
// basket.clearBasket()
