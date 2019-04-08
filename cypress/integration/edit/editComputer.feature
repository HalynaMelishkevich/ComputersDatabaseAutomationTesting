Feature: Edit a computer

  Scenario: Modifying existing computer
    Given I open test computer
    When I input "Test computer 2" into Computer Name input field
    And I input "2019-01-03" into Introduced Date input field
    And I input "2019-02-04" into Discontinued Date input field
    And I select "RCA" company from dropdown
    And I click on "Save this computer" button
    Then "Done! Computer Test computer 2 has been updated" message is displayed
    And I ensure my computer is updated
    And Test data deleted