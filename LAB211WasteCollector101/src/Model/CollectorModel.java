/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class CollectorModel {

    public int calCost(int[] wasteAmount) {
        int totalCost = 0;
        int totalWaste = 0;
        int time = 0;

        for (int waste : wasteAmount) {
            totalWaste += waste;
            time += 8;

            // If the truck is full (dumping is required before return and load garbage onto the truck)
            if (totalWaste >= 10000) {
                totalCost += (time / 60) * 120000;                              // Minute -> hour for labor cost
                totalCost += 57000;                                             // The cost to be paid for the dump is 57,000 VND/truck
                totalWaste = 0;                                                 // Reset after waste being dumped
                time += 30;                                                     // The average time to go to and from the dump is 30 mins
            }
        }
        // Check if there's remaining waste to dump after the loop (last station)
        if (totalWaste > 0) {
            totalCost += (time / 60) * 120000;
            totalCost += 57000;
            time += 30;
        }

        time += 30;                                                             // 30 mins to go dump waste  + 30 mins to return to the station
        totalCost += (time / 60) * 120000;                                      // Labor cost for the final return
        return totalCost;
    }
}
