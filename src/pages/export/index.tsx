import { useRef, useState } from "preact/hooks";
import styles from "./style.module.css";

import { exportToZip } from "../../logic/fetch-documents";
import { downloadFile } from "./download";

type ProgressState = { max: number; finished: number };
export default function Export() {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const fileInput = useRef(null);
  const downloadUrl = useRef<string | null>(null);
  const onUpdate = (progress: ProgressState) => setProgress(progress);
  const onFormSubmit = async (e: Event) => {
    // Do not reload the page.
    e.preventDefault();
    /* eslint-disable-line */ // @ts-ignore fileInput.current is possibly null
    const file = fileInput.current.files[0];
    const fileContent = await file.text();
    const { data: zipContent, filename } = await exportToZip(
      fileContent,
      onUpdate
    );
    if (downloadUrl.current) {
      URL.revokeObjectURL(downloadUrl.current);
    }
    const url = (downloadUrl.current = URL.createObjectURL(zipContent));
    downloadFile(url, filename);
  };
  return (
    <section class={styles.exportDocuments}>
      <h1>Exportez des documents d'un export Assoconnect</h1>
      <p>
        Cet outil ne supporte que des documents exportés depuis Assoconnect en
        utilisant le format Excel 97.
      </p>
      <p>
        Cet outil va télécharger tous les fichiers externes contenus dans
        l'export, et les ajouter bien rangés dans un zip qui sera ensuite
        proposé au téléchargement.
      </p>
      <form onSubmit={onFormSubmit}>
        <p>
          <label for="file">Choisissez un fichier:</label>
        </p>
        <input id="file" type="file" accept=".xls" ref={fileInput} />
        <input type="submit" />
      </form>
      {progress && (
        <>
          <progress max={progress.max} value={progress.finished} />{" "}
          {progress.finished} / {progress.max}
        </>
      )}
    </section>
  );
}
