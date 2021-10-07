import { checkForUrl } from "../client/js/urlChecker";

  
describe("Testing the url checker functionality", () => {
   
    test("Testing the not valid url", () => {
          
        expect(checkForUrl("skcmc")).toBe(false);
})
test("Testing the  valid url", () => {
          
    expect(checkForUrl("https://api.meaningcloud.com/sentiment-2.1")).toBe(true);

})
})