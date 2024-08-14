import { Dropzone } from "dropzone";

Dropzone.options.image = {
  dictDefaultMessage: "Drop images here to upload",
  dictRemoveFile: "Remove Image",
  acceptedFiles: ".png, .jpg, .jpeg",
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
};
