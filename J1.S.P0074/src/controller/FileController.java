package controller;

import common.Algorithm;

import view.Menu;

public class FileController {

    private final String[] MAIN_MENU_ITEMS = {
        " Check Path",
        " Get file name with type java",
        " Get file with size greater than input",
        " Write more content to file",
        " Read file and count characters",
        " Exit",};

    Algorithm algorithm = new Algorithm();

    Menu mainMenu = new Menu("============ File Processing =============", MAIN_MENU_ITEMS) {
        @Override
        public void execute(int choice) {
            switch (choice) {
                case 1:
                    algorithm.checkPath();
                    break;
                case 2:
                    algorithm.getAllFileNameJavaInDirectory();
                    break;
                case 3:
                    algorithm.getFileWithSizeGreaterThanInput();
                    break;
                case 4:
                    algorithm.appendContentToFile();
                    break;
                case 5:
                    algorithm.countCharacter();
                    break;
                case 6:
                    System.exit(0);
                    break;

            }
        }
    };

    public void run() {
        mainMenu.run();
    }
}
