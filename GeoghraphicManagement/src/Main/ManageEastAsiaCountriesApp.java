package Main;

import control.ManageEastAsiaCountriesController;
import model.ManageEastAsiaCountriesModel;
import view.ManageEastAsiaCountriesView;

public class ManageEastAsiaCountriesApp {
    public static void main(String[] args) {
        ManageEastAsiaCountriesModel model = new ManageEastAsiaCountriesModel();
        ManageEastAsiaCountriesView view = new ManageEastAsiaCountriesView();
        ManageEastAsiaCountriesController controller = new ManageEastAsiaCountriesController(model, view);

        controller.run();
    }
}
