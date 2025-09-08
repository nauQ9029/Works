/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Model.Candidate;
import Model.Experience;
import Model.Fresher;
import Model.Internship;

import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class CandidatesView {

    private Scanner scanner;

    public CandidatesView() {
        this.scanner = new Scanner(System.in);
    }

    public int showMainMenu() {
        System.out.println("CANDIDATE MANAGEMENT SYSTEM");
        System.out.println("1. Experience");
        System.out.println("2. Fresher");
        System.out.println("3. Internship");
        System.out.println("4. Searching");
        System.out.println("5. Exit");
        System.out.print("Please choose an option: ");
        return scanner.nextInt();

    }

    public void displayCandidateDetails(ArrayList<Candidate> candidates) {
        System.out.println("List of candidates: ");

        // Separate candidates by type
        ArrayList<Candidate> Experience = new ArrayList<>();
        ArrayList<Candidate> Fresher = new ArrayList<>();
        ArrayList<Candidate> Internship = new ArrayList<>();

        for (Candidate candidate : candidates) {
            if (candidate instanceof Experience) {
                Experience.add(candidate);
            } else if (candidate instanceof Fresher) {
                Fresher.add(candidate);
            } else if (candidate instanceof Internship) {
                Internship.add(candidate);
            }
        }
        // Display Experience candidates
        System.out.println("===========EXPERIENCE CANDIDATE============");
        displayCandidatesList(Experience);

        // Display Fresher candidates
        System.out.println("============FRESHER CANDIDATE==============");
        displayCandidatesList(Fresher);

        // Display Internship candidates
        System.out.println("=============INTERN CANDIDATE==============");
        displayCandidatesList(Internship);

    }

    public void displayCandidates(ArrayList<Candidate> candidates) {
        for (Candidate candidate : candidates) {
            System.out.println(candidate.getFirstName() + " " + candidate.getLastName() + " | "
                    + candidate.getDoB() + " | " + candidate.getAddress() + " | "
                    + candidate.getPhone() + " | " + candidate.getEmail() + " | " + candidate.getType());
        }
    }

    private void displayCandidatesList(ArrayList<Candidate> candidates) {
        for (Candidate candidate : candidates) {
            System.out.println(candidate.getFirstName() + " " + candidate.getLastName());
        }
    }

    public String inputString(String prompt) {
        System.out.print(prompt);
        return scanner.next();
    }

    public int inputInt(String prompt) {
        System.out.print(prompt);
        return scanner.nextInt();
    }

    public char inputChar(String prompt) {
        System.out.print(prompt);
        return scanner.next().charAt(0);
    }
}
