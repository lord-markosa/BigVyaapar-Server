## Endpoints

-   base/signUp

    -   POST
    -   body: {phoneNumber, password, name}
    -   registers the user

-   base/login

    -   POST
    -   body: {phoneNumber, password}
    -   sends the authentication token

-   base/product/all

    -   GET
    -   Headers: Authorization: token
    -   sends all the products

-   base/product/new

    -   POST
    -   Headers: Authorization: token
    -   body : {name, price, description}
    -   registers a new product

-   base/product/update/:productId

    -   PUT
    -   Headers: Authorization: token
    -   body : {category, quantity, price, address, description}
    -   updates the product

-   base/product/delete/:productId

    -   DELETE
    -   Headers: AUthorization: token
    -   deleted the product

-   base/trade/new

    -   POST
    -   Headers: Authorization: token
    -   body : {price, quantity, type, address}
    -   registers a new product

-   base/trade/update/:tradeId

    -   POST
    -   Headers: Authorization: token
    -   body : {price, quantity, type, address}
    -   registers a new product

-   base/trade/delete

NOTE: base is the base url
