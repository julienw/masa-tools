export function downloadFile(url: string, filename: string) {
  const anchorTag = document.createElement("a");
  anchorTag.href = url;
  anchorTag.target = "_blank";
  anchorTag.download = filename;
  document.body.appendChild(anchorTag);
  anchorTag.click();
  document.body.removeChild(anchorTag);
}
