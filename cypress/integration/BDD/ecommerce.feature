Feature: End 2 end ecommerce validation


    App testing until order is processed

    Scenario: Ecommerce products delivery
    Given I open ecommerce page
    When I add items to cart
    And Validate total prices
    Then Select country, submit and verify thank you message