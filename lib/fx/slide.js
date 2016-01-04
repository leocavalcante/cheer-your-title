export default function (title, sliceLength) {
  var titleSlice = title.slice(this.frame, this.frame + sliceLength);
  window.document.title = titleSlice;
  this.frame += 1;

  if (this.frame >= title.length) {
    this.frame = -1;
  }
}