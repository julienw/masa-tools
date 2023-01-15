import { useRef } from "preact/hooks";
import styles from "./style.module.css";

import { exportToZip } from "../../logic/fetch-documents";
import { downloadFile } from "./download";

export default function Export() {
  const fileInput = useRef(null);
  const downloadUrl = useRef<string | null>(null);
  const onFormSubmit = async (e: Event) => {
    // Do not reload the page.
    e.preventDefault();
    /* eslint-disable-line */ // @ts-ignore fileInput.current is possibly null
    const file = fileInput.current.files[0];
    const fileContent = await file.text();
    const { data: zipContent, filename } = await exportToZip(fileContent);
    if (downloadUrl.current) {
      URL.revokeObjectURL(downloadUrl.current);
    }
    const url = (downloadUrl.current = URL.createObjectURL(zipContent));
    downloadFile(url, filename);
  };
  return (
    <>
      <section class={styles.exportDocuments}>
        <h1>Exportez des documents d'un export Assoconnect</h1>
        <p>
          Cet outil ne supporte que des documents exportés depuis Assoconnect en
          utilisant le format Excel 97.
        </p>
        <form onSubmit={onFormSubmit}>
          <p>
            <label for="file">Choisissez un fichier:</label>
          </p>
          <input id="file" type="file" accept=".xls" ref={fileInput} />
          <input type="submit" />
        </form>
      </section>
    </>
  );
}