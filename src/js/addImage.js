import { Dropzone } from "dropzone";

const token = document.querySelector('meta[name="csrf-token"]').content;

Dropzone.options.image = {
  dictDefaultMessage: "Drop images here to upload",
  dictRemoveFile: "Remove Image",
  acceptedFiles: ".png, .jpg, .jpeg",
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  headers: {
    "CSRF-Token": token,
  },
  paramName: "image",
  init: function () {
    const dropzone = this;
    const btnPublish = document.querySelector("#publish");

    btnPublish.addEventListener("click", function () {
      dropzone.processQueue();
    });

    dropzone.on("queuecomplete", function () {
      if (dropzone.getActiveFiles().length === 0) {
        window.location.href = "/my-properties";
      }
    });
  },
};
