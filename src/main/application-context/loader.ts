import { ApplicationContext } from "@/main/application-context";
import { CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { DataContextLoader } from "./data/loader";


export class ApplicationContextLoader {
    private static context: ApplicationContext;
    
    static get(): ApplicationContext {
        if(ApplicationContextLoader.context == undefined) {
            ApplicationContextLoader.load();
        }

        return ApplicationContextLoader.context;
    }
    
    private static load(): void {
        const dataContext = DataContextLoader.load();
        const createCompanyUseCase = new CreateCompanyUseCaseImpl(dataContext.companyRepository);

        ApplicationContextLoader.context = new ApplicationContext({ createCompanyUseCase });
    }

}