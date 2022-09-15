export class Product {
    /*subscribe(arg0: (res: any) => void, arg1: (error: any) => void) {
      throw new Error('Method not implemented.');
    }*/

    constructor (
        public _id: string,
        public name: string,
        public price: number,
        public image : string,
        public available: Boolean,
        public size: string,
        public gender: string
    ){}
}