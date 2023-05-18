import { type Result } from '@/use-case/commons'

export interface UseCase<Req, Res> {
  handle: (request: Req) => UseCase.Response<Res>
}

export namespace UseCase {
  export type Response<T> = Promise<Result<T>>
}
