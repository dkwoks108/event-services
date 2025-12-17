<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit;
}

function clean($data) {
    return htmlspecialchars(trim($data));
}

$name       = clean($_POST["name"] ?? "");
$phone      = clean($_POST["phone"] ?? "");
$email      = clean($_POST["email"] ?? "");
$event_type = clean($_POST["event_type"] ?? "");
$message    = clean($_POST["message"] ?? "");

// Required validation
if (!$name || !$phone || !$email || !$event_type) {
    exit("error");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("invalid_email");
}

// EMAIL SETTINGS
$to = "contact@sorienterracines.com"; // Replace with your email address
$subject = "New Event Inquiry - $event_type";

$headers  = "From: Website Enquiry <no-reply@yourdomain.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

$body  = "New Contact Form Submission\n\n";
$body .= "Name: $name\n";
$body .= "Phone: $phone\n";
$body .= "Email: $email\n";
$body .= "Event Type: $event_type\n\n";
$body .= "Message:\n$message\n";

if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "failed";
}
