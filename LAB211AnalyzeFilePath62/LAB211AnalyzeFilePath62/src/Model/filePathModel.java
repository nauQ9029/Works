/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author plmin
 */
public class filePathModel {

    String filePath;

    public filePathModel(String filePath) {
        this.filePath = filePath;
    }

    public String getPath() {
        File file = new File(filePath);
        return file.getParent();
    }

    public String getFileName() {
        File file = new File(filePath);
        String fileName = file.getName();                                       // fileName == myfile.txt
        int dotIndex = fileName.lastIndexOf('.');                               // no extension (dotIndex == -1) -> return fileName
        if (dotIndex == -1) {
            return fileName;
        } else {
            return fileName.substring(0, dotIndex);
        }
    }

    public String getExtension() {
        File file = new File(filePath);
        String fileName = file.getName();
        int dotIndex = fileName.lastIndexOf('.');

        // no extension || the dot appears in the fileName is not valid for an file extension -> return empty string
        if (dotIndex == -1 || dotIndex == fileName.length() - 1) {
            return "";
        } else {
            return fileName.substring(dotIndex + 1);                            // return the substring of characters after the dot [.txt]
        }
    }

    public String getDisk() {
        File file = new File(filePath);
        return file.getAbsolutePath().substring(0, 1);                          // return the substring of the absolutePath (disk name) [D:]
    }

    public String[] getFolders() {
        File file = new File(filePath);
        File parent = file.getParentFile();

        if (parent != null && parent.isDirectory()) {
            return new String[]{parent.getName()};
        }

        return new String[]{};
    }
}
