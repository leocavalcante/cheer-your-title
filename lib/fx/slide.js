export default function (title, sliceLength) {
  var titleSlice = calculateSlideWindow(this.frame, title, sliceLength);
  window.document.title = titleSlice;
  this.frame += 1;

  if (this.frame >= title.length) {
    this.frame = -1;
  }
}

export function calculateSlideWindow(frame, title, sliceLength) {
  const titleLength = title.length;
  
  if (titleLength < sliceLength) {
    return title;
  }

  const startIndex = frame % titleLength;
  const titleSlice = title.slice(startIndex, startIndex + sliceLength);

  // Make it "rotate"
  if (startIndex + sliceLength > titleLength) {
    return titleSlice + title.slice(0, startIndex + sliceLength - titleLength);
  }

  return titleSlice;
}