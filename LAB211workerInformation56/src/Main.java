/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author plmin
 */

import Controller.WorkerController;

/*
TODO: 
    add date bằng cách:
        sau khi add 1 worker, ngày sẽ là ngày hiện tại
        nếu không, user đổi trong method adjSalary*
        
MISSING:
    Thiếu validation kiểm tra các input data trống 
    Sai tên function đề ( public boolean addWorker(Worker worker) throws Exception
                          public boolean changeSalary(SalaryStatus status, String code, double amount) )
    Sai yêu cầu đề ở function displayInfo (Hiển thị lịch sử thay đổi, k phải hiển thị danh sách lương của worker)
*/
public class Main {

    public static void main(String[] args) {
        WorkerController workerController = new WorkerController();
        workerController.execute();
    }
}
