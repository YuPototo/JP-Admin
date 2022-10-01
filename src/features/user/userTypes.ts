export enum Role {
    User = 'uer',
    Admin = 'admin',
    Editor = 'editor',
}

export interface IUser {
    role: Role
    username: string
}
