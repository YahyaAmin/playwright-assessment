// Generated from: features\contact.feature
import { test } from "../../features/fixtures.ts";

test.describe('Contact form validation', () => {

  test('Validation errors show on empty submit and clear with valid data', { tag: ['@contact', '@tc1'] }, async ({ Given, When, Then, contactPage }) => { 
    await Given('I am on the Contact page', null, { contactPage }); 
    await When('I submit the form without entering any data', null, { contactPage }); 
    await Then('I should see validation errors for the mandatory fields', null, { contactPage }); 
    await When('I fill in the mandatory fields with valid data', null, { contactPage }); 
    await Then('the validation errors should no longer be displayed', null, { contactPage }); 
  });

  test('Successful form submission shows confirmation', { tag: ['@contact', '@tc2'] }, async ({ Given, When, Then, And, contactPage }) => { 
    await Given('I am on the Contact page', null, { contactPage }); 
    await When('I fill in the mandatory fields with valid data', null, { contactPage }); 
    await And('I submit the form', null, { contactPage }); 
    await Then('I should see a successful submission message', null, { contactPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\contact.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@contact","@tc1"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given I am on the Contact page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I submit the form without entering any data","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see validation errors for the mandatory fields","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I fill in the mandatory fields with valid data","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the validation errors should no longer be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":13,"tags":["@contact","@tc2"],"steps":[{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given I am on the Contact page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I fill in the mandatory fields with valid data","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I submit the form","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see a successful submission message","stepMatchArguments":[]}]},
]; // bdd-data-end