import { toXML } from "jstoxml";
import Product from "../../../domain/product/entity/product";

export default class ProductPresenter {
  static listXML(data: any): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.products.map((product: Product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        },
      },
      xmlOption
    );
  }
}