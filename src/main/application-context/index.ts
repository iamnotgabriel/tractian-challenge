import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { Context } from "../context";

export class ApplicationContext extends Context<ApplicationContext> {
    createCompanyUseCase: CreateCompanyUseCase;
}
