/*
 * Le fichier XML en input ressemble à ça:
 * <Workbook>
 *   <Worksheet>
 *     <Table>
 *       <Row>
 *         <Cell>
 *           <Data ss:Type="<Type>">Cell Content</Data>
 *         </Cell>
 *         <Cell>
 *           ...
 *         </Cell>
 *         ...
 *       </Row>
 *       <Row>
 *         ...
 *       </Row>
 *       ...
 *     </Table
 *   </Worksheet>
 * </Workbook>
 */
export async function convertFromAssoconnectFormat(input: string) {
  const domParser = new DOMParser();
  const xmlDocument = domParser.parseFromString(input, "text/xml");

  const rows = Array.from(xmlDocument.querySelectorAll("Row")).map((row) =>
    Array.from(row.querySelectorAll("Cell")).map((cell) =>
      (cell.textContent ?? "").trim()
    )
  );

  const header = rows[0];
  const values = rows.slice(1);
  const result = values.map((valueList) =>
    Object.fromEntries(valueList.map((value, i) => [header[i], value]))
  );

  return result;
}
