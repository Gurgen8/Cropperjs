$(document).ready(function () {
  var $modal = $(".modal");
  var image = document.getElementById("sample_image");
  var cropper;

  console.log(image)

  //change photo
  $(".upload_label").change(function (event) {
    var files = event.target.files;
    var done = function (url) {
      image.src = url;
      $modal.modal("show");
    };

    if (files && files.length > 0) {
      reader = new FileReader();
      reader.onload = function (event) {
        done(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  });

  //show modal
  $modal
    .on("shown.bs.modal", function () {
      cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 3,
        preview: ".preview",
        rotatable: true,
      });
      console.log(cropper)
    })
    .on("hidden.bs.modal", function () {
      cropper.destroy();
      cropper = null;
    });

  //rotate
  $("#rotate").click(function () {
    cropper.rotate(-90);
  });


  //crop
  $("#crop").click(function () {
    a = cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    });
    a.toBlob(function (blob) {
      url = URL.createObjectURL(blob);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      $modal.modal("hide");
      $(".textarea").css("display", "block");
      reader.onloadend = function () {
        var base64data = reader.result;
        const data = { image: base64data };
        $("#uploaded_image").attr("src", data.image);
      };
    });
  });

});
