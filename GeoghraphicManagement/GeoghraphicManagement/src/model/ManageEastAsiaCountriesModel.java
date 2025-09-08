package model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ManageEastAsiaCountriesModel {
    private List<EastAsiaCountries> countriesList;

    public ManageEastAsiaCountriesModel() {
        this.countriesList = new ArrayList<>();
    }

    public void addCountryInformation(EastAsiaCountries country) {
        countriesList.add(country);
    }

    public List<EastAsiaCountries> getRecentlyEnteredInformation() {
        return countriesList;
    }

    public List<EastAsiaCountries> searchInformationByName(String name) {
        List<EastAsiaCountries> result = new ArrayList<>();
        for (EastAsiaCountries country : countriesList) {
            if (country.getCountryName().equalsIgnoreCase(name)) {
                result.add(country);
            }
        }
        return result;
    }

    public List<EastAsiaCountries> sortInformationByAscendingOrder() {
        List<EastAsiaCountries> sortedList = new ArrayList<>(countriesList);
        Collections.sort(sortedList, Comparator.comparing(EastAsiaCountries::getCountryName));
        return sortedList;
    }
    
}
