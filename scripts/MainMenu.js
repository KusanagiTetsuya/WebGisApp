var switchStatus = false;
var customizer = $('.customizer')

// const switchDesc = document.getElementsById('switch-desc')
$('#main-menu-toggle').on('click', function (e) {
    e.preventDefault();
    $('#main-menu-switch').prop('checked', true);
    $('#switch-desc').html('Area / Facility list')
    });


$("#main-menu-switch").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        // alert(switchStatus);// To verify
        $('#switch-desc').html('Area / Facility list')
        // switchDesc.innerHTML = 'Area / Facility list'
    }
    else {
       switchStatus = $(this).is(':checked');
    //    alert(switchStatus);// To verify
       $('#switch-desc').html('Chain Store')
    //    switchDesc.innerHTML = 'Chain Store'
    }
});

// $('label').click(function() {
//     $(this).parent('#area-facility-list').toggleClass('active');
// });