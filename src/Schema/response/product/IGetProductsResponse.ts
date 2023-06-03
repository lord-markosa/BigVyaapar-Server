import Status from "../Status";
import ProductReturnType from "./ProductReturnType";

interface IGetProductsResponse {
    status: Status;
    message: string;
    products: Array<ProductReturnType>;
}

export default IGetProductsResponse;
