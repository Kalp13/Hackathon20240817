import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response();
};

var baseUrl = "https://hackathonappservice20240817.azurewebsites.net/";

//Products
var productSingleUrl = baseUrl + "products/single"; //GET
var productsList = baseUrl + "products/list"; //POST
var productsCreate = baseUrl + "products/create"; //PUT
var productsUpdate = baseUrl + "products/update"; //PATCH
var productsDelete = baseUrl + "products/delete"; //DELETE
var productsSearch = baseUrl + "products/search"; //POST

//Purchasing
var purchaseCreate = baseUrl + "purchase/create"; //PUT
var purchaseList = baseUrl + "purchase/list"; //GET

//Tags
var tagsList = baseUrl + "tags/list"; //GET

//Users
var usersLogin = baseUrl + "users/login"; //POST
var usersList = baseUrl + "users/list"; //GET