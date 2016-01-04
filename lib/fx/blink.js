export default function (title) {
  window.document.title = this.visible ? title : '\u200E';
  this.visible =! this.visible;
}