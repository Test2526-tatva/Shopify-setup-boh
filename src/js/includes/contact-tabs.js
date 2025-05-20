document.addEventListener('DOMContentLoaded', function () {
    var formId = $('input[name="form-id"]').val();

    var finalErrorClass = '.form-error-message__' + formId;
    var finalSuccessClass = '.form-success-message__' + formId;

    $(finalErrorClass).css('display', 'none');
    $(finalSuccessClass).css('display', 'none');
    $('.form-div').show();

    $(".tab-nav li:first-child").addClass("active");
    $(".tabs-content").hide();
    $(".tabs-content:first").show();

    $(".tab-nav li").click(function (e) {
        $(".tabs-content").hide();
        $(".tab-nav li").removeClass("active");
        $(this).addClass("active");

        var FormId = $(".tab-nav li.active a").attr('href').replace('#', '');

        e.preventDefault();

        var finalErrorClass = '.form-error-message__' + FormId;
        var finalSuccessClass = '.form-success-message__' + FormId;

        $(finalErrorClass).css('display', 'none');
        $(finalSuccessClass).css('display', 'none');


        $('.form-div').show();

        var activeli = $(this).find("a").attr("href");
        $(activeli).fadeIn();
    });


    var SubmitID = '#contact-submit__' + formId;

    $(SubmitID).on('click', function (e) {
        e.preventDefault();

        $('.form-div').find('input[type="text"], input[type="email"], textarea').val('');
        $('.form-div').find('select').val('Topic');

        $('.form-div').css('display', 'none');
        $(finalErrorClass).css('display', 'none');

        $(finalSuccessClass).css('display', 'block');
    });
});
