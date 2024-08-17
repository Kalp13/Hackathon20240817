export class ServerURls {

    static baseUrl = "https://hackathonappservice20240817.azurewebsites.net/";

    //Products
    static productsSingle = ServerURls.baseUrl + "products/single"; //GET
    static productsList = ServerURls.baseUrl + "products/list"; //POST
    static productsCreate = ServerURls.baseUrl + "products/create"; //PUT
    static productsUpdate = ServerURls.baseUrl + "products/update"; //PATCH
    static productsDelete = ServerURls.baseUrl + "products/delete"; //DELETE
    static productsRandom = ServerURls.baseUrl + "products/list/random"; //POST

    //Purchasing
    static purchaseCreate = ServerURls.baseUrl + "purchase/create"; //PUT
    static purchaseList = ServerURls.baseUrl + "purchase/list"; //GET

    //Tags
    static tagsList = ServerURls.baseUrl + "tags/list"; //GET

    //Users
    static usersLogin = ServerURls.baseUrl + "users/login"; //POST
    static usersList = ServerURls.baseUrl + "users/list"; //GET
}

