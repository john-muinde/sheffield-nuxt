<!DOCTYPE html>
<html>
<head>
    <title>Create Symlink</title>
</head>
<body>

<h1>Symlink Creation</h1>

<?php
    $target = '/home/sheffieldafrica/public_html/storage/app/public'; // Update with the correct path
    $shortcut = '/home/sheffieldafrica/public_html/public/storage'; // Update with the correct path

    // Check if the symlink already exists
    if (file_exists($shortcut)) {
        echo '<p>Symlink already exists at: ' . $shortcut . '</p>';
    } else {
        // Try to create the symlink
        if (symlink($target, $shortcut)) {
            echo '<p>Symlink created successfully from ' . $target . ' to ' . $shortcut . '</p>';
        } else {
            echo '<p>Failed to create symlink. Check permissions or paths.</p>';
        }
    }
?>

</body>
</html>
