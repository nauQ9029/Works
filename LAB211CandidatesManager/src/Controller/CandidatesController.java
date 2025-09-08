/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Candidate;
import Model.Experience;
import Model.Fresher;
import Model.Internship;
import View.CandidatesView;

import java.util.ArrayList;

/**
 *
 * @author plmin
 */
public class CandidatesController {

    private ArrayList<Candidate> candidates;
    private CandidatesView view;

    public CandidatesController() {
        this.candidates = new ArrayList<>();
        this.view = new CandidatesView();
    }

    public void execute() {
        int choice;
        do {
            choice = view.showMainMenu();
            switch (choice) {
                case 1:
                    createExperience();
                    break;
                case 2:
                    createFresher();
                    break;
                case 3:
                    createInternship();
                    break;
                case 4:
                    searchCandidate();
                    break;
            }
        } while (choice != 5);

    }

    private void createExperience() {

        int id = view.inputInt("ID: ");
        String firstName = view.inputString("First name: ");
        String lastName = view.inputString("Last name: ");
        int DoB = view.inputInt("Year of birth: ");
        String address = view.inputString("Address: ");
        String phone = view.inputString("Phone: ");
        String email = view.inputString("Email: ");
        int type = 0;
        int expInYear = view.inputInt("Years of experience: ");
        String proSkill = view.inputString("Professional skill: ");

        candidates.add(new Experience(id, firstName, lastName, DoB, address, phone, email, 0, expInYear, proSkill));
        System.err.println("Experience candidate created successfully.");
        askToContinue(0);
    }

    private void createFresher() {

        int id = view.inputInt("ID: ");
        String firstName = view.inputString("First name: ");
        String lastName = view.inputString("Last name: ");
        int DoB = view.inputInt("Year of birth: ");
        String address = view.inputString("Address: ");
        String phone = view.inputString("Phone: ");
        String email = view.inputString("Email: ");
        int type = 1;
        String graduationDate = view.inputString("Graduation date: ");
        String graduationRank = view.inputString("Graduation rank: ");
        String education = view.inputString("Graduation place: ");

        candidates.add(new Fresher(id, firstName, lastName, DoB, address, phone, email, 1, graduationDate, graduationRank, education));
        System.err.println("Fresher candidate created successfully.");
        askToContinue(1);
    }

    private void createInternship() {

        int id = view.inputInt("ID: ");
        String firstName = view.inputString("First name: ");
        String lastName = view.inputString("Last name: ");
        int DoB = view.inputInt("Year of birth: ");
        String address = view.inputString("Address: ");
        String phone = view.inputString("Phone: ");
        String email = view.inputString("Email: ");
        int type = 2;
        String majors = view.inputString("Majors: ");
        String semester = view.inputString("Semester: ");
        String uniName = view.inputString("University name: ");

        candidates.add(new Internship(id, firstName, lastName, DoB, address, phone, email, 2, majors, semester, uniName));
        System.err.println("Internship candidate created successfully.");
        askToContinue(2);
    }

    private void searchCandidate() {

        view.displayCandidateDetails(candidates);

        String searchName = view.inputString("Input Candidate name (First name or Last name): ").toLowerCase();
        int searchType = view.inputInt("Input type of candidate (0 for Experience, 1 for Fresher, 2 for Intern): ");

        view.displayCandidates(filterCandidates(searchName, searchType));

    }

    private ArrayList<Candidate> filterCandidates(String searchName, int searchType) {
        ArrayList<Candidate> filteredCandidates = new ArrayList<>();
        for (Candidate candidate : candidates) {
            if (candidate.getType() == searchType
                    && (candidate.getFirstName().toLowerCase().contains(searchName)
                    || candidate.getLastName().toLowerCase().contains(searchName))) {
                filteredCandidates.add(candidate);
            }
        }
        return filteredCandidates;
    }

    private void askToContinue(int type) {
        char choice = view.inputChar("Do you want to continue (Y/N)? ");
        if (choice == 'N' || choice == 'n') {
            System.out.println("Returning to the main screen...\n");
        } else if (choice == 'Y' || choice == 'y') {
            switch (type) {
                case 0:
                    createExperience();
                    break;
                case 1:
                    createFresher();
                    break;
                case 2:
                    createInternship();
                    break;
                default:
                    System.out.println("Invalid candidate type.");
            }
        } else {
            System.out.println("Invalid choice.");
        }
    }
}
