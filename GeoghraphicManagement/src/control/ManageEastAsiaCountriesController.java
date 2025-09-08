package control;

import java.util.List;
import model.EastAsiaCountries;
import model.ManageEastAsiaCountriesModel;
import view.ManageEastAsiaCountriesView;

public class ManageEastAsiaCountriesController {
    
    private ManageEastAsiaCountriesModel model;
    private ManageEastAsiaCountriesView view;

    public ManageEastAsiaCountriesController(ManageEastAsiaCountriesModel model, ManageEastAsiaCountriesView view) {
        this.model = model;
        this.view = view;
    }

    public void run() {
        while (true) {
            view.displayMenu();
            int choice = view.getUserChoice();

            switch (choice) {
                case 1:
                    EastAsiaCountries country = view.getCountryInformationFromUser();
                    model.addCountryInformation(country);
                    break;
                case 2:
                    List<EastAsiaCountries> recentInfo = model.getRecentlyEnteredInformation();
                    view.displayCountryInformation(recentInfo);
                    break;
                case 3:
                    String searchName = view.getCountryNameFromUser();
                    List<EastAsiaCountries> searchResult = model.searchInformationByName(searchName);
                    view.displayCountryInformation(searchResult);
                    break;
                case 4:
                    List<EastAsiaCountries> sortedInfo = model.sortInformationByAscendingOrder();
                    view.displayCountryInformation(sortedInfo);
                    break;
                case 5:
                    view.displayExitMessage();
                    System.exit(0);
                    break;
                default:
                    view.displayInvalidChoiceMessage();
            }
        }
    }
    
}
