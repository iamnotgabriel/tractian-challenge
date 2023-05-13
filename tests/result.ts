import { Result } from "@/use-case/commons";

export function expectToBeOk<T>(result: Result<T>): T {
    if (result.ok) {
        return result.value;
    }
    expect(result.ok).toBeTruthy();
}