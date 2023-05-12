import { createCompany } from "@/domain/company/entity";

describe("domain/company", () => {
    test('createCompany transforms dto with all valid properties', () => {
        const companyDTO = {
            name: 'Small Industry',
            document: '01234567890',
            unknownProperty: 'malicious value'
        };
        const company = createCompany(companyDTO);

        expect(company).toMatchObject({
            name: 'Small Industry',
            document: '01234567890',
        });
        expect(company).not.toHaveProperty('unknownProperty');
    });

    test('createCompany adds createdAt date', () => {
        const companyDTO = {
            name: 'Small Industry',
            document: '01234567890',
            unknownProperty: 'malicious value'
        };
        const company = createCompany(companyDTO);

        expect(company.createdAt).toBeInstanceOf(Date);
    });
});