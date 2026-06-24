@cart
Feature: Shopping cart totals

  @tc3
  Scenario: Cart subtotals and total are calculated correctly
    Given I add the following products to my cart:
      | product        | quantity |
      | Stuffed Frog   | 2        |
      | Fluffy Bunny   | 5        |
      | Valentine Bear | 3        |
    When I navigate to the cart
    Then each product subtotal should equal unit price times quantity
    And the cart total should equal the sum of all subtotals