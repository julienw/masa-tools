import JSZip from "jszip";
import { convertFromAssoconnectFormat } from "./import/assoconnect.js";

function extractUrlFromAssoconnectField(input: string) {
  const startUrl = input.lastIndexOf("https:");
  if (startUrl < 0) {
    return null;
  }

  const startType = input.lastIndexOf(".", startUrl);
  if (startType < 0) {
    return null;
  }
  const endType = input.indexOf(" ", startType);
  if (endType < 0) {
    return null;
  }
  const type = input.slice(startType + 1, endType);

  return {
    type,
    url: input.slice(startUrl).replaceAll("&amp;", "&"),
  };
}

async function fetchAsArrayBuffer(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`(${response.status}) ${response.statusText}`);
  } else {
    return response.arrayBuffer();
  }
}

function* extractPropertieswithUrl(participant: {
  Nom: string;
  Prénom: string;
}) {
  const nom = participant.Nom;
  const prenom = participant.Prénom;

  for (const [property, value] of Object.entries(participant)) {
    const urlInformation = extractUrlFromAssoconnectField(value);
    if (urlInformation) {
      yield {
        nom,
        prenom,
        urlInformation,
        what: property,
      };
    }
  }
}

export async function exportToZip(rawData: string) {
  const filename = `export-${Date.now()}`;
  const data = (await convertFromAssoconnectFormat(rawData)) as Array<{
    Nom: string;
    Prénom: string;
    [key: string]: string;
  }>;
  const zipFile = new JSZip();
  const rootDir = zipFile.folder(filename);

  const expected = data.length;
  let finished = 0;
  function notifyOne() {
    finished++;
    console.log(`Finished: ${finished} / ${expected}`);
  }

  for (const participant of data) {
    for (const {
      nom,
      prenom,
      urlInformation,
      what,
    } of extractPropertieswithUrl(participant)) {
      try {
        /* eslint-disable-line */ // @ts-ignore
        const folder = rootDir.folder(what);
        /* eslint-disable-line */ // @ts-ignore
        folder.file(
          `${nom}-${prenom}.${urlInformation.type}`,
          await fetchAsArrayBuffer(urlInformation.url)
        );
      } catch (e) {
        const errorMessage = `Couldn't download ${what} for ${nom} ${prenom}: ${
          e instanceof Error ? e.message : "No reason given"
        }`;
        console.error(`${errorMessage}\nThe URL was ${urlInformation.url}`);
        throw new Error(errorMessage);
      }
    }
    notifyOne();
  }

  return {
    data: await zipFile.generateAsync({ type: "blob" }),
    filename,
  };
}
