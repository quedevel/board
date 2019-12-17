
function updateEvent() {
    jsonService.updateJson("http://192.168.1.22:8080/board/update", {
        bno: vals.$bno.val(),
        title: vals.$nameTitle.val(),
        content: vals.$nameContent.val()
    }, success);

    function success(datas) {
        alert(datas.msg);
        if (datas.state === "SUCCESS") {
            //작성자 추가시 text변경 필요
            $("#"+vals.$bno.val()).find('p').text(vals.$bno.val()).siblings('span').text(vals.$nameTitle.val()).siblings('i').text('text');
            read({bno: vals.$bno.val(), title: vals.$nameTitle.val(), content: vals.$nameContent.val()});
            vals.$close.click();
        }
    }
}

function writeEvent() {
    let attachList = new Array();
    let represent = "";
    $(".removeFile").each(function (index, file) {
        if(file.getAttribute('data-represent') == 1) represent = file.getAttribute('data-uploadpath')+"_"+ file.getAttribute('data-fname');
        attachList.push({fname:file.getAttribute('data-fname'), uploadpath:file.getAttribute('data-uploadpath'), isimg:file.getAttribute('data-isimg')});
    });

    jsonService.postJson("http://192.168.1.22:8080/board/write", {
        title: vals.$nameTitle.val(),
        content: vals.$textDiv.html(),
        represent : represent,
        attachList : attachList
    }, success);

    function success(datas) {
        alert(datas.msg);
        if (datas.state === "SUCCESS") {
            vals.$close.click();
        }
    }
}

function deleteEvent(){
    let bno = vals.$bno.val();
    jsonService.deleteJson("http://192.168.1.22:8080/board/" + bno, {bno: bno}, success);

    function success(datas) {
        alert(datas.msg);
        $("#" + bno).remove();
        vals.$close.click();
    }
}

vals.$imgList.on('click', '.liThumbnail', function () {
    vals.$imgList.find('.removeFile').each(function (index, thumbnail) {
        thumbnail.setAttribute('data-represent',0);
        thumbnail.parentNode.setAttribute('style','background-color:white');
    });
    $(this).siblings('.removeFile').attr('data-represent',1).parent().attr('style','background-color:pink');
});

vals.$imgList.on('click', '.removeFile', function () {
    $(this).parent().remove();
    $("img[data-fname='" + $(this).attr('data-fname') + "']").remove();
    representCheck();
});

vals.$fileList.on('click', '.removeFile', function () {
    $(this).parent().remove();
});

function representCheck() {
    let cnt = 0;
    vals.$imgList.find('.removeFile').each(function (index, iTag) {
        if(iTag.getAttribute('data-represent') == 1)    cnt++;
    });
    if(cnt == 0)
        vals.$imgList.find('li').first().attr('style','background-color: pink').children('.removeFile').attr('data-represent',1);
}