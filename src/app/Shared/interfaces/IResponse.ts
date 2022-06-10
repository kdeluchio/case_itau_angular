export interface IResponse<T> {
    status: string;
    message: string;
    result : T
}