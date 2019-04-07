Feature: Create new computer

  Scenario: Creating computer with all valid fields
    Given I open Computers Database web application
    When I click on Add a new computer button
    Then I see "Add a computer" in the title
    When I input "Test computer 1" into Computer Name input field
    And I input "2019-01-01" into Introduced Date input field
    And I input "2019-02-02" into Discontinued Date input field
    And I select "Apple Inc." company from dropdown
    And I click on "Create this computer" button
    Then "Done! Computer Test computer 1 has been created" message is displayed