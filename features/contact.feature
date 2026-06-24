@contact
Feature: Contact form validation

  @tc1
  Scenario: Validation errors show on empty submit and clear with valid data
    Given I am on the Contact page
    When I submit the form without entering any data
    Then I should see validation errors for the mandatory fields
    When I fill in the mandatory fields with valid data
    Then the validation errors should no longer be displayed

  @tc2
  Scenario: Successful form submission shows confirmation
    Given I am on the Contact page
    When I fill in the mandatory fields with valid data
    And I submit the form
    Then I should see a successful submission message