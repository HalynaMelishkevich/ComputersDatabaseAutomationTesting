Feature: Delete a computer

  Scenario: Delete existing computer
    Given I open test computer
    When I click on "Delete this computer" button
    Then I see "Done! Computer has been deleted" in the title