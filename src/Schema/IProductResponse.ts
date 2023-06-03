import Status from "./Status";
import ProductReturnType from "./ProductReturnType";

interface IProductResponse {
    status: Status;
    message: string;
    product: ProductReturnType;
}

export default IProductResponse;
