$(document).ready(function () {
    $("#checkoutForm").submit(function (event) {
        event.preventDefault();
        $(".text-danger").text("");
        
        var namePattern = /^[a-zA-Z]{2,30}$/;
        var addressPattern = /^[a-zA-Z0-9]+$/;
        var phonePattern = /^\d{10}$/;
        var zipPattern = /^\d{5}$/;
        var cvvPattern = /^\d{3}$/;
        var emailPattern = /^[\w]+@fsoft\.com\.vn$/;
        var creditCardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        var monthPattern = /^(0[1-9]|1[0-2])$/;
        var yearPattern = /^20[1-9][0-9]$/;
        
        function validateField(id, pattern, message) {
            var value = $(id).val().trim();
            if (!pattern.test(value)) {
                $(id).next(".text-danger").text(message);
                return false;
            }
            return true;
        }
        
        var valid = true;
        valid &= validateField("#firstName", namePattern, "Invalid first name");
        valid &= validateField("#lastName", namePattern, "Invalid last name");
        valid &= validateField("#email", emailPattern, "Invalid email format");
        valid &= validateField("#phone", phonePattern, "Phone must be 10 digits");
        valid &= validateField("#zipCode", zipPattern, "Zip code must be 5 digits");
        valid &= validateField("#cvv", cvvPattern, "CVV must be 3 digits");
        valid &= validateField("#creditCardNumber", creditCardPattern, "Invalid card number format (XXXX-XXXX-XXXX-XXXX)");
        valid &= validateField("#expMonth", monthPattern, "Month must be 01-12");
        valid &= validateField("#expYear", yearPattern, "Year must be after 2000");
        
        if ($("#state").val() === "") {
            $("#state").next(".text-danger").text("Please select a state");
            valid = false;
        }
        
        if (!$("#checkMeOut").is(":checked")) {
            $("#checkMeOut").next(".text-danger").text("You must check this box");
            valid = false;
        }
        
        if (valid) {
            alert("Form submitted successfully!");
        }
    });
});