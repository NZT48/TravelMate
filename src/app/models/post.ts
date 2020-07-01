export class Post {
    constructor(
        public _id: string,
        public text: string,
        public destination: string,
        public created_at: string,
        public user: string
    ) {}
}
