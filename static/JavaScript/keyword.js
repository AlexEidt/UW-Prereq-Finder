$(document).ready(function() {
    var input = document.getElementById('keywordInput');
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Enter Key
            event.preventDefault();
            document.getElementById('btn').click();
        }
    });
    $('button#btn').on('click', function() {
        var inputKey = $('#keywordInput').val();
        $.ajax({
            data: {
                keyword: inputKey,
            },
            url: "/_keyword_search/",
            type: "POST",
            beforeSend: function() {
                $('#btn').attr('disabled', true);
                $('span').addClass('spinner-border spinner-border-sm');
            },
        }).done(function(resp) {
            var root = window.location.protocol + '//' + window.location.host + '/';
            var table = document.getElementById('results');
            $("#results tbody tr").remove();
            var header = table.insertRow();
            header.insertCell().innerHTML = '<strong>Course</strong>';
            header.insertCell().innerHTML = '<strong>Course Name</strong>';
            header.insertCell().innerHTML = '<strong>Campus</strong>';
            if (Object.keys(resp.matches).length > 0) {
                jQuery.each(resp.matches, function(course, courseData) {
                    var row = table.insertRow();
                    row.insertCell().innerHTML = '<a href="' + root + course + '" target="_blank"><strong>' + course + '</strong></a>';
                    row.insertCell().innerHTML = courseData['Course Name'];
                    row.insertCell().innerHTML = courseData.Campus;
                });
            } else {
                $("#results tbody tr").remove();
                var noresults = table.insertRow();
                var cell = noresults.insertCell();
                cell.colSpan = 3;
                cell.innerHTML = '<td style="text-align: center; vertical-align: middle"><strong>No Courses Found</strong></td>';
            }
            $('#btn').attr('disabled', false);
            $('span').removeClass('spinner-border spinner-border-sm');
        });
    }); 
});