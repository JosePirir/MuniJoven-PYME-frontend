export class Product {

    constructor (
        public _id: string,
        public name: string,
        public price: number,
        public link : string,
        public available: Boolean,
        public size: string,
        public gender: string
    ){}

}